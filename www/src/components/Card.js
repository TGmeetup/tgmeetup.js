import styled, { css } from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  max-width: ${props => props.width};
  background: white;
  box-shadow: 0 0 5px #888888;

  ${props => !props.onMap && css`
    margin-top: 1em;
    margin-bottom: 1em;
  `}
`;

export const Title = styled.div`
  margin: 0;
  padding-top: 2em;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 1em;
  color: white;
  background: ${props => props.color || 'gray'};

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
`;

export const Content = styled.div`
  margin: 0;
  padding-top: 1em;
  padding-bottom: 1em;
  padding-left: 0.7em;
  padding-right: 0.7em;
  word-wrap: break-word;

`

export const Block = styled.div`
  margin: 0;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: 0.7em;
  padding-right: 0.7em;
  margin-left: -0.7em;
  margin-right: -0.7em;

  &:first-child {
    margin-top: -1em;
  }

  &:last-child {
    margin-bottom: -1em;
  }

  ${props => props.fluid && css`
    padding: 0;
  `}
`

export const Item = styled.p`
  margin: 0;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: 0.7em;
  padding-right: 0.7em;
  margin-left: -0.7em;
  margin-right: -0.7em;

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
    padding-right: 0.7em;
  }

  a {
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;


export const Action = styled.a`
  color: initial;
  padding: .5em;

  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  text-decoration: none;

  ${props =>
    props.href &&
    props.href.indexOf('mailto:') < 0 &&
    css`
      text-transform: uppercase;
    `
  }

  ${props => props.onClick && css`
    cursor: pointer;
  `}

  ${props => (props.href || props.onClick) && css`
    &:hover {
      background: lightgray;
    }
    &:active {
      background: gray;
    }
  `}

  & > svg {
    margin: .5em;
    font-size: 1.4em;
  }

  > * {
    margin: 0;
    text-overflow: ellipsis;
  }
`;


export const Actions = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: no-wrap;
  min-height: 3em;
  text-align: center;
  & > ${Action} {
    flex: 1;
    width: 0;
  }
`;

export const Badge = styled.span`
  position: absolute;
  left: calc(50% + 0.5em);
  top: 1em;
  background: lightgray;
  padding-left: 0.4em;
  padding-right: 0.4em;
  border-radius: 0.4em;
`

export const Header = styled.header`
  width: 100%;
`

export const Footer = styled.footer`
  width: 100%;
  align-self: flex-end;
`

Card.Title = Title;
Card.Content = Content;
Card.Block = Block;
Card.Item = Item;
Card.Actions = Actions;
Card.Action = Action;
Card.Badge = Badge;
Card.Header = Header;
Card.Footer = Footer;

export default Card;
