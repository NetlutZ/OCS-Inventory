import React, { useState, useEffect } from 'react';
import "./Dashboard.css"
import styled from '@emotion/styled';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
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

  useEffect(() => {
    fecthData()
  }, [])

  const fecthData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/device/');
      const fetchedData = response.data;
  
      setAllDevice(fetchedData);
  
      const counts = calculateOverallStatusCount(groupByName(fetchedData));
      setOverallStatusCount(counts);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const calculateOverallStatusCount = (data) => {
    let totalInStorage = 0;
    let totalLoss = 0;
    let totalBorrow = 0;
  
    data.forEach(item => {
      const counts = getStatusCounts(item.status);
      totalInStorage += counts.InStorage;
      totalLoss += counts.Loss;
      totalBorrow += counts.Borrow;
    });
  
    return {
      InStorage: totalInStorage,
      Loss: totalLoss,
      Borrow: totalBorrow
    };
  };

  // const fecthData = async () => {
  //   await axios.get('http://localhost:8080/device/')
  //     .then(respone => {
  //       setAllDevice(respone.data)
  //     })
  //   let totalInStorage = 0;
  //   let totalLoss = 0;
  //   let totalBorrow = 0;

  //   groupByName(allDevice).forEach(item => {
  //     const counts = getStatusCounts(item.status);
  //     totalInStorage += counts.InStorage;
  //     totalLoss += counts.Loss;
  //     totalBorrow += counts.Borrow;
  //   });

  //   setOverallStatusCount({
  //     InStorage: totalInStorage,
  //     Loss: totalLoss,
  //     Borrow: totalBorrow
  //   });
  // }

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

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'InStorage',
      selector: row => row['InStorage'],
      sortable: true
    },
    {
      name: 'Borrow',
      selector: row => row['Borrow'],
      sortable: true
    },
    {
      name: 'Loss',
      selector: row => row['Loss'],
      sortable: true
    }
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
  const navigate = useNavigate();

  const handleStatusClick = (selectedStatus) => {
    // navigate('/Inventory', { state: [{ value: selectedStatus, label: selectedStatus }] });    {/* sidebar ไม่เปลี่ยนไปเป็น Inventory */}
    localStorage.setItem('selectedStatus', JSON.stringify([{ value: selectedStatus, label: selectedStatus }]));
  navigate('/Inventory');
  };

  return (
    <div id='container'>
      <div className='status-sum'>
        <div className='status-sum-item' id='inStorage' onClick={() => handleStatusClick('InStorage')}>
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

    </div>
  );
}

export default Dashboard;
