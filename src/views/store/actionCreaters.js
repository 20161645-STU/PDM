import * as constants from './constants'
import { fromJS } from 'immutable'

import { Model } from '../../dataModule/testBone'
import { getAllProjectUrl, getAllPartsUrl, documentTypeUrl, getAllDrawsUrl, getAllDocumentsUrl } from '../../dataModule/UrlList'
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


