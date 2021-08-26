import React, { Component } from 'react'
import { Card , Icon, Popconfirm } from 'antd';

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
    console.log("取消")
  }

  //确定
  confirm = () => {

  }

  render() {
    // console.log('tssRelationInfo', this.props.tssRelationInfo)
    const content = []
    if (this.props.type === 'document' && this.props.dssRelationInfo.length !== 0) {
      content.push(
        <Card
          key="document"
          size="small"
          bordered
        >
          {
            this.props.dssRelationInfo.map(item => {
              return (
                <div style={{ height: '20px', marginLeft: '40px',marginBottom:'6px' }} key={item.id}>
                  <Folder type="icon-wendang" style={{ fontSize: '16px', paddingRight: '4px', marginTop: '3px' }} />
                  <span style={{ width: '60px', fontSize: '16px', marginLeft: '10px' }}>
                    {item.documentNo + '-' + item.name}
                  </span>
                  <Popconfirm
                    title="确定解除关联吗？"
                    onConfirm={this.confirm}
                    onCancel={this.cancel}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Icon type="delete" style={{ color: 'red', fontSize: '16px', marginLeft: '200px' }} />
                  </Popconfirm>
                </div>
              )
            })
          }
        </Card>
      )
    } else if (this.props.type === 'draw'  && this.props.zssRelationInfo.length !== 0) {
      content.push(
        <Card
          key="draw"
          size="small"
          bordered
         >
          {
            this.props.zssRelationInfo.map(item => {
              return (
                <div key={item.id} style={{ height: '20px', marginLeft: '40px', marginBottom: '6px' }}>
                  <Folder type="icon-draw" style={{ fontSize: '16px', paddingRight: '4px', marginTop: '3px' }} />
                  <span style={{ width: '60px', fontSize: '16px', marginLeft: '10px' }}>
                    {item.drawingNo + '-' + item.name + '/' + item.version}
                  </span>
                  <Popconfirm
                    title="确定解除关联吗？"
                    onConfirm={this.confirm}
                    onCancel={this.cancel}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Icon type="delete" style={{ color: 'red', fontSize: '16px', marginLeft: '200px' }} />
                  </Popconfirm>
                </div>
              )
            })             
           }      
        </Card>
      )
    } else if (this.props.type === 'part' && this.props.tssRelationInfo.length !== 0) {
      content.push(
        <Card
          key='part'
          size="small"
          bordered
        >
          {
            this.props.tssRelationInfo.map(item => {
              return (
                <div key={item.id} style={{ height: '20px', marginLeft: '40px', marginBottom: '6px' }}>
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
                    onConfirm={this.confirm}
                    onCancel={this.cancel}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Icon type="delete" style={{ color: 'red', fontSize: '16px', marginLeft: '200px' }} />
                  </Popconfirm>
                </div>
              )
            })
          }   
        </Card>
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
    dssRelationInfo: state.get('commonReducer').get('dssRelationInfo').toJS(),
    zssRelationInfo: state.get('commonReducer').get('zssRelationInfo').toJS(),
    tssRelationInfo: state.get('commonReducer').get('tssRelationInfo').toJS(),
  }
}

export default connect(mapStateToProps, null)(Lists)