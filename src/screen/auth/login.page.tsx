"use client"

import type React from "react"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { Input } from "../../layout/input.layout"
import { Button } from "../../layout/button.layout"
import { Card, CardHeader, CardContent } from "../../layout/card.layout"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setMessageType("")

    try {
      console.log("Attempting to send magic link to:", email)

      const result = await signIn("email", {
        email,
        redirect: false,
        callbackUrl: "/",
      })

      console.log("SignIn result:", result)

      if (result?.error) {
        console.error("SignIn error:", result.error)
        setMessage(`Failed to send magic link: ${result.error}`)
        setMessageType("error")
      } else {
        setMessage(`Magic link sent to ${email}! Check your inbox and spam folder.`)
        setMessageType("success")
      }
    } catch (error) {
      console.error("SignIn exception:", error)
      setMessage("An unexpected error occurred. Please try again.")
      setMessageType("error")
    } finally {
      setLoading(false)
    }
  }

  if (router.query.message === "check-email") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Card>
            <CardHeader>
              <h2 className="text-center text-3xl font-extrabold text-gray-900">Check your email</h2>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-6xl">📧</div>
                <p className="text-gray-600">A sign in link has been sent to your email address.</p>
                <p className="text-sm text-gray-500">Don't see the email? Check your spam folder or try again.</p>
                <Button variant="secondary" onClick={() => router.push("/login")} className="mt-4">
                  Back to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader>
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Product Manager</h2>
              <p className="mt-2 text-sm text-gray-600">Sign in with your email address</p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
                className="text-center"
              />

              {message && (
                <div
                  className={`p-4 rounded-md ${
                    messageType === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  <div className="flex">
                    <div className="text-sm">
                      {messageType === "success" ? "✅ " : "❌ "}
                      {message}
                    </div>
                  </div>
                </div>
              )}

              <Button type="submit" loading={loading} className="w-full" disabled={!email.trim()}>
                {loading ? "Sending Magic Link..." : "Send Magic Link"}
              </Button>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  We'll send you a secure link to sign in.
                  <br />
                  No password required! 🔐
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
