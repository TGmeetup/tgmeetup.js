import React, { Component } from 'react';
import { debounce } from 'lodash';

import { Input } from '../../elements/Form';

export default class DebouncedInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.value || ''
    }
  }

  componentWillMount() {

    this.debouncedOnChange = debounce(
      (text) => this.props.onChange(text),
      250,
      { maxWait: 1000 }
    )
  }

  componentWillReceiveProps(props) {
    this.setState({ text: props.value || '' })
  }

  onChange = (e) => {
    const value = e.target.value

    this.setState({ text: value });
    this.debouncedOnChange(value);
  }

  render() {
    return (
      <Input
        {...this.props}
        type="text"
        value={this.state.text}
        onChange={this.onChange}
      />
    );
  }
}
