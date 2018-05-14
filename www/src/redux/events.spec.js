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
})
