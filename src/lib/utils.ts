import { OPERATOR, NUMBER, FUNCTION } from "../constant";

/**
 * 二項演算用
 * @param number
 * @param number
 * @param string operator
 * @returns number
 */
export const binaryOperate = (
  left: number,
  right: number,
  operator: string
): number => {
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "x":
      return left * right;
    case "÷":
      if (right === 0) throw new Error("Cannot divide by zero");
      return left / right;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
};

/**
 * 単項演算
 * @param number 数字
 * @param operator 演算子
 * @returns number
 */
export const unaryOperate = (value: number, operator: string): number => {
  switch (operator) {
    case "%":
      return value / 100;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
};

/**
 * 電卓から入力された文字列に応じて、演算子 or 数字 or Functionかを返す
 * @param input 入力された文字列
 * @return string 固定の文字列を返す
 */
export const categorizeInputType = (input: string): string => {
  if (OPERATOR.includes(input)) {
    return "operator";
  } else if (NUMBER.includes(input)) {
    return "number";
  } else if (FUNCTION.includes(input)) {
    return "function";
  } else {
    throw new Error(`Unsupported input: ${input}`);
  }
};
