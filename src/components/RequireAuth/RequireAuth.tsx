import type { RootState } from "@/store";
import { isEmpty } from "@/utils/checkUserObjectisEmpty";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type RequireAuthProps = {
  children: React.ReactNode;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  console.log(userInfo);

  if (isEmpty(userInfo)) {
    console.log("is empty");
    return <Navigate to="/login" replace={true}></Navigate>;
  }

  return <>{children};</>;
}
