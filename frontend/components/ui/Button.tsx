export default function Button({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button
      className="
      w-full
      rounded-xl
      bg-violet-600
      py-3
      font-semibold
      text-white
      transition
      hover:bg-violet-500
    "
    >
      {children}
    </button>
  );
}