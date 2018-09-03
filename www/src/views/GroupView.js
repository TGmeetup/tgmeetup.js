import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { GoGitCommit } from 'react-icons/go';
import {
  TiLocation, TiTicket, TiRss, TiMail, TiWorld,
  TiSocialTwitter, TiSocialFacebook, TiSocialYoutube
} from 'react-icons/ti';
import Card from '../components/Card';
import { ShiftedContainer } from '../components/UnsortedComponents';
import { extractGroups } from '../redux/groups';

const Wrapper = styled.div`
  background: #f8f9fa;
  margin-top: 1em;
  width: 100%;
`

const GroupCardWrapper = styled.div`
  margin-bottom: 1em;
`

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

class GroupCard extends Component {
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

  render() {
    const { isSocialOpened, isEventOpened } = this.state;
    const { group } = this.props;

    return (
      <GroupCardWrapper>
        <Card>
          <Card.Title color={group.color}>
            <h2>{ group.name }</h2>
          </Card.Title>
          <Card.Actions>
            <Card.Action>
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
          <Card.Content>
          { isEventOpened && (
            group.events.map(event => (
              <Card.Item key={event.id}>
                <GoGitCommit />
                {event.moment.calendar()}
                {' '}
                <b>{event.name}</b>
              </Card.Item>
            ))
          )}
            <p>
            { group.description }
            </p>
          </Card.Content>
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
        </Card>
      </GroupCardWrapper>
    );
  }
}

const GroupView = ({ groups }) => (
  <Wrapper>
    <Grid>
      <Row>
      { groups.map(group => (
        <Col key={group.ref} xs={12} md={4}>
          <GroupCard group={group} />
        </Col>
      ))}
      </Row>
    </Grid>
  </Wrapper>
)

const mapStateToProps = state => ({
  groups: extractGroups(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(GroupView);
