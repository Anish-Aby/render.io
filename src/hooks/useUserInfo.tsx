import { RootState } from "@/store";
import { useSelector } from "react-redux";

export function useUserInfo() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return userInfo;
}
