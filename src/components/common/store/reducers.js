import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
  detil_mes: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.GETDETIL:
      return state.set('detil_mes', fromJS(action.data))
    default:
      return state
  }
}
