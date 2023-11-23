import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

class AddDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      filterRecords: [],
    };
    this.columns = [
      {
        name: 'ID',
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: 'Name',
        selector: (row) => <div id={'statusInStorage'}>{row.name}</div>,
        sortable: true,
      },
      {
        name: 'Email',
        selector: (row) => row.email,
        sortable: true,
      },
      {
        name: 'City',
        selector: (row) => row.address.city,
        sortable: true,
      },
    ];
    this.customStyles = {
      headRow: {
        style: {
          backgroundColor: 'blue',
          color: 'white',
        },
      },
      headCells: {
        style: {
          fontSize: '20px',
          fontWeight: '600',
          textTransform: 'uppercase',
        },
      },
      cells: {
        style: {
          fontSize: '18px',
        },
      },
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      this.setState({
        records: res.data,
        filterRecords: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleFilter = (e) => {
    const newData = this.state.filterRecords.filter((row) =>
      row.name.toLowerCase().includes("Lean".toLowerCase()) ||
      row.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
      row.address.city.toLowerCase().includes(e.target.value.toLowerCase())
    );
    this.setState({
      records: newData,
    });
    console.log(newData);
    
  };

  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <input type='text' placeholder='search' onChange={this.handleFilter}></input>
        </div>
        <DataTable
          columns={this.columns}
          data={this.state.records}
          customStyles={this.customStyles}
          pagination
          paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
          paginationPerPage={5}
        />
      </div>
    );
  }
}

export default AddDevice;
