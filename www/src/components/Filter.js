import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TiLocation, TiWorld, TiNews, TiGroup } from 'react-icons/ti';
import styled, { css } from 'styled-components';
import { debounce } from 'lodash';

import * as actions from '../redux/actions';
import { selectFilters, selectCategories, selectCountries } from '../redux/selectors';

const genFilter = (name ,state = [], Icon, { filter, toggleFilter }) => () => (
  state.length > 0 && (
    <FilterRow>
      <Icon />
      { state.map(s => (
        <Chip
          key={s.id}
          onClick={(e) => toggleFilter({ [name]: s.id })}
          active={s.id === filter[name]}
        >
        { s.name }
        </Chip>
      ))}
    </FilterRow>
  )
)

const FilterRow = styled.div`
  width: 100%;
  margin-bottom: 0.5em;
  svg {
    font-size: 2em;
    vertical-align: middle;
  }
`;

const ChipCss = css`
  background-color: lightgray;
  padding: 0.5em 1em;
  border-radius: 1em;
  margin-left: 1em;

  ${props => props.onClick && css`
    cursor: pointer;

    &:hover {
      background: gray;
    }

    &:active {
      background: darkslategray;
    }

  `}

  ${props => props.active && css`
    background: #435bff;

    &:hover {
      background: #2f41be;
    }

    &:active {
      background: #1c276c;
    }
  `}
`;

const Chip = styled.span`
  ${ChipCss}
`;

const InputChip = styled.input.attrs({
  placeholder: 'Enter group name'
})`
  ${ChipCss}
  display: inline;
  font-size: 1em;
  border: 0;
`;

class NameFilter extends Component {

  componentWillMount() {
    const { toggleFilter } = this.props;

    this.debouncedOnChange = debounce(
      (title) => toggleFilter({ title }),
      250,
      { maxWait: 1000 }
    );
  }
  onChange = (e) => this.debouncedOnChange(e.target.value)

  render() {
    return (
      <FilterRow>
        <TiGroup />
        <InputChip
          onChange={this.onChange}
        />
      </FilterRow>
    );
  }
}

class LocationFilter extends Component {
  state = {
    text: ''
  }

  componenDidMount() {
    const { city = '' } = this.props.filter;
    this.setState({ text: city });
  }

  componentWillMount() {
    const { toggleFilter } = this.props;

    this.debouncedOnChange = debounce(
      (city) => toggleFilter({ city }),
      250,
      { maxWait: 1000 }
    );
  }

  componentWillReceiveProps(props) {
    const { city = '' } = this.props.filter;
    this.setState({ text: city });
  }

  onChange = (e) => {
    this.setState({ text: e.target.value});
    this.debouncedOnChange(e.target.value);
  }

  render() {
    return (
      <FilterRow>
        <TiLocation />
        <InputChip
          value={this.state.text}
          onChange={this.onChange}
        />
      </FilterRow>
    );
  }
}

const GroupFilterWrapper = styled.section`
  margin-bottom: 1em;
`

class _GroupFilter extends Component {
  render() {
    const { filter, categories, countries } = this.props;
    const { toggleFilter } = this.props;

    const CategoryFilter = genFilter(
      'category',
      categories,
      TiNews,
      {
        filter,
        toggleFilter
      }
    );

    const CountryFilter = genFilter(
      'country',
      countries,
      TiWorld,
      {
        filter,
        toggleFilter
      }
    );

    return (
      <GroupFilterWrapper>
        <NameFilter toggleFilter={toggleFilter} />
        <LocationFilter filter={filter} toggleFilter={toggleFilter} />
        <CategoryFilter />
        <CountryFilter />
      </GroupFilterWrapper>
    )
  }
}

const mapStateToProps = state => ({
  categories: selectCategories(state, false),
  countries: selectCountries(state, false),
  filter: state.filters,
  filters: selectFilters(state.filters),
})

export const GroupFilter = connect(
  mapStateToProps,
  actions
)(_GroupFilter);
