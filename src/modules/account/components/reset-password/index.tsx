"use client"

import { useEffect, useState } from "react"
import { resetPassword } from "@lib/data/customer"
import Input from "@modules/common/components/input"
import { useTranslations } from "next-intl"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const ResetPasswordForm = () => {
  const t = useTranslations("account")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setToken(params.get("token"))
    setEmail(params.get("email"))
    setReady(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!token || !email) {
      setError(t("invalidResetLink"))
      return
    }

    const formData = new FormData(e.currentTarget)
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm_password") as string

    if (password !== confirmPassword) {
      setError(t("confirmPassword"))
      return
    }

    setLoading(true)

    const result = await resetPassword(token, email, password)

    if (result.success) {
      setSuccess(true)
    } else {
      setError(t("passwordResetError"))
    }

    setLoading(false)
  }

  if (!ready) {
    return (
      <div className="max-w-sm w-full flex flex-col items-center">
        <div className="animate-pulse h-8 w-48 bg-gray-200 rounded mb-6" />
        <div className="animate-pulse h-4 w-64 bg-gray-200 rounded mb-8" />
      </div>
    )
  }

  if (!token || !email) {
    return (
      <div
        className="max-w-sm w-full flex flex-col items-center"
        data-testid="reset-password-invalid"
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-50 mb-4">
            <span className="text-2xl">&#9888;</span>
          </div>
        </div>
        <h1 className="text-large-semi uppercase mb-6">
          {t("resetPasswordTitle")}
        </h1>
        <p className="text-center text-base-regular text-ui-fg-muted mb-8">
          {t("invalidResetLink")}
        </p>
        <LocalizedClientLink
          href="/account"
          className="text-ui-fg-interactive text-small-regular hover:underline"
        >
          {t("goToLogin")}
        </LocalizedClientLink>
      </div>
    )
  }

  if (success) {
    return (
      <div
        className="max-w-sm w-full flex flex-col items-center"
        data-testid="reset-password-success"
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-4">
            <span className="text-2xl text-green-600">&#10003;</span>
          </div>
        </div>
        <h1 className="text-large-semi uppercase mb-6">
          {t("resetPasswordTitle")}
        </h1>
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6 w-full">
          <p className="text-green-800 text-small-regular text-center">
            {t("passwordResetSuccess")}
          </p>
        </div>
        <LocalizedClientLink
          href="/account"
          className="text-ui-fg-interactive text-small-regular hover:underline"
        >
          {t("goToLogin")}
        </LocalizedClientLink>
      </div>
    )
  }

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="reset-password-page"
    >
      <h1 className="text-large-semi uppercase mb-6">
        {t("resetPasswordTitle")}
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        {t("resetPasswordDescription")}
      </p>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label={t("newPassword")}
            name="password"
            type="password"
            autoComplete="new-password"
            required
            data-testid="reset-password-input"
          />
          <Input
            label={t("confirmPassword")}
            name="confirm_password"
            type="password"
            autoComplete="new-password"
            required
            data-testid="reset-confirm-password-input"
          />
        </div>
        {error && (
          <div className="text-rose-500 text-small-regular mt-2">{error}</div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 h-10 rounded-rounded border border-transparent bg-ui-bg-interactive text-ui-fg-on-color text-sm font-medium shadow-buttons-neutral hover:bg-ui-bg-interactive-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          data-testid="reset-password-submit"
        >
          {loading ? "..." : t("resetPassword")}
        </button>
      </form>
      <LocalizedClientLink
        href="/account"
        className="text-ui-fg-interactive text-small-regular mt-6 hover:underline"
        data-testid="back-to-login-link"
      >
        {t("backToLogin")}
      </LocalizedClientLink>
    </div>
  )
}

export default ResetPasswordForm
