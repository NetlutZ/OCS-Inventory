import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';

function AddDevice() {
  const [records, setRecords] = useState([])
  const [filterRecords, setFilterRecords] = useState([])
  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => <div id={'statusInStorage'}>{row.name}</div>,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'City',
      selector: row => row.address.city,
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
    },
    {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
    },
  ]

  useEffect(() => {
    const fectData = async () => {
      axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => { 
          setRecords(res.data) 
          setFilterRecords(res.data)
        })
        .catch(err => { console.log(err) })
    }
    fectData()
  }, [])

  const customStyles = {
    headRow:{
      style:{
        backgroundColor: 'blue',
        color: 'white',
      }
    },
    headCells:{
      style:{
        fontSize: '20px',
        fontWeight: '600',
        textTransform: 'uppercase',
      }
    },
    cells:{
      style:{
        fontSize: '18px',
      }
    }
  }
  const handleFilter = (e) => {
    const newData = filterRecords.filter(row => row.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setRecords(newData)
  }
  return (
    <div>
      <div style={{display:'flex', justifyContent:'right'}}>
        <input type='text' placeholder='search' onChange={handleFilter}></input>
      </div>
      <DataTable
        columns={columns}
        data={records}
        customStyles={customStyles}
        pagination  
        paginationRowsPerPageOptions={[5,10,15,20,25,30]}
        paginationPerPage	={5}
      />
    </div>
  )
}

export default AddDevice
