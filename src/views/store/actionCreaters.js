import * as constants from './constants'
import { fromJS } from 'immutable'

import { Model } from '../../dataModule/testBone'
import {
  getAllProjectUrl,
  getAllPartsUrl,
  documentTypeUrl,
  getAllDrawsUrl,
  getAllDocumentsUrl,
  getProjectContentUrl
} from '../../dataModule/UrlList'

import { getFolderContentId } from '../../publicFunction/index'
const model = new Model();

// import { Route } from 'react-router-dom'
// import Index from '../../index'
// import React from 'react'
// import { fromJS } from 'immutable'
// import { getUserUuid } from '../../../publicFunction/index'

// const model = new Model()
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


//获取所有的项目信息
const AllProjectsInfo = (result) => ({
  type: constants.ALLPROJECTS,
  data: result
})

export const getAllProjects = () => {
  return (dispatch) => {
    model.fetch(
      {},
      getAllProjectUrl,
      'get',
      function (res) {
        // console.log(111, res)
        const result = res.data
        dispatch(AllProjectsInfo(result))
      },
      function () {
        console.log('获取项目信息失败！')
      },
      false
  )
  }
}

//储存项目里面的所有数据信息
const AloneProjectAllInfo = (result) => ({
  type: constants.ALONEPROJECTALLINFO,
  data: result
})

//获取项目所有内容的id
export const getProjectContentId = (params) => {
  return (dispath) => {
    let me = this
    model.fetch(
      { folder_id: params },
      getProjectContentUrl,
      'get',
      function (res) {
        me.handleContentId(res.data).then(res => {
          // console.log('projectContentData', res)
          dispath(AloneProjectAllInfo(res))
        })
      },
      function () {
        // console.log(111)
        // message.error('获取文件夹内容失败！')
      },
      false
    )
  }
}

//对项目内容id循环获取具体数据
export const handleContentId = async (params) => {
  const projectContentData = []
  for (let i = 0; i < params.length; i++) {
    projectContentData.push(await getFolderContentId(params[i]))
  }
  // console.log('projectContentData', projectContentData)
  return Promise.all(projectContentData)
}



//或得所有零件信息
const AllPartsInfo = (result) => ({
  type: constants.ALLPARTS,
  data: result
})

export const getAllParts = () => {
  return (dispatch) => {
    model.fetch(
      {},
      getAllPartsUrl,
      'get',
      function (res) {
        // console.log(111, res)
        const result = res.data
        dispatch(AllPartsInfo(result))
      },
      function () {
        console.log('获取零件信息失败！')
      },
      false
  )
  }
}

//或得所有的图纸
const AllDrawingsInfo = (result) => ({
  type: constants.ALLDRAWINGS,
  data: result
})

export const getAllDrawings = () => {
  return (dispatch) => {
    model.fetch(
      {},
      getAllDrawsUrl,
      'get',
      function (res) {
        // console.log(111, res)
        const result = res.data
        dispatch(AllDrawingsInfo(result))
      },
      function () {
        console.log('获取图纸信息失败！')
      },
      false
    )
  }
}

//获取所有的文档类型信息
const AllFilesTypeInfo = (result) => ({
  type: constants.ALLFILESTYPE,
  data: result
})

export const getAllFilesType = () => {
  return (dispatch) => {
    model.fetch(
      {},
      documentTypeUrl,
      'get',
      function (res) {
        // console.log(111, res)
        const result = res.data
        dispatch(AllFilesTypeInfo(result))
      },
      function () {
        console.log('获取文档类型信息失败！')
      },
      false
    )
  }
}



//获得文档的信息
const AllFilesInfo = (result) => ({
  type: constants.ALLDOCUMENTS,
  data: result
})

export const getAllDocuments = () => {
  return (dispatch) => {
    model.fetch(
      {},
      getAllDocumentsUrl,
      'get',
      function (res) {
        // console.log(111, res)
        const result = res.data
        dispatch(AllFilesInfo(result))
      },
      function () {
        console.log('获取文档信息失败！')
      },
      false
    )
  }
}


//接收新图纸信息
export const creatNewDrawing = data => ({
  type: constants.ADDNEWDRAWING,
  data: fromJS(data)
})


//接收新文档信息
export const creatNewFiles = data => ({
  type: constants.ADDNEWFIELES,
  data: fromJS(data)
})


//接受新零件信息
export const creatNewParts = data => ({
  type: constants.ADDNEWPARTS,
  data: fromJS(data)
})

//创建BOM
export const createPartBom = data => ({
  type: constants.CREATEPARTBOM,
  data: fromJS(data)
})

//存储创建bom的搜索零件
export const saveSearchParts = data => ({
  type: constants.SAVESEARCHPARTS,
  data: fromJS(data)
})

//存储要添加bom关系的零件
export const saveRleationParts = data => ({
  type: constants.SAVERELATIONPARTS,
  data: fromJS(data)
})

//存储要删除bom的零件
export const saveDelteRleationParts = data => ({
  type: constants.SAVEDELETERELATIONPARTS,
  data: fromJS(data)
})




