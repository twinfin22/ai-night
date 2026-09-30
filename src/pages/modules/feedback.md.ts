import { renderTutorialMarkdown } from '../../data/render-tutorial-markdown';
import { feedbackTutorial } from '../../data/feedback-tutorial';

export const GET = () => new Response(renderTutorialMarkdown(feedbackTutorial), {
  headers: {
    'Content-Type': 'text/markdown; charset=utf-8',
  },
});
