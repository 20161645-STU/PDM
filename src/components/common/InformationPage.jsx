import React, {Component} from "react";
import { connect } from 'react-redux'
import { message } from 'antd'

import FileDetail from '../../views/file_manage/file_detail';
import FolderDetail from '../../views/my_home/folder_detail';
import ProgramDetail from '../../views/program_manage/program_detail';
import PartDetail from '../../views/part_manage/part_detail';
import DrawingDetail from '../../views/drawing_manage/drawing_detail';

import { Model } from '../../dataModule/testBone'
import { getAloneDrawUrl } from '../../dataModule/UrlList'

const model = new Model()

class InformationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawsDatas:[]
    }
  }

   //生命周期函数
  // componentDidMount() {
  //   this.getAloneDraws()
  // }

  // 获得单个图纸的详细信息
  getAloneDraws = () => {
    let me = this
    model.fetch(
        {id: this.props.detil_mes.id},
        getAloneDrawUrl,
        'get',
        function (res) {
            console.log(111, res)
            me.setState({
                drawsDatas: res.data
            })
        },
        function (error) {
            message.error('获取图纸信息失败！')
        },
        false
    )
  }

  

  render() {
    const content = []
    const { detil_mes } = this.props
    // console.log('detil_mes', detil_mes)
    
    if (detil_mes.detail_type === 'drawing') {
      content.push(<DrawingDetail key={'drawing'}/>)
    } else if (detil_mes.detail_type === 'folder') {
      content.push(<FolderDetail key={'folder'}/>)
    } else if (detil_mes.detail_type === 'program') {
      content.push(<ProgramDetail key={'program'}/>)
    } else if (detil_mes.detail_type === 'part') {
      content.push(<PartDetail key={'part'}/>)
    } else if (detil_mes.detail_type === 'file') {
      content.push(<FileDetail key={'file'}/>)
    } 

    return (
      <div>
        {content}
      </div>
    ) 
  }

}

const mapStateToProps = (state) => {
  return {
      detil_mes: state.get('commonReducer').get('detil_mes').toJS()
  }
}

export default connect(mapStateToProps, null)(InformationPage);