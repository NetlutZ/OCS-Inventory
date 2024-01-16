import React, { useState, useEffect } from 'react';
import "./Dashboard.css"
import styled from '@emotion/styled';
import axios, { Axios } from 'axios';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';


function Dashboard() {
  const [allDevice, setAllDevice] = useState([]);
  const [overallStatusCount, setOverallStatusCount] = useState({
    InStorage: 0,
    Loss: 0,
    Borrowed: 0
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
  axios.defaults.withCredentials = true
  useEffect(() => {
    // fecthData()
    axios.get(`${process.env.REACT_APP_API}`)
      .then((res) => {
        console.log(res)
        if(res.data.loggedIn){
          fecthData();
        }else{
          navigate('/')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const fecthData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/device`);
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
    let totalBorrowed = 0;

    data.forEach(item => {
      const counts = getStatusCounts(item.rfidStatus);
      totalInStorage += counts.InStorage;
      totalLoss += counts.Loss;
      totalBorrowed += counts.Borrowed;
    });

    return {
      InStorage: totalInStorage,
      Loss: totalLoss,
      Borrowed: totalBorrowed
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
  //     const counts = getStatusCounts(item.rfidStatus);
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
      device.rfidStatus.forEach(rfidStatus => {
        counts[rfidStatus] = (counts[rfidStatus] || 0) + 1;
      });
      // Assign counts to the device name
      result[device.name] = counts;
    });
    return result;
  }

  // group setAllDevice by name and then count the number of each rfidsStatus
  const groupByName = (allDevice) => {
    const groupByName1 = allDevice.reduce((acc, cur) => {
      // console.log(acc)
      // console.log(cur)
      const found = acc.find((item) => item.name === cur.name);
      // console.log(found)
      if (found) {
        found.rfidStatus.push(cur.rfidStatus);
      } else {
        acc.push({
          name: cur.name,
          rfidStatus: [cur.rfidStatus],
          image: cur.image
        });
      }
      return acc;
    }, []);
    // ======================== หากชื่อเหมือนแต่รูปต่างกัน จะเลือกมาแค่รูปเดียว ======================== //
    return groupByName1;
  };

  const columns = [
    {
      name: 'Image',
      selector: row => <img src={`${process.env.REACT_APP_API}/device/image/${row.image}`} alt="Image" style={{ width: 'auto', height: '50px' }} />,
      // sortable: true
    },
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
      name: 'Borrowed',
      selector: row => row['Borrowed'],
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
      Borrowed: 0
    };

    statusArray.forEach(rfidStatus => {
      switch (rfidStatus) {
        case 'InStorage':
          counts.InStorage++;
          break;
        case 'Loss':
          counts.Loss++;
          break;
        case 'Borrowed':
          counts.Borrowed++;
          break;
        default:
          break;
      }
    });

    return counts;
  };

  const formatDataForTable = (data) => {
    return data.map(item => {
      const counts = getStatusCounts(item.rfidStatus);
      return {
        name: item.name,
        'InStorage': counts.InStorage,
        'Loss': counts.Loss,
        'Borrowed': counts.Borrowed,
        image: item.image
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

  const sendSelectedStatus = (selectedStatus) => {
    // navigate('/Inventory', { state: [{ value: selectedStatus, label: selectedStatus }] });    {/* sidebar ไม่เปลี่ยนไปเป็น Inventory */}
    localStorage.setItem('selectedStatus', JSON.stringify([{ value: selectedStatus, label: selectedStatus }]));
    navigate('/Inventory');
  };

  const sendSelectedName = (row) => {
    localStorage.setItem('selectedName',JSON.stringify([{value: row.name, label: row.name}]));
    navigate('/Inventory');
  }

  return (
    <Layout>
    <div id='container'>
      <div className='status-sum'>
        <div className='status-sum-item' id='inStorage' onClick={() => sendSelectedStatus('InStorage')}>
          <div className='status-sum-text'>In Storage</div>
          <div className='status-sum-number'>{overallStatusCount.InStorage}</div>
        </div>
        <div className='status-sum-item' id='borrowed' onClick={() => sendSelectedStatus('Borrowed')}>
          <div className='status-sum-text'>Borrowed</div>
          <div className='status-sum-number'>{overallStatusCount.Borrowed}</div>
        </div>
        <div className='status-sum-item' id='loss' onClick={() => sendSelectedStatus('Loss')}>
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
        onRowClicked={sendSelectedName}
        pointerOnHover
      />

    </div>
    </Layout>
  );
}

export default Dashboard;
