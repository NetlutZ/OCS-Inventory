import React, { Component, useState, useEffect, useId } from 'react';
import "./Activity.css";
import ActivityPopup from '../components/ActivityPopup';
import DateRangePickerComp from '../components/DateRangePickerComp';
import axios from 'axios';
import { th } from 'date-fns/locale';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import { addDays } from 'date-fns'
import format from 'date-fns/format';
import Layout from './Layout';
import TablePagination from '@mui/material/TablePagination';
import * as ConstanceStrings from '../ConstanceString';

function Activity(props) {
  axios.defaults.withCredentials = true;
  const [modal, setModal] = useState(false);
  const [selectedActivityID, setSelectedActivityID] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [activityText, setActivityText] = useState(null);
  const [activityCode, setActivityCode] = useState(null);
  const [dynamicDataArray, setDynamicDataArray] = useState([]);
  const [activityStDate, setActivityStDate] = useState([]);
  const [activityEndDate, setActivityEndDate] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [userRole, setUserRole] = useState(ConstanceStrings.USER);
  const [userId, setUserId] = useState(null);

  const handleActivityClick = (dynamicData) => {
    setSelectedActivityID(dynamicData.id);
    setDate(dynamicData.activityDate);
    setTime(dynamicData.activityTime);
    setActivityText(dynamicData.activityText);
    setActivityCode(dynamicData.activityCode);
    setModal(true);
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}`)
      .then((res) => {
        setUserRole(res.data.role);
        setUserId(res.data.userId);
      })
      .catch((err) => {
        console.log(err);
      })

  }, []);

  useEffect(() => {
    fetchData();
  }, [userRole, userId]);

  function SortDate(data, key) {
    return data.sort(function (a, b) {
      const x = a.key;
      const y = b.key;
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
  }

  const fetchData = async () => {
    const params = {}
    if (activityStDate.length > 0 && activityEndDate.length > 0) {
      params.activityDate = `${activityStDate} to ${activityEndDate}`;
    }
    if (userRole === ConstanceStrings.USER) {
      params.userId = userId;
    }
    try {
      if (userId !== null) {
        const response = await axios.get(`${process.env.REACT_APP_API}/activity/`, { params });
        if (response.data.length > 0) {
          setDynamicDataArray(response.data);
          console.log(response.data)
        }
        const updatedDynamicDataArray = [];
        let lossDeviceName = '';
        let lossDeviceId = '';
        for (const dynamicData of response.data) {
          /*
          const deviceData = await axios.get(`${process.env.REACT_APP_API}/device/activity/${dynamicData.id}`);
          if (deviceData.data.length > 0) {
            lossDeviceName = deviceData.data[0].name;
            lossDeviceId = deviceData.data[0].id;
          }
          */

          let activityText = '';
          switch (dynamicData.activityCode.charAt(0)) {
            case 'R':
              activityText = `${dynamicData.User.username} Return Device`;
              break;
            case 'B':
              activityText = `${dynamicData.User.username} Borrow Device`;
              break;
            case 'L':
              activityText = `Device Loss`;
              break;
            default:
              activityText = 'Unknown Activity';
              break;
          }

          updatedDynamicDataArray.push({
            ...dynamicData,
            activityText: activityText,
          });
        }
        // setDynamicDataArray(updatedDynamicDataArray);
        const sorted = [...updatedDynamicDataArray].sort((a, b) => {
          const dateA = new Date(`${a.activityDate.substring(0, 10)}T${a.activityTime}`);
          const dateB = new Date(`${b.activityDate.substring(0, 10)}T${b.activityTime}`);
          // console.log(dateA)
          return dateB - dateA;
        });
        setDynamicDataArray(sorted);
      }

    } catch (error) {
      console.log(error);
    }
    // console.log(dynamicDataArray)
    setPage(0);
  };

  useEffect(() => {
    fetchData();
  }, [activityStDate, activityEndDate, isFilter]);

  const changeDateFormat = (dateString) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [year, month, day] = dateString.split('-');
    const monthIndex = parseInt(month, 10) - 1;
    const formattedDate = `${parseInt(day, 10)} ${months[monthIndex]} ${year}`;
    return formattedDate;
  };

  const setActivityTime = (stDate, endDate, isFilter) => {
    setActivityStDate(stDate);
    setActivityEndDate(endDate);
    setIsFilter(isFilter);
  };

  const filterActivityDate = () => {

  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Layout>
      <div className='filter-range' style={{ margin: 30 }}><DateRangePickerComp parentCallback={setActivityTime} /></div>

      <div className='activity-list'>
        {dynamicDataArray &&
          dynamicDataArray.slice((page + 1) * rowsPerPage - rowsPerPage, (page + 1) * rowsPerPage).map((dynamicData, index) => (
            <div key={index} className={`activity-item border-${dynamicData.activityCode.charAt(0)}`} onClick={() => handleActivityClick(dynamicData)}>
              <div style={{ borderRight: '2px solid #D0D5DD', margin: 4, padding: 10 }}>
                <h2 style={{ margin: 0, fontFamily: 'Prompt', fontWeight: 400, marginBottom: 5 }}>{changeDateFormat(dynamicData.activityDate)}</h2>
                <h3 style={{ margin: 0, fontFamily: 'Prompt', fontWeight: 400, color: '#667085' }}>{dynamicData.activityTime}</h3>
              </div>

              <div style={{ margin: 4, padding: 10 }}>
                <h3 style={{ margin: 0, fontFamily: 'Prompt', fontWeight: 400, color: '#667085', marginBottom: 5 }}>Activity ID : {dynamicData.activityCode}</h3>
                <h3 style={{ margin: 0, fontFamily: 'Prompt', fontWeight: 400 }}> {dynamicData.activityText}</h3>
              </div>

            </div>
          ))}
      </div>

      <TablePagination
        component='div'
        style={{ display: "flex", justifyContent: "center" }}
        count={dynamicDataArray.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20, 30]}
        showFirstButton={true}
        showLastButton={true}
        sx={{
          '& .MuiInputBase-root, & .MuiTablePagination-actions': {
            marginBottom: '13px', // For center rowPerPage and changePageButton
          }
        }}
      />
      <div>
        <ActivityPopup
          trigger={modal}
          setTrigger={(value) => setModal(value)}
          activityID={selectedActivityID}
          date={date}
          time={time}
          activityText={activityText}
          activityCode={activityCode}
          userRole={userRole}
        // itemOffset={itemOffset}
        // setItemOffset={(itemOffset) => setItemOffset(itemOffset)}
        >
        </ActivityPopup>
      </div>
    </Layout>
  );
}

export default Activity;


// TODO
// 1. Pagination with ... when have more than page

// Problem
// 1.
// สมมติมี 3 activity แบ่ง pagination ละ activity จะมี 3 pagination.
// เมื่อเลือก pagination ที่ 3 แล้วทำการ filter ให้เหลือแค่ 2 activity จะไม่มี activity แสดงเนื่องจากยังคงค้างอยู่ที่ pagination ที่ 3 (แต่ยังคงกดไปหน้าอื่น ๆ ได้)
// => แก้โดยการ setPage(1); ตอนโหลดข้อมูลใหม่