import React, { Component } from 'react'
import { Card , Icon, Popconfirm, List} from 'antd';

import { connect } from 'react-redux';

import Folder from './IconFonts'

class Lists extends Component{
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  //取消
  cancel = () => {
    console.log('取消')
  }

  //确定
  confirm = (e, value) => {
    // console.log('value', value)
    if (this.props.detil_mes.detail_type === 'file') {
      this.props.deleteRelation(value.id, this.props.detil_mes.aloneDocumentDatas.id, 'file', 'file')
    }
    else if (this.props.detil_mes.detail_type === 'drawing' && value.type === 'document') {
      this.props.deleteRelation( this.props.detil_mes.aloneDrawsDatas.id, value.id, 'draw', 'document')
    }
    else if (this.props.detil_mes.detail_type === 'drawing' && value.type === 'part') {
      this.props.deleteRelation(value.id, this.props.detil_mes.aloneDrawsDatas.id, 'draw', 'part_project')
    }
    else if (this.props.detil_mes.detail_type === 'drawing' && value.type === 'project') {
      this.props.deleteRelation(value.id, this.props.detil_mes.aloneDrawsDatas.id, 'draw', 'part_project')
    }
    else if (this.props.detil_mes.detail_type === 'part' && value.type === 'project') {
      this.props.deleteRelation(value.id, this.props.detil_mes.alonePartDatas.id, 'part', 'project')
    }
  }

  render() {
    // console.log('tssRelationInfo', this.props.tssRelationInfo)
    const content = []
    if (this.props.type === 'document' && this.props.dssRelationInfo.length !== 0) {
      content.push(
        <List
          key="document"
          size="small"
          bordered
          dataSource={this.props.dssRelationInfo}
          renderItem={item => {
            if (this.props.dssRelationInfo.length !== 0) {
              return (
                <List.Item>
                  <div style={{ height: '20px', marginLeft: '40px' }} key={item.id}>
                    <Folder type="icon-wendang" style={{ fontSize: '16px', paddingRight: '4px', marginTop: '3px' }} />
                    <span style={{ width: '60px', fontSize: '16px', marginLeft: '10px' }}>
                      {item.documentNo + '-' + item.name}
                    </span>
                    <Popconfirm
                      title="确定解除关联吗？"
                      onConfirm={e => this.confirm(e, item)}
                      onCancel={this.cancel}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Icon type="delete" style={{ color: 'red', fontSize: '16px', marginLeft: '200px' }} />
                    </Popconfirm>
                  </div>
                </List.Item>
              )
            }
          }}
        />
      )
    } else if (this.props.type === 'draw'  && this.props.zssRelationInfo.length !== 0) {
      content.push(
        <List
          key="draw"
          size="small"
          bordered
          dataSource={this.props.zssRelationInfo}
          renderItem={item => {
            if (this.props.zssRelationInfo.length !== 0) {
              return (
                <List.Item>
                  <div key={item.id} style={{ height: '20px', marginLeft: '40px'}}>
                    <Folder type="icon-draw" style={{ fontSize: '16px', paddingRight: '4px', marginTop: '3px' }} />
                    <span style={{ width: '60px', fontSize: '16px', marginLeft: '10px' }}>
                      {item.drawingNo + '-' + item.name + '/' + item.version}
                    </span>
                    <Popconfirm
                      title="确定解除关联吗？"
                      onConfirm={e => this.confirm(e, item)}
                      onCancel={this.cancel}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Icon type="delete" style={{ color: 'red', fontSize: '16px', marginLeft: '200px' }} />
                    </Popconfirm>
                  </div>
                </List.Item>
              )
            }
          }}
         />
      )
    } else if (this.props.type === 'part' && this.props.tssRelationInfo.length !== 0) {
      content.push(
        <List
          key='part'
          size="small"
          bordered
          dataSource={this.props.tssRelationInfo}
          renderItem={item => {
            if (this.props.tssRelationInfo.length !== 0) {
              return (
                <List.Item>
                  <div key={item.id} style={{ height: '20px', marginLeft: '40px'}}>
                    {
                      item.tssType === 'EI' ? <Folder type="icon-zhuangpeiti"
                        style={{ fontSize: '20px', paddingRight: '4px', marginTop: '3px' }} />
                        : <Folder type="icon-icon-"
                          style={{ fontSize: '20px', paddingRight: '4px', marginTop: '1px' }} />
                    }
                    <span style={{ width: '60px', fontSize: '16px', marginLeft: '10px' }}>
                      {item.partNo + '-' + item.name + '/' + item.version}
                    </span>
                    <Popconfirm
                      title="确定解除关联吗？"
                      onConfirm={e => this.confirm(e, item)}
                      onCancel={this.cancel}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Icon type="delete" style={{ color: 'red', fontSize: '16px', marginLeft: '200px' }} />
                    </Popconfirm>
                  </div>
                </List.Item>
              )
            }
          }}
        />
      )
    }
    else if (this.props.type === 'project' && this.props.projectRelationInfo.length !== 0) {
      content.push(
        <List
          key='project'
          size="small"
          bordered
          dataSource={this.props.projectRelationInfo}
          renderItem={item => {
            if (this.props.projectRelationInfo.length !== 0) {
              return (
                <List.Item>
                  <div key={item.id} style={{ height: '20px', marginLeft: '40px'}}>
                    <Folder type="icon-xiangmu1" style={{ fontSize: '16px', paddingRight: '4px', marginTop: '3px' }} />
                    <span style={{ width: '60px', fontSize: '16px', marginLeft: '10px' }}>
                      {item.project_no + '-' + item.name }
                    </span>
                    <Popconfirm
                      title="确定解除关联吗？"
                      onConfirm={e => this.confirm(e, item)}
                      onCancel={this.cancel}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Icon type="delete" style={{ color: 'red', fontSize: '16px', marginLeft: '200px' }} />
                    </Popconfirm>
                  </div>
                </List.Item>
              )
            }
           }}
        />
      )
    }
    else {
      content.push(
        <Card
          key='null'
          size="small"
          bordered
        >
          <p style={{fontSize:'16px'}}>没有关联数据</p>
        </Card>
      )
    }

    return (
      <div style={{marginLeft:'10px'}}>
        { content }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    detil_mes: state.get('commonReducer').get('detil_mes').toJS(),
    dssRelationInfo: state.get('commonReducer').get('dssRelationInfo').toJS(),
    zssRelationInfo: state.get('commonReducer').get('zssRelationInfo').toJS(),
    tssRelationInfo: state.get('commonReducer').get('tssRelationInfo').toJS(),
    projectRelationInfo: state.get('commonReducer').get('projectRelationInfo').toJS(),
  }
}

export default connect(mapStateToProps, null)(Lists)