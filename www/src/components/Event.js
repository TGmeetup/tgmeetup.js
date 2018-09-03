import React from 'react';
import GoLink from 'react-icons/lib/go/link';
import GoClock from 'react-icons/lib/go/clock';
import GoLocation from 'react-icons/lib/go/location';
import GoX from 'react-icons/lib/go/x';
import Card from './Card';

export default ({
  event,
  onCloseClick,
  shrink = false,
}) => (
  <Card width='400px'>
    <Card.Title color={event.color}>
      <GoX onClick={onCloseClick} />
      <h2>
        <a
          href={event.link}
          target="_blank"
        >
          {event.name}
        </a>
      </h2>
    </Card.Title>
    <Card.Content>
      <Card.Item>
        <GoLink />
        {' '}
        <a
          href={event.link}
          target="_blank"
        >
          {event.link}
        </a>
      </Card.Item>
      <Card.Item>
      <GoClock />
        {' '}
        {event.moment.calendar()}
      </Card.Item>
      <Card.Item>
        <GoLocation />
        {' '}
        { event.location.length <= 1 && (
          event.local_city
        )}
        { event.location.length > 1 && (
          `${event.location}, ${event.local_city}`
        )}
      </Card.Item>
    </Card.Content>
  </Card>
);
