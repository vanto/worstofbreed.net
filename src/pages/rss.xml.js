import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

export const prerender = true;

export async function GET(context) {
  const patterns = (await getCollection('patterns')).sort(
    (a, b) => b.data.dateAdded.valueOf() - a.data.dateAdded.valueOf()
  );

  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify);

  return rss({
    title: 'Worst of Breed',
    description: 'The world\'s most questionable software patterns',
    site: context.site || 'https://worstofbreed.net',
    items: await Promise.all(patterns.map(async (post) => {
      const { title, dateAdded, tags, author, quote, specialAbility } = post.data;
      const formattedDate = dateAdded.toISOString().split("T")[0];
      const tagsString = tags.join(", ");
      
      let authorHtml = '';
      if (author) {
         authorHtml = `
            <div style="margin-top: 5px;">
                <span style="font-weight: bold;">AUTHOR:</span> 
                <a href="https://github.com/${author}" target="_blank" style="text-decoration:none; color:#000; font-weight:bold;">
                    @${author}
                </a>
            </div>`;
      }
      
      const renderedContent = await processor.process(post.body);
      const htmlContent = renderedContent.toString();

      // Custom HTML Structure mimicking the detail page
      // using inline styles for best compatibility in RSS readers
      const content = `
        <div style="font-family: monospace; border: 2px solid #000; background: #fff; color: #000;">
            <div style="background: #000; color: #fff; padding: 10px; font-weight: bold; text-transform: uppercase;">
                // ANALYSIS_LOG: ${title}
            </div>
            <div style="padding: 10px; background: #f0f0f0; border-bottom: 2px solid #000; font-size: 0.9em;">
                <div>DATE: ${formattedDate}</div>
                <div>TAGS: ${tagsString}</div>
                ${authorHtml}
            </div>
             <div style="padding: 20px; line-height: 1.5;">
                <div style="font-style: italic; border-left: 4px solid #ff00ff; padding-left: 10px; margin-bottom: 20px; background: #fafafa; padding: 10px;">
                    &gt; "${quote}"
                </div>
                 <div style="background: #f0f0f0; border: 2px solid #000; padding: 10px; margin-bottom: 20px;">
                    <div style="font-weight: bold; text-transform: uppercase;">★ ${specialAbility.name}</div>
                    <div>${specialAbility.description}</div>
                </div>
                ${htmlContent}
            </div>
             <div style="background: #eee; border-top: 2px solid #000; padding: 10px; text-align: right; font-size: 0.8em;">
                <a href="https://worstofbreed.net/patterns/${post.slug}/" style="color: #000; font-weight: bold;">🔗 PERMALINK</a>
            </div>
        </div>
      `;

      return {
        title: post.data.title,
        pubDate: post.data.dateAdded,
        description: post.data.quote,
        link: `/patterns/${post.slug}/`,
        content: content,
      };
    })),
    customData: `<language>en-us</language>`,
  });
}
