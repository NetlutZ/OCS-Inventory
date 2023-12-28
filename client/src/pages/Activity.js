import React, { Component, useState, useEffect } from 'react';
import "./Activity.css";
import ActivityPopup from '../components/ActivityPopup';
import DateRangePickerComp from '../components/DateRangePickerComp';
import axios from 'axios';
import { th } from 'date-fns/locale';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import { addDays } from 'date-fns'
import format from 'date-fns/format';

function Activity(props) {

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

  const handleActivityClick = (dynamicData) => {
    setSelectedActivityID(dynamicData.id);
    setDate(dynamicData.activityDate);
    setTime(dynamicData.activityTime);
    setActivityText(dynamicData.activityText);
    setActivityCode(dynamicData.activityCode);
    setModal(true);
  };

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
    if (activityStDate.length>0 && activityEndDate.length>0) {
      params.activityDate = `${activityStDate} to ${activityEndDate}`;
    }
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/activity/`, { params });
      if (response.data.length > 0) {
        setDynamicDataArray(response.data);
      }
      const updatedDynamicDataArray = [];
      let lossDeviceName = '';
      let lossDeviceId = '';
      for (const dynamicData of response.data) {
        const deviceData = await axios.get(`${process.env.REACT_APP_API}/device/activity/${dynamicData.id}`);
        if (deviceData.data.length > 0) {
          lossDeviceName = deviceData.data[0].name;
          lossDeviceId = deviceData.data[0].id;
        }

        let activityText = '';
        switch (dynamicData.activityCode.charAt(0)) {
          case 'R':
            activityText = `${dynamicData.User.username} Return Device`;
            break;
          case 'B':
            activityText = `${dynamicData.User.username} Borrow Device`;
            break;
          case 'L':
            activityText = `${lossDeviceName} (${lossDeviceId}) Loss`;
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
      setTotalPage(Math.ceil(updatedDynamicDataArray.length / itemPerPage));
      setPage(1);
      // setDynamicDataArray(updatedDynamicDataArray);
      const sorted = [...updatedDynamicDataArray].sort((a, b) => {
        const dateA = new Date(`${a.activityDate.substring(0, 10)}T${a.activityTime}`);
        const dateB = new Date(`${b.activityDate.substring(0, 10)}T${b.activityTime}`);
        // console.log(dateA)
        return dateB - dateA;
      });
      setDynamicDataArray(sorted);
    } catch (error) {
      console.log(error);
    }
    // console.log(dynamicDataArray)
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

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPage && selectedPage !== page) {
      setPage(selectedPage)
    }
  }

  const [itemPerPage, setItemPerPage] = useState(1);
  const selectItemPerPageHandler = (selectedItemPerPage) => {
    // if (selectedItemPerPage >= 1 && selectedItemPerPage <= totalPage && selectedItemPerPage !== itemPerPage) {
    setItemPerPage(selectedItemPerPage)
    setTotalPage(Math.ceil(dynamicDataArray.length / selectedItemPerPage));
    // }
  }

  const itemPerPageOption = [
    { value: 1, label: '1' },
    { value: 10, label: '10' },
    { value: 20, label: '20' },
  ]


  return (
    <div>
      <div className='filter-range' style={{ margin: 30 }}><DateRangePickerComp parentCallback={setActivityTime} /></div>

      <div className='activity-list'>
        {dynamicDataArray &&
          dynamicDataArray.slice(page * itemPerPage - itemPerPage, page * itemPerPage).map((dynamicData, index) => (
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
      <div className='pagination'>
        <Select
          className='pagination-select'
          defaultValue={itemPerPageOption[0]}
          options={itemPerPageOption}
          onChange={(e) => selectItemPerPageHandler(e.value)}
        />
        <span onClick={() => selectPageHandler(page - 1)} className={page > 1 ? "" : "pagination__disable"}>◀</span>
        {
          [...Array(totalPage)].map((_, i) => {
            return <span
              className={page === i + 1 ? 'pagination__selected' : 'pagination-item'}
              key={i}
              onClick={() => selectPageHandler(i + 1)}
            >
              {i + 1}
            </span>
          })
        }
        <span onClick={() => selectPageHandler(page + 1)} className={page < totalPage ? "" : "pagination__disable"}>▶</span>
      </div>

      <div>
        <ActivityPopup
          trigger={modal}
          setTrigger={(value) => setModal(value)}
          activityID={selectedActivityID}
          date={date}
          time={time}
          activityText={activityText}
          activityCode={activityCode}
        // itemOffset={itemOffset}
        // setItemOffset={(itemOffset) => setItemOffset(itemOffset)}
        >
        </ActivityPopup>
      </div>
    </div>
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