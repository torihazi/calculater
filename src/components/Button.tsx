interface ButtonProps {
  label: string;
  value: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "number" | "operator" | "function" | "equals";
}

function Button({
  label,
  value,
  onClick,
  className = "",
  type = "number",
}: ButtonProps) {
  const baseStyles =
    "text-2xl font-medium rounded-lg transition-all active:scale-95";

  const typeStyles = {
    number: "bg-gray-700 hover:bg-gray-600 text-white",
    operator: "bg-orange-500 hover:bg-orange-600 text-white",
    function: "bg-gray-600 hover:bg-gray-500 text-white",
    equals: "bg-orange-500 hover:bg-orange-600 text-white",
  };

  return (
    <button
      value={value}
      onClick={onClick}
      className={`${baseStyles} ${typeStyles[type]} ${className}`}
    >
      {label}
    </button>
  );
}

export default Button;
