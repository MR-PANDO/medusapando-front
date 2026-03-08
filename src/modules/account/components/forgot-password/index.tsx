"use client"

import { useState } from "react"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useTranslations } from "next-intl"
import { requestPasswordReset } from "@lib/data/customer"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const ForgotPassword = ({ setCurrentView }: Props) => {
  const t = useTranslations("account")
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (_currentState: unknown, formData: FormData) => {
    const result = await requestPasswordReset(formData)

    if (result?.success) {
      setSuccessMessage(t("resetLinkSent"))
      return null
    }

    return result?.error || null
  }

  const [message, formAction] = useActionState(handleSubmit, null)

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="forgot-password-page"
    >
      <h1 className="text-large-semi uppercase mb-6">
        {t("forgotPasswordTitle")}
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        {t("forgotPasswordDescription")}
      </p>

      {successMessage ? (
        <div className="w-full">
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
            <p className="text-green-800 text-small-regular text-center">
              {successMessage}
            </p>
          </div>
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="w-full mt-2 text-ui-fg-interactive text-small-regular hover:underline text-center"
          >
            {t("backToLogin")}
          </button>
        </div>
      ) : (
        <>
          <form className="w-full" action={formAction}>
            <div className="flex flex-col w-full gap-y-2">
              <Input
                label={t("email")}
                name="email"
                type="email"
                title="Enter a valid email address."
                autoComplete="email"
                required
                data-testid="forgot-password-email-input"
              />
            </div>
            {message && (
              <div className="text-rose-500 text-small-regular mt-2">
                {message}
              </div>
            )}
            <SubmitButton
              data-testid="forgot-password-submit"
              className="w-full mt-6"
            >
              {t("sendResetLink")}
            </SubmitButton>
          </form>
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="text-ui-fg-interactive text-small-regular mt-6 hover:underline"
            data-testid="back-to-login-button"
          >
            {t("backToLogin")}
          </button>
        </>
      )}
    </div>
  )
}

export default ForgotPassword
