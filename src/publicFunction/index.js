import {getCookie} from "../helpers/cookies";
import createBrowserHistory from '../components/common/history'
import { message } from "antd";
import {
  getAloneDrawUrl,
  getAlonePartUrl,
  getAloneDocumentUrl,
  getAloneProjectUrl,
  getAloneFolderUrl,
} from '../dataModule/UrlList'
import { Model } from '../dataModule/testBone'
const model = new Model()

export function nowTime() {
  const date = new Date();
  const seperator1 = "-";
  const seperator2 = ":";
  const month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
  const strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
  const strHours = date.getHours()<10?'0' + date.getHours():date.getHours();
  const strMinutes = date.getMinutes()<10?'0' + date.getMinutes():date.getMinutes();
  return date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + strHours + seperator2 + strMinutes
}

export function nowTimeBigInt() {
  const date = new Date();
  const month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
  const strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
  const strHours = date.getHours()<10?'0' + date.getHours():date.getHours();
  const strMinutes = date.getMinutes()<10?'0' + date.getMinutes():date.getMinutes();
  // eslint-disable-next-line radix
  return parseInt(date.getFullYear() + month + strDate + strHours + strMinutes)
}

export function getUserName() {
  if (!getCookie("mspa_user") || getCookie("mspa_user") === "undefined") {
    return createBrowserHistory.push('/login')
  } else {
    return JSON.parse(getCookie("mspa_user")).username
  }
}

export function getUserId() {
  if (!getCookie("mspa_user") || getCookie("mspa_user") === "undefined") {
    return createBrowserHistory.push('/login')
  } else {
    return JSON.parse(getCookie("mspa_user"))._id
  }
}

export function handleChange(value, type, me){
  if (value === '' || value === undefined) value = null;
  const form = me.state;
  form[type] = value;
  me.setState(form)
}

export function ejectMessage (text, type) {
  if (type === 'success') {
    message.success(text)
  } else if (type === 'error') {
    message.error(text)
  } else if (type === 'warning') {
    message.warning(text)
  } else {
    message.info(text)
  }
}

//根据id去获取文件夹或项目里的具体内容
export const getFolderContentId = function (params) {
  // console.log('params', params)
  return new Promise((resolve, reject) => {
    if (params.relationType === 'folder_own_zss' || params.relationType === 'project_own_zss') {
      model.fetch(
        {id: params.target},
        getAloneDrawUrl,
        'get',
        function (res) {
          // console.log(res.data)
          resolve(res.data)
        },
        function(err) {
          reject(err)
        },
        false
      )
    }
    else if (params.relationType === 'folder_own_tss' || params.relationType === 'project_own_tss') {
      model.fetch(
        {id: params.target},
        getAlonePartUrl,
        'get',
        function (res) {
          // console.log(res.data)
          resolve(res.data)
        },
        function(err) {
          reject(err)
        },
        false
      )
    }
    else if (params.relationType === 'folder_own_dss' || params.relationType === 'project_own_dss') {
      model.fetch(
        {id: params.target},
        getAloneDocumentUrl,
        'get',
        function (res) {
          // console.log(res.data)
          resolve(res.data)
        },
        function(err) {
          reject(err)
        },
        false
      )
    }
    else if (params.relationType === 'folder_own_project' || params.relationType === 'project_own_project') {
      model.fetch(
        {id: params.target},
        getAloneProjectUrl,
        'get',
        function (res) {
          // console.log(res.data)
          resolve(res.data)
        },
        function(err) {
          reject(err)
        },
        false
      )
    }
    else if (params.relationType === 'folder_own_folder' || params.relationType === 'project_own_folder') {
      model.fetch(
        {id: params.target},
        getAloneFolderUrl,
        'get',
        function (res) {
          // console.log(res.data)
          resolve(res.data)
        },
        function(err) {
          reject(err)
        },
        false
      )
    }
  })
}
