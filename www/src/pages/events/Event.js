import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { Grid } from 'react-flexbox-grid';
import { TiLocation, TiCalendar } from 'react-icons/ti';

import { selectEvents } from '../../redux/selectors';

import Card from '../../blocks/Card';
import Button from '../../blocks/Button';
import { PlainMap as Map } from '../../components/Map';
import { withFadeIn } from '../../components/FadeIn';
import { Information as GroupInfo } from '../groups/Group';


const Event = ({ event, history }) => (
  !!event &&
  <Grid>
    <Card>
      <Card.Title color={event.color}>
        <h2>{ event.name }</h2>
      </Card.Title>
      <Card.Content>
        <Card.Block __bright color={event.color}>
          <p>
            <TiCalendar />
            {' '}
            {event.moment.format('HH:mm')}
            {' '}
            {event.moment.format('MM/DD/YYYY')}
            {' '}
            ({event.moment.format('dddd')})
          </p>
          <p>
              <TiLocation />
              {' '}
              <a href={`https://www.google.com/maps/?q=${encodeURI(event.location)}`} target="_blank">
                {event.location}
              </a>
          </p>
        </Card.Block>
        <Card.Block onClick={() => history.push(`/groups/${event.group.id}`)}>
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
            center={event.geocode}
          />
        </Card.Block>
      </Card.Content>
    </Card>
  </Grid>
)

const mapStateToProps = (state, { match }) => {
  const eventId = match.params.id;

  return {
    event: selectEvents([ eventId ], state)[0],
  }
}

export default compose(
  withFadeIn,
  withRouter,
  connect(mapStateToProps)
)(Event);
