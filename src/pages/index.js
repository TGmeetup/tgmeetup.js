import React from "react";
import styled from 'styled-components';
import { withLayout } from '../layouts';
import logo from '../logo.png';
import { headerHeight } from '../components/Header';
import FadeIn from '../components/FadeIn';
import SEO from '../components/SEO';

const Wrapper = styled.div`
  height: calc(100vh - ${headerHeight});
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  text-align: center;

  img {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  h1 {
    color: #4928ec;
    margin: 0;
    font-family: sans-serif;
    font-size: 54px;
  }
`;

const Index = () => (
  <Wrapper>
    <SEO />
    <FadeIn>
      <h1>Let's Enjoy!</h1>
      <img src={logo} alt="tgmeetup"/>
    </FadeIn>
  </Wrapper>
)

export default withLayout(Index);
