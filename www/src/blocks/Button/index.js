import styled from 'styled-components';

const Button = styled.a`
  display: inline-block;
  position: relative;
  padding-top: 1em;
  padding-bottom: 1em;
  padding-left: 3em;
  padding-right: 3em;

  color: white;
  background: ${props => props.color};

  &:hover {
    filter: brightness(80%);
  }

  &:active {
    top: 2px;
    left: 2px;
  }
`


export default Button;
