import createDebug from 'debug';
import { insertEvent } from './auth';
import fetchEvents from './fetchEvent';
const logP = createDebug('my:process');
const logFetch = createDebug('my:fetch');

fetchEvents
.then(events => {
  let resolveCnt = events.length;
  const insertEventPromises = events.map(
    async event => await insertEvent(event)
  );

  return Promise
    .all(
      insertEventPromises
        .map(p => p.catch(err => {
          resolveCnt = resolveCnt - 1;
          logFetch(`${err}`);
        })
      )
    )
    .then(ps => {
      logFetch(`${resolveCnt}/${ps.length} Success`);
    })
}).then(ps => {
  logP('exit without error');
  process.exit(0);
}).catch(err => {
  console.error(`${err}`);
  process.exit(1);
})
