# Team Formation Session - 王者萌萌消 (King's Cute Match-3)

**Date:** March 9, 2026  
**Session:** Phase 5 - Team Formation  
**Location:** /root/.openclaw/workspace/projects/wangzhe-mengmengxiao/  
**Facilitator:** Ensemble Team Coordinator  

---

## Step 1: Opening Introductions

### Amy Jo Kim (Product Manager)
> "Hi everyone! I'm Amy Jo Kim, and I'm thrilled to be the PM for 王者萌萌消. My background is in social game design — I spent years at Zynga working on games that brought millions of players together daily.

**Product Vision:** We're building a match-3 game that's not just about matching tiles — it's about creating moments of joy and connection. Our target users are casual mobile gamers in the Chinese market who want a cute, engaging experience they can share with friends.

**Success Metrics:** 
- D1 Retention: 45%+
- D7 Retention: 20%+
- Session Length: 8-12 minutes average
- Level Completion Rate: 70%+ for early levels

My job is to keep us focused on the player story. Every feature we build should answer: 'Why would a player care?' Let's make something irresistible."

---

### Robert Nystrom (Architect)
> "Hello, I'm Robert Nystrom. I wrote 'Game Programming Patterns' and have spent my career thinking about how to structure game code so it's maintainable and performant.

**Technical Architecture Overview:**
We're building a clean, layered architecture:
- **Game Logic Layer:** Pure match-3 mechanics, completely testable
- **Rendering Layer:** Phaser.js handling all visual presentation
- **UI Layer:** Separate from game logic, easy to iterate on
- **Data Layer:** Save systems, level data, player progress

I'll be applying patterns like Command (for moves), Observer (for game events), State (for game modes), and Object Pool (for particles). The goal is an architecture that feels invisible — you should spend time on gameplay, not fighting the framework."

---

### Kent Beck (Dev Practice Lead)
> "Hey team, Kent Beck here. I've been fortunate to pioneer TDD and Extreme Programming, and I'm here to help us build a sustainable, high-quality codebase.

**Development Practices:**
We're committing to TDD from day one. No code without a failing test first — no exceptions, even for 'simple' code. We'll follow the Red-Green-Refactor cycle religiously.

**Quality Commitment:**
- Target: 80%+ unit test coverage
- Test pyramid: Unit tests for logic, integration for systems, E2E for critical paths
- CI/CD on every commit
- Pair programming rotations to spread knowledge

Remember: 'Make it work, make it right, make it fast.' Let's build something we're proud of."

---

### Richard Davey (Lead Engineer)
> "Hi everyone! I'm Richard Davey, creator of Phaser.js. I'm excited to lead the engineering implementation for this game.

**Phaser.js Implementation Plan:**
- Using Phaser 3.60+ for the game engine
- Arcade Physics for match-3 mechanics (lightweight and perfect for our needs)
- Custom grid management system for the board
- Particle systems for satisfying match effects
- Asset loading with proper caching and memory management

**Performance Commitment:**
- 60 FPS on mid-range devices (2018+)
- <100ms input latency
- <50MB initial load size
- Proper asset bundling for fast level transitions

Let's make the core gameplay feel amazing — every match should be satisfying!"

---

### Sjors van der Pluijm (UI/UX Designer)
> "Hello! I'm Sjors. I've worked on Candy Crush and other match-3 titles at King, and I'm passionate about creating delightful player experiences.

**Design Principles:**
- **Clarity over cleverness:** Players should never wonder what to do next
- **Delight is deliberate:** Every animation enhances the experience
- **Accessibility is inclusion:** Color-blind friendly palettes, appropriate touch targets
- **Cultural adaptation:** Visuals optimized for Chinese market preferences

**Visual Goals:**
- Cute, vibrant art style with Chinese aesthetic elements
- Consistent visual language across all screens
- 60fps animations that feel smooth and purposeful
- Clear board design where matchable elements are instantly readable

Let's make this game visually irresistible!"

---

### Lisa Crispin (QA/Test Lead)
> "Hi team, I'm Lisa Crispin. I've spent my career transforming QA from gatekeeping into a collaborative practice that accelerates delivery.

**Testing Strategy:**
- Test-first mindset embedded in every feature
- Automation pyramid: heavy unit testing, strategic integration tests, focused E2E
- Device testing matrix covering target iOS/Android devices
- Exploratory testing sessions to find edge cases
- Performance testing for frame rate and load times

**Quality Gates:**
- All PRs require passing CI tests
- No merge with failing tests
- Performance budgets enforced
- Accessibility requirements verified

Quality is a team sport — everyone owns it. Let's build confidence together!"

---

## Step 2: Project Discussion

### MVP Scope Confirmation

**Amy Jo Kim:** "Let's be crystal clear about what's in MVP and what's not. We have 2 weeks to launch."

**In MVP:**
- ✅ Core match-3 gameplay (tile stacking, 3-match elimination, cascade logic)
- ✅ Level system (progressive difficulty, 10+ levels for MVP)
- ✅ Basic UI (game board, HUD, level select, win/lose screens)
- ✅ Save/load system for player progress

**NOT in MVP:**
- ❌ Social features (friends, gifts, leaderboards) — Post-MVP
- ❌ Monetization (IAP, ads) — Post-MVP
- ❌ Daily events and seasonal content — Post-MVP
- ❌ Co-op challenges — Post-MVP

**Kent Beck:** "This scope is achievable if we stay disciplined. The key is not gold-plating."

**Richard Davey:** "Agreed. Let's focus on making the core loop feel amazing. We can add social features once the foundation is solid."

**Amy Jo Kim:** "Exactly. Fun first, features second."

---

### Technical Decisions

**Robert Nystrom:** "Let's confirm our technical stack."

**Decisions:**
- **Game Engine:** Phaser 3.60+ (Richard's framework, perfect for 2D mobile games)
- **Language:** TypeScript strict mode (type safety, better tooling)
- **Database:** SQLite for MVP (file-based, simple), MySQL-ready schema (easy migration later)
- **Deployment:** Docker on Tencent Cloud Lighthouse (consistent environments, easy scaling)
- **Version Control:** Git with trunk-based development (frequent merges, feature flags)

**Lisa Crispin:** "TypeScript strict mode will catch bugs early. I support this."

**Richard Davey:** "Phaser 3.60+ has excellent TypeScript support. This is a solid stack."

**Robert Nystrom:** "SQLite for MVP is pragmatic. We'll design the schema so migrating to MySQL is trivial when we need scale."

---

### Timeline Breakdown

**Amy Jo Kim:** "Two weeks. Let's break it down."

**Week 1: Core Gameplay + Basic Levels**
- Days 1-2: MatchLogic + Board classes (Richard + Robert)
- Days 3-4: Level system + win/lose conditions (Richard)
- Days 5-7: Basic UI + first 5 levels playable (Sjors + Richard)

**Week 2: Polish + Testing + Deployment**
- Days 8-9: Visual polish, animations, juice (Sjors + Richard)
- Days 10-11: Comprehensive testing, bug fixes (Lisa + Kent)
- Days 12-14: Deployment, final QA, launch prep (All)

**Kent Beck:** "This is aggressive but doable if we maintain TDD discipline. Technical debt will kill us if we accumulate it."

**Amy Jo Kim:** "Agreed. Quality over speed, but we move fast because we do things right."

---

## Step 3: Working Agreements

### 1. TDD Discipline (Kent Beck)
**Agreement:**
- ✅ No code without failing test first — no exceptions
- ✅ Target: 80%+ unit test coverage
- ✅ Red-Green-Refactor cycle for all features
- ✅ Test suite must pass before any merge
- ✅ Refactoring time built into every sprint (20% capacity)

**Kent:** "This is non-negotiable. TDD is how we go fast without breaking things."

---

### 2. Code Review Process (Lisa Crispin)
**Agreement:**
- ✅ All PRs require 2 approvals minimum
- ✅ Review checklist from each role's profile must be completed
- ✅ 24-hour review SLA (if blocked >24h, escalate)
- ✅ PRs must be small (<400 lines preferred)
- ✅ Commit messages must be clear and descriptive

**Review Checklist Highlights:**
- Architecture: Pattern adherence, separation of concerns, coupling
- Engineering: 60 FPS target, edge cases, memory management
- Design: Visual hierarchy, accessibility, consistency
- QA: Test coverage, device testing, performance budgets
- Product: Player value, goal alignment, success metrics

**Lisa:** "Quality gates protect everyone. Two approvals means fresh eyes catch what we miss."

---

### 3. Communication Protocol (Amy Jo Kim)
**Agreement:**
- ✅ Daily standup (async via git commits + comments)
- ✅ Blockers flagged immediately in project chat
- ✅ Consensus voting for major decisions (odd-number quorum: 3 or 5 voters)
- ✅ Design decisions documented in ADRs (Architecture Decision Records)
- ✅ Weekly retrospective (what's working, what's not, what to change)

**Amy Jo Kim:** "Async standup respects deep work time. If you're blocked, flag it immediately — don't spin your wheels."

---

### 4. Design System (Sjors)
**Agreement:**
- ✅ Consistent visual language across all screens
- ✅ Accessibility: color-blind friendly palettes (protanopia/deuteranopia tested)
- ✅ 60fps target on mid-range devices (no animation jank)
- ✅ Touch targets: minimum 44x44px
- ✅ Text readable at all sizes (no hardcoded font sizes)
- ✅ Design tokens for colors, spacing, typography (single source of truth)

**Sjors:** "Accessibility isn't optional. We design for all players. And if it doesn't run at 60fps, it doesn't ship."

---

### 5. Architecture Principles (Robert)
**Agreement:**
- ✅ Game Programming Patterns as our reference
- ✅ Loose coupling, high cohesion (systems independent but work together)
- ✅ State machine for game states (Menu, Playing, Paused, Win, Lose)
- ✅ Data-oriented design (structure data for how it's accessed)
- ✅ ADRs for all significant decisions (capture the why, not just the what)
- ✅ No circular dependencies (enforced by TypeScript)

**Robert:** "Good architecture makes change easy. We will have change. Let's be ready."

---

### 6. Performance Goals (Richard)
**Agreement:**
- ✅ <100ms input latency (touch to response)
- ✅ 60fps on 2018+ devices (iPhone 8+, mid-range Android)
- ✅ <50MB initial load size (critical for mobile retention)
- ✅ Level transitions <2 seconds
- ✅ Memory budget: <200MB during gameplay
- ✅ Battery drain: <10% per 30-minute session

**Richard:** "Performance is a design decision, not an optimization task. We build it in from the start."

---

## Step 4: Sprint 1 Planning (Week 1)

### Task Assignments

| Task | Owners | Deliverable | Due |
|------|--------|-------------|-----|
| **Implement MatchLogic class** | Richard + Robert | Core match detection, cascade logic, special candy rules | Day 2 |
| **Implement Board class** | Richard + Robert | Grid management, tile spawning, move validation | Day 2 |
| **Write unit tests for MatchLogic** | Kent + Lisa | 80%+ coverage, edge cases, performance tests | Day 3 |
| **Write unit tests for Board** | Kent + Lisa | Grid operations, state management, serialization | Day 3 |
| **Design card assets** | Sjors | Tile designs, special candies, visual variants | Day 3 |
| **Design UI mockups** | Sjors | Game board HUD, level select, win/lose screens | Day 4 |
| **Define level 1-5 difficulty curve** | Amy | Level design doc, tile configurations, move limits | Day 4 |
| **Implement basic level system** | Richard | Level loading, win/lose conditions, progression | Day 5 |
| **Daily code reviews** | All | All PRs reviewed within 24h | Daily |
| **Integration + playtest** | All | First 5 levels playable end-to-end | Day 7 |

### Sprint 1 Success Criteria
- ✅ MatchLogic and Board classes implemented and tested
- ✅ First 5 levels designed and playable
- ✅ Basic UI in place (game board, HUD, level select)
- ✅ 80%+ test coverage on core logic
- ✅ 60fps on target devices
- ✅ All team members have contributed code and reviews

**Amy Jo Kim:** "Sprint 1 is about proving the core loop works. If we have 5 playable levels that feel good, we're on track."

**Kent Beck:** "And if we maintain TDD discipline, we'll have the confidence to iterate quickly in Week 2."

---

## Step 5: Success Criteria for MVP

**Amy Jo Kim:** "Let's define what 'done' looks like for MVP launch."

### MVP Launch Criteria
1. **Gameplay:** 10+ levels with progressive difficulty, all playable start-to-finish
2. **Performance:** 60fps on target devices, <100ms input latency, <50MB load
3. **Quality:** 80%+ test coverage, zero critical bugs, all quality gates passing
4. **UX:** Clear visual hierarchy, accessible (color-blind tested), intuitive onboarding
5. **Technical:** Docker deployment working, save/load functional, no memory leaks
6. **Player Testing:** 10+ external playtesters, D1 retention >40% in testing

**Lisa Crispin:** "No launch until all criteria are met. We protect players from buggy releases."

**Richard Davey:** "Agreed. Better to delay a week than launch something broken."

---

## Team Commitments

We, the 王者萌萌消 team, commit to:

1. **Player-first design** — Every decision serves the player experience
2. **TDD discipline** — No code without failing test first
3. **Quality gates** — No merge with failing tests or unmet performance budgets
4. **Respectful collaboration** — Challenge ideas, support people
5. **Sustainable pace** — No heroics, no burnout, consistent progress
6. **Transparency** — Blockers flagged immediately, decisions documented

---

## Next Steps

- **Today:** Set up development environment, CI/CD pipeline, project board
- **Tomorrow (Day 1):** Begin MatchLogic implementation with TDD
- **Day 2:** Board class + initial tests
- **Day 3:** First playtestable prototype (gray box)
- **Day 7:** Sprint 1 review + retrospective

---

**Session Adjourned.**

*Team is ready to proceed to Phase 6: Development Execution.*

---

## Appendix: Team Contact & Roles

| Role | Name | Focus Area |
|------|------|------------|
| Product Manager | Amy Jo Kim | Player value, roadmap, success metrics |
| Architect | Robert Nystrom | System design, patterns, technical decisions |
| Dev Practice Lead | Kent Beck | TDD, CI/CD, engineering culture |
| Lead Engineer | Richard Davey | Phaser implementation, game feel, performance |
| UI/UX Designer | Sjors van der Pluijm | Visual design, accessibility, player experience |
| QA/Test Lead | Lisa Crispin | Test strategy, quality gates, automation |

**Coordinator:** Ensemble Team Coordinator (facilitating mob programming sessions)
