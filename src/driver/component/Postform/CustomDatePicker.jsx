import React, { useRef} from 'react';
import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
// Custom Date Picker Component
const customStyles = `
  .react-datepicker__header {
    background-color: #043677;
    border-bottom: none;
  }
  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    display: block !important;
    width: 100% !important;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected,
  .react-datepicker__day--in-range,
  .react-datepicker__day--in-selecting-range {
    background-color: #043677;
    color: white;
  }
  .react-datepicker__day:hover {
    background-color: #e6f0fa;
  }
  .react-datepicker__current-month,
  .react-datepicker__day-name {
    color: white;
  }
  .react-datepicker__triangle::before,
  .react-datepicker__triangle::after {
    border-bottom-color: #043677 !important;
  }
  .react-datepicker__navigation-icon::before {
    border-color: white;
  }
  .react-datepicker__input-container input:focus {
    outline: none;
    border-color: #043677 !important;
  }
`;

const DatePickerComponent = ({ label, value, onChange }) => {
  const dateInputRef = useRef(null);

  const handleInputChange = (date) => {
    if (!date) {
      onChange('');
      return;
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    onChange(`${year}-${month}-${day}`);
  };

  const preventTextInput = (e) => {
    e.preventDefault();
  };

  const selectedDate = value
    ? (() => {
        const [year, month, day] = value.split('-').map(Number);
        return new Date(year, month - 1, day);
      })()
    : null;

  return (
    <div className="relative">
      <style>{customStyles}</style>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} <span className="text-[#043677]">*</span>
      </label>
      <div
        className="relative w-full flex items-center border rounded-lg transition-colors border-gray-300 hover:border-[#043677]"
      >
        <DatePicker
          selected={selectedDate}
          onChange={handleInputChange}
          minDate={new Date()}
          className="w-full px-4 py-3 rounded-lg cursor-pointer bg-white text-gray-900 caret-transparent focus:border-[#043677] focus:ring-2 focus:ring-[#043677]"
          ref={dateInputRef}
          dateFormat="MM/dd/yyyy"
          placeholderText="MM/DD/YYYY"
          preventOpenOnFocus={true}
          onKeyDown={preventTextInput}
        />
        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
      </div>
    </div>
  );
};

export default DatePickerComponent;