import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import { compose } from 'recompose';
import { uniqBy } from 'lodash';

import styled from 'styled-components';
import { Grid } from 'react-flexbox-grid';
import { TiChevronRight, TiTicket, TiPhone } from 'react-icons/ti';

import Link from '../elements/Link';
import SEO, { groupToSEO } from '../components/SEO';
import Card from '../blocks/Card';
import Icon from '../components/Icon';
import { withLayout } from '../layouts';
import { withFadeIn } from '../components/FadeIn';
import Map from '../components/Map';

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
  <GroupInformationWrapper>
    <img src={group.logo_url} alt="group-avatar" />
    <div>
      <p>By {group.title}, {group.category.name}</p>
      <p>At {group.city}</p>
      <p>
        Registration from
        {' '}
        <a href={group.registration.url} target="_blank" rel="noopener noreferrer">
        { group.registration.type.toUpperCase() }
        </a>
      </p>
    </div>
  </GroupInformationWrapper>
)

const Group = ({ data: { group } }) => (
  <Grid>
    <SEO seo={groupToSEO(group)} />
    <Card>
      <Card.Title color={group.color}>
        <h2>{ group.title }</h2>
      </Card.Title>
      <Card.Content>
        <Card.Block>
          <Information group={group} />
        </Card.Block>
        <Card.Block __shrink>
          <p>{group.description}</p>
        </Card.Block>
        <h2><TiPhone /> Contact</h2>
        <Card.Block __shrink>
        { (group.social_media || []).map(media =>
          // Typo on Mopcon group information
          // https://github.com/TGmeetup/TGmeetup/pull/49/files
          (media.urls || media.url || []).map(url => (
            <p key={media.type + url}>
              <a href={url} target="_blank" rel="noopener noreferrer">
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
            <Link key={event.id} to={`/events/${event.id}`}>
              <Card.Item __hoverable>
                <TiChevronRight />
                {event.dateTime}
                {' '}
                <b>{event.name}</b>
              </Card.Item>
            </Link>
            ))}
            <Card.Block __fluid __size_fixed_md>
              <Map zoomToStreet
                markers={uniqBy(group.events.map(event => event.marker), 'id')}
                center={group.events[0].geocode}
              />
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

export default compose(
  withLayout,
  withFadeIn,
)(Group);


export const query = graphql`
  query GroupById($groupId: String!) {
    group: tgmeetupGroup(id: { eq:  $groupId }) {
      id
      title
      color
      logo_url
      city
      description
      keywords
      category {
        name
      }
      registration {
        type
        url
      }
      social_media {
        type
        urls
      }
      events {
        id
        name
        color
        dateTime(fromNow: true, locale: "zh-tw")
        geocode {
          lat
          lng
        }
        marker {
          id
          latlng {
            lat
            lng
          }
        }
      }
    }
  }
`;
