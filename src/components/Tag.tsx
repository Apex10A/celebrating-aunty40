type TagProps = {
  type: "green" | "red" | "yellow";
  children: React.ReactNode;
};

export default function Tag({ type, children }: TagProps) {
  const colorMap = {
    green: "text-emerald-300 bg-emerald-900/30 border border-emerald-700/40",
    red: "text-rose-300 bg-rose-900/30 border border-rose-700/40",
    yellow: "text-yellow-200 bg-yellow-900/20 border border-yellow-700/40",
  };

  return (
    <span
      className={`w-fit uppercase text-xs font-semibold px-3 py-1 rounded-full ${colorMap[type]}`}>
      {children}
    </span>
  );
}
