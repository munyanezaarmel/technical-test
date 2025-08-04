# Product Manager

A fullstack Next.js application for managing personal product lists with email-only authentication.

## Features

- 🔐 **Passwordless Authentication**: Email magic link login using NextAuth.js
- 📝 **CRUD Operations**: Add, edit, delete, and view products
- 🎯 **Inline Editing**: Edit products directly in the list
- 🔄 **Drag & Drop Reordering**: Reorder items with drag and drop
- 👤 **User Isolation**: Each user sees only their own products
- 📱 **Responsive Design**: Works on desktop and mobile

## Tech Stack

- **Framework**: Next.js 14 with page Router
- **Authentication**: NextAuth.js with Resend email provider
- **Database**: Prisma with SQLite (easily switchable to PostgreSQL)
- **Email**: Resend for reliable email delivery
- **Styling**: Tailwind CSS
- **Drag & Drop**: @dnd-kit
- **Data Fetching**: SWR
- **Icons**: Lucide React

## Project Structure

\`\`\`
pages/                   → Entry points
├── login.tsx           → Login page
├── index.tsx           → Home page
└── api/                → API routes

src/
├── screen/             → Screen components (no styles)
│   ├── auth/
│   │   └── login.page.tsx
│   └── home.page.tsx
├── layout/             → Styled UI components
│   ├── input.layout.tsx
│   ├── button.layout.tsx
│   └── card.layout.tsx
├── components/         → Feature components
├── config/             → Configuration
├── service/            → Frontend services
├── backend/            → Backend services
└── api/                → API logic
\`\`\`

## Getting Started

1. **Clone and install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Set up Resend account**:
   - Go to [resend.com](https://resend.com) and create a free account
   - Get your API key from the dashboard
   - You get 100 free emails per day, 3,000 per month

3. **Set up environment variables**:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Update your `.env.local`:
   \`\`\`env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-key-here"
   RESEND_API_KEY="re_your_actual_resend_api_key"
   EMAIL_FROM="onboarding@resend.dev"
   \`\`\`

4. **Set up the database**:
   \`\`\`bash
   npm run db:push
   \`\`\`

5. **Start the development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)


```

## 📧 Email Configuration (IMPORTANT)

This project uses **Nodemailer** for email delivery.

For **development**, you can use a test SMTP provider like [Ethereal Email](https://ethereal.email/) (good for previewing emails).

For **production** (e.g. on Vercel), you must configure a real email provider like **Gmail**, **Mailgun**, etc.

Create a `.env.local` file:

```bash
# .env.local
EMAIL_SERVER_HOST=smtp.ethereal.email
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_ethereal_user
EMAIL_SERVER_PASSWORD=your_ethereal_password
EMAIL_FROM=your_ethereal_email
```

> ⚠️ **Disclaimer:** If you're using a free provider like Gmail, email delivery can take **5–10 seconds**. Gmail is recommended for Vercel deployment. Please be patient with any delays — this is due to service limitations.

## 🚀 Deployment

Push your forked repository to GitHub and [deploy it on Vercel](https://vercel.com/new).

## 🧪 Tech Stack

- Next.js (App Router)
- Server Actions
- Tailwind CSS
- Nodemailer
- TypeScript



## Database

The app uses SQLite by default for easy development. To switch to PostgreSQL:

1. Update `DATABASE_URL` in your `.env.local`
2. Change the provider in `prisma/schema.prisma` to `postgresql`
3. Run `npm run db:push`

## Deployment



## Environment Variables for Production

\`\`\`env
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="super-secure-random-string-for-production"
RESEND_API_KEY="re_your_resend_api_key"
EMAIL_FROM="noreply@yourdomain.com"
\`\`\`



## License

MIT License - see LICENSE file for details.
