---
name: Content Creator
description: Helps create new "Patterns" or "Blips" for worstofbreed.net based on a brief idea, ensuring the correct tone and formatting.
---

# Content Creator Skill

This skill is designed to help the user create new "Patterns" or "Blips" for the worstofbreed.net project based on a brief idea.

## When to use this skill
Use this skill whenever the user asks to generate, brainstorm, or create a new "Pattern", "Anti-Pattern", or "Blip" for the radar or card collection.

## How to use it

1. **Understand the Tone:** Before starting, read the `TONALITY.md` file in the root of the project to understand the "Worst of Breed" persona (cynical, deadpan, sardonic, technically precise).
2. **Check for Duplicates:** Scan the existing markdown files in `src/content/patterns/` and `src/content/blips/` using your search tools (e.g., `list_dir`, `grep_search`, or `view_file`). If a conceptually similar pattern or blip already exists, inform the user and ask if they still want to proceed or modify their idea.
3. **Present Alternatives:** Based on the user's idea, do NOT generate the final content immediately. Instead, present 2-3 different angles or alternatives for the new Pattern or Blip. These alternatives should vary in:
    * The specific angle of the joke/irony.
    * The catchy title.
    * The category or quadrant.
    * The "Resume Value" or "Special Ability".
   Ask the user to choose one or suggest tweaks to fine-tune the tone, spin, and irony.
4. **Draft the Content in English:** Regardless of the language the user used for their prompt or input, **all drafted content must always be in English**. Draft the full markdown content using the exact format specified in `TONALITY.md` and `src/content/config.ts`.
   * **Crucial:** Include `relatedPatterns` and `relatedBlips` in the front matter, referencing the file names (without the `.md` extension) of the related items you found. Note that this array is optional in the config but highly encouraged.
5. **Save the File:** Once the user approves the draft, use the `write_to_file` tool to save the content into the appropriate folder:
   * For Patterns: `src/content/patterns/<matching-filename>.md`
   * For Blips: `src/content/blips/<matching-filename>.md`
   The filename should be kebab-case, derived from the title, and end in `.md`.

## Tone Guidelines Reminders
* **Persona:** A jaded, exhausted Senior Software Architect who has "seen it all."
* **Humor Style:** Deadpan, sardonic, and dry. Avoid "wacky" or "goofy" humor. The comedy comes from the painful accuracy of the technical failure.
* **Vocabulary:** Use correct technical jargon applied to catastrophic scenarios.
