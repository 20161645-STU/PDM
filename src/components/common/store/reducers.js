import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
  detil_mes: {},
  expandedKeys: {},
  selectedkeys: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.GETDETIL:
      return state.set('detil_mes', fromJS(action.data))
    case constants.STOREEXPAND:
      return state.set('expandedKeys', fromJS(action.data))
    case constants.STORESELECT:
      return state.set('selectedkeys', fromJS(action.data))
    default:
      return state
  }
}
