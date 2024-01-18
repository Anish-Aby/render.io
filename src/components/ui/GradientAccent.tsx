export default function GradientAccent() {
  return (
    // <img
    //   className="h-1/2 -z-10 absolute -top-20 left-0 w-full"
    //   src="https://framerusercontent.com/images/aDRrbalfiC1TgIiW5cd3ZdU5FBA.png?scale-down-to=2048"
    //   alt=""
    //   sizes="1500px"
    // ></img>
    // <div className="h-1/2 w-full -z-10 absolute top-0 left-0 bg-gradient-to-b from-greenAccent to-backgorund opacity-50"></div>
    <div className="absolute -top-5 left-0 w-full h-1/2 -z-10 flex blur-2xl opacity-60">
      <div className="w-52 h-52 bg-pinkAccent rounded-full translate-x-10 blur-2xl"></div>
      <div className="w-52 h-52 bg-purpleAccent rounded-full blur-2xl -translate-x-10"></div>
    </div>
  );
}
