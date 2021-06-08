import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import '../App.css'

export default function WithoutInfo() {
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: 'อันดับที่',
        field: 'rank',
        sort: 'disabled',
      },
      {
        label: 'ชื่อผู้ใช้',
        field: 'name',
        sort: 'disabled',
      },
      {
        label: 'EggHeadScore',
        field: 'score',
      }
    ],
    rows: [     
      { rank: 1, name: 'NetteN', score: 11880 },
      { rank: 2, name: 'Eimi', score: 9109 },
      { rank: 3, name: 'Yui' , score: 8967 },
      { rank: 4, name: 'Izawa', score: 8773 },
      { rank: 5, name: 'Reon', score: 8713 }, 
      { rank: 7, name: 'Haruka' , score: 8441 },
      { rank: 8, name: 'Rio', score: 8422 },       
      { rank: 9, name: 'Tsubomi', score: 8343 },
      { rank: 6, name: 'Harumi', score: 8519 },
      { rank: 10, name: 'Ren', score: 8317 }
    ],
  });

  const Top = 5;

  return (
  <>
    <MDBDataTableV5 
      theme={"dark"}
      data={datatable}
      hover
      entries={Top}
      pagesAmount={4}
      info={false}
      striped
      bordered
    />
  </>
  
  )
  
}