# 電卓

- 四則演算
- 連続計算(5 + 3 - 4 とかできる)

# 困ったこと

電卓のそもそもの仕組み

単純な 5 + 3 = 8 の裏で一体何が行われているのかを理解していなかった。

電卓は 基本的な動きをするのに幾つかの状態変数がいる。

まず、現在の入力を管理する変数、前の入力を管理する変数、演算子の変数

入力待ちフラグもないと 5 + 3 = 8 の後に 2 を入れると 82 になる。

そのため導入した。

# 多分まだできてないこと。

小数点計算、%対応、負数とか。

それ以外は何かおかしいとこあれば追加で修正。

エラーハンドリングも web アプリならではでリッチに出したい。

# 久々に React 触った結果。

ユニオン型とか使えば良かった。

ruby とか rails ばっか触ってたから、関数名とか変数名、if の条件式を()で囲まないとかの差異で詰まった。

あと state の再レンダリングとかは全く考慮してない。

ただ JSDOC とか使って、他の人がパッと見てわかる、みたいな工夫は 3 年前くらいに比べたら上達していると思う。

あとは例外の処理とか関数切り出しとか変数名の名称とかはこだわった。constant に切り出したりとか。

多分 TypeScript の型機能使ったらもっとカッコよく書けるんだろうけど、

本当に忘れてる。まずい笑

あとそうそう、ただ動くだけ、ではなくエラーをしっかり出すこと。

けたたましくエラーを発生させること。

それはシステムを安全に動かしていくために必須である。

昔はエラー自体を敬遠していたけど、最近は安定したシステムを作れなければ意味がないと思っているので

そこはかなり意識するようになってきている。

あとは tailwind とかかな。

test とかは書いてない。そこもささっと描けるようになりたいと思う。

最後に。絶対今後は UI とかの css は roo に書いてもらう。CSS については本当にやる気が起きない。

今日も朝から UI に手を出そうと思ったがやる気が微塵も起きなかったので roo に全部書いてもらった。

roo 最強。あとは cursor の tab 補完も切ってやってみた。あーそれそれってなるんだけど

使えない時困るから。もちろん効率落ちるけど。ここでの目的はそれじゃないから。

# 電卓の仕組みについて(claude)

自分は作ろうと思ったけど、何から手をつければいいかわからなかったし、

0 がわからなかった。仕組みを claude に噛み砕いてもらってめっちゃわかりやすかったので共有。

以下抜粋。

電卓のロジックで何につまずいているか、一緒に探っていきましょう。

まず、いくつか質問させてください:

**どんな場面で「わからない」と感じますか?**

- 計算の途中で何が起きているのかわからない?
- 答えが予想と違って混乱する?
- それとも、そもそも「電卓がどう動いているのか」という仕組み自体がピンとこない?

**具体例を挙げると:**

- 「2 + 3 × 4 =」を押したら、電卓によって答えが違う(14 か 20 か)
- 「8 ÷ 2 =」のあと、もう一度「=」を押すと変な数字になる
- 「%」ボタンを使うと意味不明な結果になる
- メモリー機能(M+, MR など)が何をしているのかわからない

どれか当てはまるものはありますか?それとも全く別のところでつまずいていますか?

あなたがどこで「?」となるか教えてもらえれば、そこから一緒に紐解いていけます。暗記じゃなくて「ああ、そういうことか!」という理解を目指しましょう。

なるほど! プログラミングで電卓を実装する際のロジックですね。これは確かに最初は混乱しやすいです。

## 電卓の「状態」を理解することが鍵です

電卓アプリで混乱するのは、**どんな情報を覚えておく必要があるか**が見えにくいからです。

### 電卓が内部で覚えておくべきこと

ユーザーの操作を追ってみましょう:

1. 「5」を押す → 画面に「5」
2. 「+」を押す → ？
3. 「3」を押す → 画面に「3」
4. 「=」を押す → 画面に「8」

「+」を押した時点で、電卓は何を覚えておく必要がありますか?

- 最初の数字「5」
- 演算子「+」
- これから次の数字を入力する状態であること

つまり、電卓には最低でもこんな状態が必要です:

```typescript
{
  display: "0",           // 画面に表示される数字
  previousValue: null,    // 前の数値(5を記憶)
  operator: null,         // 演算子(+を記憶)
  waitingForNewValue: false  // 次の入力で数字を上書きするか追加するか
}
```

### あなたが「わからない」のはどこですか?

1. **どんな状態を持てばいいかわからない**(上記のような設計)
2. **数字ボタンを押したときの処理**がわからない
3. **演算子ボタン(+,-,×,÷)を押したときの処理**がわからない
4. **=ボタンを押したときの処理**がわからない
5. 全部わからない

どこから一緒に考えていきましょうか?

それとも、先に簡単な実装例を見てから「ああ、こういうことか」と理解したいですか?

いいですね! では次です。

わかりました! 一緒にゼロから組み立てていきましょう。

## ステップ 1: 最もシンプルな電卓から始める

まず「1 つの数字だけ入力できる電卓」を作ります。計算機能は後回しです。

### やりたいこと

- 「5」→「7」と押したら、画面に「57」と表示される
- それだけ

```typescript
const [display, setDisplay] = useState("0");

const handleNumber = (num: string) => {
  if (display === "0") {
    setDisplay(num); // "0"の状態で"5"を押したら"5"になる
  } else {
    setDisplay(display + num); // "5"の状態で"7"を押したら"57"になる
  }
};
```

**ここまで理解できますか?**

- display は画面に表示される文字列
- ボタンを押すたびに文字を追加していく

---

## ステップ 2: 演算子を「記憶する」だけ

次は「+」ボタンを押したときのことを考えます。でも**まだ計算はしません**。

### やりたいこと

- 「5」→「+」→「3」と押す
- 「+」を押した時点で「5」を記憶して、画面をクリア
- 「3」を押したら画面に「3」と表示

```typescript
const [display, setDisplay] = useState("0");
const [previousValue, setPreviousValue] = useState<number | null>(null);
const [operator, setOperator] = useState<string | null>(null);

const handleOperator = (op: string) => {
  setPreviousValue(Number(display)); // 今の画面の数字を記憶
  setOperator(op); // 演算子を記憶
  setDisplay("0"); // 画面をリセット
};
```

**ここで質問:**
この時点で、「5」→「+」→「3」と押したら、内部の状態はどうなっていますか?

<details>
<summary>答え</summary>

```
display: "3"
previousValue: 5
operator: "+"
```

</details>

理解できたら次に進みましょうか?

## ステップ 3: 「=」で計算する

「5」→「+」→「3」→「=」と押したら「8」を表示したい。

### 状態を確認

「=」を押す直前の状態:

```
display: "3"
previousValue: 5
operator: "+"
```

### やること

1. previousValue(5)と display(3)を取り出す
2. operator(+)に応じて計算する
3. 結果を画面に表示

```typescript
const handleEquals = () => {
  if (previousValue === null || operator === null) {
    return; // 何もしない
  }

  const current = Number(display);
  let result = 0;

  if (operator === "+") {
    result = previousValue + current;
  } else if (operator === "-") {
    result = previousValue - current;
  } else if (operator === "×") {
    result = previousValue * current;
  } else if (operator === "÷") {
    result = previousValue / current;
  }

  setDisplay(String(result));
  setPreviousValue(null); // リセット
  setOperator(null);
};
```

---

## ステップ 4: でも問題が起きる!

今のコードだと、「5」→「+」→「3」→「=」の後に「7」を押すと...

**「87」になっちゃう!**

なぜなら、「=」の後の display は"8"で、handleNumber は文字を追加するだけだから。

### 解決策: 「次の入力で上書きするかどうか」のフラグが必要

```typescript
const [waitingForNewValue, setWaitingForNewValue] = useState(false);

const handleNumber = (num: string) => {
  if (waitingForNewValue) {
    setDisplay(num); // 上書き
    setWaitingForNewValue(false);
  } else if (display === "0") {
    setDisplay(num);
  } else {
    setDisplay(display + num);
  }
};

const handleOperator = (op: string) => {
  setPreviousValue(Number(display));
  setOperator(op);
  setWaitingForNewValue(true); // 次の数字入力で上書き
};

const handleEquals = () => {
  // ... 計算処理 ...
  setWaitingForNewValue(true); // =の後も上書き
};
```

---

## 全体像

```typescript
const [display, setDisplay] = useState("0");
const [previousValue, setPreviousValue] = useState<number | null>(null);
const [operator, setOperator] = useState<string | null>(null);
const [waitingForNewValue, setWaitingForNewValue] = useState(false);
```

この 4 つの状態で電卓ができます!

**ここまでで何か引っかかるところありますか?**

それとも、実際に動くコード全体を見たいですか?
