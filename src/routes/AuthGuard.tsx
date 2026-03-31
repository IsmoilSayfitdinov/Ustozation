import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useMe } from "@/hooks/useAuth";

interface AuthGuardProps {
  allowedRoles?: ("student" | "teacher" | "admin")[];
}

const AuthGuard = ({ allowedRoles }: AuthGuardProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const { isLoading } = useMe();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
