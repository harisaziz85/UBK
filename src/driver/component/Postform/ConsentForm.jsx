import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, ChevronDown } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomTimePicker from './CustomTimePicker';
import DatePickerComponent from './CustomDatePicker';

// Main Consent Form Component
const ConsentForm = () => {
  const [formType, setFormType] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [formData, setFormData] = useState({
    tow: {
      towedFrom: '',
      startDate: '',
      startTime: '',
      towedTo: '',
      endDate: '',
      endTime: '',
    },
    storage: {
      towedFrom: '',
      startDate: '',
      startTime: '',
    },
  });

  const handleSubmit = (type) => {
    console.log(`${type} form submitted:`, formData[type]);
    // Add submission logic here (e.g., API call)
  };

  const handleInputChange = (type, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-0 md:p-0">
      <h1 className="text-2xl md:text-3xl roboto-semi-bold text-[#333333] mb-6 p-4 sm:p-6">New Consent Form</h1>
      <div className="max-w-full p-6 md:p-8">
        <div className="mb-8">
          <label className="block text-sm roboto-medium text-[#333333E5]/90 mb-2">Form Type</label>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className=" cursor-pointer w-full px-4 py-3 text-left border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#043677] flex items-center justify-between"
            >
              <span className={formType ? 'text-gray-900' : 'text-blue-600'}>
                {formType === 'storage' ? 'Consent to storage' : formType === 'tow' ? 'Consent to tow' : 'Select form'}
              </span>
              <ChevronDown size={20} className={`text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showDropdown && (
              <div className=" cursor-pointer absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button onClick={() => { setFormType('storage'); setShowDropdown(false); }} className=" cursor-pointer w-full px-4 py-3 roboto-medium text-left text-[#000000B2] hover:bg-gray-50 rounded-t-lg">
                  Consent to storage
                </button>
                <button onClick={() => { setFormType('tow'); setShowDropdown(false); }} className=" cursor-pointer w-full px-4 py-3 text-left roboto-medium text-[#000000B2] hover:bg-gray-50 rounded-b-lg">
                  Consent to tow
                </button>
              </div>
            )}
          </div>
        </div>



        {formType === 'tow' && (
          <div className="space-y-8">
            <div>
              <h2 className=" text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-2">Consent to Tow</h2>
              <p className="text-[#333333CC] roboto-medium mb-6">Fill the form to submit a consent to tow.</p>

            

              <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Tow Operator Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-16 mb-6">
                <div>
                  <p className="text-[14px] roboto-regular text-[#333333E5]">
                    <span className="font-semibold mr-2">Legal Name: </span>
                    1878272 Ontario Inc O/A UBK Towing
                  </p>
                </div>

                <div>
                  <p className="text-[14px] roboto-regular text-[#333333E5]">
                    <span className="font-semibold mr-2">Address: </span>
                    3D–35 King St. Toronto, Ontario M9N 3R8
                  </p>
                </div>

                <div>
                  <p className="text-[14px] roboto-regular text-[#333333E5]">
                    <span className="font-semibold mr-2">Phone: </span>
                    (647) 716-3362
                  </p>
                </div>

                <div>
                  <p className="text-[14px] roboto-regular text-[#333333E5]">
                    <span className="font-semibold mr-2">Email: </span>
                    ubktowing@gmail.com
                  </p>
                </div>

                <div>
                  <p className="text-[14px] roboto-regular text-[#333333E5]">
                    <span className="font-semibold mr-2">Tow Operator Certificate: </span>
                    TO-189-380-467
                  </p>
                </div>

                <div>
                  <p className="text-[14px] roboto-regular text-[#333333E5]">
                    <span className="font-semibold mr-2">Vehicle Storage Certificate: </span>
                    VS-189-380-467
                  </p>
                </div>
              </div>




              
              <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Tow Driver Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Tow Driver Name</label><input type="text" placeholder="ALI ABBASI" className="w-full px-4 py-3 bg-[#FBFBFB] border border-[#E9E9E9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Tow Truck Number</label><input type="text" placeholder="BEO 4652" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Tow Driver Certificate #</label><input type="text" placeholder="BEO 4652" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Call #</label><input type="text" placeholder="BEO 4652" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Plate</label><input type="text" placeholder="BEO 4652" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">VIN#</label><input type="text" placeholder="BEO 4652" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
              </div>


                 <div className="mb-6">
                <label className="block text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-2">Vehicle</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677] appearance-none">
                    <option value="">Select Vehicle</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div> 


              <h3 className="text-lg text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Vehicle Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Year</label><input type="text" placeholder="BEQ 4652" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Make</label><input type="text" placeholder="BEQ 4652" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Model</label><input type="text" placeholder="BEQ 4652" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Color</label><input type="text" placeholder="BEQ 4652" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Plate</label><input type="text" placeholder="BEQ 4652" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">VIN#</label><input type="text" placeholder="BEQ 4652" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div className="md:col-span-2"><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Odometer</label><input type="text" placeholder="Enter current mileage" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
              </div>


              <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Tow Location Information</h3>
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Towed From</label>
                    <input
                      type="text"
                      value={formData.tow.towedFrom}
                      onChange={(e) => handleInputChange('tow', 'towedFrom', e.target.value)}
                      placeholder="Enter location"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677] border-gray-300 hover:border-[#043677]"
                    />
                  </div>
                  <DatePickerComponent
                    label="Start Date"
                    value={formData.tow.startDate}
                    onChange={(value) => handleInputChange('tow', 'startDate', value)}
                  />
                  <CustomTimePicker
                    label="Start Time"
                    value={formData.tow.startTime}
                    onChange={(value) => handleInputChange('tow', 'startTime', value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Towed To</label>
                    <input
                      type="text"
                      value={formData.tow.towedTo}
                      onChange={(e) => handleInputChange('tow', 'towedTo', e.target.value)}
                      placeholder="Enter location"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677] border-gray-300 hover:border-[#043677]"
                    />
                  </div>
                  <DatePickerComponent
                    label="End Date"
                    value={formData.tow.endDate}
                    onChange={(value) => handleInputChange('tow', 'endDate', value)}
                  />
                  <CustomTimePicker
                    label="End Time"
                    value={formData.tow.endTime}
                    onChange={(value) => handleInputChange('tow', 'endTime', value)}
                  />
                </div>
              </div>


             {/* ✅ Acknowledgement Checkbox */}
          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm roboto-medium text-[#333333E5]">
              <input
                type="checkbox"
                className="rounded border-gray-300 w-4 h-4 text-[#043677] focus:ring-[#043677]"
              />
              <span>Acknowledgement of client's revised destination address</span>
            </label>
          </div>

          <h3 className="text-lg roboto-semi-bold  text-[#333333] mb-4">Signature</h3>
          <div>
            <input
              type="text"
              placeholder="Add a digital signature"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]"
            />
          </div>




              <h3 className="text-lg text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4 mt-6">Description of Services</h3>
              <div>
                <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Service Description</label>
                <input
                  type="text"
                  placeholder="Enter service description"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]"
                />
              </div>


            





              <h3 className="text-lg text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4 mt-6">Person Giving Consent Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Name</label><input type="text" placeholder="e.g., ALI" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Address</label><input type="text" placeholder="e.g., ABC" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Phone no.</label><input type="text" placeholder="e.g., +64848555555" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Email</label><input type="email" placeholder="e.g., name@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
              </div>
              <div className="mb-6"><label className="flex items-start gap-3 cursor-pointer"><input type="checkbox" className="mt-1 rounded border-gray-300" /><span className="text-sm text-gray-700">Providing Services at the direction of Police Officer</span></label></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Officer Name & Badge #</label><input type="text" placeholder="e.g., ALI" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Detachment/ Division</label><input type="text" placeholder="e.g., ABC" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
              </div>


              <div className="mb-6"><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Call/Occurrence/Incident#</label><input type="text" placeholder="e.g., 643874" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>


               {/* ✅ Consent Date & Time */}
              <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4 mt-6">Date and Time</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <DatePickerComponent
                  label="Consent Date"
                  value={formData.tow.consentDate}
                  onChange={(value) => handleInputChange('tow', 'consentDate', value)}
                />
                <CustomTimePicker
                  label="Consent Time"
                  value={formData.tow.consentTime}
                  onChange={(value) => handleInputChange('tow', 'consentTime', value)}
                />
              </div>

              
              {/* ✅ Consent Given */}
            <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4 mt-6">Consent Given</h3>
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm roboto-medium text-[#333333E5]">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 w-4 h-4 text-[#043677] focus:ring-[#043677]"
                />
                <span>Over the Phone</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm roboto-medium text-[#333333E5]">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 w-4 h-4 text-[#043677] focus:ring-[#043677]"
                />
                <span>Over the Email</span>
              </label>
            </div>

                <div className="mt-8 rounded-lg mb-6">

                <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Disclosure statement / pursuant to ontario regulation 167/23-schedule 2</h3>
                  <div className="space-y-4 roboto-medium  text-[14px] text-[#333333CC]">
                  <p className="font-semibold">1. Tow operators and tow truck drivers must follow the requirements of the Towing and Storage Safety and Enforcement Act, 2021. The Act sets out responsibilities for the operation of a tow truck, conduct toward the public and at the scene of an accident, and the rates that can be charged for towing and vehicle storage services. The Act also sets out rights you have when requesting or receiving towing services.</p>
                  <div><p className="font-semibold mb-1">2. You have the right to,</p><ul className="list-disc pl-6 space-y-1"><li>Decide who can tow your vehicle and where your vehicle will be towed to;</li><li>view and review the consent to Tow form and Maximum Rate Schedule before towing begins; do not sign a blank form;</li><li>Receive an unaltered copy of the signed Consent to Tow form;</li><li>choose an alternate referral; or</li><li>contact the Ministry of Transportation if you have any concerns about the towing services you receive or the conduct of the tow truck driver or tow operator.</li></ul></div>
                  <div><p className="font-semibold mb-1">3. Tow truck drivers and tow operators must,</p><ul className="list-disc pl-6 space-y-1"><li>notify you if your vehicle is taken to a location that is different from the location you identified;</li><li>not charge higher than the maximum rates published on the Government of Ontario's website on the Towing and Storage Safety and Enforcement Act, 2021;</li><li>accept multiple forms of payment;</li><li>not advertise or consent to other services, including vehicle storage services;</li><li>not refer you to any medical or legal services and can only refer to other towing, vehicle storage or vehicle repair business if you request it;</li><li>disclose any interest they have or benefit they may receive from the referral at the time of making the referral.</li></ul></div>
                  <p>4. Tow truck drivers and tow operators are identified by name and certificate number on the Consent to Tow form and on the tow truck. Make sure the tow operator's name and certificate number on the tow truck matches the documentation.</p>
                  <p>5. Tow truck drivers and tow operators are subject to a Code of Conduct. See the Government of Ontario's website on the Towing and Storage Safety and Enforcement Act, 2021.</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Disclosure Of Interest</h3>
                <div className="space-y-2 roboto-medium  text-[14px] text-[#333333CC] mb-4">
                  <p>1. UBK Towing Service Ltd. operates vehicle storage facilities.</p>
                  <p>2. UBK Towing Service Ltd. DOES NOT have any interest in any other locations to which the motor vehicle may be towed for repair, storage, appraisal or other similar purpose.</p>
                  <p>3. UBK Towing Service Ltd. DOES NOT have any interest in any person or entity to whom the driver or operator refers to you.</p>
                </div>
                <label className="flex items-start gap-3 cursor-pointer"><input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300" /><span className="text-sm text-gray-700">I declare that the vehicle listed has been inspected in Accordance with Ontario Schedule 1 Daily inspections of trucks, tractors, and trailers (Reg. 199/07)</span></label>
              </div>


        {/* ✅ Consent Statement */}
        <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Consent Statement</h3>
        <p className="roboto-medium  text-[14px] text-[#333333CC] mb-4">
          You hereby consent to the terms and conditions outlined in this document and authorize UBK
          Towing Service Ltd. to provide towing, recovery, labour and roadside services as requested
          to the above-mentioned vehicle. Towed vehicles will be held until full payment is received
          pursuant to the Repair and Storage Liens Act.
        </p>
        <div className="space-y-3 mb-6">
          <label className="flex items-start gap-2 cursor-pointer text-sm text-gray-700">
            <input
              type="checkbox"
              className="mt-1 rounded border-gray-300 w-4 h-4 text-[#043677] focus:ring-[#043677]"
            />
            <span  className='roboto-medium  text-[14px] text-[#333333CC]'>I confirm that I have been informed of my rights before signing this Consent to Tow form.</span>
          </label>
          <label className="flex items-start gap-2 cursor-pointer text-sm text-gray-700">
            <input
              type="checkbox"
              className="mt-1 rounded border-gray-300 w-4 h-4 text-[#043677] focus:ring-[#043677]"
            />
            <span className='roboto-medium  text-[14px] text-[#333333CC]'>Rate sheet shown the client</span>
          </label>
        </div>



        <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Signature</h3>
        <div>
          <input
            type="text"
            placeholder="Add a digital signature"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]"
          />
        </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6">
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">Cancel</button>
                <button onClick={() => handleSubmit('tow')} className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 font-medium">Submit</button>
              </div>
            </div>
          </div>
        )}



        {formType === 'storage' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-2">Consent to storage</h2>
              <p className="text-[#333333CC] roboto-medium  mb-6">Fill in the form to submit consent to storage.</p>

            


                <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Tow Operator Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-16 mb-6">
                <div>
                  <p className="text-[14px] roboto-regular text-[#333333E5]">
                    <span className="font-semibold mr-2">Legal Name: </span>
                    1878272 Ontario Inc O/A UBK Towing
                  </p>
                </div>

                <div>
                  <p className="text-[14px] roboto-regular text-[#333333E5]">
                    <span className="font-semibold mr-2">Address: </span>
                    3D–35 King St. Toronto, Ontario M9N 3R8
                  </p>
                </div>

                <div>
                  <p className="text-[14px] roboto-regular text-[#333333E5]">
                    <span className="font-semibold mr-2">Phone: </span>
                    (647) 716-3362
                  </p>
                </div>

                <div>
                  <p className="text-[14px] roboto-regular text-[#333333E5]">
                    <span className="font-semibold mr-2">Email: </span>
                    ubktowing@gmail.com
                  </p>
                </div>

                <div>
                  <p className="text-[14px] roboto-regular text-[#333333E5]">
                    <span className="font-semibold mr-2">Tow Operator Certificate: </span>
                    TO-189-380-467
                  </p>
                </div>

                <div>
                  <p className="text-[14px] roboto-regular text-[#333333E5]">
                    <span className="font-semibold mr-2">Vehicle Storage Certificate: </span>
                    VS-189-380-467
                  </p>
                </div>
              </div>


                            <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Tow Driver Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Tow Driver Name</label><input type="text" placeholder="ALI ABBASI" className="w-full px-4 py-3 bg-[#FBFBFB] border border-[#E9E9E9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Tow Truck Number</label><input type="text" placeholder="BEO 4652" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Tow Driver Certificate #</label><input type="text" placeholder="BEO 4652" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Invoice/PO #</label><input type="text" placeholder="BEO 4652" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
              </div>

                <div className="mb-6">
                <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Vehicle</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677] appearance-none">
                    <option value="">Select Vehicle</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>



              <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Vehicle Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Year</label><input type="text" placeholder="BEQ 4652" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Make</label><input type="text" placeholder="BEQ 4652" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Model</label><input type="text" placeholder="BEQ 4652" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Color</label><input type="text" placeholder="BEQ 4652" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Plate</label><input type="text" placeholder="BEQ 4652" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">VIN#</label><input type="text" placeholder="BEQ 4652" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div className="md:col-span-2"><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Odometer</label><input type="text" placeholder="Enter current mileage" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
              </div>
              <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Tow Location Information</h3>
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Towed From</label>
                    <input
                      type="text"
                      value={formData.storage.towedFrom}
                      onChange={(e) => handleInputChange('storage', 'towedFrom', e.target.value)}
                      placeholder="Enter location"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677] border-gray-300 hover:border-[#043677]"
                    />
                  </div>
                  <DatePickerComponent
                    label="Start Date"
                    value={formData.storage.startDate}
                    onChange={(value) => handleInputChange('storage', 'startDate', value)}
                  />
                  <CustomTimePicker
                    label="Start Time"
                    value={formData.storage.startTime}
                    onChange={(value) => handleInputChange('storage', 'startTime', value)}
                  />
                </div>
              </div>
              <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Storage Locations</h3>
              <div className="mb-6 flex flex-wrap items-center justify-between ">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="rounded w-4 h-4 border-gray-300" />
                  <span className="text-[14px]  text-[#333333CC] roboto-regular">At _ 7 Belvia Road Etobicoke Ontario M8W9R2</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="rounded w-4 h-4 border-gray-300" />
                  <span className="text-[14px]  text-[#333333CC] roboto-regular">INDOOR</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="rounded w-4 h-4 border-gray-300" />
                  <span className="text-[14px]  text-[#333333CC] roboto-regular">OUTDOOR</span>
                </label>
              </div>
              <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Person Giving Consent Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Name</label><input type="text" placeholder="e.g., ALI" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Address</label><input type="text" placeholder="e.g., ABC" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Phone no.</label><input type="text" placeholder="e.g., +64848555555" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Email</label><input type="email" placeholder="e.g., name@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
              </div>
              <div className="mb-6"><label className="flex items-start gap-3 cursor-pointer"><input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300" /><span className="text-sm text-gray-700">Providing Services at the direction of Police Officer</span></label></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Officer Name & Badge #</label><input type="text" placeholder="e.g., ALI" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
                <div><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Detachment/ Division</label><input type="text" placeholder="e.g., ABC" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
              </div>


             
              <div className="mb-6"><label className="block text-sm roboto-medium text-[#333333E5] mb-2">Call/Occurrence/Incident#</label><input type="text" placeholder="e.g., 643874" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" /></div>
              
              
              {/* ✅ Consent Date & Time */}
              <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4 mt-6">Date and Time</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <DatePickerComponent
                  label="Consent Date"
                  value={formData.tow.consentDate}
                  onChange={(value) => handleInputChange('tow', 'consentDate', value)}
                />
                <CustomTimePicker
                  label="Consent Time"
                  value={formData.tow.consentTime}
                  onChange={(value) => handleInputChange('tow', 'consentTime', value)}
                />
              </div>

                {/* ✅ Consent Given */}
            <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4 mt-6">Consent Given</h3>
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm roboto-medium text-[#333333E5]">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 w-4 h-4 text-[#043677] focus:ring-[#043677]"
                />
                <span>Over the Phone</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm roboto-medium text-[#333333E5]">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 w-4 h-4 text-[#043677] focus:ring-[#043677]"
                />
                <span>Over the Email</span>
              </label>
            </div>


              <div className="max-w-full mt-8">
                <h2 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Storage Rate Schedule</h2>
                <p className="text-[14px] text-[#333333CC] roboto-medium text-justify mb-5 leading-relaxed">
                  The Maximum Rate Schedule separates charges for indoor storage and outdoor storage, based upon the length of the stored vehicle. It also provides for chaeging for after-hours access to a vehicle. Vehicle storage rates are based on a daily rate. Charges for the first day of storage are operated on an hourly basis and each subsequent day of storage is charged the full daily rate.
                </p>
                <table className="w-full bg-white">
                  <thead>
                    <tr className="bg-[#CCCCCC1A]">
                      <th className="p-2 text-left text-[#333333E5] roboto-medium text-[14px]">Vehicle Storage</th>
                      <th className="p-2 text-left text-[#333333E5] roboto-medium text-[14px]">$</th>
                      <th className="p-2 text-left text-[#333333E5] roboto-medium text-[14px]">Rate Structure</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">Outdoor storage, vehicle length &le;6.5m</td>
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">85.00</td>
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">/Day</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">Outdoor storage, vehicle length &gt;6.5m and &le;12.5m</td>
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">170.00</td>
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">/Day</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">Outdoor storage, vehicle length &gt;12.5m</td>
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">215.00</td>
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">/Day</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">Indoor storage, vehicle length &le;6.5m</td>
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">170.00</td>
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">/Day</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">Indoor storage, vehicle length &gt;6.5m and &le;12.5m</td>
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">310.00</td>
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">/Day</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">Indoor storage, vehicle length &gt;12.5m</td>
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">430.00</td>
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">/Day</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">After-hours access</td>
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">85.00</td>
                      <td className="p-2 text-[14px] text-[#333333CC] roboto-medium">/Event</td>
                    </tr>
                  </tbody>
                </table>
              </div>



              <div className="mt-8  rounded-lg mb-6">

                <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Disclosure statement / pursuant to ontario regulation 167/23-schedule 2</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <p className="text-[14px] text-[#333333CC] roboto-medium">1. Tow operators and tow truck drivers must follow the requirements of the Towing and Storage Safety and Enforcement Act, 2021. The Act sets out responsibilities for the operation of a tow truck, conduct toward the public and at the scene of an accident, and the rates that can be charged for towing and vehicle storage services. The Act also sets out rights you have when requesting or receiving towing services.</p>
                  <div className='text-[14px] text-[#333333CC] roboto-medium'><p className="text-[14px] text-[#333333CC] roboto-medium mb-1">2. You have the right to,</p><ul className="list-disc pl-6 space-y-1"><li className='text-[14px] text-[#333333CC] roboto-medium'>Decide who can tow your vehicle and where your vehicle will be towed to;</li><li>view and review the consent to Tow form and Maximum Rate Schedule before towing begins; do not sign a blank form;</li><li>Receive an unaltered copy of the signed Consent to Tow form;</li><li>choose an alternate referral; or</li><li>contact the Ministry of Transportation if you have any concerns about the towing services you receive or the conduct of the tow truck driver or tow operator.</li></ul></div>
                  <div className='text-[14px] text-[#333333CC] roboto-medium'><p className="text-[14px] text-[#333333CC] roboto-medium mb-1">3. Tow truck drivers and tow operators must,</p><ul className="list-disc pl-6 space-y-1"><li>notify you if your vehicle is taken to a location that is different from the location you identified;</li><li>not charge higher than the maximum rates published on the Government of Ontario's website on the Towing and Storage Safety and Enforcement Act, 2021;</li><li>accept multiple forms of payment;</li><li>not advertise or consent to other services, including vehicle storage services;</li><li>not refer you to any medical or legal services and can only refer to other towing, vehicle storage or vehicle repair business if you request it;</li><li>disclose any interest they have or benefit they may receive from the referral at the time of making the referral.</li></ul></div>
                  <p className='text-[14px] text-[#333333CC] roboto-medium'>4. Tow truck drivers and tow operators are identified by name and certificate number on the Consent to Tow form and on the tow truck. Make sure the tow operator's name and certificate number on the tow truck matches the documentation.</p>
                  <p className='text-[14px] text-[#333333CC] roboto-medium'>5. Tow truck drivers and tow operators are subject to a Code of Conduct. See the Government of Ontario's website on the Towing and Storage Safety and Enforcement Act, 2021.</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Disclosure Of Interest</h3>
                <div className="space-y-2 text-[14px] text-[#333333CC] roboto-medium mb-4">
                  <p>1. UBK Towing Service Ltd. operates vehicle storage facilities listed above.</p>
                  <p>2. UBK Towing Service Ltd. DOES NOT have any interest in any person or entity to whom the driver or operator refers to you.</p>
                </div>
              </div>

              
        {/* ✅ Consent Statement */}
        <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Consent Statement</h3>
        <p className="text-[14px] text-[#333333CC] roboto-medium mb-4">
          You hereby consent to the terms and conditions outlined in this document and authorize UBK
          Towing Service Ltd. to provide towing, recovery, labour and roadside services as requested
          to the above-mentioned vehicle. Towed vehicles will be held until full payment is received
          pursuant to the Repair and Storage Liens Act.
        </p>
        <div className="space-y-3 mb-6">
          <label className="flex items-start gap-2 cursor-pointer text-sm text-gray-700">
            <input
              type="checkbox"
              className="mt-1 rounded border-gray-300 w-4 h-4 text-[#043677] focus:ring-[#043677]"
            />
            <span  className='text-[14px] text-[#333333CC] roboto-medium'>I confirm that I have been informed of my rights before signing this Consent to Tow form.</span>
          </label>
          <label className="flex items-start gap-2 cursor-pointer text-sm text-gray-700">
            <input
              type="checkbox"
              className="mt-1 rounded border-gray-300 w-4 h-4 text-[#043677] focus:ring-[#043677]"
            />
            <span className='text-[14px] text-[#333333CC] roboto-medium'>Rate sheet shown the client</span>
          </label>
        </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">Cancel</button>
                <button onClick={() => handleSubmit('storage')} className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 font-medium">Submit</button>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
};

export default ConsentForm;