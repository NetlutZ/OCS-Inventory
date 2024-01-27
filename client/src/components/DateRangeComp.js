import React, { Component, useRef, useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './DateRangeComp.css';
import { MdClear } from 'react-icons/md';
import { FaCalendarAlt } from 'react-icons/fa';

function DateRangeComp (props) {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);
  const [isFilter, setIsFilter] = useState(false);
  const [open, setOpen] = useState(false);

  const refOne = useRef();

  // componentDidMount() {
  //   document.addEventListener('keydown', this.hideOnEscape, true);
  //   document.addEventListener('click', this.hideOnClickOutside, true);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('keydown', this.hideOnEscape, true);
  //   document.removeEventListener('click', this.hideOnClickOutside, true);
  // }

  useEffect(() => {
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);

    return () => {
      document.removeEventListener('keydown', hideOnEscape, true);
      document.removeEventListener('click', hideOnClickOutside, true);
    };
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleDateRangeChange = (item) => {
    const selectedStartDate = format(item.selection.startDate, 'yyyy-MM-dd');
    const selectedEndDate = format(item.selection.endDate, 'yyyy-MM-dd');
    setRange([item.selection]);
    setIsFilter(true);
    // console.log(isFilter);
    console.log('Selected Dates:', selectedStartDate, 'to', selectedEndDate);
    props.parentCallback(selectedStartDate, selectedEndDate, isFilter);
  };

  const clearDateRange = () => {
    setIsFilter(false);
    props.parentCallback('', '', isFilter);
  };

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
                : props.placeholder

            }
            readOnly
            className="expandable_input"
            onClick={() => setOpen(prevState => !prevState)}
            style={{ cursor: 'pointer', color: 'gray', backgroundColor: '#ffffff' }}
          />
          {isFilter && (
            <MdClear
              id="clear-icon"
              onClick={clearDateRange}
              size={20}
              style={{ position: 'absolute', right: '3px', height: '100%' }}
            />
          )}
          {!isFilter && (
            <FaCalendarAlt
              id="calendar-icon"
              onClick={() => setOpen(prevState => !prevState)}
              size={15}
              style={{ position: 'absolute', right: '5px', height: '100%' }}
            />
          )}
        </div>

        <div ref={refOne}>
          {open && (
            <DateRange
              onChange={handleDateRangeChange}
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

export default DateRangeComp;
