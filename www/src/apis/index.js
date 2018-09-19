const genGithubFetch = () => {
  const {
    REACT_APP_GH_CLIENT_ID: RAGCI,
    REACT_APP_GH_CLIENT_SECRET: RAGCS
  } = process.env;

  return (RAGCI && RAGCS)
    ? (url, ...args) => {
      url = new URL(url);
      url.searchParams.set('client_id', RAGCI);
      url.searchParams.set('client_secret', RAGCS);
      return fetch(url, ...args);
    }
    : fetch;
}

export const ghFetch = genGithubFetch();
