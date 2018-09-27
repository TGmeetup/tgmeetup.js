import React from 'react';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';
import { injectGlobal } from 'styled-components';
import hoistNonReactStatic from 'hoist-non-react-statics';
import Header from '../components/Header';

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
  }
`

const Layout =  ({ children }) => (
  <div>
    <Helmet>
    <link
      rel="icon"
      href={withPrefix('/logo.png')}
      type="image/png"
    />
    </Helmet>
    <Header />
    { children }
  </div>
)

export const withLayout = Component => {
  const C = (props) =>
    <Layout>
      <Component {...props} />
    </Layout>
  C.displayName = `withLayout(${Component.displayName || Component.name})`;
  C.WrappedComponent = Component;

  return hoistNonReactStatic(C, Component);
}

export default Layout;
