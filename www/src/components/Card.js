import React, { Component } from 'react';
import styled from 'styled-components';

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
`

export const Content = styled.div`
  margin: 0;
  padding-top: 1em;
  padding-bottom: 1em;
  padding-left: 0.7em;
  padding-right: 0.7em;
  word-wrap: break-word;

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

const Card = styled.div`
  font-size: 18px;
  max-width: ${props => props.width};
  background: white;
  box-shadow: 0 0 5px #888888;
`;

Card.Title = Title;
Card.Content = Content;
Card.Item = Item;

export default Card;
