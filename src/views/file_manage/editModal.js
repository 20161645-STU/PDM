import React, { Component } from 'react'
import { Modal, Button, Form, Input, Select, message } from 'antd'

import { connect } from 'react-redux'
import store from '../../store'
import { actionCreators as viewsAction } from '../store';
import { actionCreators as commonAction } from '../../components/common/store';

import { getUserName } from '../../publicFunction/index'

import { Model } from '../../dataModule/testBone'
import { editFileUrl, getAloneDocumentUrl } from '../../../src/dataModule/UrlList'

const { TextArea } = Input;
const model = new Model()

class EditFileModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      // document_no: '',        //文档编号
      name: this.props.file_datas.name,
      document_type: '',
      document_group: '',
      tag: this.props.file_datas.tag,
      // created_by: getUserName(),
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
      dss_type: '',
      modified_reason: this.props.file_datas.modified_reason,
    }
  }

  componentDidMount() {
    store.dispatch(viewsAction.getAllProjects())
    store.dispatch(viewsAction.getAllParts())
    store.dispatch(viewsAction.getAllDrawings())  
  }


  //获得创建新文档的各个数据
  handChange = (key, value) => {
    const newFileData = this.state
    newFileData[key] = value
    // console.log(newDrawsData)
    this.setState(newFileData)
  }

  //确定
  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err) => {
      if (!err) {
        const newFile = {
          name: this.state.name,
          document_type: this.state.document_type,
          document_group: this.state.document_group,
          tag: this.state.tag,
          modified_by: getUserName(),
          is_frozen: '0',
          is_reviewed: '0',
          version: '1',
          language: '中文',
          part_code: this.state.part_code,
          project_code: this.state.project_code,
          zss_id: this.state.zss_id,
          dss_type: this.state.dss_type,
          modified_reason: this.state.modified_reason,
          id: this.props.file_datas.id
        }
        // console.log('newFile', newFile)
        this.updateFileMes(newFile)
      }
    })
  }

  //更新文档信息
  updateFileMes = (params) => {
    let me = this
    model.fetch(
      params,
      editFileUrl,
      'post',
      function (res) {
        // console.log(111, res.data)
        me.getAloneDocument(params.id)
        me.handleCancel()
        message.success("更新成功")
      },
      function (error) {
        message.error('更新文档信息失败！')
      },
      false
    )
  }

  // 获得单个文档的详细信息
  getAloneDocument = (params) => {
    model.fetch(
      {id: params},
      getAloneDocumentUrl,
      'get',
      function (res) {
        // console.log(1881, res.data)
        store.dispatch(commonAction.sentDetilType({
          detail_type: 'file',
          aloneDocumentDatas: res.data
        }))
        store.dispatch(viewsAction.getAllDocuments())
      },
      function (error) {
        message.error('获取文档信息失败！')
      },
      false
    )
  }

  //取消
  handleCancel = () => {
    this.props.cancleModal()
  }

  //获取项目,零件和图纸的id
  handleChange = (key, params) => {
    if (key === 'project_no'  && params.length !== 0) {
      const projectInfo = this.props.AllProjects.filter(item => {
        return item[key] === params[0].substring(0, 7)*1
      })
      // console.log('projectInfo', projectInfo)
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
    } else {
      this.setState({
        part_code: '',
        project_code: '',
        zss_id: ''
      })
    }
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
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 16,
      },
    }

    const { selectedItems, selectProjectItems, selectDrawItems, part_code, project_code, zss_id } = this.state
    const { file_datas, allDrawings, AllPartMes, AllProjects, } = this.props
    
    const DRAWOPTIONS = this.handleData('drawing', allDrawings)
    const drawingFilterOptions = DRAWOPTIONS.filter(o => !selectDrawItems.includes(o))
    const OPTIONS = this.handleData('part', AllPartMes)
    // console.log('AllPartMes', AllPartMes)
    const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
    const PROJECTSOPTIONS = this.handleData('project',AllProjects)
    const projectsFilteredOptions = PROJECTSOPTIONS.filter(o => !selectProjectItems.includes(o));
    return (
      <div>
         <Modal
          title="文档信息"
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
                  label="文档编号"
                  colon
              >
              {getFieldDecorator('documentNo', {
                rules: [{ required: true, message: '输入相应的文件编号' }],
                initialValue: file_datas.documentNo 
              })(
                <Input style={{ width: '300px', marginLeft: '30px' }}
                  onChange={e => this.handChange('documentNo', e.target.value)} disabled={ true}/>
              )}
            </Form.Item>

            <Form.Item
                label="文档名称"
                colon
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '输入相应的文件名称' }],
                initialValue: file_datas.name 
              })(
                  <Input style={{ width: '300px', marginLeft: '30px' }}   autoComplete="off"
                    onChange={e => this.handChange('name', e.target.value)} allowClear />
              )}
            </Form.Item>

            <Form.Item
              label="文档描述"
              colon
            >
              <TextArea style={{ width: '300px', marginLeft: '30px' }} rows={2}
                defaultValue={ file_datas.tag }
                onChange={e => this.handChange('tag', e.target.value)}  />
            </Form.Item>

            <Form.Item
              label="修改原因"
              colon
            >
              {getFieldDecorator('modified_reason', {
                rules: [{ required: true, message: '输入修改原因' }],
                initialValue: file_datas.modified_reason 
              })(
                <TextArea style={{ width: '300px', marginLeft: '30px' }} rows={2}
                  onChange={e => this.handChange('modified_reason', e.target.value)}
                />
              )}
            </Form.Item>

            {
              this.props.fileRelationData.length === 0 ? (
                <Form.Item
                  label="所属图纸"
                  colon
                >
                  <Select style={{ width: '300px', marginLeft: '30px' }}
                    mode="multiple"
                    placeholder="请选择所属的图纸"
                    // initialvalue={newFilesData.part_no}
                    onChange={value => this.handleChange('drawingNo', value)}
                    disabled={ part_code !== '' || project_code !== '' ? true : false}
                  >
                    {drawingFilterOptions.map((item, index) => (
                      <Select.Option key={item} value={item}>
                        {item}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                )
                : null
            }

            {this.props.fileRelationData.length === 0 ? (
                <Form.Item
                label="所属零件"
                colon
              >
                <Select style={{ width: '300px', marginLeft: '30px' }}
                  mode="multiple"
                  placeholder="请选择所属的零件"
                  // initialvalue={ newFilesData.part_no }
                  onChange={value => this.handleChange('partNo', value)}
                  disabled={ zss_id !== '' || project_code !== '' ? true : false}
                >
                  {filteredOptions.map((item, index) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            ) : null}

            {this.props.fileRelationData.length === 0 ? (
                <Form.Item
                label="所属项目"
                colon
              >
                <Select style={{ width: '300px', marginLeft: '30px' }}
                  mode="multiple"
                  placeholder="请选择所属项目"
                  // initialvalue={ newFilesData.project_no }
                  onChange={value => this.handleChange('project_no', value)}
                  disabled={ zss_id !== '' || part_code !== '' ? true : false}
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

const WrappedNormalLoginForm = Form.create({ name: 'edit_file' })(EditFileModal);

const mapStateToProps = (state) => {
  return {
    fileRelationData: state.get('commonReducer').get('fileRelationData').toJS(),
    AllProjects: state.get('viewsReducer').get('allProjectsInfo').toJS(),
    AllPartMes: state.get('viewsReducer').get('allPartsInfo').toJS(),
    allDrawings: state.get('viewsReducer').get('allDrawingsInfo').toJS()
  }
}

export default connect(mapStateToProps, null)(WrappedNormalLoginForm)

