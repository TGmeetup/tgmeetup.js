import React from 'react';
import * as moment from 'moment';
import { GoGitCommit } from 'react-icons/go';
import Card from '../../blocks/Card';
import Link from '../../elements/Link';

const List = ({
  color,
  events,
}) => (
  <Card __small __no_margin>
    <Card.Title color={color}>
      <h2>
        Events on
        {' '}
        { events[0].location }
      </h2>
    </Card.Title>
    <Card.Content>
    { events.map(event => (
      <Link key={event.id} to={`/events/${event.id}`}>
        <Card.Item __hoverable>
          <GoGitCommit />
          {moment(event.dateTime).calendar()}
          {' '}
          <b>{event.name}</b>
        </Card.Item>
      </Link>
    ))}
    </Card.Content>
  </Card>
)


export default List;
