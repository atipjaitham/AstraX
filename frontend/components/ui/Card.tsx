export default function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
      rounded-2xl
      border border-slate-800
      bg-slate-900/80
      p-8
      shadow-2xl
      backdrop-blur
    "
    >
      {children}
    </div>
  );
}