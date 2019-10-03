import React from 'react';
import Helmet from 'react-helmet';
import * as moment from 'moment';
import { withPrefix } from 'gatsby';
import { createGlobalStyle } from 'styled-components';
import hoistNonReactStatic from 'hoist-non-react-statics';
import Header from '../components/Header';

import 'leaflet/dist/leaflet.css';
import './override-leaflet-popup.css';

// Fix wrong icon url
// https://github.com/Leaflet/Leaflet/issues/4968
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const locale = window
  ? (window.navigator.userLanguage || window.navigator.language).toLowerCase()
  : 'en';

import(`moment/locale/${locale}`).then(
  () => moment.locale(locale)
)

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
`;

const Layout =  ({ children }) => (
  <div>
    <Helmet>
    <link
      rel="icon"
      href={withPrefix('/logo.png')}
      type="image/png"
    />
    </Helmet>
    <GlobalStyle />
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
