import Display from "./Display";
import Button from "./Button";
import { useState } from "react";

// 演算子定数
const OPERATOR = ["+", "-", "*", "÷", "%"];
// 数字
const NUMBER = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
// Function
const FUNCTION = ["AC", "C", "⌫"];

/**
 * 電卓から入力された文字列に応じて、演算子 or 数字 or Functionかを返す
 * @param input 入力された文字列
 * @return string 固定の文字列を返す
 */
const categorizeInputType = (input: string): string => {
  if (OPERATOR.includes(input)) {
    return "operator";
  } else if (NUMBER.includes(input)) {
    return "number";
  } else if (FUNCTION.includes(input)) {
    return "function";
  } else {
    return "unknown";
  }
};

function Calculator() {
  // 数字
  const [number, setNumber] = useState<string>("0");
  // 前の数字
  const [prevNumber, setPrevNumber] = useState<string>("");
  // 演算子
  const [operator, setOperator] = useState<string>("");

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const input = e.currentTarget.value;

    // inputのtypeに応じて操作を分けたい
    // 数字であるならばsetNumberを使って処理をする
    // 演算子であるならそれを保存する
    const category = categorizeInputType(input);
    switch (category) {
      case "operator":
        setOperator(input);
        setPrevNumber(number);
        setNumber("0");
        break;
      case "number":
        setNumber((prev) => {
          if (prev === "0") {
            return input;
          }
          return prev + input;
        });
        break;
      default:
        console.error("unsupported Input");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
      <Display value={number} />

      <div className="p-4 grid grid-cols-4 gap-3">
        {/* 1行目: AC, C, ⌫, ÷ */}
        <Button
          label="AC"
          value="AC"
          type="function"
          onClick={(e) => handleButtonClick(e)}
        />
        <Button
          label="C"
          value="C"
          type="function"
          onClick={(e) => handleButtonClick(e)}
        />
        <Button
          label="⌫"
          value="⌫"
          type="function"
          onClick={(e) => handleButtonClick(e)}
        />
        <Button
          label="÷"
          value="÷"
          type="operator"
          onClick={(e) => handleButtonClick(e)}
        />

        {/* 2行目: 7, 8, 9, × */}
        <Button
          label="7"
          value="7"
          type="number"
          onClick={(e) => handleButtonClick(e)}
        />
        <Button
          label="8"
          value="8"
          type="number"
          onClick={(e) => handleButtonClick(e)}
        />
        <Button
          label="9"
          value="9"
          type="number"
          onClick={(e) => handleButtonClick(e)}
        />
        <Button
          label="×"
          value="×"
          type="operator"
          onClick={(e) => handleButtonClick(e)}
        />

        {/* 3行目: 4, 5, 6, - */}
        <Button
          label="4"
          value="4"
          type="number"
          onClick={(e) => handleButtonClick(e)}
        />
        <Button
          label="5"
          value="5"
          type="number"
          onClick={(e) => handleButtonClick(e)}
        />
        <Button
          label="6"
          value="6"
          type="number"
          onClick={(e) => handleButtonClick(e)}
        />
        <Button
          label="-"
          value="-"
          type="operator"
          onClick={(e) => handleButtonClick(e)}
        />

        {/* 4行目: 1, 2, 3, + */}
        <Button
          label="1"
          value="1"
          type="number"
          onClick={(e) => handleButtonClick(e)}
        />
        <Button
          label="2"
          value="2"
          type="number"
          onClick={(e) => handleButtonClick(e)}
        />
        <Button
          label="3"
          value="3"
          type="number"
          onClick={(e) => handleButtonClick(e)}
        />
        <Button
          label="+"
          value="+"
          type="operator"
          onClick={(e) => handleButtonClick(e)}
        />

        {/* 5行目: ±, 0, ., = */}
        <Button
          label="±"
          value="±"
          type="function"
          onClick={(e) => handleButtonClick(e)}
        />
        <Button
          label="0"
          value="0"
          type="number"
          onClick={(e) => handleButtonClick(e)}
        />
        <Button
          label="."
          value="."
          type="number"
          onClick={(e) => handleButtonClick(e)}
        />
        <Button
          label="="
          value="="
          type="equals"
          onClick={(e) => handleButtonClick(e)}
          className="row-span-2"
        />

        {/* 6行目: % */}
        <Button
          label="%"
          value="%"
          type="function"
          onClick={(e) => handleButtonClick(e)}
          className="col-span-3"
        />
      </div>
    </div>
  );
}

export default Calculator;
