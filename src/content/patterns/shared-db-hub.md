---
title: "The Shared DB Hub"
category: "Legacy"
imagePlaceholder: "🗄️"
stats:
  latency: 40
  pain: 95
  maintainability: 2
  resumeValue: "NEGATIVE"
specialAbility:
  name: "Global Table Lock"
  description: "When the reporting team runs a SELECT, production stands still for 15 minutes."
quote: "Why build an API? Just write directly to the table 'T_TRANSFER_V2_TEMP', the other system polls there every 10 seconds."
tags: ["Legacy", "Integration", "Database"]
dateAdded: 2025-12-21
---

# Analysis
The ultimate Anti-Pattern of integration. Two or more systems that shouldn't know about each other share a database.

**The Reality:**
There is no schema ownership. No one dares to rename a column because a 12-year-old Perl script in the basement of the data center will stop breathing. Validation does not happen or (worse) is enforced by triggers and stored procedures that no one understands.
