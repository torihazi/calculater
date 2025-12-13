# 演算子処理フロー

## 概要

このドキュメントでは、計算機アプリケーションにおける演算子（四則演算と等号）の処理フローを説明します。

## 重要な状態変数

計算機は以下の 3 つの状態変数を持っています：

- `number`: 現在表示されている値（文字列）
- `prevNumber`: 計算の左辺として使う値（文字列、空文字列の場合は未設定）
- `operator`: 選択されている演算子（文字列、空文字列の場合は未設定）

## 演算子の種類

演算子は 2 種類に分けられます：

1. **四則演算子** (`+`, `-`, `×`, `÷`): 計算を「準備」する
2. **等号** (`=`): 計算を「実行」する

## 処理フロー

### 1. 四則演算子（+, -, ×, ÷）を押したとき

```
演算子ボタンが押された
    ↓
前回保存した値（prevNumber）と演算子（operator）がある？
    ↓
    ├─ YES → 前の計算を先に実行
    │         ↓
    │         prevNumber + number = result
    │         ↓
    │         prevNumber = result（結果を保存）
    │         number = result（一時的に表示）
    │
    └─ NO  → 現在の値を前の値として保存
              ↓
              prevNumber = number
    ↓
新しい演算子を保存
    ↓
operator = 押した演算子（+, -, ×, ÷）
    ↓
入力待ち状態にする
    ↓
number = "0"
```

#### 具体例 1: 初めて演算子を押す

**操作**: `10` → `+` を押す

**処理前の状態:**

```
number = "10"
prevNumber = ""
operator = ""
```

**処理:**

1. `prevNumber` と `operator` が空なので、`prevNumber = "10"` に保存
2. `operator = "+"` に設定
3. `number = "0"` にリセット（次の数値入力待ち）

**処理後の状態:**

```
number = "0"
prevNumber = "10"
operator = "+"
```

#### 具体例 2: 演算子を連続で押す

**操作**: `10` → `+` → `3` → `×` を押す（まだ `=` を押していない）

**処理前の状態:**

```
number = "3"
prevNumber = "10"
operator = "+"
```

**処理:**

1. `prevNumber` と `operator` が設定されているので、前の計算を実行: `10 + 3 = 13`
2. `prevNumber = "13"` に更新（結果を保存）
3. `number = "13"` に更新（一時的に表示、すぐにリセットされる）
4. `operator = "×"` に更新（新しい演算子）
5. `number = "0"` にリセット（次の数値入力待ち）

**処理後の状態:**

```
number = "0"
prevNumber = "13"
operator = "×"
```

### 2. 等号（=）を押したとき

```
等号ボタンが押された
    ↓
前回保存した値（prevNumber）と演算子（operator）がある？
    ↓
    ├─ YES → 計算を実行
    │         ↓
    │         prevNumber + number = result（operator を使って計算）
    │         ↓
    │         number = result（結果を表示）
    │         ↓
    │         prevNumber = result（連続計算用に結果を保存）
    │         ↓
    │         operator = ""（演算子をクリア）
    │
    └─ NO  → 何もしない（計算するものがない）
```

#### 具体例: 等号で計算実行

**操作**: `10` → `+` → `3` → `=` を押す

**処理前の状態:**

```
number = "3"
prevNumber = "10"
operator = "+"
```

**処理:**

1. `prevNumber` と `operator` が設定されているので、計算を実行: `10 + 3 = 13`
2. `number = "13"` に更新（結果を表示）
3. `prevNumber = "13"` に更新（連続計算用に結果を保存）
4. `operator = ""` にクリア

**処理後の状態:**

```
number = "13"
prevNumber = "13"
operator = ""
```

## 重要な判断基準

### 「前回保存した値があるか」のチェック

処理の分岐は、以下の条件で判断します：

```typescript
if (operator && prevNumber) {
  // 前回保存した値と演算子がある → 計算を実行または準備
} else {
  // 初めて演算子を押す → 現在の値を保存して準備
}
```

この条件により：

- 初めて演算子を押す場合と、連続で押す場合を区別できる
- 計算のタイミングを適切に制御できる

## コード実装の疑似コード

```typescript
case "operator":
  if (input === "=") {
    // 等号の場合：計算を実行
    if (operator && prevNumber) {
      const result = binaryOperate(
        Number(prevNumber),  // 左辺（前の値）
        Number(number),      // 右辺（現在の値）
        operator             // 前回保存した演算子（+, -, ×, ÷）
      );
      setNumber(String(result));
      setPrevNumber(String(result)); // 連続計算用
      setOperator(""); // クリア
    }
    // operator や prevNumber が空の場合は何もしない
  } else {
    // 四則演算子（+, -, ×, ÷）の場合
    if (operator && prevNumber) {
      // 既に演算子が設定されている → 前の計算を先に実行
      const result = binaryOperate(
        Number(prevNumber),
        Number(number),
        operator
      );
      setNumber(String(result));
      setPrevNumber(String(result));
    } else {
      // 初めて演算子を押す → 現在の値を prevNumber に保存
      setPrevNumber(number);
    }

    // 新しい演算子を設定し、入力待ち状態にする
    setOperator(input);
    setNumber("0");
  }
  break;
```

## よくある間違い

### ❌ 間違い 1: 等号で input を演算子として使う

```typescript
// 間違い
const result = binaryOperate(prevNumber, number, input); // input は "="

// 正しい
const result = binaryOperate(prevNumber, number, operator); // operator は前回保存した "+", "-", "×", "÷"
```

### ❌ 間違い 2: 演算子を連続で押したときに前の計算を実行しない

```typescript
// 間違い：常に prevNumber に現在の値を保存
setPrevNumber(number);
setOperator(input);

// 正しい：既に演算子がある場合は先に計算
if (operator && prevNumber) {
  // 前の計算を先に実行
  const result = binaryOperate(prevNumber, number, operator);
  setPrevNumber(String(result));
}
setOperator(input);
```

## 状態遷移の例

### 完全な計算フロー: `10 + 3 × 2 =`

| 操作       | number | prevNumber | operator | 説明                                                |
| ---------- | ------ | ---------- | -------- | --------------------------------------------------- |
| 初期状態   | `"0"`  | `""`       | `""`     | -                                                   |
| `1` を押す | `"1"`  | `""`       | `""`     | 数字入力                                            |
| `0` を押す | `"10"` | `""`       | `""`     | 数字入力（末尾に追加）                              |
| `+` を押す | `"0"`  | `"10"`     | `"+"`    | 演算子を設定、入力待ち                              |
| `3` を押す | `"3"`  | `"10"`     | `"+"`    | 数字入力                                            |
| `×` を押す | `"0"`  | `"13"`     | `"×"`    | **前の計算実行**: `10 + 3 = 13`、新しい演算子を設定 |
| `2` を押す | `"2"`  | `"13"`     | `"×"`    | 数字入力                                            |
| `=` を押す | `"26"` | `"26"`     | `""`     | **計算実行**: `13 × 2 = 26`、演算子をクリア         |

## まとめ

- **判断基準**: `operator && prevNumber` で「前回保存した値があるか」をチェック
- **等号（=）**: 前回保存した演算子を使って計算を実行
- **四則演算子**: 計算を準備する。既に演算子がある場合は先に前の計算を実行
- **状態管理**: 3 つの変数（`number`, `prevNumber`, `operator`）で状態を管理
