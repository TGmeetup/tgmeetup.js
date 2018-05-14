import createDebug from 'debug';
import fetch from 'node-fetch';
const logFetch = createDebug('my:fetch');

export const issuesUrl = 'https://api.github.com/repos/TGmeetup/tgmeetup.js/issues?labels=Event&state=open';

export default fetch(issuesUrl)
.then(res => {
  if (res.status !== 200)
    throw res.json()
  return res.json()
})
.then(issues => {
  const events = issues.map(issue => {
    const reDetailText = /<details>((?:.|[\r\n])*?)<\/detail>/gm;

    try {
      const eventStr = reDetailText.exec(issue.body)[1];

      return {
        ...JSON.parse(unescape(eventStr)),
        ...issue,
      };
    } catch (err) {
      console.error(`Error: ${issue.title}\n  reason: ${err}`);
      return undefined;
    }
  })
  .filter(event => event !== undefined)

  logFetch(`Parsing events ${events.length}/${issues.length} success`);

  return events;
})
