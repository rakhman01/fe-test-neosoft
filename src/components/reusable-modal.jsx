import Button from "./reusable-button";

export default function Modal({ isOpen, onClose, title, children, size = "md" }) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className={`bg-white rounded-xl shadow-lg w-full ${sizeClasses[size]} p-6 relative max-h-[90vh] overflow-y-auto`}>
        <div className="flex justify-between items-start">
          {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
          <Button onClick={onClose} color="none" size="xs" title="x"></Button>
        </div>
        {children}
      </div>
    </div>
  );
}
