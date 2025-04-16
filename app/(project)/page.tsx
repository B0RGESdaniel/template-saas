import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <h1 className="">Landing Page</h1>
      <Link href="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}
