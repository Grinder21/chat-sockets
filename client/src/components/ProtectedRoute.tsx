import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { session } from "../utils/session";

const allowedUsers = ["Вася", "Петя"];

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const user = session.getUser();

  if (!user || !allowedUsers.includes(user)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
