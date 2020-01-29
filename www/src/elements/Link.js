import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import modifier from '../blocks/modifier';

const LinkWithoutProps = ({
  __color_blue,
  ...restProps
}) => (
  <Link {...restProps} />
)

export default styled(LinkWithoutProps)`
  color: initial;
  text-decoration: none;

  ${modifier('__color_blue')( css`
    color: #1464e8;
  `)}
`;
