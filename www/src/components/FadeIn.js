import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    transform: translate(0, 3em);
    opacity: 0;
  }
  to {
    transform: translate(0, 0);
    opacity: 1;
  }
`;

const FadeIn = styled.div`
  animation: ${fadeIn} 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
`;

export const withFadeIn = Component => {
  const C = (props) =>
    <FadeIn>
      <Component {...props} />
    </FadeIn>

  C.displayName = `witFadeIn(${Component.displayName || Component.name})`;
  C.WrappedComponent = Component;

  return hoistNonReactStatic(C, Component);
}

export default FadeIn;
