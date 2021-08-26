"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _immutable = require("immutable");

var constants = _interopRequireWildcard(require("./constants"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var defaultState = (0, _immutable.fromJS)({
  detil_mes: {},
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
  partSonRelationData: [],
  dssRelationInfo: [],
  zssRelationInfo: [],
  tssRelationInfo: [],
  fileReallyData: [],
  drawReallyData: []
});

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case constants.GETDETIL:
      return state.set('detil_mes', (0, _immutable.fromJS)(action.data));

    case constants.STOREDRAWEXPAND:
      return state.set('drawExpandedKeys', (0, _immutable.fromJS)(action.data));

    case constants.STOREDRAWSELECT:
      return state.set('drawSelectedkeys', (0, _immutable.fromJS)(action.data));

    case constants.STOREPARTEXPAND:
      return state.set('partExpandedKeys', (0, _immutable.fromJS)(action.data));

    case constants.STOREPARTSELECT:
      return state.set('partSelectedkeys', (0, _immutable.fromJS)(action.data));

    case constants.STOREFILEEXPAND:
      return state.set('fileExpandedKeys', (0, _immutable.fromJS)(action.data));

    case constants.STOREFILESELECT:
      return state.set('fileSelectedkeys', (0, _immutable.fromJS)(action.data));

    case constants.STOREPROGRAMEXPAND:
      return state.set('programExpandedKeys', (0, _immutable.fromJS)(action.data));

    case constants.STOREPROGRAMSELECT:
      return state.set('programSelectedkeys', (0, _immutable.fromJS)(action.data));

    case constants.STOREFOLDERSXPAND:
      return state.set('folderExpandedKeys', (0, _immutable.fromJS)(action.data));

    case constants.STOREFOLDERSELECT:
      return state.set('folderSelectedkeys', (0, _immutable.fromJS)(action.data));

    case constants.FOLDERCONTENTDATA:
      return state.set('folderContentData', (0, _immutable.fromJS)(action.data));

    case constants.PROJECTCONTENTDATA:
      return state.set('projectContentData', (0, _immutable.fromJS)(action.data));

    case constants.FILERELATIONDATA:
      return state.set('fileRelationData', (0, _immutable.fromJS)(action.data));

    case constants.DRAWFARELATIONDATA:
      return state.set('drawFaRelationInfo', (0, _immutable.fromJS)(action.data));

    case constants.DRAWSONRELATIONDATA:
      return state.set('drawSonRelationData', (0, _immutable.fromJS)(action.data));

    case constants.PARTSONRELATIONDATA:
      return state.set('partSonRelationData', (0, _immutable.fromJS)(action.data));

    case constants.DSSRELATIONINFO:
      return state.set('dssRelationInfo', (0, _immutable.fromJS)(action.data));

    case constants.ZSSRELATIONINFO:
      return state.set('zssRelationInfo', (0, _immutable.fromJS)(action.data));

    case constants.TSSRELATIONINFO:
      return state.set('tssRelationInfo', (0, _immutable.fromJS)(action.data));

    case constants.FILEREALLYDATA:
      return state.set('fileReallyData', (0, _immutable.fromJS)(action.data));

    case constants.DRAWREALLYDATA:
      return state.set('drawReallyData', (0, _immutable.fromJS)(action.data));

    default:
      return state;
  }
};

exports["default"] = _default;