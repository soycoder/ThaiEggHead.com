import React from 'react'
import ReactDOM from 'react-dom'
import Avatar from 'react-avatar-edit'
import { images } from "../constants";
import { Button, Icon } from "@blueprintjs/core";


class App extends React.Component {

    constructor(props) {
      super(props)
      const src = images.logo
      this.state = {
        preview: null,
        defaultPreview: null,
        src
      }
      this.onCrop = this.onCrop.bind(this)
      this.onCropDefault = this.onCropDefault.bind(this)
      this.onClose = this.onClose.bind(this)
      this.onCloseDefault = this.onCloseDefault.bind(this)
    }
  
    onCropDefault(preview) {
      this.setState({defaultPreview: preview})
    }
  
    onCrop(preview) {
      this.setState({preview})
    }
  
    onCloseDefault() {
      this.setState({defaultPreview: null})
    }
  
    onClose() {
      this.setState({preview: null})
    }
  
    render() {
      return (
        <div className="container-fluid">

          <div className="row">
            <div className="col-8">
              <h4>Default usage</h4>
            </div>
          </div>
          
          <div className="row">
            <div className="col-7">
              <Avatar
                width={390}
                height={295}
                exportSize={390}
                onCrop={this.onCropDefault}
                onClose={this.onCloseDefault}
                // src={this.state.src}
              />
            </div>

            <div className="col-2">
              <h5>Preview</h5>
              <img alt="" style={{width: '150px', height: '150px'}} src={this.state.defaultPreview}/>
            </div>
            
          </div>
            <Button>
                    <Icon /> Confirm
                </Button>
        </div>
      )
    }
  }

export default App;