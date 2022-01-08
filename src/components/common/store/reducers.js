import { fromJS } from 'immutable'
import * as constants from './constants'
// const projectContentData = sessionStorage.getItem('projectContentData') ? sessionStorage.getItem('projectContentData') : []
const defaultState = fromJS({
  detil_mes: [],
  drawExpandedKeys: {},
  drawSelectedkeys: {},
  partExpandedKeys: {},
  partSelectedkeys: {},
  fileExpandedKeys: {},
  fileSelectedkeys: {},
  programExpandedKeys: {},
  programSelectedkeys: {},
  folderExpandedKeys: {},
  folderSelectedkeys: {},
  folderContentData: [],
  projectContentData: [],
  fileRelationData: [],
  drawFaRelationInfo: [],
  drawSonRelationData: [],
  partFaRelationData: [],
  partSonRelationData: [],
  dssRelationInfo: [],
  zssRelationInfo: [],
  tssRelationInfo: [],
  projectRelationInfo: [],
  fileReallyData: [],
  drawReallyData: [],
  partReallyData: []
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
    case constants.STOREFOLDERSXPAND:
      return state.set('folderExpandedKeys', fromJS(action.data))
    case constants.STOREFOLDERSELECT:
      return state.set('folderSelectedkeys', fromJS(action.data))
    case constants.FOLDERCONTENTDATA:
      return state.set('folderContentData', fromJS(action.data))
    case constants.PROJECTCONTENTDATA:
      return state.set('projectContentData', fromJS(action.data))
    case constants.FILERELATIONDATA:
      return state.set('fileRelationData', fromJS(action.data))
    case constants.DRAWFARELATIONDATA:
      return state.set('drawFaRelationInfo', fromJS(action.data))
    case constants.DRAWSONRELATIONDATA:
      return state.set('drawSonRelationData', fromJS(action.data))
    case constants.PARTFARELATIONDATA:
      return state.set('partFaRelationData', fromJS(action.data))
    case constants.PARTSONRELATIONDATA:
      return state.set('partSonRelationData', fromJS(action.data))
    case constants.DSSRELATIONINFO:
      return state.set('dssRelationInfo', fromJS(action.data))
    case constants.ZSSRELATIONINFO:
      return state.set('zssRelationInfo', fromJS(action.data))
    case constants.TSSRELATIONINFO:
      return state.set('tssRelationInfo', fromJS(action.data))
    case constants.PROJECTRELATIONINFO:
      return state.set('projectRelationInfo', fromJS(action.data))
    case constants.FILEREALLYDATA:
      return state.set('fileReallyData', fromJS(action.data))
    case constants.DRAWREALLYDATA:
      return state.set('drawReallyData', fromJS(action.data))
    case constants.PARTREALLYDATA:
      return state.set('partReallyData', fromJS(action.data))
    default:
      return state
  }
}
