import React from 'react';
import { Grid } from 'react-flexbox-grid';
import styled from 'styled-components';

import { Groups } from '../../components/Group';
import { GroupFilter } from '../../components/Filter';

const Wrapper = styled.div`
  background: #f8f9fa;
  padding-top: 1em;
  width: 100%;
`
const GroupView = () => (
  <Wrapper>
    <Grid>
      <GroupFilter />
      <Groups />
    </Grid>
  </Wrapper>
)

export default GroupView;
