
# BlocNiti AI - Tenant Rights Documentation Platform

BlocNiti AI is a comprehensive tenant rights documentation platform specifically designed for NYC renters. The app helps tenants document repair issues, understand their legal rights, and generate formal documentation to hold landlords accountable, featuring "Alma," an AI assistant that guides users through the process.

## 🏠 Overview

BlocNiti AI empowers NYC tenants by providing:
- **AI-powered repair issue classification** using HPD violation standards
- **Legal rights education** with deadline tracking
- **Formal documentation generation** for tenant-landlord communications
- **Harassment incident reporting** with detailed tracking
- **Room-by-room issue documentation** with status management

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure login via Replit Auth
- **Tenant Profiles**: Detailed housing information collection
- **Repair Issue Tracking**: Room-by-room documentation with AI analysis
- **Legal Dashboard**: Understanding HPD violation classes and deadlines
- **Harassment Reporting**: Multiple incident type tracking
- **PDF Generation**: Formal documentation for legal purposes

### AI Integration (Alma Assistant)
- **Intelligent Classification**: Automatically categorizes repair issues into HPD violation classes (A, B, C)
- **Deadline Calculation**: Provides correction deadlines based on violation severity
- **Legal Guidance**: Offers remediation suggestions and legal context
- **Natural Language Processing**: Analyzes tenant descriptions for accurate classification
- **Voice Input Support**: Converts speech to text for easier documentation

#### AI Model Details
- **Provider**: OpenRouter AI with Anthropic Claude-3-Haiku
- **Classification Logic**: 
  - Class A: Immediate hazards (24-72 hours)
  - Class B: Hazardous conditions (30 days)
  - Class C: Non-hazardous quality issues (90 days)
- **Response Format**: Structured JSON with violation class, deadline, and analysis

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling and development
- **Wouter** for client-side routing
- **TanStack Query** for server state management
- **Tailwind CSS** with custom components
- **Radix UI** for accessible component primitives
- **Framer Motion** for animations

### Backend
- **Express.js** with TypeScript
- **Node.js 20** runtime
- **PostgreSQL 16** database
- **Drizzle ORM** for database operations
- **Replit Auth** for authentication

### AI Services
- **OpenRouter AI API** for repair issue classification
- **Anthropic Claude-3-Haiku** model for natural language processing
- **Custom prompt engineering** for NYC HPD compliance

## 📊 Database Schema

### Users Table
- User profiles with tenant-specific information
- Housing details (address, lease info, landlord contact)
- Privacy-focused data collection

### Repair Issues Table
- Room-by-room issue tracking
- AI-generated HPD violation classification
- Status management (urgent, priority, non-urgent)
- Deadline tracking and remediation suggestions

### Harassment Reports Table
- Multiple harassment type categorization
- Detailed incident documentation
- Timeline tracking

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database
- OpenRouter AI API key

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd blocniti-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Database
DATABASE_URL=your_postgresql_connection_string

# OpenRouter AI
OPENROUTER_API_KEY=your_openrouter_api_key

# Replit Auth (if using Replit environment)
REPLIT_DOMAINS=your_replit_domain
```

4. **Initialize database**
```bash
npm run db:push
```

5. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Production Build
```bash
npm run build
npm start
```

## 🤖 AI Features Deep Dive

### Repair Issue Classification
The AI system analyzes tenant descriptions and automatically classifies issues according to NYC HPD standards:

```typescript
// Example AI analysis workflow
1. User describes issue: "No heat in apartment for 3 days"
2. AI processes description with legal context
3. Returns: Class A violation, 24-hour deadline
4. Provides remediation suggestions and legal guidance
```

### Voice Input Processing
- Real-time speech-to-text conversion
- Automatic punctuation and formatting
- Integration with AI classification system

### Legal Context Engine
- NYC Housing Maintenance Code compliance
- HPD violation class definitions
- Correction deadline calculations
- Tenant rights education

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and API calls
├── server/                 # Express backend
│   ├── routes.ts           # API endpoints
│   ├── storage.ts          # Database operations
│   └── replitAuth.ts       # Authentication logic
├── shared/                 # Shared TypeScript types
└── migrations/             # Database migrations
```

## 🔒 Security & Privacy

- **Data Encryption**: All sensitive data encrypted in transit and at rest
- **Privacy by Design**: Minimal data collection with user consent
- **Secure Authentication**: Replit Auth integration
- **API Security**: Rate limiting and input validation

## 📱 API Endpoints

### Authentication
- `GET /api/auth/user` - Get current user
- `POST /api/auth/logout` - Logout user

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Repair Issues
- `GET /api/repair-issues` - Get user's repair issues
- `POST /api/repair-issues` - Create new repair issue
- `PUT /api/repair-issues/:id` - Update repair issue
- `DELETE /api/repair-issues/:id` - Delete repair issue

### Harassment Reports
- `GET /api/harassment-reports` - Get user's harassment reports
- `POST /api/harassment-reports` - Create new harassment report

## 🎯 Roadmap

- [ ] SMS notifications for deadline reminders
- [ ] Integration with NYC 311 system
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] Landlord communication portal
- [ ] Legal aid organization partnerships

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please contact:
- Email: support@blocniti.ai
- Issues: [GitHub Issues](your-github-repo/issues)

## 🙏 Acknowledgments

- NYC Department of Housing Preservation and Development (HPD)
- OpenRouter AI for AI classification services
- Replit for hosting and development environment
- NYC tenant rights organizations

---

**Built with ❤️ for NYC tenants seeking housing justice**
