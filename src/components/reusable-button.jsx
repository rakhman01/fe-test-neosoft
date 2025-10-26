

const sizeClasses = {
  xs: "px-2 py-1 text-xs",
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-2.5 text-lg",
  xl: "px-6 py-3 text-xl",
};

const colorClasses = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  success: "bg-green-600 hover:bg-green-700 text-white",
  warning: "bg-yellow-500 hover:bg-yellow-600 text-black",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  none: "text-black hover:bg-grey-500 "
};

export default function Button({
  size = "md",
  color = "primary",
  fullWidth = false,
  disabled = false,
  onClick,
  className = "",
  title = "button"
}) {
  const baseStyles =
    "rounded-lg font-semibold transition-all duration-200 active:scale-95 focus:outline-none shadow-sm cursor-pointer";

  const sizeStyle = sizeClasses[size] || sizeClasses.md;
  const colorStyle = colorClasses[color] || colorClasses.primary;
  const widthStyle = fullWidth ? "w-full" : "w-auto";

  return (
    <button
    type="submit"
      className={`${baseStyles} ${sizeStyle} ${colorStyle} ${widthStyle} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
}
