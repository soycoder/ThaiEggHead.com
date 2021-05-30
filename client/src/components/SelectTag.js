import React, { Component } from 'react'
import Select from 'react-select/creatable'
import axios from 'axios'

export default class Multi extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectOptions : [],
      value:[]
    }
  }

 async getOptions(){
    const res = await axios.get('http://localhost:5000/forums/tag')
    const data = res.data
    // console.log(data)

    const options = data.map(d => ({
      "value" : d.tagID,
      "label" : d.name

    }))

    this.setState({selectOptions: options})

  }

  handleChange(e){
    console.log(e)
   this.setState({value:e})
  }

  componentDidMount(){
      this.getOptions()
  }

  render() {
    // console.log(this.state.value)
    return (
      <div>
        <Select 
          options={this.state.selectOptions} 
          onChange={this.handleChange.bind(this)} 
          isMulti={true}
          defaultValue={[]} 
          placeholder="ตัวอย่าง (Programing, Database, Law, Art)" 
          isClearable
        />

        <h1>Hello World</h1>
        {/* {
            this.state.value === null ? "" : this.state.value.map(v => <h4>{v.label} { (v.__isNew__)? "true": "false"}</h4>)
        } */}

      </div>
    )
  }
}

