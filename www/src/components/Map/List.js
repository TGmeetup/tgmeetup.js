import React from 'react';
import { GoGitCommit, GoX } from 'react-icons/go';
import Card from '../../blocks/Card';
import Event from './Event';

const List = ({
  color,
  events,
  onCloseClick,
  toggleEvent,
}) => (
  <Card __small __no_margin>
    <Card.Title color={color}>
      <GoX onClick={() => onCloseClick()} />
      <h2>
        Events on
        {' '}
        { events[0].location.length > 1
          ? events[0].location
          : events[0].local_city
        }
      </h2>
    </Card.Title>
    <Card.Content>
    { events.map(event => (
      <Card.Item
        key={event.id}
        onClick={() => toggleEvent(event)}
      >
        <GoGitCommit />
        {event.moment.calendar()}
        {' '}
        <b>{event.name}</b>
      </Card.Item>
    ))}
    </Card.Content>
    { events.filter(e => e.isSelected).map((event, i) => (
      <Event
        key={event.id}
        event={event}
        onCloseClick={() => toggleEvent(event)}
      />
    ))}
  </Card>
)


export default List;
