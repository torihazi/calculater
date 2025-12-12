import Display from "./Display";
import Button from "./Button";
import { useState } from "react";

function Calculator() {
  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
      <Display value="0" />

      <div className="p-4 grid grid-cols-4 gap-3">
        {/* 1行目: AC, C, ⌫, ÷ */}
        <Button label="AC" value="AC" type="function" onClick={() => {}} />
        <Button label="C" value="C" type="function" onClick={() => {}} />
        <Button label="⌫" value="⌫" type="function" onClick={() => {}} />
        <Button label="÷" value="÷" type="operator" onClick={() => {}} />

        {/* 2行目: 7, 8, 9, × */}
        <Button label="7" value="7" type="number" onClick={() => {}} />
        <Button label="8" value="8" type="number" onClick={() => {}} />
        <Button label="9" value="9" type="number" onClick={() => {}} />
        <Button label="×" value="×" type="operator" onClick={() => {}} />

        {/* 3行目: 4, 5, 6, - */}
        <Button label="4" value="4" type="number" onClick={() => {}} />
        <Button label="5" value="5" type="number" onClick={() => {}} />
        <Button label="6" value="6" type="number" onClick={() => {}} />
        <Button label="-" value="-" type="operator" onClick={() => {}} />

        {/* 4行目: 1, 2, 3, + */}
        <Button label="1" value="1" type="number" onClick={() => {}} />
        <Button label="2" value="2" type="number" onClick={() => {}} />
        <Button label="3" value="3" type="number" onClick={() => {}} />
        <Button label="+" value="+" type="operator" onClick={() => {}} />

        {/* 5行目: ±, 0, ., = */}
        <Button label="±" value="±" type="function" onClick={() => {}} />
        <Button label="0" value="0" type="number" onClick={() => {}} />
        <Button label="." value="." type="number" onClick={() => {}} />
        <Button
          label="="
          value="="
          type="equals"
          onClick={() => {}}
          className="row-span-2"
        />

        {/* 6行目: % */}
        <Button
          label="%"
          value="%"
          type="function"
          onClick={() => {}}
          className="col-span-3"
        />
      </div>
    </div>
  );
}

export default Calculator;
