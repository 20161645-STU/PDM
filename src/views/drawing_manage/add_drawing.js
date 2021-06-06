import React, { Component } from 'react'
import { Form, Input, Select, Button} from 'antd'
import { getUserName } from '../../../src/publicFunction'
// import { Model } from '../../../src/dataModule/testBone'
// import { createDrawUrl } from '../../../src/dataModule/UrlList'

import { connect } from 'react-redux'
import { creatNewDrawing } from '../store/actionCreaters'


const { Option } = Select;
const { TextArea } = Input;
// const model = new Model();

class AddDrawing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawing_no: '',   //图纸编号
      name: '',     //图纸名称
      // draw_id: '',       //图纸类型id
      // part_id: '',       //图纸所属零件id
      product_group: '',  // 图纸所属组别
      standard: '',   //图纸标准
      tag: '',   //图纸描述
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
  
  //下一步
  submitMes = () => {
    const newDraw = this.state
    this.props.next(newDraw)
  }


   //创建新图纸
  // createDraw = () => {
  //   const me = this
  //   const newDraw = this.state
  //   // console.log('newDraw', newDraw)
  //   // for (let i in newDraw) {
  //   // // if (newDraw[i] === '' || newDraw[i] === undefined) {
  //   // //     message.error('信息未填写完整！')
  //   // //     return
  //   // // }
  //   // }
  //   model.fetch(
  //     newDraw,
  //     createDrawUrl,
  //     'post',
  //     function (res) {
  //         message.success('创建图纸成功！')
  //         me.initState()
  //     },
  //     function (error) {
  //         message.error('创建图纸失败！')
  //     },
  //     false
  //     )
  //   }

    //恢复初始化 
    initState = () => {
      const initData = {}
      const newDraw = this.state
      for (let i in newDraw) {
          initData[i] = ''
      }
      initData['is_frozen'] = '0'
      initData['is_reviewed'] = '0'
      initData['version'] = 'AA'
      initData['language'] = '中文'
      initData['created_by'] = getUserName()
      this.setState(initData)
      // this.comeBack()
    }


    //获得创建新图纸的各个数据
    handChange = (key, value) => {
      const newDrawsData = this.state
      newDrawsData[key] = value
      // console.log(newDrawsData)
      this.setState(newDrawsData)
    }

    //取消创建
    comeBack = () => {
      this.initState()
      this.props.history.push('/app/drawing_manage')
      this.props.creatNewDrawing({})
    }


    render() {
      const { getFieldDecorator } = this.props.form
      const {
        drawing_no,
        name,
        product_group,
        standard,
        tag,
        substance,
        weight,
        weight_unit
      } = this.state

      const drawStandards = [{ standard_name: 'GB' }, { standard_name: 'USA' }, { standard_name: 'EU' }]
      const groupNames = [{ group_name: '1008611' }, { group_name: '100000' }, { group_name: '334600' }]
      const weight_unit_data = [{ unit_name: '克', key: '1' }, { unit_name: '千克', key: '2' }]
        

      return (
        <div>
          <Form onSubmit={this.handleSubmit} style={{marginTop:'30px', width:'400px',marginLeft:"30px"}}>
              <Form.Item>
                  {getFieldDecorator('drawing_no', {
                    rules: [{ required: true, message: '请输入相应的图纸编号' }],
                    // initialValue: drawing_no
                  })(
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                        <span style={{lineHeight:'30px'}}>图纸编号:</span>
                        <Input style={{ width: '300px' }} value={drawing_no}
                          onChange={e => this.handChange('drawing_no', e.target.value)} allowClear />
                      </div>    
                  )}
              </Form.Item>
              <Form.Item>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '输入相应的图纸名称' }],
                    // initialValue: name
                  })(
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                          <span style={{lineHeight:'30px'}}>图纸名称:</span>
                          <Input style={{ width: '300px', marginLeft: '30px' }} value={name}
                            onChange={e => this.handChange('name', e.target.value)} allowClear />
                      </div>
                  )}
              </Form.Item>
              {/* <Form.Item>
                  {getFieldDecorator('draw_type', {
                      rules: [{ required: true, message: '请选择相应的图纸类型' }],
                  })(
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                          <span style={{lineHeight:'30px'}}>图纸分类:</span>
                          <Select  value={ draw_id } style={{ width:'300px' }} 
                          onChange={(e) => this.handChange('draw_id', e)} allowClear>
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
              </Form.Item> */}
              {/* <Form.Item>
                  {getFieldDecorator('part_name', {
                      rules: [{ required: true, message: '请选择所属零件' }],
                  })(
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                          <span style={{lineHeight:'30px'}}>所属零件:</span>
                          <Select  style={{ width:'300px'}} value={ part_id } 
                          onChange={(e) => this.handChange('part_id', e)} allowClear>
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
              </Form.Item> */}
              <Form.Item>
                  {getFieldDecorator('product_group', {
                    rules: [{ required: true, message: '请选择所在产品组' }],
                    // initialValue: product_group
                  })(
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                          <span style={{lineHeight:'30px'}}>产品组:</span>
                          <Select style={{ width: '300px' }} value={product_group}
                            onChange={(e) => this.handChange('product_group', e)} allowClear>
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
                    rules: [{ required: true, message: '请选择图纸标准' }],
                    // initialValue: standard
                  })(
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                          <span style={{lineHeight:'30px'}}>标准:</span>
                          <Select style={{ width: '300px' }} value={standard}
                            onChange={(e) => this.handChange('standard', e)} allowClear>
                              {drawStandards.map((item, index) => {
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
                    rules: [{ required: true, message: '请输入图纸描述' }],
                    // initialValue: tag
                  })(
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <span style={{lineHeight:'30px'}}>图纸描述:</span>
                        <TextArea style={{ width: '300px', marginLeft: '30px' }} rows={3} value={tag}
                          onChange={e => this.handChange('tag', e.target.value)} />
                    </div>   
                  )}
              </Form.Item>
              <Form.Item>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <span style={{lineHeight:'30px'}}>材料:</span>
                  <Input style={{ width: '300px', marginLeft: '30px' }} value={substance} 
                    onChange={e => this.handChange('substance', e.target.value)} allowClear />
                </div>   
              </Form.Item>
              <Form.Item>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <span style={{lineHeight:'30px'}}>重量:</span>
                    <Input style={{ width: '300px', marginLeft: '30px' }} value={weight}  
                      onChange={e => this.handChange('weight', e.target.value)} allowClear />
                </div>   
              </Form.Item>
              <Form.Item>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <span style={{lineHeight:'30px'}}>重量单位:</span>
                    <Select style={{ width: '300px' }} value={weight_unit} 
                      onChange={(e) => this.handChange('weight_unit', e)} allowClear>
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
              <div style={{margin:'60px 80px 60px 300px', width:'200px'}}>
                <Button type='primary' onClick={this.submitMes}>下一步</Button>
                <Button style={{marginLeft:'20px'}} onClick={this.comeBack}>取消</Button>
              </div>
          </div>
      )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    creatNewDrawing: data => dispatch(creatNewDrawing(data)),
  }
}


const WrappedNormalLoginForm = Form.create({ name: 'add_drawing' })(AddDrawing);

export default connect(null, mapDispatchToProps)(WrappedNormalLoginForm)

