import React, { useState, useRef, useEffect } from 'react';
import {Clock } from 'lucide-react';

// Custom Time Picker Component
const CustomTimePicker = ({ label, value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [hours, setHours] = useState(value ? parseInt(value.split(":")[0], 10) % 12 || 12 : 0);
  const [minutes, setMinutes] = useState(value ? value.split(":")[1] : "00");
  const [ampm, setAmPm] = useState(value ? (parseInt(value.split(":")[0], 10) >= 12 ? "PM" : "AM") : "AM");
  const pickerRef = useRef();

  const togglePicker = () => setShowPicker(!showPicker);

  const handleHourClick = (h) => {
    setHours(h);
    updateParentTime(h, minutes, ampm);
  };

  const handleMinuteClick = (m) => {
    setMinutes(m);
    updateParentTime(hours, m, ampm);
  };

  const handleAmPmClick = (period) => {
    setAmPm(period);
    updateParentTime(hours, minutes, period);
  };

  const updateParentTime = (h, m, period) => {
    let hour24 = period === "PM" && h < 12 ? h + 12 : period === "AM" && h === 12 ? 0 : h;
    const formatted = `${String(hour24).padStart(2, "0")}:${m}`;
    onChange(formatted);
  };

  useEffect(() => {
    if (value) {
      const [hStr, mStr] = value.split(":");
      const hNum = parseInt(hStr, 10);
      setHours(hNum % 12 === 0 ? 12 : hNum % 12);
      setMinutes(mStr);
      setAmPm(hNum >= 12 ? "PM" : "AM");
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
     
      <div
        className="relative flex justify-between items-center border rounded-lg px-3 py-3 cursor-pointer transition-colors border-gray-300 hover:border-[#043677]"
        onClick={togglePicker}
      >
        <span className="text-gray-900">{`${hours}:${minutes} ${ampm}`}</span>
        <Clock className="w-4 h-4 text-gray-500 ml-2" />
      </div>
      {showPicker && (
        <div
          ref={pickerRef}
          className="absolute z-10 mt-2 bg-white border border-[#043677] rounded-lg shadow-lg flex p-2 gap-2"
        >
          <div
            className="max-h-40 overflow-y-scroll rounded w-12"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx>{`
              .max-h-40::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {Array.from({ length: 12 }, (_, i) => {
              const h = i + 1;
              return (
                <div
                  key={h}
                  onClick={() => handleHourClick(h)}
                  className={`flex items-center justify-center px-2 py-1 cursor-pointer ${
                    hours === h ? "bg-[#043677] text-white" : "text-[#043677] hover:bg-[#e6f0fa]"
                  }`}
                >
                  {h}
                </div>
              );
            })}
          </div>
          <div
            className="max-h-40 overflow-y-scroll rounded w-12"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx>{`
              .max-h-40::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {Array.from({ length: 60 }, (_, i) => {
              const m = String(i).padStart(2, "0");
              return (
                <div
                  key={m}
                  onClick={() => handleMinuteClick(m)}
                  className={`flex items-center justify-center px-2 py-1 cursor-pointer ${
                    minutes === m ? "bg-[#043677] text-white" : "text-[#043677] hover:bg-[#e6f0fa]"
                  }`}
                >
                  {m}
                </div>
              );
            })}
          </div>
          <div className="flex flex-col rounded w-12">
            {["AM", "PM"].map((period) => (
              <div
                key={period}
                onClick={() => handleAmPmClick(period)}
                className={`flex items-center justify-center px-2 py-1 cursor-pointer text-center ${
                  ampm === period ? "bg-[#043677] text-white" : "text-[#043677] hover:bg-[#e6f0fa]"
                }`}
              >
                {period}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTimePicker;