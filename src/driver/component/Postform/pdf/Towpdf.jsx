import React, { useState } from 'react';

export default function Towpdf() {
  const [formData, setFormData] = useState({
    po: '',
    towTruckNumber: '',
    towDriverCertificate: '',
    callNumber: '',
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleColour: '',
    vehicleUnit: '',
    vehiclePlate: '',
    vehicleVIN: '',
    vehicleOdometer: '',
    towedFrom: '',
    dateStartTime: '',
    revisedDestinationSignature: '',
    consentName: '',
    consentAddress: '',
    consentPhone: '',
    consentEmail: '',
    providingServices: false,
    callOccurrenceNumber: '',
    officerNameBadge: '',
    rateSheetShown: false,
    consentSignature: '',
    consentDateTime: '',
    driverSignature: '',
    consentOverPhone: false,
    consentOverEmail: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleVinChange = (index, value) => {
    const vin = (formData.vehicleVIN || "").split("");
    vin[index] = value.toUpperCase().slice(-1);
    const newVin = vin.join("").replace(/[^A-HJ-NPR-Z0-9]/g, '');
    setFormData(prev => ({
      ...prev,
      vehicleVIN: newVin
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto bg-white">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 gap-3">
          <div className="flex items-end gap-2">
            <div className="relative">
              <div className="bg-blue-900 text-white px-4 sm:px-8 py-1">
                <div className="text-2xl sm:text-4xl font-bold tracking-wider">UBK</div>
              </div>
              <div className="bg-orange-500 text-white text-center text-xs sm:text-sm font-bold py-0.5 sm:py-1 mt-1">
                TOWING.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <span className="font-bold italic">CONSENT TO TOW</span>
            <span className="text-xs sm:text-sm">PO#</span>
            <input 
              type="text" 
              name="po"
              value={formData.po}
              onChange={handleChange}
              className="border w-20 sm:w-24 h-7 sm:h-8 px-1 text-sm" 
            />
          </div>
        </div>

        {/* Two Column Section - Operator and Driver Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mx-4">
          
          {/* Left Column - Tow Operator Information */}
          <div className="p-3 sm:p-4 border">
            <div className="text-black font-bold text-xs sm:text-sm px-2 py-1 mb-2">
              TOW OPERATOR INFORMATION:
            </div>
            <div className="space-y-0.5 text-xs leading-tight">
              <div><span className="font-bold">Legal Name:</span> 1876272 Ontario Inc O/A UBK Towing</div>
              <div><span className="font-bold">Business/Mailing Address:</span> 30-35 King St, Toronto Ontario M6K3R8</div>
              <div><span className="font-bold">Email address:</span> ubktowing@gmail.com</div>
              <div><span className="font-bold">Telephone Number:</span> (416) 618-5847</div>
              <div><span className="font-bold">Tow Operator Certificate:</span> TO- 186,380-487</div>
              <div><span className="font-bold">Vehicle Storage Certificate:</span> VS-189-380-467</div>
            </div>
          </div>

          {/* Right Column - Tow Driver Information */}
          <div className="p-3 sm:p-4 border">
            <div className="text-black font-bold text-xs sm:text-sm px-2 py-1 mb-2">
              TOW DRIVER INFORMATION
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center">
                <label className="font-bold w-32 sm:w-40 flex-shrink-0">Tow Truck Number:</label>
                <input
                  type="text"
                  name="towTruckNumber"
                  value={formData.towTruckNumber}
                  onChange={handleChange}
                  className="flex-1 border-b border-black px-1 focus:outline-none focus:border-b-2"
                />
              </div>
              <div className="flex items-center">
                <label className="font-bold w-32 sm:w-40 flex-shrink-0">Tow Driver Certificate: TD</label>
                <input
                  type="text"
                  name="towDriverCertificate"
                  value={formData.towDriverCertificate}
                  onChange={handleChange}
                  className="flex-1 border-b border-black px-1 focus:outline-none focus:border-b-2"
                />
              </div>
              <div className="flex items-center">
                <label className="font-bold w-32 sm:w-40 flex-shrink-0">Call #:</label>
                <input
                  type="text"
                  name="callNumber"
                  value={formData.callNumber}
                  onChange={handleChange}
                  className="flex-1 border-b border-black px-1 focus:outline-none focus:border-b-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Disclosure Statement */}
        <div className="p-3 sm:p-4 mx-4">
          <div className="font-bold text-center text-xs sm:text-sm mb-2 underline">
            DISCLOSURE STATEMENT / PURSUANT TO ONTARIO REGULATION 167/23 - SCHEDULE 2
          </div>
          <div className="text-xs leading-snug space-y-1">
            <p><span className="font-bold">1.</span> Tow operators and tow drivers must follow /pursuant to the Towing and Storage Safety and Enforcement Act, 2021. The Act sets out responsibilities for tow operators and tow drivers related to towing services.</p>
            <p><span className="font-bold">2.</span> You have the right to:</p>
            <p className="pl-4">(a) decide where your vehicle will be towed to;</p>
            <p className="pl-4">(b) receive and review your Consent to Tow form and Maximum Rate Schedule before towing begins; do not sign a blank form;</p>
            <p className="pl-4">(c) choose the payment method and get a receipt when you pay;</p>
            <p><span className="font-bold">3.</span> Tow truck drivers and tow operators must:</p>
            <p className="pl-4">(a) contact the Ministry of Transportation if you have any concerns about the towing services you receive or the conduct of the tow truck driver or tow operator.</p>
            <p className="pl-4">(b) not charge multiple forms of payment rates published on the Government of Ontario's website on the Towing and Storage Safety and Enforcement Act, 2021;</p>
            <p><span className="font-bold">4.</span> Tow operators and tow drivers should read this form carefully before asking a person to sign it. Tow operators are responsible for the safety of tow truck drivers; the operation of a tow truck; conduct toward persons whose vehicles are being towed; and the handling and storage of towed vehicles. See the Ministry of Transportation's website on the Towing and Storage Safety and Enforcement Act, 2021;</p>
            <p><span className="font-bold">5.</span> Towed vehicle information is subject to a Code of Conduct. See the Government of Ontario's website on the Towing and Storage Safety and Enforcement Act, 2021.</p>
          </div>
        </div>

        {/* Towed Vehicle Information */}
        <div className="p-3 sm:p-4 mx-4">
          <div className="text-black font-bold text-xs sm:text-sm px-2 py-1 mb-2">
            TOWED VEHICLE INFORMATION
          </div>

          {/* Line 1 - Year / Make / Model / Colour / Unit */}
          <div className="grid grid-cols-5 gap-4 text-xs mb-2">
            {[
              { label: "Year", name: "vehicleYear" },
              { label: "Make", name: "vehicleMake" },
              { label: "Model", name: "vehicleModel" },
              { label: "Colour", name: "vehicleColour" },
              { label: "Unit", name: "vehicleUnit" },
            ].map((field) => (
              <div key={field.name} className="flex items-center w-full">
                <label className="font-bold whitespace-nowrap mr-1">{field.label}:</label>
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full border-b border-black focus:outline-none"
                />
              </div>
            ))}
          </div>

          {/* Line 2 - Plate / VIN + Odometer horizontally */}
          <div className="grid grid-cols-3 gap-4 text-xs">
            {/* Plate */}
            <div className="flex items-center w-full">
              <label className="font-bold whitespace-nowrap mr-1">Plate:</label>
              <input
                type="text"
                name="vehiclePlate"
                value={formData.vehiclePlate}
                onChange={handleChange}
                className="w-full border-b border-black focus:outline-none"
              />
            </div>

            {/* VIN + Odometer on same line */}
            <div className="flex items-center w-full col-span-2 justify-between">
              {/* VIN */}
              <div className="flex items-center">
                <label className="font-bold whitespace-nowrap mr-1">VIN#:</label>
                <div className="flex flex-nowrap gap-[2px] ml-1">
                  {Array.from({ length: 17 }).map((_, index) => (
                    <input
                      key={index}
                      maxLength="1"
                      value={formData.vehicleVIN?.[index] || ""}
                      onChange={(e) => handleVinChange(index, e.target.value)}
                      className="w-[22px] h-6 sm:h-7 border border-black text-center text-xs shrink-0"
                    />
                  ))}
                </div>
              </div>

              {/* Odometer */}
              <div className="flex items-center ml-6 flex-shrink-0">
                <label className="font-bold whitespace-nowrap mr-1">Odometer:</label>
                <input
                  type="text"
                  name="vehicleOdometer"
                  value={formData.vehicleOdometer}
                  onChange={handleChange}
                  className="w-24 border-b border-black focus:outline-none px-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Towed Location Information */}
        <div className="p-3 sm:p-4 mx-4">
          <div className="text-black font-bold text-xs sm:text-sm px-2 py-1 mb-2">
            TOWED LOCATION INFORMATION
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="flex items-center">
              <label className="font-bold whitespace-nowrap mr-1">Towed From:</label>
              <input
                type="text"
                name="towedFrom"
                value={formData.towedFrom}
                onChange={handleChange}
                className="w-full border-b border-black focus:outline-none"
              />
            </div>

            <div className="flex items-center">
              <label className="font-bold whitespace-nowrap mr-1">Date & Start Time:</label>
              <input
                type="text"
                name="dateStartTime"
                value={formData.dateStartTime}
                onChange={handleChange}
                className="w-full border-b border-black focus:outline-none"
              />
              <span className="ml-2 text-xs italic">(must be after time consent given)</span>
            </div>


            
            <div className="flex items-center">
              <label className="font-bold whitespace-nowrap mr-1">Towed To:</label>
              <input
                type="text"
                name="towedTo"
                value={formData.towedFrom}
                onChange={handleChange}
                className="w-full border-b border-black focus:outline-none"
              />
            </div>

            <div className="flex items-center">
              <label className="font-bold whitespace-nowrap mr-1">Date & End Time:</label>
              <input
                type="text"
                name="dateEndTime"
                value={formData.dateStartTime}
                onChange={handleChange}
                className="w-full border-b border-black focus:outline-none"
              />
            </div>

            
          </div>
        </div>

        {/* Description of Services */}
<div className="p-3 sm:p-4 mx-4">
  <div className="text-black font-bold text-xs sm:text-sm px-2 py-1 mb-2">
    DESCRIPTION OF SERVICES
  </div>
  <div className="text-xs space-y-2">
     <input
                 type="text"
                  name="servicesDescription"
      value={formData.servicesDescription}
      onChange={handleChange}
                className="w-full border-b border-black focus:outline-none"
              />
    <div className="flex items-center">
      <input
        type="checkbox"
        name="acknowledgementCheckbox"
        checked={formData.acknowledgementCheckbox || false}
        onChange={handleChange}
        className="mr-2"
      />
      <span>Acknowledgement of client's revised destination address - Signature:</span>
      <input
        type="text"
        name="revisedDestinationSignature"
        value={formData.revisedDestinationSignature}
        onChange={handleChange}
        className="ml-2 flex-1 border-b border-black focus:outline-none"
      />
    </div>
    <div className="font-semibold">DISCLOSURE OF INTEREST:</div>
    <p>1. UBK Towing Service Ltd. operates vehicle storage facilities.</p>
    <p>2. UBK Towing Service Ltd. DOES NOT have any interest in any other locations to which the motor vehicle may be towed for repair, storage, appraisal or other similar purpose.</p>
    <p>3. UBK Towing Service Ltd. DOES NOT have any interest in any person or entity to whom the driver or operator refers to you.</p>
  </div>
</div>

        {/* Person Giving Consent Information */}
        <div className="font-bold ml-4 text-xs sm:text-sm mb-2">PERSON GIVING CONSENT INFORMATION:</div>
        {/* Person Giving Consent - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 px-4">
          
          {/* Left Column */}
          <div className="p-3 sm:p-4 border">
            <div className="space-y-2 text-xs">
              <div className="flex items-center">
                <label className="font-bold w-20 flex-shrink-0">Name:</label>
                <input
                  type="text"
                  name="consentName"
                  value={formData.consentName}
                  onChange={handleChange}
                  className="flex-1 border-b border-black px-1 focus:outline-none focus:border-b-2"
                />
              </div>
              <div className="flex items-center">
                <label className="font-bold w-20 flex-shrink-0">Address:</label>
                <input
                  type="text"
                  name="consentAddress"
                  value={formData.consentAddress}
                  onChange={handleChange}
                  className="flex-1 border-b border-black px-1 focus:outline-none focus:border-b-2"
                />
              </div>
              <div className="flex items-center">
                <label className="font-bold w-20 flex-shrink-0">Phone #:</label>
                <input
                  type="text"
                  name="consentPhone"
                  value={formData.consentPhone}
                  onChange={handleChange}
                  className="flex-1 border-b border-black px-1 focus:outline-none focus:border-b-2"
                />
              </div>
              <div className="flex items-center">
                <label className="font-bold w-20 flex-shrink-0">Email Address:</label>
                <input
                  type="text"
                  name="consentEmail"
                  value={formData.consentEmail}
                  onChange={handleChange}
                  className="flex-1 border-b border-black px-1 focus:outline-none focus:border-b-2"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="p-3 sm:p-4 border">
            <div className="space-y-2 text-xs">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="providingServices"
                  checked={formData.providingServices}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 border-2 border-black"
                />
                <span>Providing Services at the direction of Police Officer</span>
              </label>
              <div className="flex items-center">
                <label className="font-bold w-40 flex-shrink-0">Call/Occurrence #:</label>
                <input
                  type="text"
                  name="callOccurrenceNumber"
                  value={formData.callOccurrenceNumber}
                  onChange={handleChange}
                  className="flex-1 border-b border-black px-1 focus:outline-none focus:border-b-2"
                />
              </div>
              <div className="flex items-center">
                <label className="font-bold w-40 flex-shrink-0">Officer Name & Badge #:</label>
                <input
                  type="text"
                  name="officerNameBadge"
                  value={formData.officerNameBadge}
                  onChange={handleChange}
                  className="flex-1 border-b border-black px-1 focus:outline-none focus:border-b-2"
                />
              </div>

              <div className="flex items-center">
                <label className="font-bold w-40 flex-shrink-0">Detachment/ Division:</label>
                <input
                  type="text"
                  name="detachmentDivision"
                  value={formData.detachmentDivision}
                  onChange={handleChange}
                  className="flex-1 border-b border-black px-1 focus:outline-none focus:border-b-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions Paragraph */}
        <div className="p-3 sm:p-4 mx-4 text-xs leading-snug">
          <p>You have read and understand the terms and conditions outlined in this document and authorize UBK Towing Service Ltd. to provide towing, recovery, labour to the roadside pursuant to Ontario Regulation 167/23, Schedule 2 and the Towing and Storage Safety and Enforcement Act, 2021. Informing you of your rights pursuant to this Consent to Tow form. Storage liens act.</p>
        </div>

        {/* Consent Checkboxes */}
        <div className="p-3 sm:p-4 mx-4 text-xs space-y-3">
          {/* Checkboxes Row */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <label className="flex items-start gap-2 w-full sm:w-1/2">
                <input
                    type="checkbox"
                    name="rightsInformed"
                    checked={formData.rightsInformed}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 flex-shrink-0 border-2 border-black"
                />
                <span className='font-bold'>You must be informed of your rights before you sign this Consent to Tow form.</span>
                </label>

                <label className="flex items-start gap-2 w-full sm:w-1/2">
                <input
                    type="checkbox"
                    name="rateSheetShown"
                    checked={formData.rateSheetShown}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 flex-shrink-0 border-2 border-black"
                />
                <span className="font-bold">Rate sheet shown client</span>
                </label>
            </div>
        </div>



        {/* Signature Section */}
        <div className="p-3 sm:p-4 mx-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            
            {/* Signature of the person giving consent */}
            <div className="text-center">
              <input
                type="text"
                name="consentSignature"
                value={formData.consentSignature}
                onChange={handleChange}
                className="w-full border-b-2 border-black px-1 py-1 focus:outline-none"
              />
              <label className="block font-bold mt-1">Signature of the person giving consent</label>

              {/* Checkbox 1 */}
              <div className="flex justify-center items-center mt-2 gap-2">
                <input
                  type="checkbox"
                  name="consentOverPhone"
                  checked={formData.consentOverPhone}
                  onChange={handleChange}
                  className="w-4 h-4 border-2 border-black"
                />
                <span>Consent given over the phone</span>
              </div>
            </div>

            {/* Date and Time of consent */}
            <div className="text-center">
              <input
                type="text"
                name="consentDateTime"
                value={formData.consentDateTime}
                onChange={handleChange}
                className="w-full border-b-2 border-black px-1 py-1 focus:outline-none"
              />
              <label className="block font-bold mt-1">Date & Time of the consent given</label>

              {/* Checkbox 2 */}
              <div className="flex justify-center items-center mt-2 gap-2">
                <input
                  type="checkbox"
                  name="consentOverEmail"
                  checked={formData.consentOverEmail}
                  onChange={handleChange}
                  className="w-4 h-4 border-2 border-black"
                />
                <span>Consent given over the email</span>
              </div>
            </div>

            {/* Driver Signature */}
            <div className="text-center">
              <input
                type="text"
                name="driverSignature"
                value={formData.driverSignature}
                onChange={handleChange}
                className="w-full border-b-2 border-black px-1 py-1 focus:outline-none"
              />
              <label className="block font-bold mt-1">Driver signature the client</label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-2 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs bg-gray-100">
          <span className="font-bold">White Copy - UBK Towing</span>
          <span className="font-bold">Yellow Copy - Customer</span>
          <span className="font-bold underline">ubktowing@gmail.com</span>
        </div>

      </div>
    </div>
  );
}