import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, FileText, PlusCircle, Layers } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/admin/sign-in");
  }

  // Check private metadata for Admin role
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const role = (user.privateMetadata as { role?: string })?.role;

  if (role !== "Admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#0a0720]">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f0a2e]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="text-lg font-bold text-white flex items-center gap-2"
            >
              <LayoutDashboard className="w-5 h-5 text-[#cfa375]" />
              <span>
                Admin <span className="text-[#cfa375]">Dashboard</span>
              </span>
            </Link>

            <nav className="hidden sm:flex items-center gap-1 ml-8">
              <Link
                href="/admin"
                className="px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Posts
              </Link>
              <Link
                href="/admin/blog/new"
                className="px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                New Post
              </Link>
              <div className="w-px h-5 bg-white/10 mx-2" />
              <Link
                href="/admin/services"
                className="px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                Services
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              ← Back to Site
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
