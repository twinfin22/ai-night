import { renderTutorialMarkdown } from '../../data/render-tutorial-markdown';
import { skillTutorial } from '../../data/skill-tutorial';

export const GET = () => new Response(renderTutorialMarkdown(skillTutorial), {
  headers: {
    'Content-Type': 'text/markdown; charset=utf-8',
  },
});
