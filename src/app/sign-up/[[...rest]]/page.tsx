// app/sign-up/page.tsx
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUp redirectUrl="/profile" />
    </div>
  );
};

export default SignUpPage;

