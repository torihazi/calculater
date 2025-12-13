interface DisplayProps {
  value: string;
}

function Display({ value }: DisplayProps) {
  return (
    <div className="w-full bg-gray-800 text-white text-right p-6 rounded-t-lg relative">
      <div className="text-5xl font-light overflow-x-auto">{value || "0"}</div>
    </div>
  );
}

export default Display;
