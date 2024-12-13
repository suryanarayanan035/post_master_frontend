'use client';

import Signup from "./SignupForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-7 bg-[#e9d5ff]">
      <p className="font-semibold text-[#7e22ce]">
        Begin your journey with Post Master!
      </p>
      <Signup />
    </div>
  );
}
