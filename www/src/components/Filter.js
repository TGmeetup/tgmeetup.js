import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { TiDocumentText, TiLocation } from 'react-icons/ti';

import Card from './Card';
import * as actions from '../redux/actions';
import { selectFilters } from '../redux/selectors';

const FilterIcon = ({ filter }) => {
  let Icon = TiDocumentText;
  if (filter.name === 'city') {
    Icon = TiLocation;
  }
  return <Icon />;
}

class _GroupFilter extends Component {
  render() {
    const { filters } = this.props;
    const { toggleFilter } = this.props;
    return (filters.length > 0 &&
      <Card.Actions>
      { filters.map(filter => (
        <Card.Action
          key={filter.name}
          onClick={(e) => toggleFilter({ [filter.name]: filter.value })}
        >
          <FilterIcon filter={filter} />
          <span>{ filter.value }</span>
        </Card.Action>
      ))}
      </Card.Actions>
    )
  }
}

const mapStateToProps = state => ({
  filters: selectFilters(state.filters),
})

export const GroupFilter = connect(
  mapStateToProps,
  actions
)(_GroupFilter);
