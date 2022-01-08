import React, { Component } from 'react'
import { Modal, Button, Form, Input, Select, message } from 'antd'

import { connect } from 'react-redux'
import store from '../../store'
import { actionCreators as viewsAction } from '../store'
import { actionCreators as commonAction } from '../../components/common/store';

import { getUserName } from '../../../src/publicFunction'

import { Model } from '../../dataModule/testBone'
import { editPartUrl, getAlonePartUrl  } from '../../../src/dataModule/UrlList'

const { Option } = Select
const { TextArea } = Input
const model = new Model()

class EditPartModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.part_datas.name,
      product_group: this.props.part_datas.product_group,
      standard: this.props.part_datas.standard,
      tag: this.props.part_datas.tag,
      is_frozen: '0',
      is_reviewed: '0',
      language: '中文',
      version: '1',
      substance: this.props.part_datas.substance,   //物质
      weight: this.props.part_datas.weighht,  //重量
      weight_unit: this.props.part_datas.weight_unit,   //单位
      modified_by: getUserName(),
      selectProjectItems: [],
      project_code: '',
      tss_type: '',
      folder_id: '',
      type: 'part',
      modified_reason: this.props.part_datas.modified_reason,
    }
  }

  componentDidMount() {
    store.dispatch(viewsAction.getAllProjects())
  }

  handleCancel = () => {
    this.props.cancleModal()
  }

  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err) => {
      if (!err) {
        const newPart = {
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
          project_code: this.state.project_code,
          tss_type: this.state.tss_type,    //零件是总成还是普通零件
          folder_id: this.state.folder_id,
          type: this.state.type,
          id: this.props.part_datas.id,
          modified_reason: this.state.modified_reason
        }
        // console.log(1, newPart)
        this.updatePartMes(newPart)
      }
    })
  }

   //更新零件信息
  updatePartMes = (params) => {
    let me = this
    model.fetch(
      params,
      editPartUrl,
      'post',
      function (res) {
        // console.log(111, res.data)
        me.getAlonePart(params.id)
        me.handleCancel()
        message.success("更新成功")
      },
      function (error) {
        message.error('更新零件信息失败！')
      },
      false
    )
  }

   // 获得单个零件的详细信息
   getAlonePart = (params) => {
    model.fetch(
      {id: params},
      getAlonePartUrl,
      'get',
      function (res) {
        console.log(111, res.data)
        store.dispatch(commonAction.sentDetilType({
          detail_type: 'part',
          alonePartDatas: res.data
        }))
        store.dispatch(viewsAction.getAllParts())
      },
      function (error) {
          message.error('获取零件信息失败！')
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
  

  //零件数据处理
  handleData = (key, value) => {
    if (key === 'project') {
      const PROJECTSOPTIONS = value.map(item => { return item.project_no + '/' + item.name })
      return PROJECTSOPTIONS 
    }
  }

  //获取项目,零件的id
  handleChange = (key, params) => {
    if (key === 'project_no') {
      const projectInfo = this.props.AllProjects.filter(item => {
        return item[key] === params[0].substring(0, 7)*1
      })
      // console.log('projectInfo', projectInfo)
      if (projectInfo.length !== 0) {
        this.setState({
          project_code: projectInfo[0].id
        })
      } else {
        this.setState({
          project_code: ''
        })
      }   
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

    const partStandards = [{ standard_name: 'GB' }, { standard_name: 'USA' }, { standard_name: 'EU' }]
    const groupNames = [{ group_name: '创课堂' }, { group_name: '群智空间' }, { group_name: '数字化车间' }]
    const weight_unit_data = [{ unit_name: '克', key: '1' }, { unit_name: '千克', key: '2' }]

    const { part_datas, AllProjects } = this.props
    const { selectProjectItems} = this.state
    const PROJECTSOPTIONS = this.handleData('project',AllProjects)
    const projectsFilteredOptions = PROJECTSOPTIONS.filter(o => !selectProjectItems.includes(o));
    return (
      <div>
        <Modal
          title="零件信息"
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
              label="零件编号"
              colon
            >
              {getFieldDecorator('partNo', {
                rules: [{ required: true, message: '输入相应的零件编号' }],
                initialValue: part_datas.partNo 
              })(
                <Input style={{ width: '300px' }} 
                  onChange={e => this.handChange('partNo', e.target.value)} disabled={ true}/>
              )}
            </Form.Item>

            <Form.Item
              label="零件名称"
              colon
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '输入相应的零件名称' }],
                initialValue: part_datas.name 
              })(
                <Input style={{ width: '300px' }}
                  onChange={e => this.handChange('name', e.target.value)} allowClear />
              )}
            </Form.Item>

            <Form.Item
              label="产品组"
              colon
            >
              {getFieldDecorator('product_group', {
                  rules: [{ required: true, message: '请选择所在产品组' }],
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
                  rules: [{ required: true, message: '请选择零件标准' }],
              })(
                <Select style={{ width: '300px' }}
                  onChange={(e) => this.handChange('standard', e)} allowClear>
                    {partStandards.map((item, index) => {
                        return <Option
                                value={item.standard_name}
                                key={index}
                                onClick={() => {this.setState({standard: item.standard_name})}}
                            >{item.standard_name}</Option>
                    }) }
                </Select>
              )}
            </Form.Item>

            {/* <Form.Item
              label="零件类型"
              colon
            >
              {getFieldDecorator('tss_type', {
                  rules: [{ required: true, message: '请选择零件类型' }],
              })(
                <Select style={{ width: '300px' }}
                  onChange={(e) => this.handChange('tss_type', e)} allowClear>
                    {partTypes.map((item, index) => {
                        return <Option
                                value={item.value}
                                key={index}
                                onClick={() => {this.setState({tss_type: item.value})}}
                            >{item.name}</Option>
                    }) }
                </Select>
              )}
            </Form.Item> */}

            <Form.Item
              label="描述"
              colon
            >
              <TextArea style={{ width: '300px' }} rows={2}
                  defaultValue={ part_datas.tag }
                onChange={e => this.handChange('tag', e.target.value)} />
            </Form.Item>

            <Form.Item
              label="材料"
              colon
            >
              <Input style={{ width: '300px' }}
                  defaultValue={ part_datas.substance }
                onChange={e => this.handChange('substance', e.target.value)} allowClear />
            </Form.Item>

            <Form.Item
                label="重量"
                colon
            >
              <Input style={{ width: '300px' }}
                  defaultValue={ part_datas.weight }
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

            { this.props.partFaRelationData.length === 0 ? (
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

const WrappedNormalLoginForm = Form.create({ name: 'edit_part' })(EditPartModal);

const mapStateToProps = (state) => {
  return {
    partFaRelationData: state.get('commonReducer').get('partFaRelationData').toJS(),
    AllProjects: state.get('viewsReducer').get('allProjectsInfo').toJS(),
  }
}

export default  connect(mapStateToProps, null)(WrappedNormalLoginForm)
