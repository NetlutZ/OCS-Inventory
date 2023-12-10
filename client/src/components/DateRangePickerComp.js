import { useEffect, useRef, useState } from 'react'
import { DateRangePicker } from 'react-date-range'

import format from 'date-fns/format'
import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './DateRangePickerComp.css'
import { MdClear } from 'react-icons/md';
import { FaCalendarAlt } from 'react-icons/fa';

function DateRangePickerComp(props) {

  // date state
  const [range, setRange] = useState([
    {
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
      key: 'selection'
    }
  ])

  // open close
  const [isFilter, setIsFilter] = useState(false);
  const [open, setOpen] = useState(false);

  // get the target element to toggle 
  const refOne = useRef(null)

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false)
    }
  }

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

      <input
        value={
          isFilter ? `${format(range[0].startDate, "dd/MM/yyyy")} to ${format(range[0].endDate, "dd/MM/yyyy")}`
            : `Activity Date`
        }
        readOnly
        className="inputBox"
        onClick={() => setOpen(open => !open)}
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

      <div ref={refOne}>
        {open &&
          <DateRangePicker
            onChange={handleDateRangeChange}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction="horizontal"
            className="calendarElement"
          />
        }
      </div>

    </div>
  )
}

export default DateRangePickerComp