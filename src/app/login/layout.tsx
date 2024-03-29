import Link from "next/link";
import { AuthContextProvider } from "@/components/auth/authContext";

export default function SignUpPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 m-4 bg-white rounded shadow-md dark:bg-gray-800">
        <h1 className="mb-4 text-2xl text-center font-bold text-gray-900 dark:text-gray-100">
          Login
        </h1>
        <AuthContextProvider>{children}</AuthContextProvider>
        <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
          Don&apos; t have an account?
          <a
            className="underline text-blue-500 hover:text-blue-700"
            href="/signup"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
