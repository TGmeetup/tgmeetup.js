import L from 'leaflet';
import * as moment from 'moment';

// Fix wrong icon url
// https://github.com/Leaflet/Leaflet/issues/4968
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
