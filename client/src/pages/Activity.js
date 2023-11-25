import React, { Component } from 'react';
import "./Activity.css";
import ActivityPopup from '../components/ActivityPopup';
import DateRangePickerComp from '../components/DateRangePickerComp';
import axios from 'axios';
import { th } from 'date-fns/locale';

class Activity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      selectedActivityID: null,
      date: null,
      time: null,
      activityText: null,

      dynamicDataArray: [],
    };
  }

  handleActivityClick = (dynamicData) => {
    this.setState({
      selectedActivityID: dynamicData.id,
      date: dynamicData.activityDate,
      time: dynamicData.activityTime,
      activityText: dynamicData.activityText,
      activityCode: dynamicData.activityCode,
      modal: true,
    });
  };

  async componentDidMount() {
    await axios.get('http://localhost:8080/activity/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            dynamicDataArray: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })

    const updatedDynamicDataArray = [];
    let lossDeviceName = '';
    let lossDeviceId = '';
    for (const dynamicData of this.state.dynamicDataArray) {
      // await axios.get(`http://localhost:8080/device/activity/${dynamicData.id}`)
      //   .then(response => {
      //     if (response.data.length > 0) {
      //       lossDeviceName = response.data[0].name;
      //       lossDeviceId = response.data[0].id;
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   })

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
      this.setState({
        dynamicDataArray: updatedDynamicDataArray,
      });
    }
  }

  changeDateFormat = (dateString) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [year, month, day] = dateString.split('-');
    const monthIndex = parseInt(month, 10) - 1;
    const formattedDate = `${parseInt(day, 10)} ${months[monthIndex]} ${year}`;
    return formattedDate;
  };

  render() {
    const { modal, selectedActivityID, date, activityText, time, activityCode } = this.state;
    return (
      <div>
        <div className='filter-range' style={{ margin: 30 }}><DateRangePickerComp /></div>

        <div className='activity-list'>

          {this.state.dynamicDataArray.map((dynamicData, index) => (
            <div key={index} className={`activity-item border-${dynamicData.activityCode.charAt(0)}`} onClick={() => this.handleActivityClick(dynamicData)}>
              <div style={{ borderRight: '2px solid #D0D5DD', margin: 4, padding: 10 }}>
                <h2 style={{ margin: 0, fontFamily: 'Prompt', fontWeight: 400, marginBottom: 5 }}>{this.changeDateFormat(dynamicData.activityDate)}</h2>
                <h3 style={{ margin: 0, fontFamily: 'Prompt', fontWeight: 400, color: '#667085' }}>{dynamicData.activityTime}</h3>
              </div>

              <div style={{ margin: 4, padding: 10 }}>
                <h3 style={{ margin: 0, fontFamily: 'Prompt', fontWeight: 400, color: '#667085', marginBottom: 5 }}>Activity ID : {dynamicData.activityCode}</h3>
                <h3 style={{ margin: 0, fontFamily: 'Prompt', fontWeight: 400 }}> {dynamicData.activityText}</h3>
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
            time={time}
            activityText={activityText}
            activityCode={activityCode}>
          </ActivityPopup>
        </div>
      </div>
    );
  }
}

export default Activity;