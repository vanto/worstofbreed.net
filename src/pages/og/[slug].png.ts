import { getCollection, type CollectionEntry } from "astro:content";
import satori from "satori";
import { Resvg, initWasm } from "@resvg/resvg-wasm";
import { html } from "satori-html";
import fs from "node:fs/promises";

// Initialize WASM once
const init = async () => {
  try {
    const wasm = await fs.readFile("./node_modules/@resvg/resvg-wasm/index_bg.wasm");
    await initWasm(wasm);
  } catch (e) {
    console.error("Failed to initialize resvg-wasm", e);
  }
};
await init();

export async function getStaticPaths() {
  const patterns = await getCollection("patterns");
  return patterns.map((pattern) => ({
    params: { slug: pattern.slug },
    props: { pattern },
  }));
}

export async function GET({ props }: { props: { pattern: CollectionEntry<"patterns"> } }) {
  const { pattern } = props;
  const { title, category, stats, quote, specialAbility, imagePlaceholder } = pattern.data;

 // Fetch fonts
  /* Fetch fonts */
  const fontData = await fs.readFile("./node_modules/@fontsource/space-mono/files/space-mono-latin-400-normal.woff");

  // Helper to resolve Twemoji URL
  const getIconCode = (char: string) => {
    return char.codePointAt(0)?.toString(16);
  };
  
  // Prepare emoji for Satori
  const emoji = imagePlaceholder || "⚠️";
  const emojiCode = getIconCode(emoji);
  let emojiSvg = "";
  if (emojiCode) {
      try {
        const res = await fetch(`https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${emojiCode}.svg`);
        if (res.ok) {
            emojiSvg = await res.text();
             // Satori expects a data: uri for the image content in graphemeImages? 
             // No, standard doc says it takes a URL string or Base64? 
             // Actually satori documentation says `graphemeImages: { [key: string]: string }`. 
             // The string can be remotely fetched by Satori? No, Satori is environment agnostic.
             // Best to provide Data URI.
             emojiSvg = `data:image/svg+xml;base64,${Buffer.from(emojiSvg).toString('base64')}`;
        }
      } catch (e) {
          console.error("Failed to fetch emoji svg", e);
      }
  }

  const statsHtml = ["Latency", "Pain", "Maintain", "Resume"].map((label, i) => {
    const val = [stats.latency, stats.pain, stats.maintainability, stats.resumeValue][i];
    const isPain = label === "Pain";
    const flexStyle = i === 3 ? "flex: 1;" : "width: 130px;";
    return `<div style="${flexStyle} padding: 10px; border-right: ${i === 3 ? "none" : "4px solid #111"}; display: flex; flex-direction: column;">
        <div style="font-size: 14px; opacity: 0.6; text-transform: uppercase; display: flex;">${label}</div>
        <div style="font-size: 24px; font-weight: bold; color: ${isPain ? "red" : "inherit"}; display: flex;">${val}${i < 3 ? "/100" : ""}</div>
     </div>`;
  }).join("");

  // Construct full HTML string to avoid satori-html escaping interpolated strings
  const htmlString = `<div style="display: flex; flex-direction: column; width: 1200px; height: 630px; background-color: #e0e0e0; font-family: 'Space Mono'; padding: 40px; align-items: center; justify-content: center;">
    <div style="display: flex; width: 100%; height: 100%; background: #fff; border: 8px solid #111; box-shadow: 16px 16px 0px #666; flex-direction: column;">
        <div style="display: flex; justify-content: space-between; padding: 20px; background: #111; color: #fff; font-size: 32px; font-weight: bold; text-transform: uppercase;">
            <div style="display: flex;">${title}</div>
            <div style="background: #ff00ff; color: #111; padding: 4px 12px; height: 100%; display: flex; align-items: center;">${category}</div>
        </div>
        <div style="display: flex; flex: 1; flex-direction: row;">
            <div style="display: flex; width: 30%; background: #eee; align-items: center; justify-content: center; font-size: 150px; border-right: 8px solid #111; position: relative; overflow: hidden;">
                 <div style="display: flex;">${emoji}</div>
                 <div style="position: absolute; top:0; left:0; right:0; bottom:0; background-image: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%); background-size: 100% 4px; display: flex;"></div>
            </div>
            <div style="display: flex; flex-direction: column; width: 70%;">
                 <div style="display: flex; border-bottom: 8px solid #111;">${statsHtml}</div>
                 <div style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between; flex-grow: 1;">
                     <div style="font-size: 20px; font-style: italic; border-left: 8px solid #ff00ff; padding-left: 16px; margin-bottom: 20px; display: flex;">> "${quote}"</div>
                     <div style="background: #f0f0f0; border: 4px solid #111; padding: 16px; display: flex; flex-direction: column;">
                        <div style="font-weight: bold; text-transform: uppercase; margin-bottom: 8px; font-size: 20px; display: flex;">* ${specialAbility.name}</div>
                        <div style="font-size: 18px; display: flex;">${specialAbility.description}</div>
                     </div>
                </div>
            </div>
        </div>
        <div style="background: #eee; border-top: 8px solid #111; padding: 10px; text-align: right; font-size: 16px; display: flex; justify-content: flex-end;">worstofbreed.net</div>
   </div>
</div>`;

  const markup = html(htmlString);

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Space Mono",
        data: fontData,
        weight: 400,
        style: "normal",
      },
    ],
    graphemeImages: emojiSvg ? {
        [emoji]: emojiSvg
    } : undefined
  });

  const resvg = new Resvg(svg);
  return new Response(resvg.render().asPng() as any, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
