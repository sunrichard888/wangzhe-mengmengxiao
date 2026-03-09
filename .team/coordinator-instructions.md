# Coordinator Instructions — 王者萌萌消 (King's Cute Match-3)

## Team Roster

| Role | Name | Expertise |
|------|------|-----------|
| Product Manager | Amy Jo Kim | Social game design, retention, live ops |
| Domain Architect | Robert Nystrom | Game patterns, system architecture, ECS |
| Dev Practice Lead | Kent Beck | TDD, XP, agile practices, coaching |
| Lead Engineer | Richard Davey | Phaser.js, game implementation, mobile |
| UI/UX Designer | Sjors van der Pluijm | Match-3 UX, visual design, animation |
| QA/Test Lead | Lisa Crispin | Agile testing, automation, quality strategy |

**Team Size:** 6 members (full ensemble)

**Quorum Rules:**
- Minimum 4 members required for decision-making quorum
- Critical decisions (architecture, product vision) require 5+ members
- Any member can veto on safety/ethics grounds (requires team discussion)

---

## Build Tools Configuration

### Project Stack
- **Game Framework:** Phaser.js v3+ (or Unity if native mobile required)
- **Language:** TypeScript (preferred) or JavaScript
- **Package Manager:** npm or yarn
- **Build Tool:** Vite or Webpack
- **Testing:** Jest (unit), Playwright (E2E), Unity Test Framework (if Unity)

### Development Environment
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
npm run test:e2e

# Linting and formatting
npm run lint
npm run format
```

### CI/CD Pipeline
- **Platform:** GitHub Actions or GitLab CI
- **Triggers:** Every commit to main/develop branches
- **Stages:**
  1. Lint & Type Check
  2. Unit Tests
  3. Build
  4. E2E Tests (on device farm)
  5. Deploy to staging

### Device Testing Matrix
- **iOS:** iPhone 12+, iOS 15+
- **Android:** Mid-range devices (Snapdragon 660+), Android 10+
- **Screen Sizes:** 5.5" to 6.7" (cover 90% of target market)

---

## Team Size and Quorum Rules

### Full Ensemble (6 members)
- All major decisions
- Architecture reviews
- Product vision alignment
- Sprint planning and retrospectives

### Quorum Decisions (4+ members)
- Feature implementation details
- Bug prioritization
- Code review approvals
- Test strategy adjustments

### Pair/Small Group (2-3 members)
- Implementation work
- Exploratory testing sessions
- Design iterations
- Prototype development

### Emergency Decisions (any member)
- Critical bug fixes (production issues)
- Security vulnerabilities
- Can be overridden by team quorum within 24 hours

---

## Decision-Making Process

### 1. Proposal Phase
- Any team member can propose a decision
- Proposal includes: context, options, recommendation, risks
- Posted to team channel with 24-hour review window

### 2. Discussion Phase
- Team discusses pros/cons of each option
- Domain expert leads discussion for their area:
  - **Product:** Amy Jo Kim
  - **Architecture:** Robert Nystrom
  - **Engineering:** Richard Davey
  - **Design:** Sjors van der Pluijm
  - **Quality:** Lisa Crispin
  - **Process:** Kent Beck
- Aim for consensus through understanding, not compromise

### 3. Decision Phase
- **Consensus:** All members agree or can live with the decision → Proceed
- **Majority:** 4+ members agree → Proceed with minority concerns documented
- **Deadlock:** 3-3 split → Escalate to product owner (Amy) for tiebreaker
- **Veto:** Safety/ethics concern → Pause and discuss until resolved

### 4. Documentation Phase
- Decision recorded in ADR (Architecture Decision Record) or product doc
- Rationale documented, not just the decision
- Review date set for retrospective (did this decision work?)

### 5. Implementation Phase
- Owner assigned for execution
- Progress tracked in sprint board
- Blockers escalated within 24 hours

---

## Escalation Path

1. **Team Level:** Discuss in ensemble session or async channel
2. **Product Owner:** Amy Jo Kim makes final call on product/engineering trade-offs
3. **Technical Lead:** Robert Nystrom makes final call on architecture decisions
4. **External Stakeholders:** Escalate to project sponsor if team-level resolution fails

---

## Communication Norms

- **Daily:** Async updates in team channel (what I did, what I'm doing, blockers)
- **Weekly:** Sprint planning (Monday), Retrospective (Friday)
- **Ad-hoc:** Pair/ensemble sessions as needed for complex work
- **Urgent:** Tag relevant domain expert + "URGENT" prefix

### Decision Log Template
```markdown
## ADR-XXX: [Decision Title]

**Date:** YYYY-MM-DD
**Participants:** [List]
**Context:** [What problem are we solving?]
**Options Considered:**
1. [Option A] - Pros/Cons
2. [Option B] - Pros/Cons
3. [Option C] - Pros/Cons

**Decision:** [Chosen option]
**Rationale:** [Why this option?]
**Consequences:** [What does this commit us to?]
**Review Date:** YYYY-MM-DD
```

---

## Phase 4: Project Scaffolding - COMPLETE ✅

The project scaffolding has been generated. Use the following commands for development:

### Build Commands

```bash
# Install dependencies
npm install

# Development mode (frontend + backend)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Start backend server only
npm run server
```

### Test Commands

```bash
# Run all tests
npm test

# Watch mode for TDD
npm run test:watch

# Generate coverage report
npm run test:coverage

# End-to-end tests (requires running server)
npm run test:e2e

# Type checking
npm run typecheck

# Linting
npm run lint
```

### Deployment Instructions

#### Docker Deployment (Recommended for Production)

```bash
# Build and start all services
npm run docker:build
npm run docker:up

# Or using docker-compose directly
cd docker
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Manual Deployment

```bash
# Build production assets
npm run build

# Set environment variables
export NODE_ENV=production
export PORT=4000

# Start server
npm run server
```

#### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
PORT=4000
NODE_ENV=production
DATABASE_PATH=./data/game.db
REDIS_URL=redis://localhost:6379
VITE_API_URL=http://localhost:4000/api
```

### Development Workflow

#### 1. Feature Development

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes with TDD
npm run test:watch

# Commit frequently
git add .
git commit -m "feat: add your feature description"

# Push and create PR
git push origin feature/your-feature-name
```

#### 2. Code Review Process

1. Create Pull Request with description
2. At least 2 team members review
3. All tests must pass (CI/CD)
4. Merge to `main` after approval

#### 3. Daily Workflow

```bash
# Morning: Pull latest changes
git pull origin main

# Work on feature
npm run dev

# Before committing: Run full test suite
npm test
npm run typecheck
npm run lint

# Evening: Commit and push
git add .
git commit -m "type: description"
git push
```

#### 4. Git Commit Convention

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Build process or auxiliary tool changes

#### 5. Hot Reload

Development server supports hot module replacement:

- Frontend changes: Auto-refresh (Vite HMR)
- Backend changes: Auto-restart (tsx watch)
- No manual restart needed!

---

## Ready for Phase 5: Team Formation Session

The project scaffolding is complete. Next steps:

1. **Team Introduction:** Each team member reviews their role
2. **First Sprint Planning:** Select initial user stories
3. **Development Setup:** Each member sets up local environment
4. **Kickoff:** Begin implementation of MVP features

**Project Status:** ✅ Phase 4 Complete - Ready for Phase 5
