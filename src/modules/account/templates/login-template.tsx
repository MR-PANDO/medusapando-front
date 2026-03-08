"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"
import ForgotPassword from "@modules/account/components/forgot-password"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
  FORGOT_PASSWORD = "forgot-password",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")
  const searchParams = useSearchParams()
  const authError = searchParams.get("auth_error")
  const t = useTranslations("account")

  return (
    <div className="w-full flex justify-start px-8 py-8">
      {authError && (
        <p className="text-rose-500 text-small-regular text-center mb-4 w-full">
          {t("socialLoginError", { provider: authError })}
        </p>
      )}
      {currentView === "sign-in" ? (
        <Login setCurrentView={setCurrentView} />
      ) : currentView === "forgot-password" ? (
        <ForgotPassword setCurrentView={setCurrentView} />
      ) : (
        <Register setCurrentView={setCurrentView} />
      )}
    </div>
  )
}

export default LoginTemplate
