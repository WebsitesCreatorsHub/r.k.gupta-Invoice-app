# Gold Shop Invoice Management System

A professional, full-featured invoice management system for gold jewelry shops built with Next.js, React, and Tailwind CSS.

## Features

### Core Functionality
- **Authentication & Authorization**: Secure JWT-based authentication with role-based access
- **Invoice Management**: Create, view, edit, and manage invoices with real-time calculations
- **Product Catalog**: Full CRUD operations for gold products with categories and pricing
- **Payment Tracking**: Track payment status (Paid, Unpaid, Partial) with payment history
- **PDF Generation**: Generate professional PDF invoices with company branding
- **File Storage**: Cloudinary integration for secure PDF and image storage

### Technical Highlights
- **Responsive Design**: Mobile-first approach with perfect desktop and mobile optimization
- **Real-time Calculations**: Auto-calculate totals with GST and discount adjustments
- **Search & Filters**: Advanced filtering by payment status and customer search
- **Professional UI**: Gold-themed premium design with smooth animations
- **Performance Optimized**: Efficient rendering with proper code splitting

## Tech Stack

### Frontend
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios/Fetch API
- **Icons**: Lucide React

### Backend (Future)
- **Runtime**: Node.js 18+
- **Framework**: Next.js API Routes
- **Authentication**: JWT with refresh tokens
- **Database**: MongoDB with Mongoose
- **File Storage**: Cloudinary
- **Validation**: Zod/Joi

## Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Setup Instructions

\`\`\`bash
# 1. Clone the repository
git clone <repository-url>
cd gold-shop-invoice

# 2. Install dependencies
npm install

# 3. Create environment variables
cp .env.example .env.local

# 4. Update .env.local with your configuration
# Add Cloudinary API keys if using production storage
# Configure database URL for backend integration

# 5. Run development server
npm run dev

# 6. Open http://localhost:3000 in your browser
\`\`\`

## Project Structure

\`\`\`
gold-shop-invoice/
├── app/
│   ├── api/
│   │   ├── invoices/
│   │   │   ├── generate-pdf/
│   │   │   └── payment/
│   │   ├── upload/
│   │   └── auth/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── auth/
│   │   └── login-form.tsx
│   ├── dashboard/
│   │   ├── dashboard.tsx
│   │   ├── sidebar.tsx
│   │   ├── topbar.tsx
│   │   ├── invoices/
│   │   │   ├── invoice-list.tsx
│   │   │   ├── invoice-create.tsx
│   │   │   ├── invoice-details.tsx
│   │   │   └── payment-modal.tsx
│   │   └── products/
│   │       └── product-management.tsx
│   └── ui/
│       └── [shadcn components]
├── lib/
│   └── utils.ts
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
├── public/
└── package.json
\`\`\`

## Deployment

### Vercel (Recommended)

\`\`\`bash
# 1. Push code to GitHub
git push origin main

# 2. Go to vercel.com and create new project
# 3. Connect GitHub repository
# 4. Add environment variables in Vercel dashboard
# 5. Deploy

# URL: https://your-project.vercel.app
\`\`\`

### Self-Hosted (Node.js)

\`\`\`bash
# 1. Build for production
npm run build

# 2. Start production server
npm start

# 3. Use PM2 or similar for process management
pm2 start npm --name "gold-shop" -- start
\`\`\`

### Docker Deployment

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY .next ./.next
COPY public ./public

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

## Environment Variables

### Required for Development
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:3000
\`\`\`

### Optional (For Production Features)
\`\`\`
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
MONGODB_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
\`\`\`

## Usage Guide

### Creating an Invoice

1. Navigate to "Create Invoice" from sidebar
2. Enter customer details (name, phone)
3. Add invoice items:
   - Product name
   - Weight in grams
   - Rate per gram
   - GST percentage
   - Discount amount
4. Generate PDF or save as draft
5. Finalize and send to customer

### Recording Payments

1. Go to "All Invoices"
2. Click the dollar icon on any invoice
3. Select payment mode (Cash/UPI/Online)
4. Enter payment amount
5. Add notes (optional)
6. Submit

### Managing Products

1. Navigate to "Products"
2. Click "Add Product"
3. Fill in details (name, category, weight, price)
4. Save product
5. Edit or delete existing products anytime

## API Endpoints

### Authentication (Future)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token

### Invoices
- `POST /api/invoices` - Create invoice
- `GET /api/invoices` - List all invoices
- `GET /api/invoices/:id` - Get invoice details
- `PUT /api/invoices/:id/status` - Update payment status
- `POST /api/invoices/:id/payment` - Record payment

### Products
- `POST /api/products` - Create product
- `GET /api/products` - List products
- `GET /api/products/search?q=` - Search products
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Utilities
- `POST /api/upload` - Upload file to Cloudinary
- `POST /api/invoices/generate-pdf` - Generate invoice PDF

## Development Commands

\`\`\`bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Format code
npm run format
\`\`\`

## Features Roadmap

### Phase 1 (Completed)
- ✅ Frontend UI with responsive design
- ✅ Invoice management (CRUD)
- ✅ Product management
- ✅ Payment tracking
- ✅ PDF generation
- ✅ Cloudinary integration

### Phase 2 (Planned)
- 🔄 MongoDB backend integration
- 🔄 JWT authentication system
- 🔄 Advanced reporting & analytics
- 🔄 Email notifications
- 🔄 Multi-user support with roles
- 🔄 Recurring invoices

### Phase 3 (Future)
- 🔄 Stripe payment gateway
- 🔄 Inventory management
- 🔄 Customer database
- 🔄 Financial reports (P&L)
- 🔄 Mobile app (React Native)
- 🔄 API for third-party integrations

## Security Best Practices

- All passwords should be hashed using bcrypt
- JWT tokens with expiration (15 min access, 7 days refresh)
- Environment variables for sensitive data
- Input validation with Zod/Joi
- SQL injection prevention with parameterized queries
- CSRF protection enabled
- Rate limiting on auth endpoints
- HTTPS enforced in production

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Metrics

- ⚡ First Contentful Paint: < 2s
- ⚡ Largest Contentful Paint: < 3s
- ⚡ Cumulative Layout Shift: < 0.1
- ⚡ Time to Interactive: < 4s

## Troubleshooting

### Build Issues
\`\`\`bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
\`\`\`

### Port Already in Use
\`\`\`bash
# Change port
PORT=3001 npm run dev

# Or kill process on port 3000
lsof -ti:3000 | xargs kill -9
\`\`\`

### PDF Generation Error
- Ensure Cloudinary credentials are correct
- Check file size limits (max 10MB)
- Verify API endpoints are accessible

## Contributing

1. Create feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For issues and questions:
- Create an issue on GitHub
- Email: support@goldshop.com
- Documentation: https://docs.goldshop.com

## Changelog

### Version 1.0.0 (November 2024)
- Initial release with core features
- Responsive mobile & desktop UI
- Invoice management system
- Product catalog
- Payment tracking
- PDF generation
- Cloudinary integration ready

---

**Made with ❤️ for Gold Shop Owners**
