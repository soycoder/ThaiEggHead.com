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
      { name: 'OOTSUKI HIBIKI', score: 11880 },
      { name: 'Eimi Fukada', score: 9109 },
      { name: 'Rio Kitajima', score: 8422 },
      { name: 'Chinatsu Izawa', score: 8773 },
      { name: 'Reon Kadena', score: 8713 },
      { name: 'Haruka Sanada', score: 8441 },
      { name: 'Yui Aragaki', score: 8967 },
      { name: 'Tsubomi', score: 8343 },
      { name: 'Yuma Asami', score: 8324 },
      { name: 'Harumi Asano', score: 8519 },
      { name: 'Ren Aizawa', score: 8317 }
    ],
  });

  return <MDBDataTableV5
    data={datatable}
    hover
    entries={5}
    // entriesOptions={[5,10]}
    pagesAmount={4}
    info={false}
    striped
    bordered
    // paging={false}

  />;
}