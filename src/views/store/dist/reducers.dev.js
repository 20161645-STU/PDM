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
  newDrawingData: {},
  newFilesData: {},
  newPartsData: {},
  allProjectsInfo: [],
  allPartsInfo: [],
  allFileTypeInfo: [],
  allDrawingsInfo: [],
  allDocumentsInfo: [],
  partBomInfo: {},
  part_datas: [],
  addRelationParts: [],
  deleteRelationParts: [],
  AloneProjectAllInfo: []
});

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case constants.ADDNEWDRAWING:
      return state.set('newDrawingData', (0, _immutable.fromJS)(action.data));

    case constants.ADDNEWFIELES:
      return state.set('newFilesData', (0, _immutable.fromJS)(action.data));

    case constants.ADDNEWPARTS:
      return state.set('newPartsData', (0, _immutable.fromJS)(action.data));

    case constants.ALLPROJECTS:
      return state.set('allProjectsInfo', (0, _immutable.fromJS)(action.data));

    case constants.ALLPARTS:
      return state.set('allPartsInfo', (0, _immutable.fromJS)(action.data));

    case constants.ALLFILESTYPE:
      return state.set('allFileTypeInfo', (0, _immutable.fromJS)(action.data));

    case constants.ALLDRAWINGS:
      return state.set('allDrawingsInfo', (0, _immutable.fromJS)(action.data));

    case constants.ALLDOCUMENTS:
      return state.set('allDocumentsInfo', (0, _immutable.fromJS)(action.data));

    case constants.CREATEPARTBOM:
      return state.set('partBomInfo', (0, _immutable.fromJS)(action.data));

    case constants.SAVESEARCHPARTS:
      return state.set('part_datas', (0, _immutable.fromJS)(action.data));

    case constants.SAVERELATIONPARTS:
      return state.set('addRelationParts', (0, _immutable.fromJS)(action.data));

    case constants.SAVEDELETERELATIONPARTS:
      return state.set('deleteRelationParts', (0, _immutable.fromJS)(action.data));

    case constants.ALONEPROJECTALLINFO:
      return state.set('AloneProjectAllInfo', (0, _immutable.fromJS)(action.data));

    default:
      return state;
  }
};

exports["default"] = _default;