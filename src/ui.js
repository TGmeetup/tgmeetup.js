import fetchEvent from './fetchEvent';
import blessed from 'blessed';

export const screen = blessed.screen({
  fullUnicode: true,
  smartCSR: true
})

export const messageBox = blessed.box({
  width: '50%',
  height: 3,
  border: {
    type: 'line'
  },
  top: 'center',
  left: 'center'
});

export const messageText = blessed.box({
  parent: messageBox,
  top: 'center',
  left: 1,
  right: 1,
  height: 1,
  align: 'center',
  content: '{bold}Fetching Data ...{/bold}',
  tags: true,
});

export const eventTable = blessed.listtable({
  width: screen.width,
  height: screen.height,
  border: { type: 'line' },
  data: null,
  align: 'left',
  style: {
    header: {
      fg: 'lightblue',
      bold: true,
    },
    cell: {
      hover: {
        bg: 'green'
      },
      select: {
        bg: 'green'
      }
    }
  },
  scrollable: true,
  alwaysScroll: true,
  scrollbar: {
    ch: ' ',
    inverse: true
  },
  key: true,
  vi: true,
  mouse: true,
  tags: true,
})

screen.append(eventTable);
screen.append(messageBox);

screen.on('keypress', function(ch, key) {
  if (key.name === 'q' || key.name === 'escape') {
    return process.exit(0);
  }
});

