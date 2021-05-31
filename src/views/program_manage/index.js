import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './style.less'
import { Button,Tree, Icon, message } from 'antd';
import histroy from '../../components/common/history';
import { sentDetilType, storeExpandedKeys, storeSelectedkeys } from '../../components/common/store/actionCreaters'

import { Model } from '../../dataModule/testBone'
import { getAllProjectUrl, getAloneProjectUrl } from '../../../src/dataModule/UrlList'

const model = new Model()
const { TreeNode, DirectoryTree } = Tree;

class  ProgramManage extends Component {
  constructor(props) {
    super (props);
    this.state = {
      folderData: [{
          title: '我的项目',
          key: 1           
      }, {
          title: '其他项目',
          key: 2
        }],
      testData: [
        {
          name: '南通项目',
          id: '12345678'
        },{
          name: '大宗项目',
          id: '87654321'
        }
      ],     //测试数据
      projectsData: [],
      detail_type: ''         //详情类型
    }
  }

  //生命周期函数
  // componentDidMount() {
  //   this.getAllProjects()
  // }

  //获取所有项目数据
  getAllProjects = () => {
    let me = this
    model.fetch(
      {},
      getAllProjectUrl,
      'get',
      function (res) {
          // console.log(res)
          me.setState({
              projectsData: res.data
          })
      },
      function (error) {
          message.error('获取项目信息失败！')
      },
      false
    )
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
      histroy.push('/app/program_manage/projectdata')
      this.storeSelectedkeys({selectedKeys:keys[0].substring(0, keys[0].length-2)})
    } else if (keys[0].substring(keys[0].length - 2, keys[0].length) === '02') {
      histroy.push('/app/program_manage/projectteam')
      this.storeSelectedkeys({selectedKeys:keys[0].substring(0, keys[0].length-2)})
    } else {
      this.setState({
        detail_type: 'program'
      })
      // this.getAloneProject(keys[0])
      let params = {
        selectedKeys: keys[0]
      }
      this.storeSelectedkeys(params)
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
          // console.log(111, res.data[0])
          me.sentProjectMes( res.data[0])
      },
      function (error) {
          message.error('获取图纸信息失败！')
      },
      false
    )
  }

  //给rendux发送文件类型
  sentProjectMes = (aloneProjectDatas) => {
    const { detail_type } = this.state
    let params = {
        detail_type,
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

    
  render() {
    const { folderData, projectsData, testData } = this.state
    const { expandedKeys, selectedKeys } = this.props
    // console.log(expandedKeys, selectedKeys)
    if (expandedKeys.expandedKeys === undefined) {
        this.storeExpandedKeys({})
        this.storeSelectedkeys({})
    }

    return (
      <Fragment>
        <div style={{display:'flex',marginBottom:'20px'}}>
          <span className="project_title">项目管理</span>
          <Button type="primary" icon="plus"  className="project_create" onClick={this.createDraws}>创建项目</Button>
        </div>
        <DirectoryTree multiple onSelect={this.getTypeName} onExpand={this.onExpand}
          defaultExpandedKeys={[expandedKeys.expandedKeys]}
          defaultSelectedKeys={[selectedKeys.selectedKeys]}>
          {folderData.map((item,index) => {
            return (
              <TreeNode title={item.title} key={index}>
                  {projectsData.length !== 0 ? projectsData.map((item) => {
                      if (true) {
                        return (
                          <TreeNode title={item.name} key={item.id} >
                            <TreeNode title={'program data'} key={item.id + '01'} isLeaf icon={<Icon type="file-pdf" />} />
                            <TreeNode title={'program team'} key={item.id + '02'} isLeaf icon={ <Icon type="team" />}/>
                          </TreeNode>
                        )
                      }
                      return null
                  }) : testData.map((item) => {
                    return (
                      <TreeNode title={item.name} key={item.id} >
                        <TreeNode title={'program data'} key={item.id + '01'} isLeaf icon={<Icon type="file-pdf" />} />
                        <TreeNode title={'program team'} key={ item.id + '02'} isLeaf icon={ <Icon type="team" />} />
                      </TreeNode>
                    )
                  })}
              </TreeNode>
            )
          })}
        </DirectoryTree>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    expandedKeys: state.get('commonReducer').get('expandedKeys').toJS(),
    selectedKeys: state.get('commonReducer').get('selectedkeys').toJS()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendTypeMes: data => dispatch(sentDetilType(data)),
    storeExpandedKeys: data => dispatch(storeExpandedKeys(data)),
    storeSelectedkeys: data => dispatch(storeSelectedkeys(data))
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(ProgramManage);