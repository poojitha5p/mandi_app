import Sidebar from "@/components/Sidebar";
import AuthGuard from "@/components/AuthGuard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-bone">
        <Sidebar />
        <main className="flex-1 px-10 py-8">{children}</main>
      </div>
    </AuthGuard>
  );
}
