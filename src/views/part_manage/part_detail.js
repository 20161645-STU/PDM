import React, { Component } from 'react';
import { Descriptions, Button } from 'antd';

// import EditModal from './editModal'

class PartDetil extends Component{
    constructor(props) {
        super(props);
        this.state = {
            editModalVisible: false,
            data: {}
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

    //数据转换
    handleChange = (type) => {
        if (type === false) {
            return '否'
        } else if (type === true) {
            return '是'
        }
    }

    render() {
        const { data } = this.state
        // const { data } = this.props
        // console.log(data)
        return (
            <div style={{margin:'20px'}}>
                <Descriptions
                    title="零件详情"
                    bordered
                    column={1}
                    size={'small'}
                >
                    <Descriptions.Item label="零件编号">{data.drawingNo}</Descriptions.Item>
                    <Descriptions.Item label="零件名称">{ data.name}</Descriptions.Item>
                    <Descriptions.Item label="图纸版本">{data.version}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">{data.createDate}</Descriptions.Item>
                    <Descriptions.Item label="创建人">{data.createdBy}</Descriptions.Item>
                    <Descriptions.Item label="是否冻结">{ this.handleChange(data.frozen)}</Descriptions.Item>
                    <Descriptions.Item label="是否审查">{ this.handleChange(data.reviewed)}</Descriptions.Item>
                    <Descriptions.Item label="流程状态">{data.processState}</Descriptions.Item>
                    {/* <Descriptions.Item label="所属零件">机械手臂</Descriptions.Item> */}
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

export default PartDetil
