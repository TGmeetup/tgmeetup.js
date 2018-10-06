import React from 'react';
import Card from '../../blocks/Card';
import {
  GoLink,
  GoClock,
  GoLocation,
  GoX,
  GoOrganization
} from 'react-icons/go';
import Link from '../../elements/Link';

export default ({ event }) => (
  <Card __small __no_margin __shifted_top>
    <Card.Title color={event.color}>
      <GoX />
      <h2>
        <Link to={`/events/${event.id}`}>
          {event.name}
        </Link>
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
        {event.dateTime}
      </Card.Item>
      <Card.Item>
        <GoLocation />
        {' '}
        {event.location}
      </Card.Item>
      <Card.Item __hoverable>
        <GoOrganization />
          <Link to={`/groups/${event.group.id}`}>
          { event.group.title }
          </Link>
      </Card.Item>
    </Card.Content>
  </Card>
);
