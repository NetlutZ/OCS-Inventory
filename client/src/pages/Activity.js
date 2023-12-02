import React, { Component, useState, useEffect } from 'react';
import "./Activity.css";
import ActivityPopup from '../components/ActivityPopup';
import DateRangePickerComp from '../components/DateRangePickerComp';
import axios from 'axios';
import { th } from 'date-fns/locale';
import ReactPaginate from 'react-paginate';

function Activity(props) {

  const [modal, setModal] = useState(false);
  const [selectedActivityID, setSelectedActivityID] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [activityText, setActivityText] = useState(null);
  const [activityCode, setActivityCode] = useState(null);
  const [dynamicDataArray, setDynamicDataArray] = useState([]);
  const [activityStDate, setActivityStDate] = useState([])
  const [activityEndDate, setActivityEndDate] = useState([])

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/activity/');
        if (response.data.length > 0) {
          setDynamicDataArray(response.data);
        }

        const updatedDynamicDataArray = [];
        let lossDeviceName = '';
        let lossDeviceId = '';
        for (const dynamicData of response.data) {
          const deviceData = await axios.get(`http://localhost:8080/device/activity/${dynamicData.id}`);
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
        // setDynamicDataArray(updatedDynamicDataArray);
        const sorted = [...updatedDynamicDataArray].sort((a, b) => {
          const dateA = new Date(`${a.activityDate.substring(0, 10)}T${a.activityTime}`);
          const dateB = new Date(`${b.activityDate.substring(0, 10)}T${b.activityTime}`);
          console.log(dateA)
          return dateB - dateA;
        });
        setDynamicDataArray(sorted);
      } catch (error) {
        console.log(error);
      }
      // console.log(dynamicDataArray)
    };

    fetchData();
  }, []);

  const changeDateFormat = (dateString) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [year, month, day] = dateString.split('-');
    const monthIndex = parseInt(month, 10) - 1;
    const formattedDate = `${parseInt(day, 10)} ${months[monthIndex]} ${year}`;
    return formattedDate;
  };

  function Items({ currentItems }) {
    return (
      <>
        <div className='activity-list'>
          {currentItems &&
            currentItems.map((dynamicData, index) => (
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
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = dynamicDataArray.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(dynamicDataArray.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % dynamicDataArray.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}

        />
      </>
    );
  }

  const setActivityTime = (stDate, endDate, isFilter) => {  
    setActivityStDate(stDate);
    setActivityEndDate(endDate);
  };

  const filterActivityDate = () =>{
    
  }


  return (
    <div>
      <div className='filter-range' style={{ margin: 30 }}><DateRangePickerComp parentCallback={setActivityTime} /></div>

      {/* <div className='activity-list'>

        {dynamicDataArray.map((dynamicData, index) => (
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
      </div> */}

      <PaginatedItems itemsPerPage={2} />

      <div>
        <ActivityPopup
          trigger={modal}
          setTrigger={(value) => setModal(value)}
          activityID={selectedActivityID}
          date={date}
          time={time}
          activityText={activityText}
          activityCode={activityCode}>
        </ActivityPopup>
      </div>
    </div>
  );
}

export default Activity;


// TODO
// 1. Add date range filter
// 2. sort activity by date&time
// 3. Pagination