import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid } from 'react-flexbox-grid';
import { compose } from 'recompose';
import styled from 'styled-components';
import { TiChartPie, TiChevronRight, TiTicket, TiPhone } from 'react-icons/ti';

import { selectGroups } from '../../redux/selectors';
import Card from '../../components/Card';
import { withFadeIn } from '../../components/FadeIn';
import Map from '../../components/SimpleMarkerMap';
import Icon from '../../components/Icon';

const GroupInformationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: gray;

  img {
    height: 100px;
    border-radius: 50%;
  }

  div {
    margin-left: 1em;
  }
`;

export const Information = ({ group }) => (
  !!group &&
  <GroupInformationWrapper>
    <img src={group.logoURL} alt="group-avatar" />
    <div>
      <p>By {group.title}, {group.category.name}</p>
      <p>At {group.city}</p>
      <p>
        Registration from
        {' '}
        <a href={group.registration.url}>
        { group.registration.type.toUpperCase() }
        </a>
      </p>
    </div>
  </GroupInformationWrapper>
)

const Group = ({ group, history }) => (
  !!group &&
  <Grid>
    <Card>
      <Card.Title color={group.color}>
        <h2>{ group.title }</h2>
      </Card.Title>
      <Card.Content>
        <Card.Block>
          <Information group={group} />
        </Card.Block>
        <Card.Block pad>
          <p>{group.description}</p>
        </Card.Block>
        <h2><TiPhone /> Contact</h2>
        <Card.Block pad>
        { (group['social-media'] || []).map(media =>
          // Typo on Mopcon group information
          // https://github.com/TGmeetup/TGmeetup/pull/49/files
          (media.urls || media.url || []).map(url => (
            <p>
              <a
                key={media.type + media.url}
                href={url}
                target="_blank"
              >
                <Icon type={media.type} />
                {` ${url}`}
              </a>
            </p>
          ))
        )}
        </Card.Block>
        { group.events.length > 0 &&
          <Fragment>
            <h2><TiTicket /> Events</h2>
            { group.events.map(event => (
            <Card.Item
              key={event.id}
              onClick={(e) => history.push(`/events/${event.id}`)}>
              <TiChevronRight />
              {event.moment.calendar()}
              {' '}
              <b>{event.name}</b>
            </Card.Item>
            ))}
            <Card.Block fluid style={{ height: '600px' }}>
              <Map geocodes={group.events.map(e => e.geocode)}/>
            </Card.Block>
          </Fragment>
        }
        <Card.Block>
          <p style={{ textAlign: 'right' }}>
          <b>keywords: </b>
          { group.keywords.join(', ') }
          </p>
        </Card.Block>
      </Card.Content>
    </Card>
  </Grid>
)

const mapStateToProps = (state, { match }) => {
  const groupId = match.params.id;

  return {
    group: selectGroups([ groupId ], state)[0],
  }
}

export default compose(
  withFadeIn,
  withRouter,
  connect(mapStateToProps),
)(Group);
