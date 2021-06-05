import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import '../App.css'


export default function WithoutInfo() {
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: 'Rank',
        field: 'rank',
        sort: 'disabled',
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'disabled',
      },
      {
        label: 'Score',
        field: 'score',
      }
    ],
    rows: [     
      { rank: 1, name: 'Ootsuki Hibiki', score: 11880 },
      { rank: 2, name: 'Eimi Fukada', score: 9109 },
      { rank: 3, name: 'Yui Aragaki', score: 8967 },
      { rank: 4, name: 'Chinatsu Izawa', score: 8773 },
      { rank: 5, name: 'Reon Kadena', score: 8713 }, 
      { rank: 7, name: 'Haruka Sanada', score: 8441 },
      { rank: 8, name: 'Rio Kitajima', score: 8422 },       
      { rank: 9, name: 'Tsubomi', score: 8343 },
      { rank: 6, name: 'Harumi Asano', score: 8519 },
      { rank: 10, name: 'Ren Aizawa', score: 8317 }
    ],
  });

  const Top = 5;
  const loopConst = () =>{
    // for (let i = 0; i < datatable.length; i++) {
    //   formData.append("files", multipleFiles[i]);
    // }
    console.log(datatable)
  }

  return <MDBDataTableV5 
    theme={"dark"}
    data={datatable}
    hover
    entries={Top}
    // entriesOptions={[5,10]}
    pagesAmount={4}
    info={false}
    striped
    bordered
    // paging={false}
  />;
}