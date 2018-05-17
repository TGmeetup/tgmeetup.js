const fs = require('fs');
const fetch = require('node-fetch');
const RSS = require('rss');
const mkdirp = require('mkdirp');

fetch('https://api.github.com/repos/TGmeetup/tgmeetup.js/issues?labels=Event&state=open')
.then(res => {
  if (res.status !== 200) {
    return res.json().then(({ message }) => { throw message });
  }
  return res.json()
})
.then(issues => {
  const events = issues
    .map(issue => extractEvent(issue))
    .filter(event => event !== undefined);

  console.log(`Parsing events ${events.length}/${issues.length} success`);

  return events;
})
.then(events => {
  const feed = new RSS({
    title: 'TGmeetup',
    description: `A collection set of technical groups' information`,
    feed_url: 'https://api.github.com/repos/TGmeetup/tgmeetup.js/issues?labels=Event&state=open',
    site_url: 'https://tgmeetup.github.io/'
  });

  events.forEach(event => feed.item(eventToItem(event)));

  return feed;
})
.then(feed => {
  mkdirp('./build');

  fs.writeFileSync(
    './build/rss.xml',
    feed.xml({ indent: true }),
    { flag: 'w+'}
  );
})
.catch(err => {
  console.error(err);
  process.exit(1);
})

const extractEvent = issue => {
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
}

const eventToItem = event => ({
  title: event.title,
  description: event.link,
  url: event.html_url,
  guid: event.id,
  categories: [],
  author: event.groupRef.split('/').splice(-1).pop(),
  date: new Date(event.created_at),
  lat: event.geocode.lat,
  long: event.geocode.lng,
})

