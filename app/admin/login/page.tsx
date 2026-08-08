import Image from "next/image";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md glass p-10 rounded-[2rem] shadow-2xl">
        <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-frost ring-1 ring-neon/50 shadow-[0_0_14px_rgba(127,233,255,0.35)]">
          <Image
            src="/logo.png"
            alt="Teenie logo"
            width={40}
            height={40}
            priority
            className="h-10 w-10 object-contain"
          />
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
          Admin <span className="text-gradient">Login</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
          Sign in to manage projects, skills, and messages.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
