import React from 'react';
import styled from 'styled-components';
import Map from '../components/Map';
import { headerHeight } from '../components/Header';
import { footerHeight } from '../components/Footer';

const Wrapper = styled.div`
  height: calc(100vh - ${headerHeight} - ${footerHeight});
  width: 100%;
`;
export default () => (
  <Wrapper>
    <Map />
  </Wrapper>
)
