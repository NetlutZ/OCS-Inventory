import React, { useState, useEffect } from 'react';
import "./Dashboard.css"
import styled from '@emotion/styled';
import axios from 'axios';
import DataTable from 'react-data-table-component';


function Dashboard() {

  // const inventoryData = [
  //   { id: 1, name: 'Product A', quantity: 10, price: 20.99 },
  //   { id: 2, name: 'Product B', quantity: 15, price: 15.49 },
  //   { id: 3, name: 'Product C', quantity: 20, price: 25.99 },
  //   // Add more inventory items as needed
  // ];

  const [allDevice, setAllDevice] = useState([]);
  const [overallStatusCount, setOverallStatusCount] = useState({
    InStorage: 0,
    Loss: 0,
    Borrow: 0
  });

  const limitText = (text, limit) => {
    if (text.length > limit) {
      const chunks = [];
      while (text.length > 0) {
        chunks.push(text.slice(0, limit));
        text = text.slice(limit);
      }
      return chunks.join('\n'); // Force text onto a new line after each chunk
    }
    return text;
  };

  const fecthData = async () => {
    await axios.get('http://localhost:8080/device/')
      .then(respone => {
        setAllDevice(respone.data)
      })
    console.log(groupByName(allDevice))
    let totalInStorage = 0;
    let totalLoss = 0;
    let totalBorrow = 0;

    groupByName(allDevice).forEach(item => {
      const counts = getStatusCounts(item.status);
      totalInStorage += counts.InStorage;
      totalLoss += counts.Loss;
      totalBorrow += counts.Borrow;
    });

    setOverallStatusCount({
      InStorage: totalInStorage,
      Loss: totalLoss,
      Borrow: totalBorrow
    });
  }

  function countStatuses(devices) {
    const result = {};
    devices.forEach(device => {
      const counts = {};
      // Count occurrences of each status for a device
      device.status.forEach(status => {
        counts[status] = (counts[status] || 0) + 1;
      });
      // Assign counts to the device name
      result[device.name] = counts;
    });
    return result;
  }

  // group setAllDevice by name and then count the number of each status
  const groupByName = (allDevice) => {
    const groupByName1 = allDevice.reduce((acc, cur) => {
      // console.log(acc)
      // console.log(cur)
      const found = acc.find((item) => item.name === cur.name);
      // console.log(found)
      if (found) {
        found.status.push(cur.status);
      } else {
        acc.push({
          name: cur.name,
          status: [cur.status],
        });
      }
      return acc;
    }, []);
    return groupByName1;
  };

  useEffect(() => {
    fecthData()
  }, [])

  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true
    },
    {
      name: 'InStorage',
      selector: 'InStorage',
      sortable: true
    },
    {
      name: 'Borrow',
      selector: 'Borrow',
      sortable: true
    },
    {
      name: 'Loss',
      selector: 'Loss',
      sortable: true
    },
    
  ];

  const getStatusCounts = (statusArray) => {
    const counts = {
      InStorage: 0,
      Loss: 0,
      Borrow: 0
    };

    statusArray.forEach(status => {
      switch (status) {
        case 'InStorage':
          counts.InStorage++;
          break;
        case 'Loss':
          counts.Loss++;
          break;
        case 'Borrow':
          counts.Borrow++;
          break;
        default:
          break;
      }
    });

    return counts;
  };

  const formatDataForTable = (data) => {
    return data.map(item => {
      const counts = getStatusCounts(item.status);
      return {
        name: item.name,
        'InStorage': counts.InStorage,
        'Loss': counts.Loss,
        'Borrow': counts.Borrow
      };
    });
  };

  const formattedData = formatDataForTable(groupByName(allDevice));

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#F9FAFB',
        color: 'black',
      },
    },
    headCells: {
      style: {
        fontWeight: '600',
        fontSize: '1rem'
      },
    },
    cells: {
      style: {
        fontSize: '18px',
      },
    },

  };

  return (
    <div id='container'>
      <div className='status-sum'>
        <div className='status-sum-item' id='inStorage'>
          <div className='status-sum-text'>In Storage</div>
          <div className='status-sum-number'>{overallStatusCount.InStorage}</div>
        </div>
        <div className='status-sum-item' id='borrowed'>
          <div className='status-sum-text'>Borrowed</div>
          <div className='status-sum-number'>{overallStatusCount.Borrow}</div>
        </div>
        <div className='status-sum-item' id='loss'>
          <div className='status-sum-text'>Loss</div>
          <div className='status-sum-number'>{overallStatusCount.Loss}</div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={formattedData}
        pagination
        highlightOnHover
        customStyles={customStyles}
      />

      {/* <table style={{ width: '100%' }}>
        <thead className='dashboard-table-header'>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Status</th>
            <th>Provider</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item) => (
            <tr key={item.id} className='dashboard-row'>
              <td style={{ width: '10%' }}>{item.id}</td>
              <td className='table-cell-wrap'>{limitText(item.name, 20)}</td>
              <td style={{ width: '40%' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex' }}>
                  <div className="status-data">
                    <div className="right-line">
                      <div className="status-text" id='statusInStorage'>In Storage</div>
                      <div className="count-status-text">22</div>
                    </div>
                  </div>

                  <div className="status-data">
                    <div className="right-line">
                      <div className="status-text" id='statusBorrowed'>Borrowed</div>
                      <div className="count-status-text">22</div>
                    </div>
                  </div>

                  <div className="status-data">
                    <div className="right-line">
                      <div className="status-text" id='statusLoss'>Loss</div>
                      <div className="count-status-text">22</div>
                    </div>
                  </div>

                </div>
              </td>
              <td>${item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}

export default Dashboard;
