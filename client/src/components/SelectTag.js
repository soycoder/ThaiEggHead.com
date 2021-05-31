import React, { Component } from 'react'
import Select from 'react-select/creatable'
import axios from 'axios'

  const optionsTag = [
    { name: "Science", tagID: "1" },
    { name: "Law", tagID: "2" },
    { name: "Database", tagID: "3" },
    { name: "DataTeat", tagID: "4" },
    { name: "Art", tagID: "5" },
  ];
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
    const data = optionsTag
    // data = res.data
    // console.log(data)

    const options = data.map(d => ({
      "value" : d.tagID,
      "label" : d.name

    }))

    this.setState({selectOptions: options})

  }

  handleChange(e){
    var myTag = "";
    // console.log(e)
    //this.setState({value:e})
    e.map((o) => (myTag += o.label + " "));
    console.log("myTag : " + myTag);
  }

  componentDidMount(){
      this.getOptions()
  }

  render() {
    // console.log(this.state.value)
    return (
      <div>
        <Select 
          opions={this.state.selectOptions}
          // options={this.state.selectOptions} 
          onChange={this.handleChange.bind(this)} 
          isMulti={true}
          defaultValue={[]} 
          placeholder="ตัวอย่าง (Programing, Database, Law, Art)" 
          isClearable
        />
        {/* {
          // this.state.value === null ? "" : this.state.value.map(v => <h9>{v.label+" "}</h9>)
            this.state.value === null ? "" : this.state.value.map(v => <h4>{v.label} { (v.__isNew__)? "true": "false"}</h4>)
        } */}

      </div>
    )
  }
}

