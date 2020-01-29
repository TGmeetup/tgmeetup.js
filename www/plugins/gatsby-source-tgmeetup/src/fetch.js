const fetch = require('node-fetch');

const genGithubFetch = () => {
  const {
    GATSBY_GH_CLIENT_ID: GAGCI,
    GATSBY_GH_CLIENT_SECRET: GAGCS
  } = process.env;

  return (GAGCI && GAGCS)
    ? (url, ...args) => {
      url = new URL(url);
      url.searchParams.set('client_id', GAGCI);
      url.searchParams.set('client_secret', GAGCS);
      return fetch(url, ...args);
    }
    : fetch;
}

module.exports = genGithubFetch();
