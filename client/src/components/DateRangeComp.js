import React, { Component } from 'react';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './DateRangeComp.css';
import { MdClear } from 'react-icons/md';
import { FaCalendarAlt } from 'react-icons/fa';

class DateRangeComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      range: [
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection',
        },
      ],
      isFilter: false,
      open: false,
    };

    this.refOne = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.hideOnEscape, true);
    document.addEventListener('click', this.hideOnClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.hideOnEscape, true);
    document.removeEventListener('click', this.hideOnClickOutside, true);
  }

  hideOnEscape = (e) => {
    if (e.key === 'Escape') {
      this.setState({ open: false });
    }
  };

  hideOnClickOutside = (e) => {
    if (this.refOne.current && !this.refOne.current.contains(e.target)) {
      this.setState({ open: false });
    }
  };

  handleDateRangeChange = (item) => {
    const selectedStartDate = format(item.selection.startDate, 'yyyy-MM-dd');
    const selectedEndDate = format(item.selection.endDate, 'yyyy-MM-dd');
    this.setState({ range: [item.selection], isFilter: true });
    console.log(this.state.isFilter);
    console.log('Selected Dates:', selectedStartDate, 'to', selectedEndDate);
    this.props.parentCallback(selectedStartDate, selectedEndDate, this.state.isFilter);
  };




  clearDateRange = () => {
    this.setState({ isFilter: false });
    this.props.parentCallback('', '', this.state.isFilter);
  };

  render() {
    const { range, isFilter, open } = this.state;

    return (
      <div className="calendarWrap">
        <div>
          <input
            value={
              isFilter
                ? `${format(range[0].startDate, 'dd/MM/yyyy')} to ${format(
                  range[0].endDate,
                  'dd/MM/yyyy'
                )}`
                : 'Purchase Date '
            }
            readOnly
            className="expandable_input"
            onClick={() => this.setState((prevState) => ({ open: !prevState.open }))}
          />
          {isFilter && (
            <MdClear
              id="clear-icon"
              onClick={this.clearDateRange}
              size={20}
              style={{ position: 'absolute', right: '3px', height: '100%' }}
            />
          )}
          {!isFilter && (
            <FaCalendarAlt
              id="calendar-icon"
              onClick={() => this.setState((prevState) => ({ open: !prevState.open }))}
              size={15}
              style={{ position: 'absolute', right: '5px', height: '100%' }}
            />
          )}
        </div>

        <div ref={this.refOne}>
          {open && (
            <DateRange
              onChange={this.handleDateRangeChange}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={range}
              months={1}
              direction="horizontal"
              className="calendarElement"
            />
          )}
        </div>
      </div>
    );
  }
}

export default DateRangeComp;
