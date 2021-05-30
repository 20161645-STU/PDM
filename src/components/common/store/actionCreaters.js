import * as constants from './constants'
import { fromJS } from 'immutable'

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

export const storeExpandedKeys = data => ({
  type: constants.STOREEXPAND,
  data: fromJS(data)
})

export const storeSelectedkeys = data => ({
  type: constants.STORESELECT,
  data: fromJS(data)
})



// 获得单个图纸的详细信息
// const aloneDrawInfo = (result) => ({
//   type: constants.courseInfo,
//   data: result
// })

// export const getCourseInfo = () => {
//    return (dispatch) => {
//     model.fetch(
//       { 'user_id': getUserUuid() },
//       courseInfoUrl,
//       'post',
//       function(response) {
//         const result = response.data
//         dispatch(courseInfo(result))
//       },
//       function() {
//         console.log('error')
//       },
//       false
//     )
//    }
// }



