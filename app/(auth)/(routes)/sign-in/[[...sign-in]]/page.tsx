import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <SignIn signUpUrl="/sign-up" />
    </div>
  );
}
