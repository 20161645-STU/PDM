import React, { Component, Fragment } from 'react'
import { Button, Select } from 'antd'

import CreateNewDraw from '../drawing_manage/addDrawProcess'
import CreateNewPart from '../part_manage/addPartProcess'
import CreateNewFile from '../file_manage/addFileProcess'
import CreateNewProgram from '../program_manage/program_creat'

const { Option } = Select

class AddFolderContext extends Component{
  constructor(props) {
    super(props)
    this.state = {
      optionVisible: false,
      contextType: ''
    }
  }

  getSelect = () => {
    this.setState({
      optionVisible: true
    })
  }

  //选择新建类型
  handleChange = (value) => {
    this.setState({
      contextType: value
    })
  }

  render() {
    const content = []

    if (this.state.contextType === 'draw') {
      content.push(<CreateNewDraw key={'drawing'} folderData={'folder'}/>)
    }
    else if (this.state.contextType === 'part') {
      content.push(<CreateNewPart key={'part'} folderData={'folder'}/>)
    }
    else if (this.state.contextType === 'file') {
      content.push(<CreateNewFile key={'file'} folderData={'folder'}/>)
    }
    else if (this.state.contextType === 'program') {
      content.push(<CreateNewProgram key={'program'} folderData={'folder'}/>)
    }


    return (
      <Fragment>
        <div style={{ margin: '16px 20px' }}>
          {this.state.optionVisible === false ? <Button type='primary' icon="plus" onClick={this.getSelect}>新增文件夹内容</Button>
            : <div>
              <Select  style={{ width: 240 }} onChange={this.handleChange}>
                <Option value="part">零件</Option>
                <Option value="draw">图纸</Option>
                <Option value="file">文档</Option>
                <Option value="program">项目</Option>
              </Select>
            </div>}
        </div>
        <div>
          {content}
        </div>
      </Fragment>
    )
  }
}

export default AddFolderContext

