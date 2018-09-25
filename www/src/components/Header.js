import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { TiMap, TiGroup, TiTicket } from 'react-icons/ti';
import logo from '../logo.png';
import { GoMarkGithub, GoRss, GoCalendar } from 'react-icons/go';

export const headerHeight = '8vh';

const Wrapper = styled.header`
  position: relative;
  height: ${headerHeight};
  z-index: 1;
  text-align: center;
  box-shadow: 0 0 9px #888888;
  img {
    height: 100%;
    user-drag: none;
  }
`

const Menu = styled.ul`
  position: absolute;
  padding: 0;
  margin: 0;
  list-style-type: none;
  top: 0;
  height: 100%;
  padding-left: 0.5em;
  padding-right: 0.5em;
`

const Item = styled.li`
  float: left;
  height: 100%;
  padding-left: 0.5em;
  padding-right: 0.5em;
  svg {
    height: 100%;
    width: 1em;
  }

  &:hover {
    background: lightgray;
  }

  &:active {
    background: gray;
  }

  ${props => props.active && css`
    background: lightgray;
  `}
`

const MenuLeft = styled(Menu)`
  left: 0;
`

const MenuRight = styled(Menu)`
  right: 0;
`

const Header = ({ location }) => (
  <Wrapper>
    <img src={logo} alt="tgmeetup" />
    <MenuLeft>
      <Link to="/map">
        <Item active={location.pathname === '/map'}>
            <TiMap />
        </Item>
      </Link>
      <Link to="/groups">
        <Item active={location.pathname === '/groups'}>
          <TiGroup />
        </Item>
      </Link>
      <Link to="/events">
        <Item active={location.pathname === '/events'}>
          <TiTicket />
        </Item>
      </Link>
    </MenuLeft>
    <MenuRight>
      <a
        href="https://github.com/TGmeetup/TGmeetup"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Item>
            <GoMarkGithub />
        </Item>
      </a>
      <a
        href="rss.xml"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Item>
          <GoRss />
        </Item>
      </a>
      <a
        href="https://calendar.google.com/calendar?cid=dGdtZWV0dXA3QGdtYWlsLmNvbQ"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Item>
          <GoCalendar />
        </Item>
      </a>
    </MenuRight>
  </Wrapper>
)

export default withRouter(Header);
