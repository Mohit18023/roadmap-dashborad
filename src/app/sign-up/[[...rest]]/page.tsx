// app/sign-up/page.tsx
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600 to-pink-600" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/">Timeleft</Link>
        </div>
        <div className="relative z-20 mt-50">
          <blockquote className="space-y-2">
            <p className="text-lg-centre mt-0 " >
              {"The community-driven approach to creating roadmaps has helped me discover the most relevant and up-to-date learning paths."}
            </p>
            <footer className="text-sm">Alex Thompson</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          
          <SignUp redirectUrl="/profile" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

