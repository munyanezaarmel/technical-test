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

## Email Configuration with Resend

### Development Setup:
1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day)
2. Get your API key from the dashboard
3. Use `onboarding@resend.dev` as the from address (pre-verified)

### Production Setup:
1. Add your own domain in Resend dashboard
2. Verify DNS records
3. Update `EMAIL_FROM` to use your domain: `noreply@yourdomain.com`


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
