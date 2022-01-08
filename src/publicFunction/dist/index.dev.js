"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nowTime = nowTime;
exports.nowTimeBigInt = nowTimeBigInt;
exports.getUserName = getUserName;
exports.getUserId = getUserId;
exports.handleChange = handleChange;
exports.ejectMessage = ejectMessage;
exports.getFolderContentId = void 0;

var _cookies = require("../helpers/cookies");

var _history = _interopRequireDefault(require("../components/common/history"));

var _antd = require("antd");

var _UrlList = require("../dataModule/UrlList");

var _testBone = require("../dataModule/testBone");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var model = new _testBone.Model();

function nowTime() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var strHours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var strMinutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + strHours + seperator2 + strMinutes;
}

function nowTimeBigInt() {
  var date = new Date();
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var strHours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var strMinutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); // eslint-disable-next-line radix

  return parseInt(date.getFullYear() + month + strDate + strHours + strMinutes);
}

function getUserName() {
  if (!(0, _cookies.getCookie)("mspa_user") || (0, _cookies.getCookie)("mspa_user") === "undefined") {
    return _history["default"].push('/login');
  } else {
    return JSON.parse((0, _cookies.getCookie)("mspa_user")).username;
  }
}

function getUserId() {
  if (!(0, _cookies.getCookie)("mspa_user") || (0, _cookies.getCookie)("mspa_user") === "undefined") {
    return _history["default"].push('/login');
  } else {
    return JSON.parse((0, _cookies.getCookie)("mspa_user"))._id;
  }
}

function handleChange(value, type, me) {
  if (value === '' || value === undefined) value = null;
  var form = me.state;
  form[type] = value;
  me.setState(form);
}

function ejectMessage(text, type) {
  if (type === 'success') {
    _antd.message.success(text);
  } else if (type === 'error') {
    _antd.message.error(text);
  } else if (type === 'warning') {
    _antd.message.warning(text);
  } else {
    _antd.message.info(text);
  }
} //根据id去获取文件夹或项目里的具体内容


var getFolderContentId = function getFolderContentId(params) {
  // console.log('params', params)
  return new Promise(function (resolve, reject) {
    if (params.relationType === 'folder_own_zss' || params.relationType === 'project_own_zss') {
      model.fetch({
        id: params.target
      }, _UrlList.getAloneDrawUrl, 'get', function (res) {
        // console.log(res.data)
        resolve(res.data);
      }, function (err) {
        reject(err);
      }, false);
    } else if (params.relationType === 'folder_own_tss' || params.relationType === 'project_own_tss') {
      model.fetch({
        id: params.target
      }, _UrlList.getAlonePartUrl, 'get', function (res) {
        // console.log(res.data)
        resolve(res.data);
      }, function (err) {
        reject(err);
      }, false);
    } else if (params.relationType === 'folder_own_dss' || params.relationType === 'project_own_dss') {
      model.fetch({
        id: params.target
      }, _UrlList.getAloneDocumentUrl, 'get', function (res) {
        // console.log(res.data)
        resolve(res.data);
      }, function (err) {
        reject(err);
      }, false);
    } else if (params.relationType === 'folder_own_project' || params.relationType === 'project_own_project') {
      model.fetch({
        id: params.target
      }, _UrlList.getAloneProjectUrl, 'get', function (res) {
        // console.log(res.data)
        resolve(res.data);
      }, function (err) {
        reject(err);
      }, false);
    } else if (params.relationType === 'folder_own_folder' || params.relationType === 'project_own_folder') {
      model.fetch({
        id: params.target
      }, _UrlList.getAloneFolderUrl, 'get', function (res) {
        // console.log(res.data)
        resolve(res.data);
      }, function (err) {
        reject(err);
      }, false);
    }
  });
};

exports.getFolderContentId = getFolderContentId;