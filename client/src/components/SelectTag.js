import React, { useState, useEffect } from "react";
import Select from "react-select/creatable";

const SelectTag = (props) => {
  const [option, setOption] = useState([]);

  const optionsTag = [
    { name: "Database", tagID: "Database" },
    { name: "Science", tagID: "Scienceact" },
    { name: "ศิลปะ", tagID: "ศิลปะ" },
    { name: "ข่าว", tagID: "ข่าว" },
    { name: "กีฬา", tagID: "กีฬา" },
    { name: "สังคม", tagID: "สังคม" },
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