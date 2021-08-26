import { fromJS } from 'immutable'
// import SingleQues from '../../../view/question_bank/Questions/Single/index'
import * as constants from './constants'

const defaultState = fromJS({
  newDrawingData: {},
  newFilesData: {},
  newPartsData: {},
  allProjectsInfo: [],
  allPartsInfo: [],
  allFileTypeInfo: [],
  allDrawingsInfo: [],
  allDocumentsInfo: [],
  partBomInfo: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.ADDNEWDRAWING:
      return state.set('newDrawingData', fromJS(action.data))
    case constants.ADDNEWFIELES:
      return state.set('newFilesData', fromJS(action.data))
    case constants.ADDNEWPARTS:
      return state.set('newPartsData', fromJS(action.data))
    case constants.ALLPROJECTS:
      return state.set('allProjectsInfo', fromJS(action.data))
    case constants.ALLPARTS:
      return state.set('allPartsInfo', fromJS(action.data))
    case constants.ALLFILESTYPE:
      return state.set('allFileTypeInfo', fromJS(action.data))
    case constants.ALLDRAWINGS:
      return state.set('allDrawingsInfo', fromJS(action.data))
    case constants.ALLDOCUMENTS:
      return state.set('allDocumentsInfo', fromJS(action.data))
    case constants.CREATEPARTBOM:
      return state.set('partBomInfo', fromJS(action.data))
    default:
      return state
  }
}
