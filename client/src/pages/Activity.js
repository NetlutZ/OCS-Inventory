import React, { Component } from 'react';
import "./Activity.css";
import ActivityPopup from '../components/ActivityPopup';
import DateRangePickerComp from '../components/DateRangePickerComp';

class Activity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      selectedActivityID: null,
      date: null,
      userAction: null,
      time: null,
    };
  }

  handleActivityClick = (dynamicData) => {
    this.setState({
      selectedActivityID: dynamicData.activityID,
      date: dynamicData.date,
      userAction: dynamicData.userAction,
      time: dynamicData.time,
      modal: true,
    });
  };

  dynamicDataArray = [
    {
      date: '20-10-2023',
      activityID: 'R123',
      userAction: 'User A Return Device',
      time: '17:30',
    },
    {
      date: '21-10-2023',
      activityID: 'B124',
      userAction: 'User B Borrowed Service',
      time: '10:45',
    },
    {
      date: '21-10-2023',
      activityID: 'L124',
      userAction: 'Device A (ID) Loss',
      time: '10:45',
    },
    // Add more data objects as needed
  ];

  render() {
    const { modal, selectedActivityID, date, userAction, time } = this.state;

    return (
      <div>
        <div className='filter-range' style={{ margin: 30 }}><DateRangePickerComp /></div>

        <div className='activity-list'>
          {this.dynamicDataArray.map((dynamicData, index) => (
            <div key={index} className={`activity-item border-${dynamicData.activityID.charAt(0)}`} onClick={() => this.handleActivityClick(dynamicData)}>
              <div style={{ borderRight: '2px solid #D0D5DD', margin: 4, padding: 10 }}>
                <h2 style={{ margin: 0, fontFamily: 'Prompt', fontWeight: 400, marginBottom: 5 }}>{dynamicData.date}</h2>
                <h3 style={{ margin: 0, fontFamily: 'Prompt', fontWeight: 400, color: '#667085' }}>{dynamicData.time}</h3>
              </div>

              <div style={{ margin: 4, padding: 10 }}>
                <h3 style={{ margin: 0, fontFamily: 'Prompt', fontWeight: 400, color: '#667085', marginBottom: 5 }}>Activity ID : {dynamicData.activityID}</h3>
                <h3 style={{ margin: 0, fontFamily: 'Prompt', fontWeight: 400 }}>{dynamicData.userAction}</h3>
              </div>

            </div>
          ))}
        </div>

        <div>
          <ActivityPopup
            trigger={modal}
            setTrigger={(value) => this.setState({ modal: value })}
            activityID={selectedActivityID}
            date={date}
            userAction={userAction}
            time={time}>
          </ActivityPopup>
        </div>
      </div>
    );
  }
}

export default Activity;