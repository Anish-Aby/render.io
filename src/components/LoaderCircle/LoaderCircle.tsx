import { TbLoader2 } from "react-icons/tb";

type LoaderCircleProps = {
  isSubmitting: boolean;
};

export default function LoaderCircle({ isSubmitting }: LoaderCircleProps) {
  return (
    <>
      <TbLoader2
        className={`animate-spin mr-4 ${isSubmitting ? "block" : "hidden"}`}
      />
    </>
  );
}
