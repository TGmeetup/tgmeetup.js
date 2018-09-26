import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { GoGitCommit } from 'react-icons/go';
import {
  TiLocation, TiTicket, TiRss, TiMail, TiWorld,
  TiSocialTwitter, TiSocialFacebook, TiSocialYoutube
} from 'react-icons/ti';
import styled from 'styled-components';

import { NonStyleLink } from './';
import Card from '../blocks/Card';
import FadeIn from './FadeIn';
import { ShiftedContainer } from './UnsortedComponents';
import { selectGroups } from '../redux/selectors';
import * as actions from '../redux/actions';

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

const LongTextEllipse = styled.p`
  line-height: 1.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const SocialMediaCard = ({ socials = [] }) => (
  <Card>
    <Card.Content>
    { socials.map(social => {
      let Icon = TiRss;
      if (social.type === 'twitter') {
        Icon =  TiSocialTwitter;
      } else if (social.type === 'facebook') {
        Icon = TiSocialFacebook;
      } else if (social.type === 'youtube') {
        Icon = TiSocialYoutube;
      }
      return (
        <Card.Item key={social.type}>
          <a
            href={(social.urls || social.url)[0]}
            target="_blank"
          >
            <Icon />
            <span>{(social.urls || social.url)[0]}</span>
          </a>
        </Card.Item>
      );
    })}
    </Card.Content>
  </Card>
)

export class GroupCard extends Component {
  state = {
    isSocialOpened: false,
    isEventOpened: false
  }

  toggleSocial = () => {
    this.setState(state => ({
      isSocialOpened: !state.isSocialOpened,
    }));
  }

  toggleEvent = () => {
    this.setState(state => ({
      isEventOpened: !state.isEventOpened,
    }));
  }

  handleEventClick = (event) => {
    this.props.activeOnlyOneEvent(event);
    this.props.activeOnlyOneMarker(event.latlngStr);
    this.props.history.push('/map');
  }

  render() {
    const { isSocialOpened, isEventOpened } = this.state;
    const { group } = this.props;
    const { toggleFilter } = this.props;
    return (
      <GroupCardWrapper>
        <Card>
          <Card.Title color={group.color}>
            <NonStyleLink to={`/groups/${group.id}`}>
              <h2>{ group.title }</h2>
            </NonStyleLink>
          </Card.Title>
          <Card.Header>
            <Card.Actions>
              <Card.Action
                onClick={
                  () => toggleFilter({ city: group.city })
                }
              >
                <TiLocation />
                <span>{ group.city }</span>
              </Card.Action>
              <Card.Action
                onClick={this.toggleEvent}
              >
                <TiTicket />
                <Card.Badge>{group.events.length}</Card.Badge>
                <span>Events</span>
              </Card.Action>
            </Card.Actions>
          </Card.Header>
          <Card.Content>
          { isEventOpened && (
            group.events.map(event => (
              <Card.Item
                key={event.id}
                onClick={() => this.handleEventClick(event)}
              >
                <GoGitCommit />
                {event.moment.calendar()}
                {' '}
                <b>{event.name}</b>
              </Card.Item>
            ))
          )}
            <LongTextEllipse lines={3}>
            { group.description }
            </LongTextEllipse>
          </Card.Content>
          <Card.Footer>
            <Card.Actions>
            { group.contact && (
              <Card.Action
                href={`mailto:${group.contact}`}
              >
                <TiMail />
                <span>Mail</span>
              </Card.Action>
            )}
              <Card.Action
                onClick={this.toggleSocial}
              >
                <TiRss />
                <span>Social</span>
                { isSocialOpened && (
                  <ShiftedContainer
                    left="100%"
                    top={0}
                  >
                    <SocialMediaCard
                      socials={group['social-media']}
                    />
                  </ShiftedContainer>
                )}
              </Card.Action>
              <Card.Action
                target="_blank"
                href={group.registration.url}
              >
                <TiWorld />
                <p>{ group.registration.type }</p>
              </Card.Action>
            </Card.Actions>
          </Card.Footer>
        </Card>
      </GroupCardWrapper>
    );
  }
}

export class _Groups extends Component {
  render() {
    const { groups, ...restProps } = this.props;
    return (
      <Row style={{ position: 'relative' }}>
      { groups.filter(group => group.events.length > 0).map(group => (
        <Col key={group.id} xs={12} md={4}>
          <FadeIn>
            <GroupCard group={group} {...restProps}/>
          </FadeIn>
        </Col>
      ))}
      { groups.filter(group => group.events.length === 0).map(group => (
        <Col key={group.id} xs={12} md={4}>
          <FadeIn>
            <GroupCard group={group} {...restProps}/>
          </FadeIn>
        </Col>
      ))}
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  groups: selectGroups(state.groups.allIds, state)
})

export const Groups = withRouter(connect(
  mapStateToProps,
  actions
)(_Groups));
