import React, { Component } from 'react'
import { PageHeader, Form, Input, Select, Button,  message } from 'antd'
import { getUserName } from '../../../src/publicFunction'

import { Model } from '../../../src/dataModule/testBone'
import { createPartUrl } from '../../../src/dataModule/UrlList'


const { Option } = Select
const { TextArea } = Input
const model = new Model()

class AddPart extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // part_no: '',  //零件编号
        name: '',
        product_group: '',
        standard: '',
        tag: '',
        is_frozen: '0',
        is_reviewed: '0',
        language: '中文',
        version: 'AA',
        substance: '',   //物质
        weight: '',  //重量
        weight_unit: '',   //单位
        created_by: getUserName()
      }
    }
  
    //创建新零件
    createPart = () => {
      const me = this
      const newPart = this.state
      console.log('newPart', newPart)
      // for (let i in newPart) {
      // // if (newDraw[i] === '' || newDraw[i] === undefined) {
      // //     message.error('信息未填写完整！')
      // //     return
      // // }
      // }
      model.fetch(
        newPart,
        createPartUrl,
        'post',
        function (res) {
            message.success('创建零件成功！')
            me.initState()
        },
        function (error) {
            message.error('创建零件失败！')
        },
        false
        )
    }
  
    //获得创建新零件的各个数据
    handChange = (key, value) => {
      const newPartData = this.state
      newPartData[key] = value
      // console.log(newPartData)
      this.setState(newPartData)
    }
  
   //恢复初始化 
   initState = () => {
    const initData = {}
    const newPart = this.state
    for (let i in newPart) {
        initData[i] = ''
    }
    initData['is_frozen'] = '0'
    initData['is_reviewed'] = '0'
    initData['version'] = 'AA'
    initData['language'] = '中文'
    initData['created_by'] = getUserName()
    this.setState(initData)
  }

  //取消创建
  comeBack = () => {
    this.initState()
    this.props.history.push('/app/part_manage')
  }

    render() {
      const { getFieldDecorator } = this.props.form
      const { name, product_group, standard, tag, substance, weight, weight_unit } = this.state

      const groupNames = [{ group_name: '1008611' }, { group_name: '100000' }, { group_name: '334600' }]
      const partStandards = [{ standard_name: 'GB' }, { standard_name: 'USA' }, { standard_name: 'EU' }]
      const weight_unit_data = [{ unit_name: '克', key: '1' }, { unit_name: '千克', key: '2' }]

        return (
            <div>
                <PageHeader
                    onBack={() =>  this.props.history.push('/app/part_manage')}
                    title="返回"
                />
                <Form onSubmit={this.handleSubmit} style={{marginTop:'30px', width:'400px',marginLeft:"30px"}}>
                    {/* <Form.Item>
                        {getFieldDecorator('part_no', {
                            rules: [{ required: true, message: '请输入相应的零件编号' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>零件编号:</span>
                                <Input style={{ width: '300px' }} value={part_no} onChange={ e => this.handChange('part_no', e.target.value) } allowClear/>
                            </div>    
                        )}
                    </Form.Item> */}
                    <Form.Item>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '输入相应的零件名称' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>零件名称:</span>
                                <Input style={{width:'300px',marginLeft:'30px'}} value={name} onChange={ e => this.handChange('name', e.target.value) } allowClear/>
                            </div>
                        )}
                    </Form.Item>
                    {/* <Form.Item>
                        {getFieldDecorator('draw_type', {
                            rules: [{ required: true, message: '请选择相应的零件类型' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>零件分类:</span>
                                <Select defaultValue="零件" style={{ width:'300px' }} onChange={ value => this.handChange(value)}>
                                    <Option value="装配体">装配体</Option>
                                    <Option value="部件">部件</Option>
                                    <Option value="零件">零件</Option>
                                </Select>
                            </div>
                        )}
                    </Form.Item> */}
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
                        {getFieldDecorator('standard', {
                            rules: [{ required: true, message: '请选择零件标准' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>标准:</span>
                                <Select style={{ width:'300px' }} value={standard}  onChange={(e) => this.handChange('standard', e)} allowClear>
                                    {partStandards.map((item, index) => {
                                        return <Option
                                                value={item.standard_name}
                                                key={index}
                                                onClick={() => {this.setState({standard: item.standard_name})}}
                                            >{item.standard_name}</Option>
                                    }) }
                                </Select>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('tag', {
                            rules: [{ required: true, message: '请输入零件描述' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                              <span style={{lineHeight:'30px'}}>零件描述:</span>
                              <TextArea style={{ width: '300px', marginLeft: '30px' }} rows={3} value={tag} onChange={e => this.handChange('tag', e.target.value)}/>
                            </div>   
                        )}
                    </Form.Item>
                    <Form.Item>
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                          <span style={{lineHeight:'30px'}}>材料:</span>
                          <Input style={{ width: '300px', marginLeft: '30px' }} value={substance} onChange={e => this.handChange('substance', e.target.value)} allowClear/>
                      </div>   
                    </Form.Item>
                    <Form.Item>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <span style={{lineHeight:'30px'}}>重量:</span>
                            <Input style={{ width: '300px', marginLeft: '30px' }} value={weight} onChange={e => this.handChange('weight', e.target.value)} allowClear/>
                        </div>   
                    </Form.Item>
                    <Form.Item>
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                        <span style={{lineHeight:'30px'}}>重量单位:</span>
                        <Select style={{ width:'300px' }} value={weight_unit}  onChange={(e) => this.handChange('weight_unit', e)} allowClear>
                            {weight_unit_data.map((item, index) => {
                                return <Option
                                        value={item.unit_name}
                                        key={index}
                                        onClick={() => {this.setState({weight_unit: item.unit_name})}}
                                    >{item.unit_name}</Option>
                            }) }
                        </Select>
                      </div>
                    </Form.Item>
                </Form>
                <div style={{display:'flex',flexDirection:'column',width:'180px',marginLeft:'60px'}}>
                    <Button  icon="file-pdf" style={{marginBottom:'20px'}}>PDF上传</Button>
                    <Button  icon="codepen" style={{marginBottom:'20px'}}>数模上传</Button>
                </div>
                <div style={{margin:'30px 300px',width:'200px',}}>
                    <Button type='primary' onClick={this.createPart}>确定</Button>
                    <Button style={{marginLeft:'20px'}} onClick={this.comeBack}>取消</Button>
                </div>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'create_parts' })(AddPart);

export default WrappedNormalLoginForm
