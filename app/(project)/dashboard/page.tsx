import { handleAuth } from "@/app/actions/handle-auth";
import { auth } from "@/app/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex items-center justify-center flex-col gap-4 h-screen">
      <h1 className="text-4xl font-bold">Protected Dashboard</h1>
      <span>
        {session?.user?.email
          ? session?.user?.email
          : "Usuário não está logado"}
      </span>
      {session?.user?.email && (
        <form action={handleAuth}>
          <button
            className="border rounded-md px-2 cursor-pointer"
            type="submit"
          >
            Logout
          </button>
        </form>
      )}
      <Link href="/pagamentos">Pagamentos</Link>
    </div>
  );
}
