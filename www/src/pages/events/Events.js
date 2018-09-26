import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-flexbox-grid';
import { GoGitCommit } from 'react-icons/go';

import Card from '../../blocks/Card';
import Div from '../../elements/Div';
import Form, { Input } from '../../elements/Form';
import { NonStyleLink } from '../../components';
import { withFadeIn } from '../../components/FadeIn';
import DebouncedInput from '../../components/Form/DebouncedInput';

import { selectEvents } from '../../redux/selectors';
import * as actions from '../../redux/actions';

const View = ({ events, filters, toggleEventFilter, ...rests }) => (
  <Grid>
    <Div __with_margin>
      <Form>
        <b>Name: </b>
        <DebouncedInput
          value={filters.name}
          onChange={(text) => toggleEventFilter({ name: text })}
        />
      </Form>
    </Div>
    <Card>
      <Card.Title>
        <h2>All Events</h2>
      </Card.Title>
      <Card.Content>
      { events.map(e => (
        <Card.Item key={e.id} onClick={() => {}}>
          <NonStyleLink to={`/events/${e.id}`}>
            <GoGitCommit />{' '}
            {e.moment.calendar()}{' '}
            <b>{ e.name }</b>{' '}
            <span>{ e.location.trim() || e.local_city }</span>
          </NonStyleLink>
        </Card.Item>
      ))}
      </Card.Content>
    </Card>
  </Grid>
)

const mapStateToProps = (state) => ({
  events: selectEvents(state.events.allIds, state),
  filters: state.events.filters
})

export default withFadeIn(connect(mapStateToProps, actions)(View));
