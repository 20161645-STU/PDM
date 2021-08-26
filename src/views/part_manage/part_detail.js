import React, { Component } from 'react';
import { Descriptions, Tabs } from 'antd';

import store from '../../store'
import { actionCreators as commonAction } from '../../components/common/store';

import Folder from '../../publicComponents/IconFonts'
import PartCollapse from '../../publicComponents/collapse.jsx'

const { TabPane } = Tabs;

class PartDetil extends Component{
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '1'
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data.partNo !== nextProps.data.partNo) {
      // console.log('变了')
      this.setState({
        activeKey:'1'
      })
    }
  }

  //数据转换
  handleChange = (key, type) => {
    if (key === '' && type === false) {
      return '否'
    } else if (key === '' && type === true) {
      return '是'
    } else if (key === 'type' && type === 'EI') {
      return '一级件'
    } else if (key === 'type' && type === 'normal') {
      return '普通零件'
    }
  }

  callback = (key) => {
    // console.log(key);
    this.setState({
      activeKey: key
    })
    if (key === '2' || key === '1') {
      store.dispatch(commonAction.getFileFaRelations())
      store.dispatch(commonAction.getDrawSonRelations())
      store.dispatch(commonAction.getDrawFaRelations())
      store.dispatch(commonAction.getPartSonRelations(this.props.data.id))
    }
  }

  render() {
      const { data } = this.props
      // console.log(data)
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
              <Descriptions
                title=""
                column={1}
              >
                <Descriptions.Item label="零件编号">{ data.partNo}</Descriptions.Item>
                <Descriptions.Item label="零件名称">{data.name}</Descriptions.Item>
                <Descriptions.Item label="零件类型">{this.handleChange('type', data.tssType)}</Descriptions.Item>
                <Descriptions.Item label="零件版本">{data.version}</Descriptions.Item>
                <Descriptions.Item label="创建时间">{data.createDate}</Descriptions.Item>
                <Descriptions.Item label="创建人">{data.createdBy}</Descriptions.Item>
                <Descriptions.Item label="是否冻结">{ this.handleChange('', data.frozen)}</Descriptions.Item>
                <Descriptions.Item label="是否审查">{ this.handleChange('', data.reviewed)}</Descriptions.Item>
                <Descriptions.Item label="流程状态">{data.processState}</Descriptions.Item>
                <Descriptions.Item label="标准">{data.standard}</Descriptions.Item>
                <Descriptions.Item label="产品组">{data.productGroup}</Descriptions.Item>
                <Descriptions.Item label="零件描述">{data.tag}</Descriptions.Item>
                <Descriptions.Item label="材料">{data.substance}</Descriptions.Item>
                <Descriptions.Item label="重量">{(data.weight + data.weightUnit).toString()}</Descriptions.Item>
                <Descriptions.Item label="发布时间">{ data.releaseDate}</Descriptions.Item>
                <Descriptions.Item label="发布者">{data.releasedBy}</Descriptions.Item>
                <Descriptions.Item label="发布阶段">{data.releasePhase}</Descriptions.Item>
                <Descriptions.Item label="最后修改人">{data.modifiedBy}</Descriptions.Item>
                <Descriptions.Item label="最后修改缘由">{data.modifiedReason}</Descriptions.Item>
                <Descriptions.Item label="最后修改时间">{ data.modifyDate}</Descriptions.Item>
            </Descriptions>
           </div>
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
             <PartCollapse/>
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
           Content of Tab Pane 3
         </TabPane>
       </Tabs>
      </div>
    )
  }
}

export default PartDetil
