import { Application, Context } from 'probot' // eslint-disable-line no-unused-vars
import Webhooks from '@octokit/webhooks';

export = (app: Application) => {
  app.on('pullrequest.opened', async (context: Context<Webhooks.WebhookPayloadPullRequest>) => {
    const pr = context.payload.pull_request;

    if (pr.base.ref === 'master') {
      const repo = context.payload.repository;
      const params = {
        owner: repo.owner.login,
        repo: repo.full_name,
        title: `[DEV] ${pr.title}`,
        head: pr.head.ref,
        base: 'development',
        body: `Ver o [PR pra master](${pr.html_url})`
      };

      console.log(`Trying to duplicate PR to ${repo.full_name}...`);
      console.log(`Params: ${JSON.stringify(params)}`);

      await context.github.pulls.create(params)
    }
  })
}
