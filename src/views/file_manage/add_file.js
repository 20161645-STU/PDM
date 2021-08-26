import React, { Component } from 'react';
import { Form, Input, Select, Button } from 'antd';

import { getUserName } from '../../../src/publicFunction'

import store from '../../store'
import { actionCreators as viewsAction } from '../store';
import { creatNewFiles } from '../store/actionCreaters'

import { connect } from 'react-redux';


// const { Option } = Select;
const { TextArea } = Input;

class AddFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // document_no: '',        //文档编号
      name: '',
      document_type: '',
      document_group: '',
      tag: '',
      created_by: getUserName(),
      is_frozen: '0',
      is_reviewed: '0',
      version: 'AA',
      language: '中文',
      selectedItems: [],  
      part_code: '',  //零件id,
      project_code: '',
      selectProjectItems: [],
      selectDrawItems: [],
      zss_id: '',
      dss_type: ''
    }
  }

  componentDidMount() {
    store.dispatch(viewsAction.getAllProjects())
    store.dispatch(viewsAction.getAllParts())
    store.dispatch(viewsAction.getAllFilesType())
    store.dispatch(viewsAction.getAllDrawings())  
  }


  //下一步
  subFileMes = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err) => {
      if (!err) {
        const newFile = {
          name: this.state.name,
          document_type: this.state.document_type,
          document_group: this.state.document_group,
          tag: this.state.tag,
          created_by: getUserName(),
          is_frozen: '0',
          is_reviewed: '0',
          version: '1',
          language: '中文',
          part_code: this.state.part_code,
          project_code: this.state.project_code,
          zss_id: this.state.zss_id,
          dss_type: this.state.dss_type
        }
        this.props.next(newFile)
      }
    })
  }

  //恢复初始化 
  initState = () => {
    const initData = {}
    const newDocument = this.state
    for (let i in newDocument) {
        initData[i] = ''
    }
    initData['is_frozen'] = '0'
    initData['is_reviewed'] = '0'
    initData['version'] = '1'
    initData['language'] = '中文'
    initData['created_by'] = getUserName()
    this.setState(initData)
    this.props.creatNewFiles(initData)
  }

  //获得创建新文档的各个数据
  handChange = (key, value) => {
    const newFileData = this.state
    newFileData[key] = value
    // console.log(newDrawsData)
    this.setState(newFileData)
  }

  //获取项目,零件和图纸的id
  handleChange = (key, params) => {
    if (key === 'project_no'  && params.length !== 0) {
      const projectInfo = this.props.AllProjects.filter(item => {
        return item[key] === params[0].substring(0, 7)*1
      })
      console.log('projectInfo', projectInfo)
      this.setState({
        project_code: projectInfo[0].id,
        dss_type: 'project'
      })  
    } else if (key === 'drawingNo' && params.length !== 0) {
      // console.log('params', params)
      const drawingInfo = this.props.allDrawings.filter(item => {
        return item[key] === params[0].substring(0, 7)*1
      }).filter(item => {return item.version === params[0].substr(params[0].length - 1, 1)})
      // console.log('drawingInfo', drawingInfo)
      this.setState({
        zss_id: drawingInfo[0].id,
        dss_type: 'chart'
      })
    } else if (key === 'partNo' && params.length !== 0) {
      const partInfo = this.props.AllPartMes.filter(item => {
        return item[key] === params[0].substring(0, 7)*1
      }).filter(item => {return item.version === params[0].substr(params[0].length - 1, 1)})
      // console.log(88, partInfo)
      this.setState({
        part_code: partInfo[0].id,
        dss_type: 'part'
      })
    } 
  }

  //取消创建
  comeBack = () => {
    this.initState()
    this.props.history.push('/app/file_manage')
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
    } else if (key === 'drawing') {
      const DRAWOPTIONS = value.filter(item => { return item.version !== 'item' }).map(item =>
      { return item.drawingNo  + '-' + item.name  + '/' + item.version })
      return DRAWOPTIONS
    } 
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { selectedItems, selectProjectItems, selectDrawItems } = this.state
    const { AllPartMes, AllProjects, newFilesData, allDrawings } = this.props
    const DRAWOPTIONS = this.handleData('drawing', allDrawings)
    const drawingFilterOptions = DRAWOPTIONS.filter(o => !selectDrawItems.includes(o))
    const OPTIONS = this.handleData('part', AllPartMes)
    // console.log('AllPartMes', AllPartMes)
    const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
    const PROJECTSOPTIONS = this.handleData('project',AllProjects)
    const projectsFilteredOptions = PROJECTSOPTIONS.filter(o => !selectProjectItems.includes(o));
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 16,
      },
    };
    return(
      <div>
        <Form  style={{marginTop:'30px'}} onSubmit={this.subFileMes}  { ...formItemLayout }>
          <Form.Item
              label="文档名称"
              colon
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '输入相应的文件名称' }],
              initialValue: newFilesData.name 
            })(
                <Input style={{ width: '300px', marginLeft: '30px' }}
                  onChange={e => this.handChange('name', e.target.value)} allowClear />
            )}
          </Form.Item>

          <Form.Item
            label="所属图纸"
            colon
          >
            <Select style={{ width: '300px', marginLeft: '30px' }}
              mode="multiple"
              placeholder="请选择所属的图纸"
              initialvalue={ newFilesData.part_no }
              onChange={value => this.handleChange('drawingNo', value)}
            >
              {drawingFilterOptions.map((item, index) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
              label="所属零件"
              colon
          >
            <Select style={{ width: '300px', marginLeft: '30px' }}
              mode="multiple"
              placeholder="请选择所属的零件"
              // initialvalue={ newFilesData.part_no }
              onChange={value => this.handleChange('partNo', value)}
            >
              {filteredOptions.map((item, index) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
              label="所属项目"
              colon
          >
            <Select style={{ width: '300px', marginLeft: '30px' }}
              mode="multiple"
              placeholder="请选择所属项目"
              initialvalue={ newFilesData.project_no }
              onChange={value => this.handleChange('project_no', value)}
            >
              {projectsFilteredOptions.map((item, index) => (
                <Select.Option key={index} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
              label="文档描述"
              colon
          >
            <TextArea style={{ width: '300px', marginLeft: '30px' }} rows={3}
              initialvalue={ newFilesData.tag }
              onChange={e => this.handChange('tag', e.target.value)}  />
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
    creatNewFiles: data => dispatch(creatNewFiles(data)),
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'add_file' })(AddFile);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)

