export default function GradientAccent() {
  return (
    <div className="absolute -top-5 left-0 w-full h-1/2 -z-10 flex blur-2xl opacity-60">
      <div className="w-52 h-52 bg-pinkAccent rounded-full translate-x-10 blur-2xl"></div>
      <div className="w-52 h-52 bg-purpleAccent rounded-full blur-2xl -translate-x-10"></div>
    </div>
  );
}
