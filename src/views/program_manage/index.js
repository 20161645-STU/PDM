import React, { Component, Fragment } from 'react'
import './style.less'
import { Button,Tree, message } from 'antd'
import histroy from '../../components/common/history'
import { getUserName } from '../../publicFunction/index'


import { connect } from 'react-redux';
import {
  sentDetilType,
  storeProgramExpandedKeys,
  storePragramSelectedkeys
} from '../../components/common/store/actionCreaters'

import { Model } from '../../dataModule/testBone'
import { getAloneProjectUrl } from '../../../src/dataModule/UrlList'

import Folder from '../../publicComponents/IconFonts'

import store from '../../store'
import { actionCreators as viewsAction } from '../store'

const model = new Model()
const { TreeNode, DirectoryTree } = Tree;

class  ProgramManage extends Component {
  constructor(props) {
    super (props);
    this.state = {
      projectsData: [],
      detail_type: '',         //详情类型
    }
  }

  //生命周期函数
  componentDidMount() {
    store.dispatch(viewsAction.getAllProjects())  
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedKeys.selectedKeys !== nextProps.selectedKeys.selectedKeys) {
      store.dispatch(viewsAction.getProjectContentId(nextProps.selectedKeys.selectedKeys))
    }
  }

  //创建项目
  createDraws = () => {
    this.props.history.push('/app/program_manage/program_creat')
  }

  //跳转相应的页面
  getTypeName = (keys) => {
    // console.log(keys)
    if (keys[0] === '0' || keys[0] === '1') {
      console.log('id', keys);
    }
    else if (keys[0].substring(keys[0].length - 2, keys[0].length) === '01') {
      this.storeSelectedkeys({ selectedKeys: keys[0].substring(0, keys[0].length - 2) })
      histroy.push('/app/program_manage/projectdata/'+keys[0].substring(0, keys[0].length - 2))
    } else if (keys[0].substring(keys[0].length - 2, keys[0].length) === '02') {
      this.storeSelectedkeys({ selectedKeys: keys[0].substring(0, keys[0].length - 2) })
      histroy.push('/app/program_manage/projectteam')
    } else {
      this.getAloneProject(keys[0])
      this.storeSelectedkeys({  selectedKeys: keys[0] })
    }
  }


  // 获得单个项目的详细信息
  getAloneProject = (params) => {
    let me = this
    model.fetch(
      {id: params},
      getAloneProjectUrl,
      'get',
      function (res) {
          // console.log('aloneProjectDatas', res.data)
          me.sentProjectMes( res.data)
      },
      function (error) {
          message.error('获取图纸信息失败!')
      },
      false
    )
  }

  //给rendux发送文件类型
  sentProjectMes = (aloneProjectDatas) => {
    let params = {
        detail_type: 'program',
        aloneProjectDatas  //单个项目详情
    }
    // console.log(params)
    this.props.sendTypeMes(params)
  }
  
  //获得详情类型
  onExpand = (keys) => {
    // console.log('Trigger Expand');
    let params = {
      expandedKeys: keys[0]
    }
    this.storeExpandedKeys(params)
  }

  //在redux在保存树的状态
  storeExpandedKeys = (params) => {
    this.props.storeExpandedKeys(params)
  }

  storeSelectedkeys = (params) => {
    this.props.storeSelectedkeys(params)
  }

  //数据处理
  handleData = (key, params) => {
    if (key === 'mine') {
      const myProjectsData = params.filter(item => item.admin === getUserName())
      return myProjectsData
    } else {
      const otherProjectsData = params.filter(item => item.admin !== getUserName())
      return otherProjectsData
    }
  }

    
  render() {
    const { expandedKeys, selectedKeys } = this.props

    const myProjectsData = this.handleData('mine', this.props.allProjectsInfo)
    const otherProjectsData = this.handleData('', this.props.allProjectsInfo)
    // console.log('otherProjectsData', otherProjectsData)

    if (expandedKeys.expandedKeys === undefined) {
        this.storeExpandedKeys({})
        this.storeSelectedkeys({})
    }

    return (
      <Fragment>
        <div  className="file_div">
          <span className="file_title">项目管理</span>
          <Button type="primary" icon="plus" className="file_create" onClick={this.createDraws}>创建项目</Button>
        </div>
        <DirectoryTree multiple className="treeName"
          onSelect={this.getTypeName}
          onExpand={this.onExpand}
          defaultExpandedKeys={[expandedKeys.expandedKeys]}
          defaultSelectedKeys={[selectedKeys.selectedKeys]}
          icon={<Folder type="icon-wenjianjia"  style={ { fontSize:'20px', paddingRight:'4px', marginTop:'3px'}}/>}
        >
          <TreeNode title="我的项目" key="0">
            {myProjectsData.length !== 0 ? myProjectsData.map((item) => {
              return (
                <TreeNode title={item.project_no + '-' + item.name} key={item.id} 
                  icon={<Folder type="icon-xiangmu1"  style={ { fontSize:'18px', paddingRight:'4px', marginTop:'2px'}}/>}
                >
                  <TreeNode title={'program data'} key={item.id + '01'} isLeaf
                    icon={<Folder type="icon-data"  style={ { fontSize:'20px', paddingRight:'4px', marginTop:'3px'}}/>} />
                  <TreeNode title={'program team'} key={item.id + '02'} isLeaf
                    icon={<Folder type="icon-team"  style={ { fontSize:'20px', paddingRight:'4px', marginTop:'3px'}}/>} />
                </TreeNode>
              )
            }) : null }
          </TreeNode>
          <TreeNode title="其他项目" key="1">
            {otherProjectsData.length !== 0 ? otherProjectsData.map((item) => {
              return (
                <TreeNode title={item.project_no + '-' + item.name} key={item.id} 
                  icon={<Folder type="icon-xiangmu1"  style={ { fontSize:'18px', paddingRight:'4px', marginTop:'2px'}}/>}
                >
                  <TreeNode title={'program data'} key={item.id + '01'} isLeaf
                    icon={<Folder type="icon-data"  style={ { fontSize:'20px', paddingRight:'4px', marginTop:'3px'}}/>} />
                  <TreeNode title={'program team'} key={item.id + '02'} isLeaf
                    icon={<Folder type="icon-team"  style={ { fontSize:'20px', paddingRight:'4px', marginTop:'3px'}}/>} />
                </TreeNode>
              )
            }) : null }
          </TreeNode>
        </DirectoryTree>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    expandedKeys: state.get('commonReducer').get('programExpandedKeys').toJS(),
    selectedKeys: state.get('commonReducer').get('programSelectedkeys').toJS(),
    allProjectsInfo: state.get('viewsReducer').get('allProjectsInfo').toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendTypeMes: data => dispatch(sentDetilType(data)),
    storeExpandedKeys: data => dispatch(storeProgramExpandedKeys(data)),
    storeSelectedkeys: data => dispatch(storePragramSelectedkeys(data)),
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(ProgramManage);