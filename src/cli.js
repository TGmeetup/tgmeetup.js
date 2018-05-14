import { screen, messageBox, messageText, eventTable  } from './ui';
import fetchEvent from './fetchEvent';

screen.render();

fetchEvent
.then(events => {
  messageBox.hide();

  events.sort((e1, e2) => new Date(e1.datetime) - new Date(e2.datetime));

  eventTable.setData([
    ['Name', 'Date', 'Time', 'Location', 'Link'],
    ...events.map((event, i) => {

      const location = event.location.length < 2
        ? event.local_city
        : `${event.location} @ ${event.local_city}`;
      const date = event.datetime.split('T')[0];

      return [
        `{yellow-fg}${event.name}{/yellow-fg}`,
        date,
        new Date(event.datetime).toLocaleTimeString(),
        location,
        event.link,
      ];
    })
  ])

  eventTable.focus();

  screen.render();
})
.catch(err => {
  messageText.setContent(`${err}`);
  screen.render();
})
