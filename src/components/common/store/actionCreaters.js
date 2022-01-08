import * as constants from './constants'
import { fromJS } from 'immutable'

import { Model } from '../../../dataModule/testBone'
import {
  getFileFaRelationUrl,
  getDrawFaRelationUrl,
  getDrawSonRelationUrl,
  getFileReallyDataUrl,
  getPartSonRelationUrl,
  getPartFaRelationUrl
} from '../../../dataModule/UrlList'


const model = new Model()

// export const dispatchBreadcrumbList = (data) => ({
//   type: constants.breadcrumbList,
//   data: fromJS(data)
// })

export const getAllBillTypes = () => {
  // model.fetch(
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
}

//定义初始的详情类型
export const sentDetilType = data => ({
  type: constants.GETDETIL,
  data: fromJS(data)
})

export const storeDrawExpandedKeys = data => ({
  type: constants.STOREDRAWEXPAND,
  data: fromJS(data)
})

export const storeDrawSelectedkeys = data => ({
  type: constants.STOREDRAWSELECT,
  data: fromJS(data)
})

export const storePartExpandedKeys = data => ({
  type: constants.STOREPARTEXPAND,
  data: fromJS(data)
})

export const storePartSelectedkeys = data => ({
  type: constants.STOREPARTSELECT,
  data: fromJS(data)
})

export const storeProgramExpandedKeys = data => ({
  type: constants.STOREPROGRAMEXPAND,
  data: fromJS(data)
})

export const storePragramSelectedkeys = data => ({
  type: constants.STOREPROGRAMSELECT,
  data: fromJS(data)
})

export const storeFileExpandedKeys = data => ({
  type: constants.STOREFILEEXPAND,
  data: fromJS(data)
})

export const storeFileSelectedkeys = data => ({
  type: constants.STOREFILESELECT,
  data: fromJS(data)
})

export const storeFolderExpandedKeys = data => ({
  type: constants.STOREFOLDERSXPAND,
  data: fromJS(data)
})

export const storeFolderSelectedkeys = data => ({
  type: constants.STOREFOLDERSELECT,
  data: fromJS(data)
})


//文件夹所有数据
export const storeFolderAllDatas = (result) => ({
  type: constants.FOLDERCONTENTDATA,
  data: result
})

//项目所有数据
export const storeProjectAllDatas = (result) => ({
  type: constants.PROJECTCONTENTDATA,
  data: result
})


//文档关联数据
const fileRelationInfo = (result) => ({
  type: constants.FILERELATIONDATA,
  data: result
})

//获取该文档的关联数据
export const getFileFaRelations = (params) => {
  return (dispatch) => {
    model.fetch(
      {target: params},
      getFileFaRelationUrl,
      'get',
      function (res) {
        // console.log('关联数据', res.data)
        const result = res.data
        dispatch(fileRelationInfo(result))
      },
      function () {
        console.log('获取文档关联信息失败！')
      },
      false
    )
  }
}

//获取图纸父关联数据
const drawFaRelationInfo = (result) => ({
  type: constants.DRAWFARELATIONDATA,
  data: result
})

//获取图纸的父关联数据
export const getDrawFaRelations = (params) => {
  return (dispatch) => {
    model.fetch(
      {target: params},
      getDrawFaRelationUrl,
      'get',
      function (res) {
        // console.log('父关联数据', res.data)
        const result = res.data
        dispatch(drawFaRelationInfo(result))
      },
      function () {
        console.log('获取图纸关联信息失败！')
      },
      false
    )
  }
}

//获取图纸子关联数据
const drawSonRelationInfo = (result) => ({
  type: constants.DRAWSONRELATIONDATA,
  data: result
})

//获取图纸的子关联数据
export const getDrawSonRelations = (params) => {
  return (dispatch) => {
    model.fetch(
      {folder_id: params},
      getDrawSonRelationUrl,
      'get',
      function (res) {
        // console.log('子关联数据', res.data)
        const result = res.data
        dispatch(drawSonRelationInfo(result))
      },
      function () {
        console.log('获取图纸关联信息失败！')
      },
      false
    )
  }
}


//获取零件父关联数据
const partFaRelationInfo = (result) => ({
  type: constants.PARTFARELATIONDATA,
  data: result
})

//获取零件的父关联数据
export const getPartFaRelations = (params) => {
  return (dispatch) => {
    model.fetch(
      {target: params},
      getPartFaRelationUrl,
      'get',
      function (res) {
        // console.log('父关联数据', res.data)
        const result = res.data
        dispatch(partFaRelationInfo(result))
      },
      function () {
        console.log('获取零件关联信息失败！')
      },
      false
    )
  }
}



//获取零件子关联数据
const partSonRelationInfo = (result) => ({
  type: constants.PARTSONRELATIONDATA,
  data: result
})

//获取零件的子关联数据
export const getPartSonRelations = (params) => {
  return (dispatch) => {
    model.fetch(
      {folder_id: params},
      getPartSonRelationUrl,
      'get',
      function (res) {
        // console.log('零件子关联数据', res.data)
        const result = res.data
        dispatch(partSonRelationInfo(result))
      },
      function () {
        console.log('获取零件关联信息失败！')
      },
      false
    )
  }
}


//存储文档关联数据
export const storeDssRelationInfo = data => ({
  type: constants.DSSRELATIONINFO,
  data: fromJS(data)
})

//存储图纸关联数据
export const storeZssRelationInfo = data => ({
  type: constants.ZSSRELATIONINFO,
  data: fromJS(data)
})

//存储零件关联数据
export const storeTssRelationInfo = data => ({
  type: constants.TSSRELATIONINFO,
  data: fromJS(data)
})

//存储项目关联数据
export const storeProjectRelationInfo = data => ({
  type: constants.PROJECTRELATIONINFO,
  data: fromJS(data)
})

//获取文档真实数据
const fileReallyData = (result) => ({
  type: constants.FILEREALLYDATA,
  data: result
})

//获取文档magodb的数据
export const getFileReallyData = (params) => {
  // console.log(params)
  return (dispatch) => {
    model.fetch(
      {},
      `${getFileReallyDataUrl}${params}`,
      'get',
      function (res) {
        // console.log('datatrue', res)
        const result = res.data
        dispatch(fileReallyData(result))
      },
      function () {
        console.log('获取文档信息失败！')
      },
      false
    )
  }
}


//获取图纸真实数据
const drawReallyData = (result) => ({
  type: constants.DRAWREALLYDATA,
  data: result
})

//获取图纸magodb的数据
export const getDrawReallyData = (params) => {
  // console.log(params)
  return (dispatch) => {
    model.fetch(
      {},
      `${getFileReallyDataUrl}${params}`,
      'get',
      function (res) {
        // console.log('datatrue', res)
        const result = res.data
        dispatch(drawReallyData(result))
      },
      function () {
        console.log('获取图纸信息失败！')
      },
      false
    )
  }
}


//获取零件真实数据
const partReallyData = (result) => ({
  type: constants.PARTREALLYDATA,
  data: result
})

//获取零件magodb的数据
export const getPartReallyData = (params) => {
  // console.log(params)
  return (dispatch) => {
    model.fetch(
      {},
      `${getFileReallyDataUrl}${params}`,
      'get',
      function (res) {
        // console.log('datatrue', res)
        const result = res.data
        dispatch(partReallyData(result))
      },
      function () {
        console.log('获取零件信息失败！')
      },
      false
    )
  }
}