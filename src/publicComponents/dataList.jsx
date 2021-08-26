import React, { Component } from 'react'
import { Button, List } from 'antd'
import Folder from './IconFonts'

import { connect } from 'react-redux'

import { originalUrl, uploadDownFileUrl } from '../dataModule/UrlList'


class DataList extends Component{
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  

  //下载数据
  uploadFilesData = () => {
    const params = this.props.fileReallyData[0].fileId
    window.location.href=`${originalUrl}${uploadDownFileUrl}${params}`
  }

  render() {
    const datas = this.props.fileReallyData
    // console.log('fileReallyData', datas)
    return (
      <div style={{marginTop:'20px'}}>
        <List
          size="small"
          bordered
          dataSource={datas}
          renderItem={item => {
            if (item.suffix === '.pptx') {
              return (
                <List.Item>{
                  <div key={item.id} style={{ height: '24px', marginLeft: '40px', marginBottom:'10px' }}>
                    <Folder type="icon-ppt1" style={{ fontSize: '24px', paddingRight: '4px' , marginTop:'4px'}} />
                    <span style={{ width: '200px', fontSize: '18px', marginLeft: '10px' }}>
                      {item.name}
                    </span>
                  </div>
                }</List.Item>
              )
            }else if (item.suffix === '.xlsx') {
              return (
                <List.Item>{
                  <div key={item.id} style={{ height: '24px', marginLeft: '40px', marginBottom:'10px'  }}>
                    <Folder type="icon-EXCEL" style={{ fontSize: '24px', paddingRight: '4px', marginTop:'6px'}} />
                    <span style={{ width: '60px', fontSize: '16px', marginLeft: '10px' }}>
                      {item.name}
                    </span>
                  </div>
                }</List.Item>
              )
            }
            else if (item.suffix === '.doc' || item.suffix === '.docx') {
              return (
                <List.Item>{
                  <div key={item.id} style={{ height: '24px', marginLeft: '40px', marginBottom:'10px'  }}>
                    <Folder type="icon-docx" style={{ fontSize: '24px', paddingRight: '4px', marginTop:'6px'}} />
                    <span style={{ width: '60px', fontSize: '16px', marginLeft: '10px' }}>
                      {item.name}
                    </span>
                  </div>
                }</List.Item>
              )
            }
            else if (item.suffix === '.txt') {
              return (
                <List.Item>{
                  <div key={item.id} style={{ height: '24px', marginLeft: '40px', marginBottom:'10px'  }}>
                    <Folder type="icon-txt" style={{ fontSize: '24px', paddingRight: '4px', marginTop:'6px'}} />
                    <span style={{ width: '60px', fontSize: '16px', marginLeft: '10px' }}>
                      {item.name}
                    </span>
                  </div>
                }</List.Item>
              )
            }    
            else {
              return (
                <List.Item>{<span style={{fontSize: '16px'}}>没有数据</span> }</List.Item>
              )
            }
          }
          }
        />
        <div style={{margin:'20px 520px'}}>
          <Button  icon="download" type="primary" onClick={this.uploadFilesData}>下载</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fileReallyData: state.get('commonReducer').get('fileReallyData').toJS(),
  }
}

export default connect(mapStateToProps, null)(DataList)