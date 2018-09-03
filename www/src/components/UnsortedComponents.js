import styled from 'styled-components';

export const ShiftedContainer = styled.div`
  z-index: 1;
  position: absolute;
  left: ${props => props.left};
  top: ${props => props.top};
`
