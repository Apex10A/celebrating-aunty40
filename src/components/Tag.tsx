type TagProps = {
  type: "green" | "red" | "yellow";
  children: React.ReactNode;
};

export default function Tag({ type, children }: TagProps) {
  const colorMap = {
    green: "text-green-700 bg-green-100",
    red: "text-red-700 bg-red-100",
    yellow: "text-yellow-700 bg-yellow-100",
  };

  return (
    <span
      className={`w-fit uppercase text-xs font-semibold px-3 py-1 rounded-full ${colorMap[type]}`}>
      {children}
    </span>
  );
}
