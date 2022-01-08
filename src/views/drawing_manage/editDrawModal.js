import React, { Component } from 'react'
import { Modal, Button, Form, Input, Select, message } from 'antd'

import { connect } from 'react-redux'
import store from '../../store'
import { actionCreators as viewsAction } from '../store'
import { actionCreators as commonAction } from '../../components/common/store';

import { Model } from '../../dataModule/testBone'
import { editDrawUrl, getAloneDrawUrl } from '../../../src/dataModule/UrlList'

import { getUserName } from '../../../src/publicFunction'

const { Option } = Select
const { TextArea } = Input
const model = new Model()

class EditDrawmodal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.draw_datas.name,     //图纸名称
      product_group: this.props.draw_datas.product_group,  // 图纸所属组别
      standard: this.props.draw_datas.standard,   //图纸标准
      tag: this.props.draw_datas.tag,   //图纸描述
      is_frozen: '0',
      is_reviewed: '0',
      language: '中文',
      version: 'AA',
      substance: this.props.draw_datas.substance,   //物质
      weight: this.props.draw_datas.weight,  //重量
      weight_unit: this.props.draw_datas.weight_unit,   //单位
      selectedItems: [],
      selectProjectItems: [],
      part_code: '',
      project_code: '',
      zss_type: '',
      modified_reason: this.props.draw_datas.modified_reason,
      type: 'draw'
    }
  }

  componentDidMount() {
    store.dispatch(viewsAction.getAllProjects())
    store.dispatch(viewsAction.getAllParts())
  }
  

  //取消
  handleCancel = () => {
    this.props.cancleModal()
  }

  //确定
  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err) => {
      if (!err) {
        const newDrawing = {
          name: this.state.name,
          product_group: this.state.product_group,
          tag: this.state.tag,
          modified_by: getUserName(),
          is_frozen: '0',
          is_reviewed: '0',
          version: '1',
          language: '中文',
          standard: this.state.standard,
          substance: this.state.substance,   //物质
          weight: this.state.weight,  //重量
          weight_unit: this.state.weight_unit,   //单位
          part_code: this.state.part_code,
          project_code: this.state.project_code,
          zss_type: this.state.zss_type,
          modified_reason: this.state.modified_reason,
          id: this.props.draw_datas.id,
          type: 'draw'
        }
        // console.log('newDrawing', newDrawing)
        this.updateDrawMes(newDrawing)
      }
    })
  }

  //更新图纸信息
  updateDrawMes = (params) => {
    let me = this
    model.fetch(
      params,
      editDrawUrl,
      'post',
      function (res) {
        // console.log(111, res.data)
        me.getAloneDraws(params.id)
        me.handleCancel()
        message.success("更新成功")
      },
      function (error) {
        message.error('更新图纸信息失败！')
      },
      false
    )
  }

   // 获得单个图纸的详细信息
   getAloneDraws = (params) => {
    model.fetch(
      {id: params},
      getAloneDrawUrl,
      'get',
      function (res) {
        // console.log(111, res.data)
        store.dispatch(commonAction.sentDetilType({
          detail_type: 'drawing',
          aloneDrawsDatas: res.data
        }))
        store.dispatch(viewsAction.getAllDrawings())
      },
      function (error) {
        message.error('获取图纸信息失败！')
      },
      false
    )
  }

  
  //获得创建新图纸的各个数据
  handChange = (key, value) => {
    const newDrawsData = this.state
    newDrawsData[key] = value
    // console.log(newDrawsData)
    this.setState(newDrawsData)
  }

   //零件数据处理
   handleData = (key, value) => {
    if (key === 'project') {
      const PROJECTSOPTIONS = value.map(item => { return item.project_no + '/' + item.name })
      return PROJECTSOPTIONS
    } else if (key === 'part') {
      const OPTIONS = value.filter(item => { return item.version !== 'item' }).map(item => {
        return item.partNo + '-' + item.name + '/' + item.version
      })
      return OPTIONS 
    }
  }

   //获取项目,零件的id
   handleChange = (key, params) => {
    if (key === 'project_no'  && params.length !== 0) {
      const projectInfo = this.props.AllProjects.filter(item => {
        return item[key] === params[0].substring(0, 7)*1
      })
      // console.log('projectInfo', projectInfo)
      this.setState({
        project_code: projectInfo[0].id,
        zss_type: 'project'
      })  
    } else if (key === 'partNo' && params.length !== 0) {
      const partInfo = this.props.AllPartMes.filter(item => {
        return item[key] === params[0].substring(0, 7)*1
      }).filter(item => {return item.version === params[0].substr(params[0].length - 1, 1)})
      // console.log(88, partInfo)
      this.setState({
        part_code: partInfo[0].id,
        zss_type: 'part'
      })
    } 
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 16,
      },
    }

    const { selectedItems, selectProjectItems } = this.state
    const { draw_datas, AllPartMes, AllProjects } = this.props

    const drawStandards = [{ standard_name: 'GB' }, { standard_name: 'USA' }, { standard_name: 'EU' }]
    const groupNames = [{ group_name: '创课堂' }, { group_name: '群智空间' }, { group_name: '数字化车间' }]
    const weight_unit_data = [{ unit_name: '克', key: '1' }, { unit_name: '千克', key: '2' }]
  
    // console.log('drawFaRelationInfo', this.props.drawFaRelationInfo)
    const OPTIONS = this.handleData('part', AllPartMes)
    const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
    const PROJECTSOPTIONS = this.handleData('project',AllProjects)
    const projectsFilteredOptions = PROJECTSOPTIONS.filter(o => !selectProjectItems.includes(o));
    return (
      <div>
        <Modal
          title="图纸信息"
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              确认
            </Button>,
          ]}
        >
          <Form style={{ marginTop: '10px' }} onSubmit={this.handleOk}  {...formItemLayout}>
            <Form.Item
                label="图纸编号"
                colon
            >
              {getFieldDecorator('drawingNo', {
                rules: [{ required: true, message: '输入相应的图纸编号' }],
                initialValue: draw_datas.drawingNo 
              })(
                <Input style={{ width: '300px' }} 
                  onChange={e => this.handChange('drawingNo', e.target.value)}  disabled={ true}/>
              )}
            </Form.Item>

            <Form.Item
              label="图纸名称"
              colon
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '输入相应的图纸名称' }],
                initialValue: draw_datas.name
              })(
                <Input style={{ width: '300px' }}   autoComplete="off"
                onChange={e => this.handChange('name', e.target.value)} allowClear />
              )}
            </Form.Item>

            <Form.Item
              label="产品组"
              colon
            >
              {getFieldDecorator('product_group', {
                rules: [{ required: true, message: '请选择所在产品组' }],
                initialValue: draw_datas.product_group
              })(
                <Select style={{ width: '300px' }} 
                  onChange={(e) => this.handChange('product_group', e)} allowClear>
                    {groupNames.map((item, index) => {
                      return <Option
                              value={item.group_name}
                              key={index}
                              onClick={() => {this.setState({product_group: item.group_name})}}
                          >{item.group_name}</Option>
                    }) }
              </Select>
              )}
            </Form.Item>

            <Form.Item
              label="标准"
              colon
            >
                {getFieldDecorator('standard', {
                  rules: [{ required: true, message: '请选择图纸标准' }],
                  initialValue: draw_datas.standard
                })(
                  <Select style={{ width: '300px' }} 
                  onChange={(e) => this.handChange('standard', e)} allowClear>
                    {drawStandards.map((item, index) => {
                      return <Option
                              value={item.standard_name}
                              key={index}
                              onClick={() => {this.setState({standard: item.standard_name})}}
                          >{item.standard_name}</Option>
                    }) }
                </Select>
                )}
            </Form.Item>

            <Form.Item
              label="图纸描述"
              colon
            >
              <TextArea style={{ width: '300px' }} rows={2}
                defaultValue={ draw_datas.tag }
                onChange={e => this.handChange('tag', e.target.value)} />
            </Form.Item>

            <Form.Item
                label="材料"
                colon
            >
              <Input style={{ width: '300px' }}
                defaultValue={ draw_datas.substance }
                onChange={e => this.handChange('substance', e.target.value)} allowClear />
            </Form.Item>

            <Form.Item
                label="重量"
                colon
            >
              <Input style={{ width: '300px' }}
                defaultValue={ draw_datas.weight }
                onChange={e => this.handChange('weight', e.target.value)} allowClear />
            </Form.Item>

            <Form.Item
              label="重量单位"
              colon
            >
                <Select style={{ width: '300px' }} 
                    onChange={(e) => this.handChange('weight_unit', e)} allowClear>
                      {weight_unit_data.map((item, index) => {
                          return <Option
                                  value={item.unit_name}
                                  key={index}
                                  onClick={() => {this.setState({weight_unit: item.unit_name})}}
                              >{item.unit_name}</Option>
                      }) }
                  </Select>
            </Form.Item>

            <Form.Item
              label="修改原因"
              colon
            >
              {getFieldDecorator('modified_reason', {
                rules: [{ required: true, message: '输入修改原因' }], 
              })(
                <TextArea style={{ width: '300px' }} rows={2}
                  onChange={e => this.handChange('modified_reason', e.target.value)}
                />
              )}
            </Form.Item>

            { this.props.drawFaRelationInfo.length === 0 ? (        
              <Form.Item
                label="所属零件"
                colon
              >
                <Select style={{ width: '300px'}}
                  mode="multiple"
                  placeholder="请选择所属的零件"
                  // initialvalue={ newFilesData.part_no }
                  onChange={value => this.handleChange('partNo', value)}
                >
                  {filteredOptions.map((item, index) => (
                    <Select.Option key={index} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item> 
            ) : null}

            {this.props.drawFaRelationInfo.length === 0 ? (
              <Form.Item
                label="所属项目"
                colon
              >
                <Select style={{ width: '300px' }}
                  mode="multiple"
                  placeholder="请选择所属项目"
                  // initialvalue={ newFilesData.project_no }
                  onChange={value => this.handleChange('project_no', value)}
                >
                  {projectsFilteredOptions.map((item, index) => (
                    <Select.Option key={index} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>   
            ) : null}
          </Form>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    drawFaRelationInfo: state.get('commonReducer').get('drawFaRelationInfo').toJS(),
    AllProjects: state.get('viewsReducer').get('allProjectsInfo').toJS(),
    AllPartMes: state.get('viewsReducer').get('allPartsInfo').toJS(),
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'edit_draw' })(EditDrawmodal);

export default connect(mapStateToProps, null)(WrappedNormalLoginForm)
