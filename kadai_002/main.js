//画面に表示する文字列を入れる変数（ここではuntypedという名前にする）を準備する
let untyped = '';
let typed = '';
let score = '';
let typeCount = 0;

//getElementById()メソッドでHTML要素（ここではuntypedfieldという名前にする）を取得する
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const count = document.getElementById('count');
const typecount = document.getElementById('typecount');


// 複数のテキストを格納する配列
const textLists = [
    'Hello World', 'This is my App', 'How are you?',
    'Today is sunny', 'I love JavaScript!', 'Good morning',
    'I am Japanese', 'Let it be', 'Samurai',
    'Typing Game', 'Information Technology',
    'I want to be a programmer', 'What day is today?',
    'I want to build a web app', 'Nice to meet you',
    'Chrome Firefox Edge Safari', 'machine learning',
    'Brendan Eich', 'John Resig', 'React Vue Angular',
    'Netscape Communications', 'undefined null NaN',
    'Thank you very much', 'Google Apple Facebook Amazon',
    'ECMAScript', 'console.log', 'for while if switch',
    'var let const', 'Windows Mac Linux iOS Android',
    'programming'
]

// ランダムなテキストを表示
const createText = () => {

    // 正タイプした文字列をクリア
    typed = '';
    typedfield.textContent = typed;

    // 配列のインデックス数からランダムな数値を生成する
    let random = Math.floor(Math.random() * textLists.length);

    // 配列からランダムにテキストを取得し画面に表示する
    untyped = textLists[random];
    untypedfield.textContent = untyped;
};



// キー入力の判定
const keyPress = e => {

    //誤タイプの判定
    if (e.key !== untyped.substring(0, 1)) {
        wrap.classList.add('mistyped');

        // 100ms後に背景色を元に戻す
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        }, 100);
        return;
    }

    //正タイプの判定
    score++;
    typeCount++;
    document.getElementById('typecounter').textContent = typeCount;
    wrap.classList.remove('mistyped');
    typed += untyped.substring(0, 1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    // テキストがなくなったら新しいテキストを表示
    if (untyped === '') {
        createText();
    }
};

// タイピングスキルのランクを判定
const rankCheck = score => {

    // テキストを格納する変数を作る
    let text = '';

    // スコアに応じて異なるメッセージを変数textに格納する
    if (score < 100) {
        text = `あなたはCランクです。\nBランクまであと${100 - score}文字です`;
    } else if (score < 200) {
        text = `あなたはBランクです。\nAランクまであと${100 - score}文字です`;
    } else if (score < 300) {
        text = `あなたはAランクです。\nSランクまであと${100 - score}文字です`;
    } else if (score >= 300) {
        text = `あなたはSランクです。\nおめでとうございます！`;
    }
    // 生成したメッセージと一緒に文字列を返す
    return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
    clearInterval(id);
    const result = confirm(rankCheck(score));


    // OKボタンをクリックされたらリロードする
    if (result == true) {
        window.location.reload();
    }
};

// カウントダウンタイマー（修正版）
const timer = () => {
    let time = count.textContent;
    const id = setInterval(() => {
        time--;
        count.textContent = time;

        if (time <= 0) {
            clearInterval(id);
            untypedfield.textContent = 'タイムアップ！';

            // タイムアップ直後にランク表示ダイアログを表示するための遅延処理
            setTimeout(() => {
                const result = confirm(rankCheck(score));

                // OKを押した場合のみリロードさせる
                if (result) {
                    window.location.reload();
                }
            }, 1000);  // 1秒（1000ミリ秒）後に実行される

        }
    }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {

    // カウントダウンタイマーを開始する
    timer();

    // ランダムなテキストを表示する
    createText();
    start.style.display = 'none';
    typecounter.style.display = 'block'; // typecountを表示

    // キーボードのイベント処理
    document.addEventListener('keypress', keyPress);
});




untypedfield.textContent = 'スタートボタンで開始';
typecounter.textContent = typeCount;  // 初期値を設定