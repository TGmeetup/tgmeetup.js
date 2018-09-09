import React from 'react';
import styled from 'styled-components';
import Map from '../components/Map';
import { headerHeight } from '../components/Header';

const Wrapper = styled.div`
  height: calc(100vh - ${headerHeight});
  width: 100%;
`;
export default () => (
  <Wrapper>
    <Map />
  </Wrapper>
)
