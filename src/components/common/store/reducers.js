import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
  detil_mes: {},
  drawExpandedKeys: {},
  drawSelectedkeys: {},
  partExpandedKeys: {},
  partSelectedkeys: {},
  fileExpandedKeys: {},
  fileSelectedkeys: {},
  programExpandedKeys: {},
  programSelectedkeys: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.GETDETIL:
      return state.set('detil_mes', fromJS(action.data))
    case constants.STOREDRAWEXPAND:
      return state.set('drawExpandedKeys', fromJS(action.data))
    case constants.STOREDRAWSELECT:
      return state.set('drawSelectedkeys', fromJS(action.data))
    case constants.STOREPARTEXPAND:
      return state.set('partExpandedKeys', fromJS(action.data))
    case constants.STOREPARTSELECT:
      return state.set('partSelectedkeys', fromJS(action.data))
    case constants.STOREFILEEXPAND:
      return state.set('fileExpandedKeys', fromJS(action.data))
    case constants.STOREFILESELECT:
      return state.set('fileSelectedkeys', fromJS(action.data))
    case constants.STOREPROGRAMEXPAND:
      return state.set('programExpandedKeys', fromJS(action.data))
    case constants.STOREPROGRAMSELECT:
      return state.set('programSelectedkeys', fromJS(action.data))
    default:
      return state
  }
}
