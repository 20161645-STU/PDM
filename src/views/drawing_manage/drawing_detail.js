import React, { Component } from 'react';
import { Tabs, Descriptions, Button } from 'antd';

import store from '../../store'
import { actionCreators as commonAction } from '../../components/common/store'

import { connect } from 'react-redux'

import DrawCollapse from '../../publicComponents/collapse.jsx'
import DrawDataList from '../../publicComponents/dataList.jsx'
import Folder from '../../publicComponents/IconFonts'

import DrawEditModal from './editDrawModal'

const { TabPane } = Tabs;

class DrawDetil extends Component{
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '1',
      draw_visible: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data.drawingNo !== nextProps.data.drawingNo) {
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
      store.dispatch(commonAction.getFileFaRelations())
      store.dispatch(commonAction.getPartSonRelations())
      store.dispatch(commonAction.getPartFaRelations())
      store.dispatch(commonAction.getDrawFaRelations(this.props.data.id))
      store.dispatch(commonAction.getDrawSonRelations(this.props.data.id))
    }
    else {
      store.dispatch(commonAction.getDrawReallyData(this.props.data.id))
    }
  }

  //打开编辑弹窗
  editFDrawMes = () => {
    store.dispatch(commonAction.getDrawFaRelations(this.props.data.id))
    this.setState({
      draw_visible: true
    })
  }

  //关闭弹窗
  cancle = () => {
    this.setState({
      draw_visible: false
    })
  }

  render() {
    const { data } = this.props
    const { draw_visible} = this.state
    // console.log(888, data)
    return (
      <div style={{margin:'20px'}}>
        <Tabs onChange={this.callback} type="card" activeKey={this.state.activeKey}>
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
              <Descriptions.Item label="图纸编号">{data.drawingNo}</Descriptions.Item>
              <Descriptions.Item label="图纸名称">{ data.name}</Descriptions.Item>
              <Descriptions.Item label="图纸版本">{data.version}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{data.createDate}</Descriptions.Item>
              <Descriptions.Item label="创建人">{data.createdBy}</Descriptions.Item>
              <Descriptions.Item label="产品组">{data.productGroup}</Descriptions.Item>
              <Descriptions.Item label="图纸描述">{data.tag}</Descriptions.Item>
              <Descriptions.Item label="材料">{data.substance}</Descriptions.Item>
              <Descriptions.Item label="重量">{(data.weight + data.weightUnit).toString()}</Descriptions.Item>
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
            {data.version === 'item' ? null :
                <div style={{margin: '40px'}}>
                <Button size="small" icon="edit" onClick={this.editFDrawMes}>编辑</Button>
              </div>
            }  
            <DrawEditModal
              visible={draw_visible}
              cancleModal={this.cancle}
              draw_datas={data}
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
            <DrawCollapse
              activeKey={data.drawingNo}
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
            <DrawDataList
              data={this.props.drawReallyData}
            />
        </TabPane>
      </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    drawReallyData: state.get('commonReducer').get('drawReallyData').toJS(),
  }
}

export default connect(mapStateToProps, null)(DrawDetil)
