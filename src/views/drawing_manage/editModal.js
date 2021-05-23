import React, { Component } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';

const { Option } = Select;

class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            draw_number: '',   //图纸编号
            draw_name: '',     //图纸名称
            draw_id: '',       //图纸类型id
            part_id: '',       //图纸所属零件id
            product_group: '',  // 图纸所属组别
            draw_standard: '',   //图纸标准
            draw_description:'',   //图纸描述
            drawsTypes: [{ typeName: '二维图', id: '1' }, { typeName: '轴测图', id: '2' }, { typeName: '上视图', id: '3' }],
            partsNames: [{ part_name: '机械臂', pid: '1' }, { part_name: '底座', pid: '2' }, { part_name: '连接件', pid: '3' }],
            groupNames: [{ group_name: '1008611' }, { group_name: '100000' }, { group_name: '334600' }],
            drawStandards: [{ standard_name: 'GB' }, { standard_name: 'USA' }, { standard_name: 'EU' }]
        }
    }

    //获得创建新图纸的各个数据
    handChange = (key, value) => {
        const newDrawsData = this.state
        newDrawsData[key] = value
        console.log(newDrawsData)
        this.setState(newDrawsData)
    }

    
    render() {
        const { visible, handleCancel } = this.props
        const { getFieldDecorator } = this.props.form
        const {
            // draw_number,
            // draw_name,
            draw_id,
            part_id,
            product_group,
            draw_standard,
            draw_description,
            drawsTypes,
            partsNames,
            groupNames,
            drawStandards
        } = this.state
        return (
            <div>
                 <Modal
                    title="图纸详情编辑"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                          cancel Check-out
                        </Button>,
                        <Button key="submit" type="primary"  onClick={this.handleOk}>
                          Check-in
                        </Button>,
                    ]}
                >
                    <Form onSubmit={this.handleSubmit} style={{ marginTop: '10px', width: '400px', marginLeft: "20px" }}>
                        <Form.Item>
                            {getFieldDecorator('draw_number', {
                                rules: [{ required: true, message: '请输入相应的图纸编号' }],
                            })(
                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                    <span style={{lineHeight:'30px'}}>图纸编号:</span>
                                    <Input style={{ width: '300px' }} defaultValue={'2053301'} disabled/>
                                </div>    
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('draw_name', {
                                rules: [{ required: true, message: '输入相应的图纸名称' }],
                            })(
                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                    <span style={{lineHeight:'30px'}}>图纸名称:</span>
                                    <Input style={{width:'300px',marginLeft:'30px'}} defaultValue={'机械手'} onChange={ e => this.handChange('draw_name', e.target.value) } allowClear/>
                                </div>
                            )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('draw_type', {
                            rules: [{ required: true, message: '请选择相应的图纸类型' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>图纸分类:</span>
                                <Select  value={ draw_id } style={{ width:'300px' }} onChange={(e) => this.handChange('draw_id', e)} allowClear>
                                    {drawsTypes.map((item, index) => {
                                        return <Option
                                                    value={item.id}
                                                    key={index}
                                                    onClick={() => {this.setState({draw_id: item.id})}}
                                                >{item.typeName}</Option>
                                   })}
                                </Select>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('part_name', {
                            rules: [{ required: true, message: '请选择所属零件' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>所属零件:</span>
                                <Select  style={{ width:'300px'}} value={ part_id } onChange={(e) => this.handChange('part_id', e)} allowClear>
                                    {partsNames.map((item, index) => {
                                        return <Option
                                                value={item.pid}
                                                key={index}
                                                onClick={() => {this.setState({part_id: item.pid})}}
                                            >{item.part_name}</Option>
                                    }) }
                                </Select>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('product_group', {
                            rules: [{ required: true, message: '请选择所在产品组' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>产品组:</span>
                                <Select  style={{ width:'300px' }}  value={ product_group } onChange={(e) => this.handChange('product_group', e)} allowClear>
                                    {groupNames.map((item, index) => {
                                            return <Option
                                                    value={item.group_name}
                                                    key={index}
                                                    onClick={() => {this.setState({product_group: item.group_name})}}
                                                >{item.group_name}</Option>
                                    }) }
                                </Select>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('draw_standard', {
                            rules: [{ required: true, message: '请选择图纸标准' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>标准:</span>
                                <Select style={{ width:'300px' }} value={draw_standard}  onChange={(e) => this.handChange('draw_standard', e)} allowClear>
                                    {drawStandards.map((item, index) => {
                                                return <Option
                                                        value={item.standard_name}
                                                        key={index}
                                                        onClick={() => {this.setState({draw_standard: item.standard_name})}}
                                                    >{item.standard_name}</Option>
                                    }) }
                                </Select>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>图纸描述:</span>
                            <Input style={{ width: '300px', marginLeft: '30px' }} value={draw_description} onChange={e => this.handChange('draw_description', e.target.value)} allowClear/>
                            </div>
                    </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'edit_drawing' })(EditModal);

export default WrappedNormalLoginForm
