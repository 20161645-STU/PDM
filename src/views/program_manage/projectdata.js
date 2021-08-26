import React, { Component, Fragment } from 'react';
import { PageHeader, List, Popconfirm, Icon } from 'antd';

import { connect } from 'react-redux';
import { getFolderContentId } from '../../components/common/store/actionCreaters'

import { Model } from '../../dataModule/testBone'
import { getProjectContentUrl } from '../../../src/dataModule/UrlList'

import Folder from '../../publicComponents/IconFonts'


const model = new Model()

class ProjectData extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  // componentDidMount() {
  //   this.getProjectContentId(this.props.selectedKeys.selectedKeys)
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.projectContentData.length !== nextProps.projectContentData.length) {
  //     console.log('变了')
  //     console.log(11, nextProps.selectedKeys.selectedKeys)
  //    this.getProjectContentId(nextProps.selectedKeys.selectedKeys)
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedKeys.selectedKeys !== nextProps.selectedKeys.selectedKeys) {
      console.log('变了')
     this.getProjectContentId(nextProps.selectedKeys.selectedKeys)
    }
  }

  //获取项目包含数据id
  getProjectContentId = (params) => {
    let me = this
    model.fetch(
      {folder_id: params},
      getProjectContentUrl,
      'get',
      function (res) {
        console.log('id', res.data)
        me.props.getProjectContent(res.data)
      },
      function () {
        // console.log(111)
        // message.error('获取文件夹内容失败！')
      },
      false
    )
  }

  handleProjectData = (key, value) => {
    if (key === 'part') {
      const part_datas = value.filter(item => {
        return item.type === 'part'
      })
      return part_datas
    } else if (key === 'draw') {
      const draw_datas = value.filter(item => {
        return item.type === 'draw'
      })
      return draw_datas
    } else if (key === 'dss') {
      const dss_datas = value.filter(item => {
        return item.type === 'document'
      })
      return dss_datas
    }
  }

  render() {
    // const part_datas = this.handleProjectData('part',this.props.projectContentData)
    // const draw_datas = this.handleProjectData('draw', this.props.projectContentData)
    // const dss_datas = this.handleProjectData('dss', this.props.projectContentData)
    // console.log('part_datas', part_datas)
    console.log('projectContentData',  this.props.projectContentData)
    return (
      <Fragment>
        <PageHeader
          onBack={() => this.props.history.push('/app/program_manage')}
          title="返回"
        />
        <div style={{margin:'40px'}}>
          <List
            size="small"
            bordered
            key='part'
            header={
              <div >
                <span style={{ fontSize: '18px' }}>零件</span>
                <Folder type="icon-add-fill"
                  style={{ fontSize: '20px', paddingRight: '4px', marginTop: '1px',marginLeft:'320px' }} />
              </div>
            }
            dataSource={ this.props.projectContentData.filter(item => item.type === 'part') }
            renderItem={item =>
              <List.Item>
                {
                  <div key={item.id} style={{ width:'400px', height: '20px', marginLeft: '10px', marginBottom: '6px' }}>
                    {
                      item.tssType === 'EI' ? <Folder type="icon-zhuangpeiti"
                        style={{fontSize: '20px', paddingRight: '4px', marginTop: '3px' }} />
                        : <Folder type="icon-icon-"
                          style={{ fontSize: '20px', paddingRight: '4px', marginTop: '1px' }} />
                    }
                    <span style={{ display:'inline-block', width: '240px', fontSize: '16px', marginLeft: '10px' }}>
                      {item.partNo + '-' + item.name + '/' + item.version}
                    </span>
                    <Popconfirm
                      title="确定解除关联吗？"
                      onConfirm={this.confirm}
                      onCancel={this.cancel}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Icon type="delete"
                        style={{ color: 'red', fontSize: '16px', marginLeft: '72px' }} />
                    </Popconfirm>
                  </div>
                }
              </List.Item>}
          />
        </div>
        <div style={{margin:'40px'}}>
          <List
            size="small"
            bordered
            key='draw'
            header={
              <div >
                <span style={{ fontSize: '18px' }}>图纸</span>
                <Folder type="icon-add-fill"
                  style={{ fontSize: '20px', paddingRight: '4px', marginTop: '1px',marginLeft:'320px' }} />
              </div>
            }
            dataSource={this.props.projectContentData.filter(item => item.type === 'draw')}
            renderItem={item =>
              <List.Item>
                {
                  <div key={item.id} style={{width:'400px', height: '20px', marginLeft: '10px', marginBottom: '6px' }}>
                  <Folder type="icon-draw" style={{ fontSize: '16px', paddingRight: '4px', marginTop: '3px' }} />
                  <span style={{display:'inline-block', width: '240px', fontSize: '16px', marginLeft: '10px' }}>
                    {item.drawingNo + '-' + item.name + '/' + item.version}
                    </span>
                    <Popconfirm
                      title="确定解除关联吗？"
                      onConfirm={this.confirm}
                      onCancel={this.cancel}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Icon type="delete" style={{ color: 'red', fontSize: '16px',   marginLeft: '76px' }} />
                    </Popconfirm>
                  </div>
                }
              </List.Item>}
          />
        </div>
        <div style={{margin:'40px'}}>
          <List
            size="small"
            bordered
            key='document'
            header={
              <div >
                <span style={{ fontSize: '18px' }}>文档</span>
                <Folder type="icon-add-fill"
                  style={{ fontSize: '20px', paddingRight: '4px', marginTop: '1px',marginLeft:'320px' }} />
              </div>
            }
            dataSource={this.props.projectContentData.filter(item => item.type === 'document')}
            renderItem={item =>
              <List.Item>
                {
                   <div style={{width:'400px', height: '20px', marginLeft: '10px',marginBottom:'6px' }} key={item.id}>
                   <Folder type="icon-wendang" style={{ fontSize: '16px', paddingRight: '4px', marginTop: '3px' }} />
                   <span style={{ display:'inline-block', width: '240px', fontSize: '16px', marginLeft: '10px' }}>
                     {item.documentNo + '-' + item.name}
                    </span>
                    <Popconfirm
                      title="确定解除关联吗？"
                      onConfirm={this.confirm}
                      onCancel={this.cancel}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Icon type="delete" style={{ color: 'red', fontSize: '16px',  marginLeft: '76px' }} />
                    </Popconfirm>
                 </div>
                }
              </List.Item>}
          />
        </div>
      </Fragment>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    selectedKeys: state.get('commonReducer').get('programSelectedkeys').toJS(),
    projectContentData:   state.get('commonReducer').get('projectContentData').toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProjectContent: data => dispatch(getFolderContentId('project', data)),
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(ProjectData)
