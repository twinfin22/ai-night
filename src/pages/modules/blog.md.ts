import { blogTutorial } from '../../data/blog-tutorial';
import { renderTutorialMarkdown } from '../../data/render-tutorial-markdown';

export const GET = () => new Response(renderTutorialMarkdown(blogTutorial), {
  headers: {
    'Content-Type': 'text/markdown; charset=utf-8',
  },
});
