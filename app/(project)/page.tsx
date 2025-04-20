import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col gap-4 h-screen">
      <h1 className="text-4xl font-bold">Landing Page</h1>
      <Link href="/login">
        <button className="border rounded-md px-2 cursor-pointer">Login</button>
      </Link>
    </div>
  );
}
