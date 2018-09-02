import React from 'react';
import GoLink from 'react-icons/lib/go/link';
import GoClock from 'react-icons/lib/go/clock';
import GoLocation from 'react-icons/lib/go/location';
import GoX from 'react-icons/lib/go/x';
import {
  EventWrapper, EventTitle,
  EventContent, EventItem,
} from './StyledComponents';

export default ({
  event,
  onCloseClick,
  shrink = false,
}) => (
  <div>
    <EventTitle
      color={event.color}
    >
      <GoX onClick={onCloseClick} />
      <h2>
        <a
          href={event.link}
          target="_blank"
        >
          {event.name}
        </a>
      </h2>
    </EventTitle>
    <EventContent>
      <EventItem>
        <GoLink />
        {' '}
        <a
          href={event.link}
          target="_blank"
        >
          {event.link}
        </a>
      </EventItem>
      <EventItem>
      <GoClock />
        {' '}
        {event.moment.calendar()}
      </EventItem>
      <EventItem>
        <GoLocation />
        {' '}
        { event.location.length <= 1 && (
          event.local_city
        )}
        { event.location.length > 1 && (
          `${event.location}, ${event.local_city}`
        )}
      </EventItem>
    </EventContent>
  </div>
);
