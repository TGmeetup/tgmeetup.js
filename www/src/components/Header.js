import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TiMap, TiGroup } from 'react-icons/ti';
import logo from '../logo.png';

export const headerHeight = '8vh';

const Header = styled.header`
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

const MenuRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  svg {
    height: 100%;
    width: 1em;
    margin-right: 1em;
  }
`

export default () => (
  <Header>
    <img src={logo} alt="tgmeetup" />
    <MenuRight>
      <Link to="/map">
        <TiMap />
      </Link>
      <Link to="/group">
        <TiGroup />
      </Link>

    </MenuRight>
  </Header>
)
