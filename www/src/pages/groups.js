import React from 'react';
import styled from 'styled-components';
import { graphql, navigate } from 'gatsby';

import { Grid, Row, Col } from 'react-flexbox-grid';
import { GoGitCommit } from 'react-icons/go';
import { TiLocation, TiTicket, TiWorld } from 'react-icons/ti';

import Link from '../elements/Link';
import SEO, { groupListToSEO } from '../components/SEO';
import Card from '../blocks/Card';
import FadeIn from '../components/FadeIn';
import { withLayout } from '../layouts';

const GroupCardWrapper = styled.div`
  margin-bottom: 1em;

  ${Card} {
    height: 500px;
  }

  ${Card.Title} {
    padding-top: 0;
    display: flex;
    align-items: flex-end;
    height: 6em;
    flex: 0 0 auto;
  }

  ${Card.Content} {
    flex: 1 1 auto;
    overflow: auto;
  }
`;

const GroupCard = ({ group }) => (
  <GroupCardWrapper>
    <Card>
      <Card.Title color={group.color}>
        <Link to={`/groups/${group.id}`}>
          <h2>{ group.title }</h2>
        </Link>
      </Card.Title>
      <Card.Content>
      { group.events.map(event => (
        <Card.Item
          key={event.id}
          onClick={() => navigate(`/events/${event.id}`)}
        >
          <GoGitCommit />
          {event.dateTime}
          {' '}
          <b>{event.name}</b>
        </Card.Item>
      ))}
      </Card.Content>
      <Card.Footer>
        <Card.Actions>
          <Card.Action>
            <TiLocation />
            <span>{ group.city }</span>
          </Card.Action>
          <Card.Action
            target="_blank"
            href={group.registration.url}
          >
            <TiWorld />
            <p>{ group.registration.type }</p>
          </Card.Action>
          <Card.Action onClick={() => navigate(`/groups/${group.id}`)}>
              <TiTicket />
              <Card.Badge>{group.events.length}</Card.Badge>
              <span>Events</span>
          </Card.Action>
        </Card.Actions>
      </Card.Footer>
    </Card>
  </GroupCardWrapper>
);

const Wrapper = styled.div`
  background: #f8f9fa;
  padding-top: 1em;
  width: 100%;
`
const GroupView = ({ data: { groups } }) => (
  <Wrapper>
    <SEO seo={groupListToSEO(groups)} />
    <Grid>
      <Row>
      { groups.edges.map(edge => edge.node).filter(group => group.events.length > 0).map(group => (
        <Col key={group.id} xs={12} md={4}>
          <FadeIn>
            <GroupCard group={group} />
          </FadeIn>
        </Col>
      ))}
      { groups.edges.map(edge => edge.node).filter(group => group.events.length === 0).map(group => (
        <Col key={group.id} xs={12} md={4}>
          <FadeIn>
            <GroupCard group={group} />
          </FadeIn>
        </Col>
      ))}
      </Row>
    </Grid>
  </Wrapper>
)

export default withLayout(GroupView);

export const query = graphql`
  query GroupsQuery {
    groups: allTgmeetupGroup {
      edges {
        node {
          id
          title
          color
          city
          description
          registration {
            type
            url
          }
          contact
          events {
            id
            name
            dateTime(fromNow: true, locale: "zh-tw")
          }
        }
      }
    }
  }
`;
