import React, {Component} from "react";
import { connect } from 'react-redux'

import FileDetail from '../../views/file_manage/file_detail';
import FolderDetail from '../../views/my_home/folder_detail';
import ProgramDetail from '../../views/program_manage/program_detail';
import PartDetail from '../../views/part_manage/part_detail';
import DrawingDetail from '../../views/drawing_manage/drawing_detail';


class InformationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawsDatas:[]
    }
  }

  render() {
    const content = []
    const { detil_mes } = this.props
    
    if (detil_mes.detail_type === 'drawing') {
      content.push(<DrawingDetail key={'drawing'} data={ detil_mes.aloneDrawsDatas}/>)
    } else if (detil_mes.detail_type === 'folder') {
      content.push(<FolderDetail key={'folder'}/>)
    } else if (detil_mes.detail_type === 'program') {
      content.push(<ProgramDetail key={'program'} data={ detil_mes.aloneProjectDatas}/>)
    } else if (detil_mes.detail_type === 'part') {
      content.push(<PartDetail key={'part'} data={ detil_mes.alonePartDatas}/>)
    } else if (detil_mes.detail_type === 'file') {
      content.push(<FileDetail key={'file'}  data={ detil_mes.aloneDocumentDatas}/>)
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