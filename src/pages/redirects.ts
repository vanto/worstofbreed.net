import { getCollection } from "astro:content";
import { LATEST_PUBLISHED_EDITION } from "../config";

export async function GET() {
  const blips = await getCollection("blips");
  const editions = new Set<string>();
  
  blips.forEach((b) => {
    if (b.data.edition) {
      editions.add(b.data.edition);
    }
  });

  // Default fallback if no editions found, though there should be some.
  if (editions.size === 0) {
    editions.add("2025");
  }

  const sortedEditions = Array.from(editions).sort(); // Lexicographically sort
  const latestEdition = sortedEditions[sortedEditions.length - 1];

  // format: /source /target status_code
  // Redirect /radar to /radar/<latest_published_edition>
  const redirects = `/radar /radar/${LATEST_PUBLISHED_EDITION} 302`;

  return new Response(redirects, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
