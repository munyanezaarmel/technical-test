# 🛍️ Product Manager App

A fullstack Next.js app for managing personal product lists with email-only authentication (magic link).

**⚠️ Note: Email delivery may take 5-10 minutes during testing**

## 📸 Screenshots

<div align="center">
<img width="752" height="643" alt="image" src="https://github.com/user-attachments/assets/9b4ad590-3c7a-4282-b164-39b0647d7769" />
<img width="1177" height="742" alt="image" src="https://github.com/user-attachments/assets/7903fbc0-b209-4d8d-99b3-22671b44646e" />
<img width="1545" height="909" alt="image" src="https://github.com/user-attachments/assets/4cb0d02a-5556-4c5c-a615-40b6eea28ec7" />
</div>

## 🚀 Features

- Email-only authentication (NextAuth magic link)
- Add, edit, delete, and reorder products  
- Inline editing with real-time updates
- Users see only their own products
- Custom email templates with professional design

## 🧑‍💻 Tech Stack

- Next.js (Pages Router)
- NextAuth.js (Email Provider + Gmail SMTP)
- Tailwind CSS + shadcn/ui components
- Prisma ORM + PostgreSQL
- TypeScript
- Nodemailer (Gmail integration)

## ⚙️ Local Setup

```bash
git clone https://github.com/munyanezaarmel/technical-test.git
cd technical-test
npm install

# Setup environment variables
cp .env.example .env.local
# Add your Gmail credentials and database URL

# Setup database
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

### Environment Variables

```env
# Database
DATABASE_URL="your-database-url"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Gmail SMTP
GMAIL_USER="your-email@gmail.com"
GMAIL_APP_PASSWORD="your-gmail-app-password"
```

## 📧 Email Configuration

- Uses Gmail SMTP for sending magic links
- Requires Gmail App Password (2FA must be enabled)
- Custom HTML email templates with branding
- Fallback text emails for accessibility

## 🎯 Implementation Highlights

- **Custom NextAuth email provider** with Gmail SMTP
- **Prisma database adapter** for user sessions
- **Professional email templates** with gradients and styling
- **JWT session management** for secure authentication
- **Error handling and logging** for debugging

## 🚀 Deployment

The app is deployed on Vercel with production environment variables configured.

[![Vercel](https://vercel.com/button)](https://product-manager-gamma.vercel.app/)

**Live URL:** [https://product-manager-gamma.vercel.app/](https://product-manager-gamma.vercel.app/)

## 🐛 Known Issues

- Email delivery can be slow (5-10 minutes) during testing
- Gmail may require App Password setup for SMTP authentication

## 📝 Notes

This is a technical test implementation demonstrating:

- NextAuth.js integration with email providers
- Custom email template design
- Database operations with Prisma
- Modern React patterns and TypeScript
