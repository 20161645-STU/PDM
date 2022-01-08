import { Upload, Button, Icon } from 'antd'
import React, { Component } from 'react'
import './style.less'

class Uploads extends Component {
  state = {
    fileList: [],
  };

  //上传文档
  finish = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files', file);
    });
    this.props.beginUpload(formData)
  };

  render() {
    const { fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div style={{ marginTop: '20px', textAlign: 'left' }}>
        <Upload {...props} multiple>
          <Button>
            <Icon type="upload" /> 请选择文件
          </Button>
        </Upload>
        <div className="uploadButtons">
          {
            this.props.visible === true ?
              <Button onClick={this.props.prev}
                style={{ marginLeft: '20px' }}
              >
                上一步
              </Button>
              : null
          }
          <Button disabled={fileList.length === 0}
            style={{ marginLeft: '20px' }}
            onClick={this.finish}
          >
            完成
          </Button>
        </div>
      </div>
    );
  }
}

export default Uploads
