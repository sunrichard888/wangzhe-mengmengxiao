# 王者萌萌消 (King's Cute Match-3) 🎮

A delightful match-3 puzzle game built with Phaser 3 and TypeScript.

## 🎯 MVP Features

- **Core Match-3 Gameplay**: Swap cards to create matches of 3 or more
- **Level System**: Progressive difficulty with unique objectives
- **Score System**: Combo multipliers and high scores
- **Visual Effects**: Smooth animations and particle effects

## 🏗️ Tech Stack

### Frontend
- **Phaser 3**: Game engine
- **TypeScript**: Type-safe development
- **Vite**: Build tooling

### Backend
- **Express**: REST API server
- **SQLite**: Local database
- **Redis**: Caching and sessions

### DevOps
- **Docker**: Containerization
- **Jest**: Testing framework

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Docker (optional)

### Development Setup

```bash
# Clone the repository
cd wangzhe-mengmengxiao

# Install dependencies
npm install

# Start development servers (frontend + backend)
npm run dev

# Open browser
# Frontend: http://localhost:3000
# Backend API: http://localhost:4000
```

### Build for Production

```bash
# Build frontend
npm run build

# Start production server
npm run server
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# End-to-end tests
npm run test:e2e
```

## 🐳 Docker Deployment

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📁 Project Structure

```
wangzhe-mengmengxiao/
├── src/
│   ├── frontend/       # Phaser game code
│   │   ├── game/       # Game logic
│   │   ├── render/     # Rendering
│   │   └── ui/         # UI screens
│   ├── backend/        # Express server
│   │   ├── routes/     # API endpoints
│   │   └── db/         # Database
│   └── types/          # TypeScript types
├── tests/              # Test files
├── assets/             # Game assets
├── docker/             # Docker config
└── .team/              # Team documentation
```

## 🎮 Gameplay

### How to Play
1. **Swap** adjacent cards by clicking two neighbors
2. **Match** 3 or more cards of the same type
3. **Score** points with combos and chain reactions
4. **Complete** level objectives to progress

### Card Types
- ⚔️ Sword
- 🛡️ Shield
- 🧪 Potion
- 👑 Crown
- 💎 Gem
- 📜 Scroll

## 📊 API Endpoints

### Leaderboard
- `POST /api/leaderboard` - Submit score
- `GET /api/leaderboard` - Get top scores

### Levels
- `GET /api/levels/:id` - Get level data
- `PUT /api/levels/:id/complete` - Mark level complete

## 👥 Team

This project is being developed by a 6-member AI ensemble team:
- **Game Developer**: Core gameplay mechanics
- **Frontend Developer**: UI/UX implementation
- **Backend Developer**: Server and database
- **QA Engineer**: Testing and quality assurance
- **DevOps Engineer**: Deployment and infrastructure
- **Designer**: Visual design and assets

## 📝 Development Workflow

1. **Feature Branch**: Create branch from `main`
2. **Develop**: Implement feature with tests
3. **Review**: Team review and approval
4. **Merge**: Merge to `main` after passing CI

## 📄 License

MIT License - See LICENSE file for details

---

**Built with ❤️ by the 王者萌萌消 Team**
