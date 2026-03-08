import { Metadata } from "next"
import ResetPasswordForm from "@modules/account/components/reset-password"

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Set a new password for your account.",
}

export default function ResetPasswordPage() {
  return (
    <div className="flex-1 small:py-12">
      <div className="content-container max-w-5xl mx-auto bg-white flex justify-center px-8 py-12">
        <ResetPasswordForm />
      </div>
    </div>
  )
}
