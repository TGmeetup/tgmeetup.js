import fetch from 'node-fetch';

export async function fetchKktixEventsByGroupPkg(groupPkg = {}) {
  const group = groupPkg.registration || {};
  if (group.type !== 'kktix') {
    throw new Error(`group ${group.type} is not 'kktix'`);
  }
  return await fetchKktixEvents(group.url);
}
export async function fetchKktixEvents(kktixUrl = '') {
  if (!kktixUrl) {
    throw new Error(`url cannot be ${kktixUrl}`);
  }
  const response = await fetch(`${kktixUrl}/events.json`);
  const result = await response.json();

  console.log(result);
}

fetchKktixEvents('https://coscup2018.kktix.cc/');
