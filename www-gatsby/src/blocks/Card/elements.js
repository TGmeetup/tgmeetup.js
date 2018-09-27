import styled, { css } from 'styled-components';
import modifier from '../modifier';

export const HoverableCss = css`
  cursor: pointer;
  &:hover {
    background: lightgray;
  }
  &:active {
    background: gray;
  }
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

  ${modifier('__primary')( css`
    background: #00d1c9;
  `)}
`;

export const Content = styled.div`
  margin: 0;
  padding-top: 1em;
  padding-bottom: 1em;
  padding-left: 0.7em;
  padding-right: 0.7em;
  word-wrap: break-word;
`;

export const Block = styled.div`
  margin: 0;
  margin-left: -0.7em;
  margin-right: -0.7em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: 0.7em;
  padding-right: 0.7em;

  background: ${props => props.color};

  &:first-child {
    margin-top: -1em;
  }

  &:last-child {
    margin-bottom: -1em;
  }

  ${modifier('__size_fixed_md')( css`
    height: 600px;
  `)}

  ${modifier('__fluid')( css`
    padding: 0;
  `)}

  ${modifier('__shrink')( css`
    padding-left: 3em;
    padding-right: 3em;
  `)}

  ${modifier('__bright')( css`
    color: lightgray;
    filter: brightness(150%);

    a {
      color: inherit;
    }
  `)}

  ${modifier('__text_center')( css`
    text-align: center;
  `)}

  ${modifier('__hoverable')(HoverableCss)}

  ${modifier('onClick')(HoverableCss)}
`;

export const Item = styled.p`
  margin: 0;
  margin-left: -0.7em;
  margin-right: -0.7em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: 0.7em;
  padding-right: 0.7em;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  svg {
    padding-right: 0.7em;
  }

  a {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  ${modifier('__hoverable')(HoverableCss)}

  ${modifier('onClick')(HoverableCss)}
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

  & > svg {
    margin: .5em;
    font-size: 1.4em;
  }

  > * {
    margin: 0;
    text-overflow: ellipsis;
  }

  ${modifier('onClick')(HoverableCss)}
  ${modifier('href')(HoverableCss)}
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
`;

export const Header = styled.header`
  width: 100%;
`;

export const Footer = styled.footer`
  width: 100%;
  align-self: flex-end;
`;
