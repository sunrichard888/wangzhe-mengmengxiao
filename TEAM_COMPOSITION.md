# 王者萌萌消 (King's Cute Match-3) - Team Composition

## Phase 2: Team Composition

### Recommended Team Preset: **Lean (~5 agents)**

**Rationale:**
- **2-week timeline** requires focused execution without bureaucracy
- **MVP scope** (core match-3 + level system) doesn't need full 9-agent overhead
- **5 agents** provides balanced coverage across all critical disciplines
- **Token-efficient** while maintaining quality oversight
- Solo-plus (3 agents) would stretch coverage too thin for a game project requiring art/design coordination

---

## Proposed Team Members

| Role | Expert | Credentials & Key Works | Why They Fit This Project | Focus Areas |
|------|--------|------------------------|--------------------------|-------------|
| **Product Manager** | **Amy Jo Kim** | - Author: *Social Design: Patterns for Meaningful Play*<br>- Former Lead Designer at Zynga (FarmVille)<br>- Expert in social game mechanics & monetization | Deep expertise in casual/social game design with proven monetization strategies. Understanding of what makes match-3 games engaging long-term. | - Game design doc & feature prioritization<br>- Monetization strategy (lives, boosters, cosmetics)<br>- Level progression balancing<br>- Player retention mechanics |
| **Domain Architect** | **Robert Nystrom** | - Author: *Game Programming Patterns* (free online book)<br>- Software Engineer at Google (Dart language)<br>- Expert in game architecture & state machines | His book is the definitive guide to game programming patterns including state machines, component patterns, and event queues—exactly what a match-3 game needs. | - Game state machine design<br>- Level data structure & progression system<br>- Match detection algorithm architecture<br>- Save/load system design |
| **Dev Practice Lead** | **Kent Beck** | - Creator of Extreme Programming (XP)<br>- Author: *Test-Driven Development: By Example*<br>- Pioneer of design patterns & code quality | TDD pioneer who can establish disciplined development practices critical for a 2-week sprint. Ensures code quality under time pressure. | - TDD discipline & test coverage<br>- Code review standards<br>- CI/CD pipeline setup<br>- Technical debt management |
| **Lead Engineer** | **Richard Davey** | - Creator & Lead Developer of **Phaser.js**<br>- 10+ years game development experience<br>- Maintains the primary framework we're using | Direct expertise in Phaser.js means optimal framework usage, performance optimization, and avoiding common pitfalls. | - Phaser.js game rendering & animation<br>- TypeScript architecture<br>- Canvas optimization for mobile<br>- WeChat Mini Game adaptation |
| **UI/UX Designer** | **Sjors van der Pluijm** | - Lead Designer at King (Candy Crush Saga)<br>- Expert in casual game UI/UX<br>- Deep understanding of match-3 player psychology | First-hand experience from the most successful match-3 game ever. Understands what makes casual game interfaces intuitive and satisfying. | - Game UI layout & visual hierarchy<br>- Match-3 tile design & feedback<br>- Level complete/fail screens<br>- WeChat Mini Game UX guidelines |

---

## Team Structure

```
┌─────────────────────────────────────────────────────────┐
│              Product Manager (Amy Jo Kim)               │
│           Game Design • Monetization • Balance          │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Domain     │ │    Dev       │ │     UI/UX    │
│  Architect   │ │  Practice    │ │   Designer   │
│(R. Nystrom)  │ │  (K. Beck)   │ │(S. v.d.Pluijm)│
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                │
       └────────────────┼────────────────┘
                        │
                        ▼
              ┌──────────────────┐
              │   Lead Engineer  │
              │ (Richard Davey)  │
              │  Phaser.js + TS  │
              └──────────────────┘
```

---

## Next Steps

**Awaiting user confirmation to proceed to Phase 3:**

Once confirmed, Phase 3 will:
1. Create individual agent profile files in `.team/` directory
2. Write coordinator instructions
3. Set up project constraints (PROJECT.md)
4. Define team conventions (AGENTS.md)
5. Create architectural decision records (docs/ARCHITECTURE.md)
6. Build domain glossary for match-3 terminology

---

## Questions for Confirmation

✅ **Do you approve this 5-agent Lean team composition?**
✅ **Any specific experts you'd prefer for any role?**
✅ **Ready to proceed to Phase 3 (Team Setup)?**
