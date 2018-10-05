const { createHash } = require('crypto');
const fetch = require('./fetch');

const fetchPackageJson = async (ghGroupDir) => {
  const packageJsonUrl = ghGroupDir.filter(f => f.name === 'package.json').shift()
  if (!packageJsonUrl) return console.error('packageJsonUrl not found');

  return fetch(packageJsonUrl.download_url)
    .then(res => res.json())
    .catch(err => console.error(err));
}

const fetchGroup = (group) =>
  fetch(group)
    .then(res => res.json())
    .catch(err => console.error(err));

const fetchEvents = (retry = 3) =>
  fetch('https://api.github.com/repos/TGmeetup/tgmeetup.js/issues?labels=Event&state=open')
    .then(res => res.json())
    .then(issues => issues.map(issue => {
      const reDetailText = /<details>((?:.|[\r\n])*?)<\/detail>/gm;
      const { body } = issue;

      const eventStr = reDetailText.exec(body)[1];
      const event = JSON.parse(unescape(eventStr));

      return {
        title: issue.title,
        ...event,
        id: issue.id,
        issueId: issue.id,
        latlngStr: JSON.stringify(event.geocode),
        dateTime: new Date(event.datetime),
        createAt: issue.created_at,
      };
    }))
    .then(events => events.sort((a, b) => a.dateTime - b.dateTime))
    .catch(err => {
      console.error('Retry:', retry, err);
      if (retry > 0) {
        return fetchEvents(retry - 1)
      }
    });

module.exports = {
  fetchGroup,
  fetchEvents,
}
