import styled, { css } from 'styled-components';

const infoBox = css`
  font-size: 18px;
  background: white;
  width: 400px;
`;

export const EventWrapper = styled.div`
  ${infoBox}
`;

export const EventTitle = styled.div`
  margin: 0;
  padding-top: 2em;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 1em;
  color: white;
  background: ${props => props.color};
  h2 {
    margin-bottom: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  svg {
    float: right;
  }
`

export const EventContent = styled.div`
  margin: 0;
  padding-top: 1em;
  padding-bottom: 1em;
`

export const EventItem = styled.p`
  margin: 0;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-right: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    background: lightgray;
  }
  &:active {
    background: gray;
  }

  svg {
    padding-left: 0.7em;
    padding-right: 0.7em;
  }

  a {
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

export const ListWrapper = styled.div`
  ${infoBox}
`;
