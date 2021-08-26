import * as constants from './constants'
import { fromJS } from 'immutable'
import store from '../../../store'

import { Model } from '../../../dataModule/testBone'
import {
  getAloneDrawUrl,
  getAlonePartUrl,
  getAloneDocumentUrl,
  getAloneProjectUrl,
  getAloneFolderUrl,
  getFileFaRelationUrl,
  getDrawFaRelationUrl,
  getDrawSonRelationUrl,
  getFileReallyDataUrl,
  getPartSonRelationUrl,
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
const folderDatas = (result) => ({
  type: constants.FOLDERCONTENTDATA,
  data: result
})

//项目所有数据
const projectAllDatas = (result) => ({
  type: constants.PROJECTCONTENTDATA,
  data: result
})

export const sentFoldersContent = (key, params) => {
  if (key === 'folder') {
    return(dispatch) => {
      // console.log('datas', params)
      dispatch(folderDatas(params))
    }
  } else if (key === 'project') {
    return(dispatch) => {
      console.log('project_datas', params)
      dispatch(projectAllDatas(params))
    }
  }
}


//根据id去获取文件夹或项目里的具体内容
export const getFolderContentId = (key, params) => {
  // console.log('params', params)
  const folderContentData = []
  for (let i = 0; i < params.length; i++) {
    if (params[i].relationType === 'folder_own_zss' || params[i].relationType === 'project_own_zss') {
      model.fetch(
        { id: params[i].target },
        getAloneDrawUrl,
        'get',
        function (res) {
          folderContentData.push(res.data)
          if (i === params.length - 1) {
            store.dispatch(sentFoldersContent(key, folderContentData))
          }
        },
        function () {
          console.log('error')
        },
        false
      )
    } else if (params[i].relationType === 'folder_own_tss' || params[i].relationType === 'project_own_tss') {
      model.fetch(
        { id: params[i].target },
        getAlonePartUrl,
        'get',
        function (res) {
          folderContentData.push(res.data)
          if (i === params.length - 1) {
            store.dispatch(sentFoldersContent(key, folderContentData))
          }
        },
        function () {
          console.log('error')
        },
        false
      )
    } else if (params[i].relationType === 'folder_own_dss' || params[i].relationType === 'project_own_dss') {
      model.fetch(
        { id: params[i].target },
        getAloneDocumentUrl,
        'get',
        function (res) {
          folderContentData.push(res.data)
          if (i === params.length - 1) {
            store.dispatch(sentFoldersContent(key, folderContentData))
          }
        },
        function () {
          console.log('error')
        },
        false
      )
    } else if (params[i].relationType === 'folder_own_project' || params[i].relationType === 'project_own_project') {
      model.fetch(
        { id: params[i].target },
        getAloneProjectUrl,
        'get',
        function (res) {
          // console.log(555511, res.data)
          folderContentData.push(res.data)
          if (i === params.length - 1) {
            store.dispatch(sentFoldersContent(key, folderContentData))
          }
        },
        function () {
          console.log('error')
        },
        false
      )
    } else if (params[i].relationType === 'folder_own_folder' || params[i].relationType === 'project_own_folder') {
        model.fetch(
          { id: params[i].target },
          getAloneFolderUrl,
          'get',
          function (res) {
            // console.log(66667777, res.data)
            folderContentData.push(res.data)
            if (i === params.length - 1) {
              store.dispatch(sentFoldersContent(key, folderContentData))
            }
          },
          function () {
            console.log('error')
          },
          false
        )
    }
  } 
}



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
        console.log('datatrue', res)
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