"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.persistor = void 0;

var _redux = require("redux");

var _reducer = _interopRequireDefault(require("./reducer"));

var _reduxPersist = require("redux-persist");

var _storage = _interopRequireDefault(require("redux-persist/lib/storage"));

var _autoMergeLevel = _interopRequireDefault(require("redux-persist/lib/stateReconciler/autoMergeLevel2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @Descripttion:
 * @version:
 * @Author: 唐帆
 * @Date: 2020-04-30 10:12:20
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-04-30 10:15:46
 */
// import {
//     createStore,
//     compose,
//     applyMiddleware,
// } from "redux"
// import thunk from 'redux-thunk'
var persistConfig = {
  key: 'root',
  storage: _storage["default"],
  stateReconciler: _autoMergeLevel["default"] // 查看 'Merge Process' 部分的具体情况

};
var myPersistReducer = (0, _reduxPersist.persistReducer)(persistConfig, _reducer["default"]); // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, composeEnhancers(
//     applyMiddleware(thunk)
// ))

var store = (0, _redux.createStore)(myPersistReducer);
var persistor = (0, _reduxPersist.persistStore)(store);
exports.persistor = persistor;
var _default = store;
exports["default"] = _default;