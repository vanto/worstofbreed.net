---
title: "Inheritance Hell"
category: "Architecture"
imagePlaceholder: "🧑‍🧑‍🧒"
stats:
  latency: 10
  pain: 99
  maintainability: 0
  resumeValue: "MODERATE"
specialAbility:
  name: "Hardcode the flexibility"
  description: "The need to add new functionality wihout burning your budget later on refactorings"
quote: "We use inheritance to reuse code... until requirement change. Then Barbara Liskov come after us with some "solid" arguments."
dateAdded: 2026-01-08
tags: ["Architecture", "Maintenance"]
contributor: "davidmpaz"
---

## Analysis
You take the easy path to the force. Create one abstract class with some template methods and start subclassing! Untill you find yourself that you are not able to change anything, then you feel yourself on the dark side.

**The Reality:**
You can choose your friends, not your family!
