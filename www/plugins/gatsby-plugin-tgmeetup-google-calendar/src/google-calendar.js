const debug = require('debug');
const { google } = require('googleapis');
const clientSecret = require('../../../../client_secret.json');
const credentials = require('../../../../credentials.json');

debug_log = debug('tgmeetup:log');

const calendarId = 'tgmeetup7@gmail.com';

const auth = getAuth();

const calendar = google.calendar({ version: 'v3', auth });

function getAuth() {
  const OAuth2Client = google.auth.OAuth2;

  const { client_secret, client_id, redirect_uris } = clientSecret.installed;

  const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
  oAuth2Client.setCredentials(credentials);

  return oAuth2Client;
}

const getEventList = () => {
  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId,
        timeMin: new Date().toISOString(),
      },
      (errors, response) => resolve({ errors, response, data: response.data })
    );
  })
}

const createEvent = resource => {
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


const insertEvent = async (event) => {
  debug_log(event.insertByCreate ? 'Create' : 'Update', event.name);

  const resource = {
    id: event.id,
    summary: event.name,
    description: event.link,
    location: event.location ? `${event.location}, ${event.local_city}` : '',
    start: { dateTime: event.dateTime },
    end: { dateTime: event.dateTime }
  };

  if (event.insertByCreate) {
    try {
      return await createEvent(resource);
    } catch (error) {
      debug_log(`${event.name} ${event.id} ${error}`);
      if (error.code === 409) { // id already exists
        debug_log(`Id in [${event.name}] already exists, try inserting by update`);
        return await updateEvent(resource);
      }
      throw error;
    }
  } else {
    return await updateEvent(resource);
  }
}

module.exports = {
  getEventList,
  insertEvent
};

