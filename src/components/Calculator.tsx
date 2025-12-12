import Display from "./Display";
import Button from "./Button";

function Calculator() {
  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
      <Display value="0" />

      <div className="p-4 grid grid-cols-4 gap-3">
        {/* 1行目: AC, C, ⌫, ÷ */}
        <Button label="AC" type="function" onClick={() => {}} />
        <Button label="C" type="function" onClick={() => {}} />
        <Button label="⌫" type="function" onClick={() => {}} />
        <Button label="÷" type="operator" onClick={() => {}} />

        {/* 2行目: 7, 8, 9, × */}
        <Button label="7" type="number" onClick={() => {}} />
        <Button label="8" type="number" onClick={() => {}} />
        <Button label="9" type="number" onClick={() => {}} />
        <Button label="×" type="operator" onClick={() => {}} />

        {/* 3行目: 4, 5, 6, - */}
        <Button label="4" type="number" onClick={() => {}} />
        <Button label="5" type="number" onClick={() => {}} />
        <Button label="6" type="number" onClick={() => {}} />
        <Button label="-" type="operator" onClick={() => {}} />

        {/* 4行目: 1, 2, 3, + */}
        <Button label="1" type="number" onClick={() => {}} />
        <Button label="2" type="number" onClick={() => {}} />
        <Button label="3" type="number" onClick={() => {}} />
        <Button label="+" type="operator" onClick={() => {}} />

        {/* 5行目: ±, 0, ., = */}
        <Button label="±" type="function" onClick={() => {}} />
        <Button label="0" type="number" onClick={() => {}} />
        <Button label="." type="number" onClick={() => {}} />
        <Button
          label="="
          type="equals"
          onClick={() => {}}
          className="row-span-2"
        />

        {/* 6行目: % */}
        <Button
          label="%"
          type="function"
          onClick={() => {}}
          className="col-span-3"
        />
      </div>
    </div>
  );
}

export default Calculator;
