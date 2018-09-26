import React from 'react';
import Card from '../../blocks/Card';
import {
  GoLink,
  GoClock,
  GoLocation,
  GoX,
  GoOrganization
} from 'react-icons/go';

export default ({
  event,
  onCloseClick,
  shrink = false,
}) => (
  <Card __small __no_margin __shifted_top>
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
      <Card.Item>
        <GoOrganization />{' '}
        { event.group.title }
      </Card.Item>
    </Card.Content>
  </Card>
);
