import Display from "./Display";
import Button from "./Button";
import { useState } from "react";
import { binaryOperate, categorizeInputType } from "../lib/utils";

function Calculator() {
  // 数字
  const [number, setNumber] = useState<string>("0");
  // 前の数字
  const [prevNumber, setPrevNumber] = useState<string | null>(null);
  // 演算子
  const [operator, setOperator] = useState<string | null>(null);
  // 入力待ちフラグ
  const [inputPending, setInputPending] = useState<boolean>(false);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const input = e.currentTarget.value;
    const category = categorizeInputType(input);

    switch (category) {
      case "number":
        setNumber((prev) => {
          if (inputPending) {
            setInputPending(false);
            return input;
          } else if (prev === "0") {
            return input;
          } else {
            return prev + input;
          }
        });
        break;
      case "operator":
        if (input === "=") {
          if (operator && prevNumber) {
            const result = binaryOperate(
              Number(prevNumber),
              Number(number),
              operator
            );
            setNumber(String(result));
            setPrevNumber(String(result));
            setInputPending(true);
            setOperator(null);
          }
        } else {
          // 連続計算の時
          if (operator && prevNumber) {
            const result = binaryOperate(
              Number(prevNumber),
              Number(number),
              operator
            );
            setNumber(String(result));
            setPrevNumber(String(result));
          } else {
            // 初めて演算子を押した時
            setPrevNumber(number);
          }
          setOperator(input);
          setInputPending(true);
        }
        break;
      case "function":
        // Functionの場合
        if (input === "AC") {
          setNumber("0");
          setPrevNumber(null);
          setOperator(null);
          setInputPending(false);
        } else if (input === "C") {
          setNumber("0");
          setInputPending(false);
        } else if (input === "⌫") {
          if (number.length === 1) {
            setNumber("0");
          } else {
            setNumber(number.slice(0, -1));
          }
        }
        break;
      default:
      // ここには到達しない。その前にthrowされている
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
          label="x"
          value="x"
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
