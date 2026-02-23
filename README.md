# Social Casino Platform

A modern, full-featured social casino platform built with Next.js 16, featuring real-time chat, live streaming, social feeds, and comprehensive user interactions.

## 🚀 Features

### Core Functionality

- **Authentication System**: JWT-based authentication with dual storage (localStorage + cookies)
- **Real-time Chat**: SignalR-powered instant messaging with chat rooms
- **Live Streaming**: Integrated live stream support with Mux player
- **Social Feed**: User posts, comments, likes, and infinite scroll
- **Stories**: Instagram-style stories with viewer tracking
- **User Profiles**: Customizable profiles with media galleries
- **Follow System**: User following/followers with real-time updates
- **Search**: Advanced user and content search functionality
- **Location Services**: Location-based features

### Technical Highlights

- **Next.js 16**: Latest Next.js with App Router and Server Components
- **React 19**: Cutting-edge React features
- **TypeScript**: Full type safety throughout the application
- **TanStack Query**: Efficient server state management
- **Real-time WebSockets**: SignalR integration for live features
- **Responsive Design**: Mobile-first, fully responsive UI
- **Production Ready**: Docker containerization with security hardening

## 📋 Prerequisites

- **Node.js**: 20.x or higher
- **npm/pnpm**: Package manager
- **Docker** (optional): For containerized deployment

## 🛠️ Installation

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd social-casino-new
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=https://your-api-url.com

   # Environment
   NODE_ENV=development
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

1. **Configure environment variables**

   Create a `.env` file:

   ```env
   NEXT_PUBLIC_API_URL=https://your-api-url.com
   NODE_ENV=production
   PORT=4000
   ```

2. **Build and run the container**

   ```bash
   docker-compose up -d
   ```

3. **Access the application**

   Visit [http://localhost:4000](http://localhost:4000)

### Manual Docker Build

```bash
# Build the image
docker build -t social-casino-new .

# Run the container
docker run -p 4000:4000 \
  -e NEXT_PUBLIC_API_URL=https://your-api-url.com \
  -e NODE_ENV=production \
  social-casino-new
```

## 📝 Available Scripts

| Script          | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start development server with Turbopack |
| `npm run build` | Build production-ready application      |
| `npm start`     | Start production server on port 4000    |
| `npm run lint`  | Run ESLint with strict error checking   |

## 🏗️ Project Structure

```
social-casino-new/
├── public/                    # Static assets
│   ├── icons/                # App icons
│   └── media/                # Media files
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── auth/            # Authentication pages
│   │   ├── chat/            # Real-time chat feature
│   │   ├── profile/         # User profiles
│   │   ├── search/          # Search functionality
│   │   ├── streams/         # Live streaming
│   │   ├── userFeed/        # Social feed
│   │   └── layouts/         # Layout components
│   ├── components/           # Reusable components
│   │   ├── livestream/      # Streaming components
│   │   ├── post/            # Post-related components
│   │   ├── profile/         # Profile components
│   │   ├── story/           # Stories feature
│   │   └── ui/              # UI primitives (shadcn/ui)
│   ├── contexts/             # React contexts
│   │   ├── AuthContext.tsx
│   │   └── UploadProgressContext.tsx
│   ├── hooks/                # Custom React hooks
│   ├── lib/
│   │   ├── api/             # API integration
│   │   ├── types/           # TypeScript definitions
│   │   └── utils/           # Utility functions
│   └── middleware.ts         # Next.js middleware
├── docker-compose.yml        # Docker Compose configuration
├── Dockerfile               # Docker build instructions
└── next.config.ts           # Next.js configuration
```

## 🔐 Authentication

The application uses a secure JWT-based authentication system with:

- **Dual Storage**: Tokens stored in both localStorage and cookies
- **Auto Refresh**: Automatic token refresh on expiration
- **Route Protection**: Middleware-based route guarding
- **Server-Side Auth**: Cookie-based server component authentication

For detailed authentication documentation, see [AUTH_README.md](./AUTH_README.md).

## 🌐 API Integration

The application connects to a backend API using Axios with:

- Automatic token injection
- Request/response interceptors
- Token refresh handling
- Error handling and retry logic

Base URL configuration: `NEXT_PUBLIC_API_URL`

## 🎨 UI Components

Built with modern UI libraries:

- **shadcn/ui**: Beautiful, accessible component library
- **Radix UI**: Unstyled, accessible primitives
- **Tailwind CSS**: Utility-first styling
- **Lucide Icons**: Icon system
- **Sonner**: Toast notifications

## 🔄 Real-time Features

### SignalR Integration

- Live chat messaging
- Typing indicators
- Online presence
- Message read receipts

### Live Streaming

- Mux player integration
- Stream creation and management
- Viewer interaction

## 🚦 Middleware & Route Protection

The application uses Next.js middleware for:

- Authentication verification
- Protected route access control
- Automatic redirects for unauthorized users
- Public route handling

Protected routes:

- `/profile/*`
- `/chat/*`
- `/streams/*`
- `/userFeed/*`

Public routes:

- `/auth/login`
- `/auth/signup`
- `/` (home/feed)

## 📦 Key Dependencies

| Package               | Version | Purpose                 |
| --------------------- | ------- | ----------------------- |
| next                  | 16.1.6  | React framework         |
| react                 | 19.2.3  | UI library              |
| react-dom             | 19.2.3  | React DOM renderer      |
| @tanstack/react-query | ^5.85.6 | Server state management |
| @microsoft/signalr    | ^9.0.6  | Real-time communication |
| @mux/mux-player-react | ^3.8.0  | Video streaming         |
| axios                 | ^1.11.0 | HTTP client             |
| tailwindcss           | ^4      | Styling                 |
| typescript            | ^5      | Type safety             |

## 🔒 Security Features

- **No privilege escalation**: Container security hardening
- **Read-only filesystem** options
- **Capability dropping**: Minimal container permissions
- **HTTPS enforcement**: Secure headers configuration
- **XSS Protection**: Content Security Policy
- **Token security**: HTTP-only cookies for sensitive data

## 🚀 Performance Optimizations

- **Turbopack**: Fast development builds
- **SWC Minification**: Optimized production builds
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Compression**: Gzip/Brotli response compression
- **ETags**: Efficient caching strategy

## 📊 Monitoring & Health Checks

Docker deployment includes:

- Health check endpoint
- Resource limits (CPU: 2.0, Memory: 2G)
- Automatic restart policies
- Structured logging (max 10MB × 3 files)

## 🌍 Environment Variables

| Variable              | Required | Description                          |
| --------------------- | -------- | ------------------------------------ |
| `NEXT_PUBLIC_API_URL` | Yes      | Backend API base URL                 |
| `NODE_ENV`            | Yes      | Environment (development/production) |
| `PORT`                | No       | Server port (default: 4000)          |

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📈 Production Deployment

### Pre-deployment Checklist

- [ ] Environment variables configured
- [ ] API endpoints verified
- [ ] Database connections tested
- [ ] SSL/TLS certificates installed
- [ ] CDN configured for static assets
- [ ] Monitoring and logging setup
- [ ] Backup strategy implemented

### Deployment Steps

1. Build the production image
2. Configure reverse proxy (nginx/traefik)
3. Set up SSL termination
4. Configure domain and DNS
5. Run database migrations
6. Deploy container
7. Verify health checks
8. Monitor application logs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 👥 Support

For issues and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation in `AUTH_README.md`

## 🔄 Version History

- **v0.1.0** - Initial production release
  - Complete authentication system
  - Real-time chat and messaging
  - Live streaming capabilities
  - Social feed and interactions
  - User profiles and following

---

**Built with ❤️ using Next.js 16.1.6 and React 19.2.3** .
