import React from 'react';
import styled from 'styled-components';
import { GoMarkGithub, GoRss, GoCalendar } from 'react-icons/go';

export const footerHeight = '1.5em';

const Footer = styled.footer`
  position: relative;
  height: ${footerHeight};
  z-index: 1;
  box-shadow: 0 0 9px #888888;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled.div`
  margin-right: 2em;

`

export default () => (
  <Footer>
    <Item>
      <a
        href="https://github.com/TGmeetup/TGmeetup"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GoMarkGithub />
        {' '}
        GitHub
      </a>
    </Item>
    <Item>
      <a
        href="rss.xml"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GoRss />
        {' '}
        RSS
      </a>
    </Item>
    <Item>
      <a
        href="https://calendar.google.com/calendar?cid=dGdtZWV0dXA3QGdtYWlsLmNvbQ"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GoCalendar />
        {' '}
        Google Calendar
      </a>
    </Item>
  </Footer>
)
