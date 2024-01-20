export default function GradientAccent() {
  return (
    <div className="absolute -top-5 left-0 w-full h-1/2 -z-10 flex justify-center blur-2xl opacity-60 lg:h-svh ">
      <div className="w-52 h-52 bg-pinkAccent rounded-full translate-x-10 blur-2xl md:scale-[2.5] md:-translate-x-1/4 md:opacity-60 lg:scale-[3] lg:-translate-x-1/2 lg:opacity-60 xl:scale-[3.5] xl:-translate-x-1/2 xl:opacity-60"></div>
      <div className="w-52 h-52 bg-purpleAccent rounded-full blur-2xl -translate-x-10 md:scale-[2.5] md:translate-x-1/4 md:opacity-60 lg:scale-[3] lg:translate-x-1/2 lg:opacity-60 xl:scale-[3.5] xl:translate-x-1/2 xl:opacity-60"></div>
    </div>
  );
}
