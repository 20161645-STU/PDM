"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPartReallyData = exports.getDrawReallyData = exports.getFileReallyData = exports.storeProjectRelationInfo = exports.storeTssRelationInfo = exports.storeZssRelationInfo = exports.storeDssRelationInfo = exports.getPartSonRelations = exports.getPartFaRelations = exports.getDrawSonRelations = exports.getDrawFaRelations = exports.getFileFaRelations = exports.storeProjectAllDatas = exports.storeFolderAllDatas = exports.storeFolderSelectedkeys = exports.storeFolderExpandedKeys = exports.storeFileSelectedkeys = exports.storeFileExpandedKeys = exports.storePragramSelectedkeys = exports.storeProgramExpandedKeys = exports.storePartSelectedkeys = exports.storePartExpandedKeys = exports.storeDrawSelectedkeys = exports.storeDrawExpandedKeys = exports.sentDetilType = exports.getAllBillTypes = void 0;

var constants = _interopRequireWildcard(require("./constants"));

var _immutable = require("immutable");

var _testBone = require("../../../dataModule/testBone");

var _UrlList = require("../../../dataModule/UrlList");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var model = new _testBone.Model(); // export const dispatchBreadcrumbList = (data) => ({
//   type: constants.breadcrumbList,
//   data: fromJS(data)
// })

var getAllBillTypes = function getAllBillTypes() {} // model.fetch(
//   { creater: 'c6825ed3afa9411694b62e61119544ed' },
//   billTypes,
//   'POST',
//   function(response) {
//     console.log(response)
//   },
//   // eslint-disable-next-line handle-callback-err
//   function(error) {
//     return
//   },
//   false
// )
//定义初始的详情类型
;

exports.getAllBillTypes = getAllBillTypes;

var sentDetilType = function sentDetilType(data) {
  return {
    type: constants.GETDETIL,
    data: (0, _immutable.fromJS)(data)
  };
};

exports.sentDetilType = sentDetilType;

var storeDrawExpandedKeys = function storeDrawExpandedKeys(data) {
  return {
    type: constants.STOREDRAWEXPAND,
    data: (0, _immutable.fromJS)(data)
  };
};

exports.storeDrawExpandedKeys = storeDrawExpandedKeys;

var storeDrawSelectedkeys = function storeDrawSelectedkeys(data) {
  return {
    type: constants.STOREDRAWSELECT,
    data: (0, _immutable.fromJS)(data)
  };
};

exports.storeDrawSelectedkeys = storeDrawSelectedkeys;

var storePartExpandedKeys = function storePartExpandedKeys(data) {
  return {
    type: constants.STOREPARTEXPAND,
    data: (0, _immutable.fromJS)(data)
  };
};

exports.storePartExpandedKeys = storePartExpandedKeys;

var storePartSelectedkeys = function storePartSelectedkeys(data) {
  return {
    type: constants.STOREPARTSELECT,
    data: (0, _immutable.fromJS)(data)
  };
};

exports.storePartSelectedkeys = storePartSelectedkeys;

var storeProgramExpandedKeys = function storeProgramExpandedKeys(data) {
  return {
    type: constants.STOREPROGRAMEXPAND,
    data: (0, _immutable.fromJS)(data)
  };
};

exports.storeProgramExpandedKeys = storeProgramExpandedKeys;

var storePragramSelectedkeys = function storePragramSelectedkeys(data) {
  return {
    type: constants.STOREPROGRAMSELECT,
    data: (0, _immutable.fromJS)(data)
  };
};

exports.storePragramSelectedkeys = storePragramSelectedkeys;

var storeFileExpandedKeys = function storeFileExpandedKeys(data) {
  return {
    type: constants.STOREFILEEXPAND,
    data: (0, _immutable.fromJS)(data)
  };
};

exports.storeFileExpandedKeys = storeFileExpandedKeys;

var storeFileSelectedkeys = function storeFileSelectedkeys(data) {
  return {
    type: constants.STOREFILESELECT,
    data: (0, _immutable.fromJS)(data)
  };
};

exports.storeFileSelectedkeys = storeFileSelectedkeys;

var storeFolderExpandedKeys = function storeFolderExpandedKeys(data) {
  return {
    type: constants.STOREFOLDERSXPAND,
    data: (0, _immutable.fromJS)(data)
  };
};

exports.storeFolderExpandedKeys = storeFolderExpandedKeys;

var storeFolderSelectedkeys = function storeFolderSelectedkeys(data) {
  return {
    type: constants.STOREFOLDERSELECT,
    data: (0, _immutable.fromJS)(data)
  };
}; //文件夹所有数据


exports.storeFolderSelectedkeys = storeFolderSelectedkeys;

var storeFolderAllDatas = function storeFolderAllDatas(result) {
  return {
    type: constants.FOLDERCONTENTDATA,
    data: result
  };
}; //项目所有数据


exports.storeFolderAllDatas = storeFolderAllDatas;

var storeProjectAllDatas = function storeProjectAllDatas(result) {
  return {
    type: constants.PROJECTCONTENTDATA,
    data: result
  };
}; //文档关联数据


exports.storeProjectAllDatas = storeProjectAllDatas;

var fileRelationInfo = function fileRelationInfo(result) {
  return {
    type: constants.FILERELATIONDATA,
    data: result
  };
}; //获取该文档的关联数据


var getFileFaRelations = function getFileFaRelations(params) {
  return function (dispatch) {
    model.fetch({
      target: params
    }, _UrlList.getFileFaRelationUrl, 'get', function (res) {
      // console.log('关联数据', res.data)
      var result = res.data;
      dispatch(fileRelationInfo(result));
    }, function () {
      console.log('获取文档关联信息失败！');
    }, false);
  };
}; //获取图纸父关联数据


exports.getFileFaRelations = getFileFaRelations;

var drawFaRelationInfo = function drawFaRelationInfo(result) {
  return {
    type: constants.DRAWFARELATIONDATA,
    data: result
  };
}; //获取图纸的父关联数据


var getDrawFaRelations = function getDrawFaRelations(params) {
  return function (dispatch) {
    model.fetch({
      target: params
    }, _UrlList.getDrawFaRelationUrl, 'get', function (res) {
      // console.log('父关联数据', res.data)
      var result = res.data;
      dispatch(drawFaRelationInfo(result));
    }, function () {
      console.log('获取图纸关联信息失败！');
    }, false);
  };
}; //获取图纸子关联数据


exports.getDrawFaRelations = getDrawFaRelations;

var drawSonRelationInfo = function drawSonRelationInfo(result) {
  return {
    type: constants.DRAWSONRELATIONDATA,
    data: result
  };
}; //获取图纸的子关联数据


var getDrawSonRelations = function getDrawSonRelations(params) {
  return function (dispatch) {
    model.fetch({
      folder_id: params
    }, _UrlList.getDrawSonRelationUrl, 'get', function (res) {
      // console.log('子关联数据', res.data)
      var result = res.data;
      dispatch(drawSonRelationInfo(result));
    }, function () {
      console.log('获取图纸关联信息失败！');
    }, false);
  };
}; //获取零件父关联数据


exports.getDrawSonRelations = getDrawSonRelations;

var partFaRelationInfo = function partFaRelationInfo(result) {
  return {
    type: constants.PARTFARELATIONDATA,
    data: result
  };
}; //获取零件的父关联数据


var getPartFaRelations = function getPartFaRelations(params) {
  return function (dispatch) {
    model.fetch({
      target: params
    }, _UrlList.getPartFaRelationUrl, 'get', function (res) {
      // console.log('父关联数据', res.data)
      var result = res.data;
      dispatch(partFaRelationInfo(result));
    }, function () {
      console.log('获取零件关联信息失败！');
    }, false);
  };
}; //获取零件子关联数据


exports.getPartFaRelations = getPartFaRelations;

var partSonRelationInfo = function partSonRelationInfo(result) {
  return {
    type: constants.PARTSONRELATIONDATA,
    data: result
  };
}; //获取零件的子关联数据


var getPartSonRelations = function getPartSonRelations(params) {
  return function (dispatch) {
    model.fetch({
      folder_id: params
    }, _UrlList.getPartSonRelationUrl, 'get', function (res) {
      // console.log('零件子关联数据', res.data)
      var result = res.data;
      dispatch(partSonRelationInfo(result));
    }, function () {
      console.log('获取零件关联信息失败！');
    }, false);
  };
}; //存储文档关联数据


exports.getPartSonRelations = getPartSonRelations;

var storeDssRelationInfo = function storeDssRelationInfo(data) {
  return {
    type: constants.DSSRELATIONINFO,
    data: (0, _immutable.fromJS)(data)
  };
}; //存储图纸关联数据


exports.storeDssRelationInfo = storeDssRelationInfo;

var storeZssRelationInfo = function storeZssRelationInfo(data) {
  return {
    type: constants.ZSSRELATIONINFO,
    data: (0, _immutable.fromJS)(data)
  };
}; //存储零件关联数据


exports.storeZssRelationInfo = storeZssRelationInfo;

var storeTssRelationInfo = function storeTssRelationInfo(data) {
  return {
    type: constants.TSSRELATIONINFO,
    data: (0, _immutable.fromJS)(data)
  };
}; //存储项目关联数据


exports.storeTssRelationInfo = storeTssRelationInfo;

var storeProjectRelationInfo = function storeProjectRelationInfo(data) {
  return {
    type: constants.PROJECTRELATIONINFO,
    data: (0, _immutable.fromJS)(data)
  };
}; //获取文档真实数据


exports.storeProjectRelationInfo = storeProjectRelationInfo;

var fileReallyData = function fileReallyData(result) {
  return {
    type: constants.FILEREALLYDATA,
    data: result
  };
}; //获取文档magodb的数据


var getFileReallyData = function getFileReallyData(params) {
  // console.log(params)
  return function (dispatch) {
    model.fetch({}, "".concat(_UrlList.getFileReallyDataUrl).concat(params), 'get', function (res) {
      // console.log('datatrue', res)
      var result = res.data;
      dispatch(fileReallyData(result));
    }, function () {
      console.log('获取文档信息失败！');
    }, false);
  };
}; //获取图纸真实数据


exports.getFileReallyData = getFileReallyData;

var drawReallyData = function drawReallyData(result) {
  return {
    type: constants.DRAWREALLYDATA,
    data: result
  };
}; //获取图纸magodb的数据


var getDrawReallyData = function getDrawReallyData(params) {
  // console.log(params)
  return function (dispatch) {
    model.fetch({}, "".concat(_UrlList.getFileReallyDataUrl).concat(params), 'get', function (res) {
      // console.log('datatrue', res)
      var result = res.data;
      dispatch(drawReallyData(result));
    }, function () {
      console.log('获取图纸信息失败！');
    }, false);
  };
}; //获取零件真实数据


exports.getDrawReallyData = getDrawReallyData;

var partReallyData = function partReallyData(result) {
  return {
    type: constants.PARTREALLYDATA,
    data: result
  };
}; //获取零件magodb的数据


var getPartReallyData = function getPartReallyData(params) {
  // console.log(params)
  return function (dispatch) {
    model.fetch({}, "".concat(_UrlList.getFileReallyDataUrl).concat(params), 'get', function (res) {
      // console.log('datatrue', res)
      var result = res.data;
      dispatch(partReallyData(result));
    }, function () {
      console.log('获取零件信息失败！');
    }, false);
  };
};

exports.getPartReallyData = getPartReallyData;