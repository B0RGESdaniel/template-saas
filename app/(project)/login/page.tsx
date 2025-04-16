import { handleAuth } from "@/app/actions/handle-auth";

export default function Login() {
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
