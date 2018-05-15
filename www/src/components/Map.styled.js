import styled, { css } from 'styled-components';

const infoBox = css`
  font-size: 18px;
  background: white;
  width: 400px;
`;

export const EventWrapper = styled.div`
  ${infoBox}
`;

export const EventTitle = styled.h2`
  margin: 0;
  padding-top: 2em;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 0.3em;
  color: white;
  background: ${props => props.color};
`

export const EventContent = styled.div`
  margin: 0;
  padding: 1em;
`

export const EventItem = styled.p`
  margin-top: 1em;
  margin-bottom: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  svg {
    ${''/* overwrite svg element style */}
    vertical-align: baseline !important;
  }
  a {
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`


export const ListWrapper = styled.div`
  ${infoBox}
`;
