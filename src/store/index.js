/*
 * @Descripttion:
 * @version:
 * @Author: 唐帆
 * @Date: 2020-04-30 10:12:20
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-04-30 10:15:46
 */

import {
    createStore,
    compose,
    applyMiddleware,
} from "redux"
import mainReducers from './reducer'
import thunk from 'redux-thunk'

// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

// 存储对象，默认存储到localstorage
// const persistConfig = {
//     key: 'root',
//     storage: storage
// }

// const myPersistReducer = persistReducer(persistConfig, mainReducers)

// redux调试工具配置代码
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(mainReducers, composeEnhancers(
    applyMiddleware(thunk)
))

// const enhancer = composeEnhancers(
//   applyMiddleware(thunk),
// )

//创建store
// const store = createStore(myPersistReducer, enhancer)

// 应用redux-persist以完成数据持久化
// export const persistor = persistStore(store)

export default store