import React from 'react';
import GoMarkGitHub from 'react-icons/lib/go/mark-github';
import styled from 'styled-components';
import logo from '../logo.png';

export const headerHeight = '100px';

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
      <a
        href="https://github.com/TGmeetup/TGmeetup"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GoMarkGitHub />
      </a>
    </MenuRight>
  </Header>
)
