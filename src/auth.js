import createDebug from 'debug';
import { google } from 'googleapis';
import clientSecret from '../client_secret.json';
import credentials from '../credentials.json';
const logf = createDebug('my:func:exec');
const logt = createDebug('my:func:trace');
const logd = createDebug('my:func:data');

export const calendarId = 'tgmeetup7@gmail.com';

const auth = getAuth();
const calendar = google.calendar({ version: 'v3', auth });

function getAuth() {
  const OAuth2Client = google.auth.OAuth2;

  const { client_secret, client_id, redirect_uris } = clientSecret.installed;

  const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
  oAuth2Client.setCredentials(credentials);

  return oAuth2Client;
}

const createEvent = resource => {
  logf('createEvent', resource.summary);
  return new Promise((resolve, reject) => {
    calendar.events.insert({
      auth,
      calendarId,
      resource,
    }, (err, event) => {
      if (err) return reject(err);
      return resolve(event);
    })
  });
}

const updateEvent = resource => {
  logf('updateEvent', resource.summary);
  return new Promise((resolve, reject) => {
    calendar.events.update({
      auth,
      calendarId,
      eventId: resource.id,
      resource,
    }, (err, event) => {
      if (err) return reject(err);
      return resolve(event);
    })
  });
}


export const insertEvent = async (event) => {
  logf('insertEvent', event.name);
  logd(event);
  const resource = {
    id: event.id,
    summary: event.name,
    description: event.link,
    location: event.location ? `${event.location}, ${event.local_city}` : '',
    start: { dateTime: event.datetime },
    end: { dateTime: event.datetime }
  };

  try {
    return await createEvent(resource);
  } catch (err) {
    if (err.code === 409) { // id already exists
      logt('id exists, try update');
      return await updateEvent(resource);
    }
    throw err;
  }
}

export default auth;


