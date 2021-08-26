import React, { Component } from 'react';
import { Descriptions, Button } from 'antd';

// import EditModal from './editModal'

class ProjectDetil extends Component{
  constructor(props) {
    super(props);
    this.state = {
      editModalVisible: false,
    }
  }

  //打开编辑弹窗
  editDraws = () => {
    this.setState({
      editModalVisible: true
    })
  }

  //关闭弹窗
  closeEditModal = () => {
    this.setState({
      editModalVisible: false
    })
  }

  //处理返回的时间数据
  handleTime = (params) => {
    if (params !== null) {
      const newTime = params.substring(0, 10)
      return newTime
    }
    return null
  }

  handleData = (value) => {
    if (value === 1) {
      return '未完结'
    } else {
      return '已完结'
    }
  }
 

  render() {
    // const data = this.handleData(this.props.data)
    const data = this.props.data
    // console.log(data)
    return (
      <div style={{margin:'20px'}}>
        <Descriptions
          title="项目详情"
          column={1}
          size={'small'}
        >
          <Descriptions.Item label="项目编号">{ data.project_no}</Descriptions.Item>
          <Descriptions.Item label="项目名称">{data.name}</Descriptions.Item>
          <Descriptions.Item label="项目描述">{data.description}</Descriptions.Item>
          <Descriptions.Item label="项目负责人">{data.admin}</Descriptions.Item>
          <Descriptions.Item label="项目来源">{data.sourcing}</Descriptions.Item>
          <Descriptions.Item label="项目状态">{this.handleData(data.status)}</Descriptions.Item>
          <Descriptions.Item label="项目所属组织">{data.projectGroup}</Descriptions.Item>
          <Descriptions.Item label="计划开始时间">{this.handleTime(data.planningStartDate)}</Descriptions.Item>
          <Descriptions.Item label="项目计划周期">{data.planningPeriod}</Descriptions.Item>
          <Descriptions.Item label="计划结束时间">{this.handleTime(data.planningEndDate)}</Descriptions.Item>
          <Descriptions.Item label="实际开始时间">{this.handleTime(data.actualStartDate)}</Descriptions.Item>
          <Descriptions.Item label="项目实际周期">{data.actualPeriod}</Descriptions.Item>
          <Descriptions.Item label="实际结束时间">{this.handleTime(data.actualEndDate)}</Descriptions.Item>
        </Descriptions>
        <div style={{marginTop:'30px'}}>
            <Button icon="edit" onClick={this.editDraws}>Ckeck-out</Button>
        </div>
        {/* <EditModal
            visible={this.state.editModalVisible}
            handleCancel={this.closeEditModal}
        /> */}
      </div>
    )
  }
}

export default ProjectDetil
