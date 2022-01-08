import React, { Component } from 'react';
import { Tabs, Descriptions, Button } from 'antd';

// import { Model } from '../../dataModule/testBone'
// import { getFileFaRelationUrl } from '../../../src/dataModule/UrlList'

import { connect } from 'react-redux'
// import { storeFileRelationData } from '../../components/common/store/actionCreaters'
import store from '../../store'
import { actionCreators as commonAction } from '../../components/common/store';

import FileCollapse from '../../publicComponents/collapse.jsx'
import Folder from '../../publicComponents/IconFonts'
import FileDataList from '../../publicComponents/dataList.jsx'

import FileEditModal from './editModal'

const { TabPane } = Tabs;
// const model = new Model()

class DocumentDetil extends Component{
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '1',
      file_visible: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data.documentNo !== nextProps.data.documentNo) {
      // console.log('变了')
      this.setState({
        activeKey:'1'
      })
    }
  }

  //数据转换
  handleChange = (type) => {
    if (type === false) {
      return '否'
    } else if (type === true) {
      return '是'
    }
  }

  callback = (key) => {
    // console.log(key);
    this.setState({
      activeKey: key
    })
    if (key === '2' || key === '1') {
      store.dispatch(commonAction.getFileFaRelations(this.props.data.id))
      store.dispatch(commonAction.getDrawSonRelations())
      store.dispatch(commonAction.getPartSonRelations())
    } else {
      store.dispatch(commonAction.getFileReallyData(this.props.data.id))
    }
  }

  //打开编辑弹窗
  editFileMes = () => {
    store.dispatch(commonAction.getFileFaRelations(this.props.data.id))
    this.setState({
      file_visible: true
    })
  }

  //关闭弹窗
  cancle = () => {
    this.setState({
      file_visible: false
    })
  }

  render() {
    const { data } = this.props
    const { file_visible} = this.state
    // console.log('data', data)
    return (
      <div style={{ margin: '20px' }}>
        <Tabs onChange={this.callback} type="card" activeKey={this.state.activeKey} >
          <TabPane
            tab={
              <span>
                <Folder type="icon-shuju" style={{ fontSize: '18px', paddingRight: '4px' }} />
                基本信息
              </span>
             }
            key="1"
          >
            <div style={{width: '300px',marginLeft:'30px'}}>
              <Descriptions title="" column={1}>
                <Descriptions.Item label="文档编号">{data.documentNo}</Descriptions.Item>
                <Descriptions.Item label="文档名称">{ data.name}</Descriptions.Item>
                <Descriptions.Item label="文档版本">{data.version}</Descriptions.Item>
                <Descriptions.Item label="创建时间">{data.createDate}</Descriptions.Item>
                <Descriptions.Item label="创建人">{data.createdBy}</Descriptions.Item>
                {/* <Descriptions.Item label="产品组">{data.productGroup}</Descriptions.Item> */}
                <Descriptions.Item label="文档描述">{data.tag}</Descriptions.Item>
                <Descriptions.Item label="是否冻结">{ this.handleChange(data.frozen)}</Descriptions.Item>
                <Descriptions.Item label="是否审查">{ this.handleChange(data.reviewed)}</Descriptions.Item>
                <Descriptions.Item label="流程状态">{data.processState}</Descriptions.Item>
                <Descriptions.Item label="发布时间">{ data.releaseDate}</Descriptions.Item>
                <Descriptions.Item label="发布者">{data.releasedBy}</Descriptions.Item>
                <Descriptions.Item label="发布阶段">{data.releasePhase}</Descriptions.Item>
                <Descriptions.Item label="最后修改人">{data.modifiedBy}</Descriptions.Item>
                <Descriptions.Item label="最后修改缘由">{data.modifiedReason}</Descriptions.Item>
                <Descriptions.Item label="最后修改时间">{ data.modifyDate}</Descriptions.Item>
              </Descriptions>
            </div>
            <div style={{margin: '40px'}}>
              <Button size="small" icon="edit" onClick={this.editFileMes}>编辑</Button>
            </div>
            <FileEditModal
              visible={file_visible}
              cancleModal={this.cancle}
              file_datas={data}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <Folder type="icon-guanlian" style={{ fontSize: '18px', paddingRight: '4px' }} />
                关联信息
              </span>
             }
            key="2"
          >
            <div>
              <FileCollapse
                activeKey={data.documentNo}
              />
            </div>
          </TabPane>
          <TabPane
           tab={
            <span>
              <Folder type="icon-shuju1" style={{ fontSize: '18px', paddingRight: '4px' }} />
              数据信息
            </span>
           }
            key="3"
          >
            <FileDataList
              data={this.props.fileReallyData}
            />
          </TabPane>
        </Tabs>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fileReallyData: state.get('commonReducer').get('fileReallyData').toJS(),
  }
}

export default  connect(mapStateToProps, null)(DocumentDetil)
