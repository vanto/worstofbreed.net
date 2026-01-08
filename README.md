# Worst of Breed

**Worst of Breed** is a satirical exploration of software architecture trends, anti-patterns, and the darker side of modern engineering. It serves as a humorous "guide" to the questionable decisions and chaotic "best practices" that often plague the industry.

> "If it works, it's probably legacy code."

This project is built with **Astro** and designed to be deployed on **Cloudflare Pages**.

## 🚀 Getting Started

To run this project locally, you'll need [Node.js](https://nodejs.org/) installed.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd worst-of-breed
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The site will be available at `http://localhost:4321`.

4.  **Build for production:**
    ```bash
    npm run build
    ```

## 🏗️ Project Structure

-   `src/content/`: Contains the content collections for **Patterns** and **Radar Blips**.
-   `src/pages/`: Astro pages (routing).
-   `src/components/`: Reusable UI components.
-   `src/layouts/`: Page layouts.
-   `public/`: Static assets.

## � Contributing

We encourage contributions! If you have identified a new "Worst of Breed" pattern or a blip for our satirical tech radar, please submit a Pull Request.

> [!IMPORTANT]
> Please read [TONALITY.md](TONALITY.md) before writing content! It defines the "Upper Management" persona, the cynical tone, and the "Resume-Driven Development" humor style required for this project.

### Adding a Pattern

Patterns are the core content of the site. They are Markdown files located in `src/content/patterns/`.

1.  Create a new `.md` file in `src/content/patterns/` (e.g., `resume-driven-development.md`).
2.  Use the following Frontmatter schema:

```markdown
---
title: "Resume Driven Development"
category: "Culture" # Options: Architecture, Process, Legacy, Culture, AI, Code, Security, Infra, Frontend
# imagePlaceholder: "optional-image-path" 
stats:
  latency: 80         # 0-100
  pain: 90            # 0-100
  maintainability: 10 # 0-100
  resumeValue: "High" # Free text
specialAbility:
  name: "Job Hopper"
  description: "Instantly qualifies for a Senior Architect role at a FAANG company."
quote: "It's not about what the business needs, it's about what looks good on LinkedIn."
dateAdded: 2025-12-22
tags: ["career", "complexity", "hype"]
contributor: "YourGithubHandle" # Optional
---

## Analysis
Your satirical description of the pattern goes here. Use Markdown for formatting.

**The Reality:**
Your satirical description of the pattern goes here. Use Markdown for formatting.
```

### Adding a Radar Blip

The Tech Radar tracks the movement of technologies and trends into various statuses (like "BURN" or "DESPAIR"). Blips are Markdown files located in `src/content/blips/`.

1.  Create a new `.md` file in `src/content/blips/`.
2.  Use the following Frontmatter schema:

```markdown
---
name: "Serverless Micro-Frontends"
quadrant: 1 # 1: Languages & Frameworks, 2: Platforms, 3: Techniques, 4: Tools
status: "DESPAIR" # Options: BURN, CONTAINMENT, RESUME, DESPAIR
x: 0.5 # Coordinate on the radar (0 to 1 usually, relative to quadrant center/edge)
y: 0.3 # Coordinate on the radar
dateAdded: 2025-12-22
edition: "2025" # The year/edition of the radar
contributor: "YourGithubHandle" # Optional
---

Short description of why this blip exists.
```

## 📜 License

Code is licensed under [MIT](LICENSE). Content is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
