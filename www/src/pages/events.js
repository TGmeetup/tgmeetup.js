import React from 'react';
import { compose } from 'recompose';
import { graphql } from 'gatsby';
import { Grid } from 'react-flexbox-grid';
import { GoGitCommit } from 'react-icons/go';

import Link from '../elements/Link';
import SEO, { eventListToSEO } from '../components/SEO';
import Card from '../blocks/Card';
import { withLayout } from '../layouts';
import { withFadeIn } from '../components/FadeIn';

const View = ({ data: { events } }) => (
  <Grid>
    <SEO seo={eventListToSEO(events)} />
    <Card>
      <Card.Title __primary>
        <h2>All Events</h2>
      </Card.Title>
      <Card.Content>
      { events.edges.map(edge => edge.node).map(e => (
        <Card.Item key={e.id} onClick={() => {}}>
          <Link to={`/events/${e.id}`}>
            <GoGitCommit />{' '}
            {e.dateTime}{' '}
            <b>{ e.name }</b>{' '}
            <span>{ e.location.trim() || e.local_city }</span>
          </Link>
        </Card.Item>
      ))}
      </Card.Content>
    </Card>
  </Grid>
)

export default compose(
  withLayout,
  withFadeIn,
)(View);

export const query = graphql`
  query EventsQuery {
    events: allTgmeetupEvent(sort: { fields: dateTime }) {
      edges {
        node {
          id
          dateTime(fromNow: true, locale: "zh-tw")
          name
          location
        }
      }
    }
  }
`;
