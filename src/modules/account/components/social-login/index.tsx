"use client"

import { sdk } from "@lib/config"
import { useTranslations } from "next-intl"
import { useState } from "react"

const PROVIDERS = [
  {
    id: "google",
    label: "continueWithGoogle",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    ),
  },
  {
    id: "tiktok",
    label: "continueWithTikTok",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <path
          d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.11V9.02a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.4a8.16 8.16 0 004.76 1.52V7.48a4.84 4.84 0 01-1-.79z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "continueWithInstagram",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <defs>
          <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#feda75" />
            <stop offset="25%" stopColor="#fa7e1e" />
            <stop offset="50%" stopColor="#d62976" />
            <stop offset="75%" stopColor="#962fbf" />
            <stop offset="100%" stopColor="#4f5bd5" />
          </linearGradient>
        </defs>
        <path
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
          fill="url(#ig-grad)"
        />
      </svg>
    ),
  },
] as const

const SocialLogin = () => {
  const t = useTranslations("account")
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSocialLogin = async (provider: string) => {
    setLoading(provider)
    setError(null)

    try {
      // sdk.auth.login returns { location: string } for OAuth providers
      const result = await sdk.auth.login("customer", provider, {})

      if (typeof result === "object" && "location" in result) {
        // OAuth redirect — navigate to provider's auth page
        window.location.href = result.location
      } else {
        // Unexpected response (token string = not an OAuth provider)
        setError(t("socialLoginError", { provider }))
        setLoading(null)
      }
    } catch (err: any) {
      setError(t("socialLoginError", { provider }))
      setLoading(null)
    }
  }

  return (
    <div className="w-full mt-6">
      <div className="relative flex items-center my-6">
        <div className="flex-grow border-t border-ui-border-base" />
        <span className="flex-shrink mx-4 text-ui-fg-muted text-small-regular">
          {t("orContinueWith")}
        </span>
        <div className="flex-grow border-t border-ui-border-base" />
      </div>

      {error && (
        <p className="text-rose-500 text-small-regular text-center mb-4">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-y-2">
        {PROVIDERS.map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => handleSocialLogin(id)}
            disabled={loading !== null}
            className="w-full flex items-center justify-center gap-x-2 border border-ui-border-base rounded-rounded py-2.5 px-4 text-small-regular text-ui-fg-base hover:bg-ui-bg-base-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === id ? (
              <span className="text-ui-fg-muted">
                {t("socialLoginProcessing")}
              </span>
            ) : (
              <>
                {icon}
                <span>{t(label)}</span>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SocialLogin
