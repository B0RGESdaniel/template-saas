import { handleAuth } from "@/app/actions/handle-auth";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <form
      className="flex items-center justify-center flex-col gap-4 h-screen"
      action={handleAuth}
    >
      <h1 className="text-4xl font-bold">Login</h1>
      <button className="border rounded-md px-2 cursor-pointer" type="submit">
        Signin with Google
      </button>
    </form>
  );
}
