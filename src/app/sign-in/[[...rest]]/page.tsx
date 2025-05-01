import { SignIn } from "@clerk/nextjs";
import Link from "next/link";


export default function Page() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600 to-pink-600" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/">Timeleft</Link>
        </div>
        <div className="relative z-20 mt-50">
          <blockquote className="space-y-2">
            <p className="text-lg">
              {"This platform has completely transformed how I approach learning new technologies. The roadmaps are incredibly detailed and well-structured."}
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to sign in to your account
            </p>
          </div>
          <SignIn
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
          />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link href="/signup" className="hover:text-primary underline underline-offset-4">
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
