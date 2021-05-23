import React, { Component } from 'react';
import { Descriptions, Button } from 'antd';

import EditModal from './editModal'

class DrawDetil extends Component{
    constructor(props) {
        super(props);
        this.state = {
            editModalVisible: false
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

    render() {
        return (
            <div style={{margin:'20px'}}>
                <Descriptions
                    title="图纸详情"
                    bordered
                    column={1}
                    size={'small'}
                >
                    <Descriptions.Item label="图纸编号">325001</Descriptions.Item>
                    <Descriptions.Item label="图纸名称">机械手臂正视图</Descriptions.Item>
                    <Descriptions.Item label="图纸版本">AA</Descriptions.Item>
                    <Descriptions.Item label="创建时间">2021:05:19 11:02</Descriptions.Item>
                    <Descriptions.Item label="创建人">admin</Descriptions.Item>
                    <Descriptions.Item label="是否冻结">否</Descriptions.Item>
                    <Descriptions.Item label="是否审查">否</Descriptions.Item>
                    <Descriptions.Item label="流程状态">发放</Descriptions.Item>
                    {/* <Descriptions.Item label="所属零件">机械手臂</Descriptions.Item> */}
                    <Descriptions.Item label="标准">GB</Descriptions.Item>
                    <Descriptions.Item label="产品组">10001</Descriptions.Item>
                    <Descriptions.Item label="图纸描述">抓取</Descriptions.Item>
                    <Descriptions.Item label="材料">铝</Descriptions.Item>
                    <Descriptions.Item label="重量">100克</Descriptions.Item>
                    <Descriptions.Item label="发布时间">2021:05:21 11:02</Descriptions.Item>
                    <Descriptions.Item label="发布者">胡学军</Descriptions.Item>
                    <Descriptions.Item label="发布阶段">胡经理审批</Descriptions.Item>
                    <Descriptions.Item label="最后修改人">胡学军</Descriptions.Item>
                    <Descriptions.Item label="最后修改缘由">更新</Descriptions.Item>
                    <Descriptions.Item label="最后修改时间">2021:05:19 12:02</Descriptions.Item>
                </Descriptions>
                <div style={{marginTop:'30px'}}>
                    <Button icon="edit" onClick={this.editDraws}>Ckeck-out</Button>
                </div>
                <EditModal
                    visible={this.state.editModalVisible}
                    handleCancel={this.closeEditModal}
                />
            </div>
        )
    }
}

export default DrawDetil
