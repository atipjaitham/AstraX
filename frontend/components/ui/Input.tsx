type Props =
  React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: Props) {
  return (
    <input
      {...props}
      className="
      w-full
      rounded-xl
      border
      border-slate-700
      bg-slate-900
      p-3
      text-white
      outline-none
      focus:border-violet-500
    "
    />
  );
}