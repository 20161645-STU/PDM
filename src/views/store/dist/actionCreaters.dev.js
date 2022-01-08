"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveDelteRleationParts = exports.saveRleationParts = exports.saveSearchParts = exports.createPartBom = exports.creatNewParts = exports.creatNewFiles = exports.creatNewDrawing = exports.getAllDocuments = exports.getAllFilesType = exports.getAllDrawings = exports.getAllParts = exports.handleContentId = exports.getProjectContentId = exports.getAllProjects = exports.getAllBillTypes = void 0;

var constants = _interopRequireWildcard(require("./constants"));

var _immutable = require("immutable");

var _testBone = require("../../dataModule/testBone");

var _UrlList = require("../../dataModule/UrlList");

var _index = require("../../publicFunction/index");

var _this = void 0;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var model = new _testBone.Model(); // import { Route } from 'react-router-dom'
// import Index from '../../index'
// import React from 'react'
// import { fromJS } from 'immutable'
// import { getUserUuid } from '../../../publicFunction/index'
// const model = new Model()
// export const dispatchBreadcrumbList = (data) => ({
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
//获取所有的项目信息
;

exports.getAllBillTypes = getAllBillTypes;

var AllProjectsInfo = function AllProjectsInfo(result) {
  return {
    type: constants.ALLPROJECTS,
    data: result
  };
};

var getAllProjects = function getAllProjects() {
  return function (dispatch) {
    model.fetch({}, _UrlList.getAllProjectUrl, 'get', function (res) {
      // console.log(111, res)
      var result = res.data;
      dispatch(AllProjectsInfo(result));
    }, function () {
      console.log('获取项目信息失败！');
    }, false);
  };
}; //储存项目里面的所有数据信息


exports.getAllProjects = getAllProjects;

var AloneProjectAllInfo = function AloneProjectAllInfo(result) {
  return {
    type: constants.ALONEPROJECTALLINFO,
    data: result
  };
}; //获取项目所有内容的id


var getProjectContentId = function getProjectContentId(params) {
  return function (dispath) {
    var me = _this;
    model.fetch({
      folder_id: params
    }, _UrlList.getProjectContentUrl, 'get', function (res) {
      me.handleContentId(res.data).then(function (res) {
        // console.log('projectContentData', res)
        dispath(AloneProjectAllInfo(res));
      });
    }, function () {// console.log(111)
      // message.error('获取文件夹内容失败！')
    }, false);
  };
}; //对项目内容id循环获取具体数据


exports.getProjectContentId = getProjectContentId;

var handleContentId = function handleContentId(params) {
  var projectContentData, i;
  return regeneratorRuntime.async(function handleContentId$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          projectContentData = [];
          i = 0;

        case 2:
          if (!(i < params.length)) {
            _context.next = 11;
            break;
          }

          _context.t0 = projectContentData;
          _context.next = 6;
          return regeneratorRuntime.awrap((0, _index.getFolderContentId)(params[i]));

        case 6:
          _context.t1 = _context.sent;

          _context.t0.push.call(_context.t0, _context.t1);

        case 8:
          i++;
          _context.next = 2;
          break;

        case 11:
          return _context.abrupt("return", Promise.all(projectContentData));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
}; //或得所有零件信息


exports.handleContentId = handleContentId;

var AllPartsInfo = function AllPartsInfo(result) {
  return {
    type: constants.ALLPARTS,
    data: result
  };
};

var getAllParts = function getAllParts() {
  return function (dispatch) {
    model.fetch({}, _UrlList.getAllPartsUrl, 'get', function (res) {
      // console.log(111, res)
      var result = res.data;
      dispatch(AllPartsInfo(result));
    }, function () {
      console.log('获取零件信息失败！');
    }, false);
  };
}; //或得所有的图纸


exports.getAllParts = getAllParts;

var AllDrawingsInfo = function AllDrawingsInfo(result) {
  return {
    type: constants.ALLDRAWINGS,
    data: result
  };
};

var getAllDrawings = function getAllDrawings() {
  return function (dispatch) {
    model.fetch({}, _UrlList.getAllDrawsUrl, 'get', function (res) {
      // console.log(111, res)
      var result = res.data;
      dispatch(AllDrawingsInfo(result));
    }, function () {
      console.log('获取图纸信息失败！');
    }, false);
  };
}; //获取所有的文档类型信息


exports.getAllDrawings = getAllDrawings;

var AllFilesTypeInfo = function AllFilesTypeInfo(result) {
  return {
    type: constants.ALLFILESTYPE,
    data: result
  };
};

var getAllFilesType = function getAllFilesType() {
  return function (dispatch) {
    model.fetch({}, _UrlList.documentTypeUrl, 'get', function (res) {
      // console.log(111, res)
      var result = res.data;
      dispatch(AllFilesTypeInfo(result));
    }, function () {
      console.log('获取文档类型信息失败！');
    }, false);
  };
}; //获得文档的信息


exports.getAllFilesType = getAllFilesType;

var AllFilesInfo = function AllFilesInfo(result) {
  return {
    type: constants.ALLDOCUMENTS,
    data: result
  };
};

var getAllDocuments = function getAllDocuments() {
  return function (dispatch) {
    model.fetch({}, _UrlList.getAllDocumentsUrl, 'get', function (res) {
      // console.log(111, res)
      var result = res.data;
      dispatch(AllFilesInfo(result));
    }, function () {
      console.log('获取文档信息失败！');
    }, false);
  };
}; //接收新图纸信息


exports.getAllDocuments = getAllDocuments;

var creatNewDrawing = function creatNewDrawing(data) {
  return {
    type: constants.ADDNEWDRAWING,
    data: (0, _immutable.fromJS)(data)
  };
}; //接收新文档信息


exports.creatNewDrawing = creatNewDrawing;

var creatNewFiles = function creatNewFiles(data) {
  return {
    type: constants.ADDNEWFIELES,
    data: (0, _immutable.fromJS)(data)
  };
}; //接受新零件信息


exports.creatNewFiles = creatNewFiles;

var creatNewParts = function creatNewParts(data) {
  return {
    type: constants.ADDNEWPARTS,
    data: (0, _immutable.fromJS)(data)
  };
}; //创建BOM


exports.creatNewParts = creatNewParts;

var createPartBom = function createPartBom(data) {
  return {
    type: constants.CREATEPARTBOM,
    data: (0, _immutable.fromJS)(data)
  };
}; //存储创建bom的搜索零件


exports.createPartBom = createPartBom;

var saveSearchParts = function saveSearchParts(data) {
  return {
    type: constants.SAVESEARCHPARTS,
    data: (0, _immutable.fromJS)(data)
  };
}; //存储要添加bom关系的零件


exports.saveSearchParts = saveSearchParts;

var saveRleationParts = function saveRleationParts(data) {
  return {
    type: constants.SAVERELATIONPARTS,
    data: (0, _immutable.fromJS)(data)
  };
}; //存储要删除bom的零件


exports.saveRleationParts = saveRleationParts;

var saveDelteRleationParts = function saveDelteRleationParts(data) {
  return {
    type: constants.SAVEDELETERELATIONPARTS,
    data: (0, _immutable.fromJS)(data)
  };
};

exports.saveDelteRleationParts = saveDelteRleationParts;