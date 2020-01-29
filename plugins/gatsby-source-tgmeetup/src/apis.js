const escapeRegexp = require('escape-string-regexp');
const fetch = require('./fetch');

const fetchGroupUrls = () => Promise.resolve([]);

const fetchGroup = (groupUrl) => {
  const reGroupRef = new RegExp(
    escapeRegexp('https://raw.githubusercontent.com/TGmeetup/TGmeetup/master/') +
    '(.+)' +
    escapeRegexp('/package.json')
  );
  const result = reGroupRef.exec(groupUrl);

  const ref = result && result[1];
  return fetch(groupUrl)
    .then(res => res.json())
    .then(group => ({
      ...group,
      ref,
      color: group.color || 'gray',
    }))
    .catch(err => console.error(err));
}

const fetchEvents = (retry = 3) =>
  fetch('https://api.github.com/repos/TGmeetup/TGmeetup/issues?labels=Event&state=open')
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
  fetchGroupUrls,
  fetchGroup,
  fetchEvents,
}
