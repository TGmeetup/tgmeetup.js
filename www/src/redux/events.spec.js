/* global it, describe, expect */
import * as _ from './events';

const reducer = _.default;

describe('action', () => {
  it('should create add event action', () => {
    const expectAction = {
      type: _.ADD_EVENT,
      payload: {}
    }

    expect(_.addEvent({})).toEqual(expectAction);
  })

  it('should create toogle event action', () => {
    const expectAction = {
      type: _.TOGGLE_EVENT,
      payload: {}
    }

    expect(_.toggleEvent({})).toEqual(expectAction);
  })
})


describe('reducer', () => {
  const initState = {
    '7288': {
      issue: {
        id: 7288
      },
      selected: false,
    },
    '888': {
      issue: {
        id: 888,
      },
      selected: true,
    }
  };
  it('should handle addEvent', () => {
    expect(
      reducer(
        {},
        _.addEvent({
          issue: {
            id: 9527
          }
        })
      )
    ).toEqual({
      '9527': {
        id: 9527,
        issue: {
          id: 9527
        },
        selected: false,
      }
    })
  })

  it('should handle toggleEvent', () => {
    expect(
      reducer(
        initState,
        _.toggleEvent({
          id: 888,
          selected: true,
        })
      )
    ).toEqual({
      ...initState,
      '888': {
        id: 888,
        selected: false
      }
    })
  })

  it('should handle toggleEvent with id not in state', () => {
    expect(
      reducer(
        initState,
        _.toggleEvent({
          id: 666,
          selected: true,
        })
      )
    ).toEqual(
      initState
    );
  })
})
