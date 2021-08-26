import React, { Component } from 'react'
import { Form, Input, Select, Button} from 'antd'
import { getUserName } from '../../../src/publicFunction'

import { connect } from 'react-redux'
import { creatNewDrawing } from '../store/actionCreaters'

import store from '../../store'
import { actionCreators as viewsAction } from '../store';


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
      created_by: getUserName(),
      selectedItems: [],
      selectProjectItems: [],
      part_code: '',
      project_code: '',
      zss_type: '',
    }
  }
  
  componentDidMount() {
    store.dispatch(viewsAction.getAllProjects())
    store.dispatch(viewsAction.getAllParts()) 
  }

 //下一步
  subFileMes = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err) => {
      if (!err) {
        const newDrawing = {
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
          part_code: this.state.part_code,
          project_code: this.state.project_code,
          zss_type: this.state.zss_type,
        }
        this.props.next(newDrawing)
      }
    })
  }


  //获得创建新图纸的各个数据
  handChange = (key, value) => {
    const newDrawsData = this.state
    newDrawsData[key] = value
    // console.log(newDrawsData)
    this.setState(newDrawsData)
  }

    //恢复初始化 
  initState = () => {
    const initData = {}
    const newDrawing = this.state
    for (let i in newDrawing) {
        initData[i] = ''
    }
    initData['part_no'] = 0
    initData['is_frozen'] = '0'
    initData['is_reviewed'] = '0'
    initData['version'] = '1'
    initData['language'] = '中文'
    initData['created_by'] = getUserName()
    this.setState(initData)
    this.props.creatNewDrawing(initData)
  }


  //取消创建
  comeBack = () => {
    this.initState()
    this.props.history.push('/app/drawing_manage')
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
    const { getFieldDecorator } = this.props.form
    const drawStandards = [{ standard_name: 'GB' }, { standard_name: 'USA' }, { standard_name: 'EU' }]
    const groupNames = [{ group_name: '创课堂' }, { group_name: '群智空间' }, { group_name: '数字化车间' }]
    const weight_unit_data = [{ unit_name: '克', key: '1' }, { unit_name: '千克', key: '2' }]
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 16,
      },
    }
    const { selectedItems, selectProjectItems } = this.state
    const { AllPartMes, AllProjects } = this.props
    // console.log('AllPartMes', AllPartMes)
    const OPTIONS = this.handleData('part', AllPartMes)
    const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
    const PROJECTSOPTIONS = this.handleData('project',AllProjects)
    const projectsFilteredOptions = PROJECTSOPTIONS.filter(o => !selectProjectItems.includes(o));

    return (
      <div>
        <Form style={{marginTop:'30px'}} onSubmit={this.subFileMes}  { ...formItemLayout }>
          <Form.Item
              label="图纸名称"
              colon
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '输入相应的图纸名称' }],
              // initialValue: name
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
                // initialValue: product_group
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
                // initialValue: standard
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
            <TextArea style={{ width: '300px' }} rows={3} 
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
    AllPartMes: state.get('viewsReducer').get('allPartsInfo').toJS(),
    newFilesData: state.get('viewsReducer').get('newFilesData').toJS(),
    allDrawings: state.get('viewsReducer').get('allDrawingsInfo').toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    creatNewDrawing: data => dispatch(creatNewDrawing(data)),
  }
}


const WrappedNormalLoginForm = Form.create({ name: 'add_drawing' })(AddDrawing);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)

