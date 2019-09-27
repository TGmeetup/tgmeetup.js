import React from 'react';
import * as moment from 'moment';
import { compose } from 'recompose';
import { graphql, navigate } from 'gatsby';

import { Grid } from 'react-flexbox-grid';
import { TiLocation, TiCalendar } from 'react-icons/ti';

import SEO, { eventToSEO } from '../components/SEO';
import Card from '../blocks/Card';
import Button from '../blocks/Button';
import { withLayout } from '../layouts';
import { PlainMap as Map } from '../components/Map';
import { withFadeIn } from '../components/FadeIn';
import { Information as GroupInfo } from './group';

const Event = ({ data: { event } }) => (
  <Grid>
    <SEO seo={eventToSEO(event)}/>
    <Card>
      <Card.Title color={event.color}>
        <h2>{ event.name }</h2>
      </Card.Title>
      <Card.Content>
        <Card.Block __bright color={event.color}>
          <p><TiCalendar /> { moment(event.dateTime).format('HH:mm MMMDo Y (dddd)') }</p>
          <p>
            <TiLocation />
            {' '}
            <a href={`https://www.google.com/maps/?q=${encodeURI(event.location)}`} target="_blank" rel="noopener noreferrer">
              {event.location}
            </a>
          </p>
        </Card.Block>
        <Card.Block onClick={() => navigate(`/groups/${event.group.id}`)}>
          <GroupInfo group={event.group} />
        </Card.Block>
        <Card.Block __text_center>
          <Button color={event.color} href={event.link} target="_blank">前往訂票</Button>
        </Card.Block>
        {/* Data format error, need to fixed parser */}
        {( event.geocodeFromGroup === "true") &&
          <Card.Block>
            <blockquote>
              此段文字顯示表示：以下地圖為位子<b>示意圖</b>，通常表示社群/研討會所在的縣市，想得知精確的位子請<b>點擊</b>副標題的地址。
            </blockquote>
          </Card.Block>
        }
        <Card.Block __fluid __size_fixed_md>
          <Map zoomToStreet
            markers={[ event.marker ]}
            center={ event.geocode }
          />
        </Card.Block>
      </Card.Content>
    </Card>
  </Grid>
)

export default compose(
  withLayout,
  withFadeIn,
)(Event);

export const query = graphql`
  query EventById($eventId: String!) {
    event: tgmeetupEvent(id: { eq:  $eventId }) {
      id
      name
      link
      color
      local_city
      location
      geocode {
        lat
        lng
      }
      geocodeFromGroup
      dateTime
      group {
        id
        title
        logo_url
        city
        registration {
          type
          url
        }
        category {
          name
        }
      }
      marker {
        id
        color
        latlng {
          lat
          lng
        }
      }
    }
  }
`;
