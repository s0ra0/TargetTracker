import { AuthScreen } from "@/features/auth/components/auth-screen";
import UserDashboard from '@/components/UserDashboard';
import { twMerge } from "tailwind-merge";
import { useUser } from "../../hooks/useUser";

export default function Home() {
  return (
      <div>
          <AuthScreen />
          <h1>Dashboard</h1>
          <UserDashboard /> {/* Клиентский компонент */}
      </div>
  );
}