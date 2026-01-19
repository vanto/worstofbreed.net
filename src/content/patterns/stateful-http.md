---
title: "Stateful HTTP"
category: "Frontend"
imagePlaceholder: "🏚"
stats:
  latency: 100
  pain: 83
  maintainability: 1
  resumeValue: "LIABILITY"
specialAbility:
  name: "Webapp from Hell"
  description: "Latency is now optimized from 100ms to 5s while users regularly lose their work by opening the app on another tab."
quote: "Transmitting and rendering an entire HTML page is wasteful! Let's track frontend state on the server, and only deliver changes! Efficiency!"
tags: ["Integration", "HTTP", "Performance"]
dateAdded: 2026-01-10
contributor: v-p-b
---

## Analysis
Micro-optimization without understanding the fundamentals of the application-layer protocol. Possibly an attempt to achieve vendor lock-in: "makes perfect sense when you are in the business of breaking stuff so people have to pay you for fixing it" - [source](https://dzone.com/articles/why-you-should-avoid-jsf)

**The Reality:**
You just made integration, testing and scaling impossible by introducing state to a stateless protocol. No other systems know how to handle the delta messages of your application. This also makes automated testing prohibitively complex. While a few KBs of compressed text don't even register for contemporary networks and endpoints, your system moves load from your numerous clients to your few servers that you can't load-balance anymore. As a bonus, you also turned some browser features (you can't know which) into landmines.
