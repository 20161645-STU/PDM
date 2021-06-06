import { fromJS } from 'immutable'
// import SingleQues from '../../../view/question_bank/Questions/Single/index'
import * as constants from './constants'

const defaultState = fromJS({
  newDrwaingData: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.ADDNEWDRAWING:
      return state.set('newDrwaingData', fromJS(action.data))
    // case constants.courseInfo:
    //   return state.set('courses', fromJS(action.data))
    default:
      return state
  }
}
