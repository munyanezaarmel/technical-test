import NextAuth, { type NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "../../../src/config/database"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: "smtp.resend.com",
        port: 587,
        auth: {
          user: "resend",
          pass: process.env.RESEND_API_KEY,
        },
      },
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      async sendVerificationRequest({ identifier: email, url, provider }) {
        try {
          console.log("Sending email to:", email)
          console.log("Magic link URL:", url)

          const result = await resend.emails.send({
            from: provider.from,
            to: email,
            subject: "Sign in to Product Manager",
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Sign in to Product Manager</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">Product Manager</h1>
                  </div>
                  
                  <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
                    <h2 style="color: #333; margin-top: 0;">Sign in to your account</h2>
                    <p style="font-size: 16px; margin-bottom: 30px;">Click the button below to securely sign in to your Product Manager account:</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="${url}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
                        ✨ Sign In Securely
                      </a>
                    </div>
                    
                    <div style="background: #fff; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
                      <p style="margin: 0; font-size: 14px; color: #666;">
                        <strong>Can't click the button?</strong><br>
                        Copy and paste this link into your browser:<br>
                        <a href="${url}" style="color: #667eea; word-break: break-all;">${url}</a>
                      </p>
                    </div>
                    
                    <div style="border-top: 1px solid #e9ecef; padding-top: 20px; margin-top: 30px;">
                      <p style="font-size: 12px; color: #6c757d; margin: 0;">
                        🔒 This link will expire in 24 hours for your security.<br>
                        📧 If you didn't request this email, you can safely ignore it.<br>
                        💡 This email was sent from Product Manager.
                      </p>
                    </div>
                  </div>
                </body>
              </html>
            `,
            text: `
Sign in to Product Manager

Click this link to sign in: ${url}

This link will expire in 24 hours. If you didn't request this email, you can safely ignore it.
            `,
          })

          console.log("Email sent successfully:", result)
        } catch (error) {
          console.error("Failed to send email:", error)
          if (error instanceof Error) {
            throw new Error(`Failed to send verification email: ${error.message}`)
          } else {
            throw new Error("Failed to send verification email: Unknown error")
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/login?message=check-email",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token?.sub) {
        session.user.id = token.sub
      }
      return session
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
}

export default NextAuth(authOptions)
