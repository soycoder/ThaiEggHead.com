import React, { useState, useEffect } from "react";
import Select from "react-select/creatable";

const SelectTag = (props) => {
  const [option, setOption] = useState([]);

  const optionsTag = [
    { name: "Art", tagID: "Art" },
    { name: "Database", tagID: "Database" },
    { name: "Science", tagID: "Scienceact" },
    { name: "Law", tagID: "Law" },    
  ];

  useEffect(() => {
    fetch(`http://localhost:5000/forums/tag`)
      .then((res) => res.json())
      .then((res) => {
        let array = optionsTag.concat(res);
        let options = array.map((d) => ({
          value: d.tagID,
          label: d.name,
        }));
        // console.log(options);
        setOption(options);
      });

    
  }, []);

  return (
    <div>
      <Select
        options={option}
        onChange={props.updateTagList}
        isMulti={true}
        defaultValue={[]}
        placeholder="ตัวอย่าง (Programing, Database, Law, Art)"
        isClearable
      />
    </div>
  );
};

export default SelectTag;

// export default class Multi extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       selectOptions : [],
//       value:[]
//     }
//   }

//  async getOptions(){
//     const res = await axios.get('http://localhost:5000/forums/tag')
//     const data = res.data
//     // console.log(data)

//     const options = data.map(d => ({
//       "value" : d.tagID,
//       "label" : d.name

//     }))

//     this.setState({selectOptions: options})

//   }

//   handleChange(e){
//     console.log(e)
//    this.setState({value:e})
//   }

//   componentDidMount(){
//       this.getOptions()
//   }

//   render() {
//     // console.log(this.state.value)
//     return (
//       <div>
//         <Select
//           options={this.state.selectOptions}
//           onChange={this.handleChange.bind(this)}
//           isMulti={true}
//           defaultValue={[]}
//           placeholder="ตัวอย่าง (Programing, Database, Law, Art)"
//           isClearable
//         />

//         <h3>Tag List</h3>
//         {/* {
//             this.state.value === null ? "" : this.state.value.map(v => <h4>{v.label} { (v.__isNew__)? "true": "false"}</h4>)
//         } */}

//       </div>
//     )
//   }
// }
