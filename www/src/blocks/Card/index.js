import styled, { css } from 'styled-components';
import modifier from '../modifier';
import {
  Title,
  Content,
  Block,
  Item,
  Actions, Action,
  Badge,
  Header, Footer,
} from './elements';

const Card = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 1em;
  margin-bottom: 1em;

  font-size: 18px;
  background: white;
  box-shadow: 0 0 5px #888888;

  ${modifier('__small')( css`
    width: 400px;
  `)}

  ${modifier('__no_margin')( css`
    margin: 0;
  `)}

  ${modifier('__shifted_top')( css`
    position: absolute;
    top: 20px;
    left: 20px;
  `)}
`;

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
