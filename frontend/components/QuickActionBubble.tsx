export default function QuickActionBubble({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="shrink-0 whitespace-nowrap rounded-full border border-brass/60 bg-parchment-light/90
                 px-4 py-1.5 text-sm font-body text-maroon-deep hover:bg-brass-light hover:text-walnut
                 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );
}
