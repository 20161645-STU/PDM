import React, { Component } from 'react'
import { Form, Input, Select, Button } from 'antd'
import { getUserName } from '../../../src/publicFunction'

import { connect } from 'react-redux'
import { creatNewParts } from '../store/actionCreaters'

import store from '../../store'
import { actionCreators as viewsAction } from '../store';

const { Option } = Select
const { TextArea } = Input

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
      version: '1',
      substance: '',   //物质
      weight: '',  //重量
      weight_unit: '',   //单位
      created_by: getUserName(),
      selectProjectItems: [],
      project_code: '',
      tss_type: '',
      folder_id: '',
      type: 'part'
    }
  }

  componentDidMount() {
    store.dispatch(viewsAction.getAllProjects()) 
  } 

  //下一步
  subFileMes = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err) => {
      if (!err) {
        const newPart = {
          name: this.state.name,
          product_group: this.state.product_group,
          tag: this.state.tag,
          created_by: getUserName(),
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
          type: this.state.type
        }
        // console.log(1, newPart)
        this.props.next(newPart)
      }
    })
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
    initData['version'] = '1'
    initData['language'] = '中文'
    initData['created_by'] = getUserName()
    initData['type'] = 'part'
    this.setState(initData)
    this.props.creatNewParts(initData)
  }

  //取消创建
  comeBack = () => {
    this.initState()
    this.props.history.push('/app/part_manage')
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
    const { getFieldDecorator } = this.props.form
    const { selectProjectItems} = this.state

    const partStandards = [{ standard_name: 'GB' }, { standard_name: 'USA' }, { standard_name: 'EU' }]
    const groupNames = [{ group_name: '创课堂' }, { group_name: '群智空间' }, { group_name: '数字化车间' }]
    const weight_unit_data = [{ unit_name: '克', key: '1' }, { unit_name: '千克', key: '2' }]
    const partTypes = [{value: 'EI', id:'1',name:'一级件'},{value:'normal', id:'2', name:'普通零件'}]

    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 16,
      },
    };

    const { AllProjects } = this.props
    const PROJECTSOPTIONS = this.handleData('project',AllProjects)
    const projectsFilteredOptions = PROJECTSOPTIONS.filter(o => !selectProjectItems.includes(o));
    return (
      <div>
        <Form style={{marginTop:'30px'}} onSubmit={this.subFileMes}  { ...formItemLayout }>
          <Form.Item
            label="零件名称"
            colon
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '输入相应的零件名称' }],
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

          <Form.Item
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
          </Form.Item>

          <Form.Item
            label="描述"
            colon
          >
            <TextArea style={{ width: '300px'}} rows={3}
              onChange={e => this.handChange('tag', e.target.value)} />
          </Form.Item>

          <Form.Item
            label="材料"
            colon
          >
            <Input style={{ width: '300px'}} 
              onChange={e => this.handChange('substance', e.target.value)} allowClear />
          </Form.Item>

          <Form.Item
              label="重量"
              colon
          >
            <Input style={{ width: '300px' }} 
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

          <Form.Item>
            <div style={{margin:'30px 300px',width:'200px',}}>
              <Button type='primary' htmlType="submit">下一步</Button>
              <Button style={{marginLeft:'20px'}} onClick={this.comeBack}>取消</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    AllProjects: state.get('viewsReducer').get('allProjectsInfo').toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    creatNewParts: data => dispatch(creatNewParts(data)),
  }
}


const WrappedNormalLoginForm = Form.create({ name: 'create_parts' })(AddPart);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)
