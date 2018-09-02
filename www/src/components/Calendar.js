import { map } from 'lodash'
import React from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import styled from 'styled-components';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const Wrapper = styled.div`
  overflow: scroll;

  .rbc-toolbar {
    overflow-x: scroll;
  }

  @media (max-width: 575.98px) {
    font-size: 12px;
  }
`;

const Calendar = ({
  events
}) => (
  <Wrapper>
    <BigCalendar
      events={events}
    />
  </Wrapper>
);

const sToP = ({ events }) => ({
  events: map(events, e => ({
    ...e,
    title: e.name,
    start: e.moment.toDate(),
    end: e.moment.add(2, 'hours').toDate()
  }))
});

const dToP = state => ({

});


export default connect(sToP, dToP)(Calendar);
