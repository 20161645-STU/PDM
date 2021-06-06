// import { Model } from '../../../dataModule/testBone'
import * as constants from './constants'
import { fromJS } from 'immutable'

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

//接收新图纸信息
export const creatNewDrawing = data => ({
  type: constants.ADDNEWDRAWING,
  data: fromJS(data)
})



