import styled, { css } from 'styled-components';
import modifier from '../blocks/modifier';

const Div = styled.div`
  ${modifier('__with_margin')( css`
    margin-top: 1em;
  `)}
`;

export default Div;
