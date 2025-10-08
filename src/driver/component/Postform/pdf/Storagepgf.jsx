import React, { useState } from 'react';

export default function Storagepdf() {
  const [formData, setFormData] = useState({
    po: '',
    towDriverName: '',
    towDriverLicense: '',
    towTruckNumber: '',
    towDriverPhone: '',
    invoiceNumber: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleColour: '',
    vehicleUnit: '',
    vehiclePlate: '',
    vehicleVIN: '',
    vehicleOdometer: '',
    towedFrom: '',
    dateStartTime: '',
    storageLocation: false,
    storageIndoor: false,
    storageOutdoor: false,
    providingServices: false,
    callOccurrenceNumber: '',
    officerName: '',
    phoneNumber: '',
    consentName: '',
    consentAddress: '',
    consentPhoneNumber: '',
    rightsInformed: false,
    rateSheetShown: false,
    consentSignature: '',
    consentDateTime: '',
    driverSignature: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto bg-white ">
        
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
            <span className="font-bold italic">CONSENT TO STORAGE</span>
            <span className="text-xs sm:text-sm">PO#</span>
            <input 
              type="text" 
              name="po"
              value={formData.po}
              onChange={handleChange}
              className=" border w-20 sm:w-24 h-7 sm:h-8 px-1 text-sm" 
            />
          </div>
        </div>

        {/* Two Column Section - Operator and Driver Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2  mx-4">
          
          {/* Left Column - Tow Operator Information */}
          <div className="p-3 sm:p-4 border  ">
            <div className=" text-black font-bold text-xs sm:text-sm px-2 py-1 mb-2">
              TOW OPERATOR INFORMATION:
            </div>
            <div className="space-y-0.5 text-xs leading-tight">
              <div><span className="font-bold">Legal Name:</span> 1876272 Ontario Inc O/A UBK Towing</div>
              <div><span className="font-bold">Business/Mailing Address:</span> 30-35 King St, Toronto Ontario M6K0R8</div>
              <div><span className="font-bold">Email address:</span> ubktowing@gmail.com</div>
              <div><span className="font-bold">Telephone Number:</span> (416) 618-5847</div>
              <div><span className="font-bold">Tow Operator Certificate:</span> TO- 186,380-487</div>
              <div><span className="font-bold">Vehicle Storage Certificate:</span> VS-150-467</div>
            </div>
          </div>

          {/* Right Column - Tow Driver Information */}
          <div className="p-3 sm:p-4 border ">
            <div className="text-black font-bold text-xs sm:text-sm px-2 py-1 mb-2">
              TOW DRIVER INFORMATION:
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center">
                <label className="font-bold w-32 sm:w-40 flex-shrink-0">Name:</label>
                <input
                  type="text"
                  name="towDriverName"
                  value={formData.towDriverName}
                  onChange={handleChange}
                  className="flex-1 border-b border-black px-1 focus:outline-none focus:border-b-2"
                />
              </div>
              <div className="flex items-center">
                <label className="font-bold w-32 sm:w-40 flex-shrink-0">Driver License Number:</label>
                <input
                  type="text"
                  name="towDriverLicense"
                  value={formData.towDriverLicense}
                  onChange={handleChange}
                  className="flex-1 border-b border-black px-1 focus:outline-none focus:border-b-2"
                />
              </div>
              <div className="flex items-center">
                <label className="font-bold w-32 sm:w-40 flex-shrink-0">UBK Towing Truck Number:</label>
                <input
                  type="text"
                  name="towTruckNumber"
                  value={formData.towTruckNumber}
                  onChange={handleChange}
                  className="flex-1 border-b border-black px-1 focus:outline-none focus:border-b-2"
                />
              </div>
              <div className="flex items-center">
                <label className="font-bold w-32 sm:w-40 flex-shrink-0">Tow Driver Phone Number:</label>
                <input
                  type="text"
                  name="towDriverPhone"
                  value={formData.towDriverPhone}
                  onChange={handleChange}
                  className="flex-1 border-b border-black px-1 focus:outline-none focus:border-b-2"
                />
              </div>
              <div className="flex items-center">
                <label className="font-bold w-32 sm:w-40 flex-shrink-0">Invoice Number:</label>
                <input
                  type="text"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleChange}
                  className="flex-1 border-b border-black px-1 focus:outline-none focus:border-b-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Disclosure Statement */}
        <div className="p-3 sm:p-4">
          <div className="font-bold text-center text-xs sm:text-sm mb-2 underline">
            DISCLOSURE STATEMENT / PURSUANT TO ONTARIO REGULATION 467/23 - SCHEDULE 2
          </div>
          <div className="text-xs leading-snug space-y-1">
            <p><span className="font-bold">1.</span> Tow operators and tow drivers should read this form carefully before asking a person to sign it. Tow operators and tow drivers are responsible for the operation of a tow truck; conduct toward persons whose vehicles are towed; the handling of towed vehicles and the storage of vehicles. See the Department of Ontario's website at the Towing and Storage Safety and Enforcement Act, 2024 | ontario.ca, for more information on responsibilities related to towing services.</p>
            <p><span className="font-bold">2.</span> You have the right to:</p>
            <p className="pl-4">(a) decide what to do with your vehicle and direct your vehicle will be towed to;</p>
            <p className="pl-4">(b) keep your vehicle in your possession at any time during transport unless your vehicle is blocking traffic/posing a risk to road safety. If your vehicle is unsafe to move or blocking traffic, you cannot pay a towed truck operator's charges at the roadside or unstored copy of the signed Consent to Tow form;</p>
            <p className="pl-4">(c) dispute an unlimited invoice before paying and get a receipt when you pay;</p>
            <p className="pl-4">(d) pay by credit or debit card;</p>
            <p className="pl-4">(e) Have the tow truck driver to show you that the driver has a driver's certificate and tow truck operator's certificate</p>
            <p><span className="font-bold">3.</span> Tow truck drivers and tow operators must:</p>
            <p className="pl-4">(a) notify you if your vehicles is taken to a location that is different from the location you identified;</p>
            <p className="pl-4">(b) Tow operators and tow drivers should read this form carefully before asking a person to sign it. Tow operators are responsible for the safety of tow truck drivers; the operation of a tow truck; conduct toward persons whose vehicles are being towed; and the handling and storage of towed vehicles. See the Ministry of Transportation's website on the Towing and Storage Safety and Enforcement Act, 2021;</p>
            <p className="pl-4">(c) not accept you to consent to other services, including vehicle storage services;</p>
            <p className="pl-4">(d) not accept you paying their bill if your vehicle is inside a storage facility. If your vehicle is at a storage facility you must request to pay when towing, vehicle storage or vehicle repair business if you request it; and</p>
            <p className="pl-4">(e) not charge a person who has entered into a contract for storage a fee for the inspection of an invoice</p>
            <p><span className="font-bold">4.</span> The truck drivers and tow operators are identified by name and certificate number on the Consent to Tow form and on the tow truck. Make sure the tow operator's name and certificate number on the tow truck matches the documentation provided.</p>
            <p><span className="font-bold">5.</span> You can find more information about your rights at https://www.ontario.ca/page/your-rights-when-your-vehicle-towed. See the Department of Ontario's website at the Towing and Storage Safety and Enforcement Act, 2024 | Ontario.ca for more information.</p>
          </div>
        </div>

{/* Towed Vehicle Information */}
<div className="p-3 sm:p-4 ">
  <div className=" text-black font-bold text-xs sm:text-sm px-2 py-1 mb-2">
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
              onChange={(e) => {
                const vin = (formData.vehicleVIN || "").split("");
                vin[index] = e.target.value.toUpperCase();
                formData.vehicleVIN = vin.join("");
                handleChange({
                  target: { name: "vehicleVIN", value: formData.vehicleVIN },
                });
              }}
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
<div className="p-3 sm:p-4">
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
    </div>
  </div>
</div>




        {/* Storage Locations */}
     <div className="p-3 sm:p-4">
  <div className="text-black font-bold text-xs sm:text-sm px-2 py-1 mb-2">
    STORAGE LOCATIONS
  </div>

  {/* Checkboxes Row */}
  <div className="flex flex-wrap items-center gap-6 text-xs">
    {/* Main Location */}
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        name="storageLocation"
        checked={formData.storageLocation}
        onChange={handleChange}
        className="w-4 h-4 border-2 border-black flex-shrink-0"
      />
      <span>Mr. 7 Bolivar Road Etobicoke Ontario M8W0R2</span>
    </label>

    {/* Indoor */}
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        name="storageIndoor"
        checked={formData.storageIndoor}
        onChange={handleChange}
        className="w-4 h-4 border-2 border-black flex-shrink-0"
      />
      <span>INDOOR</span>
    </label>

    {/* Outdoor */}
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        name="storageOutdoor"
        checked={formData.storageOutdoor}
        onChange={handleChange}
        className="w-4 h-4 border-2 border-black flex-shrink-0"
      />
      <span>OUTDOOR</span>
    </label>
  </div>
</div>


        {/* Disclosure of Interest */}
        <div className="p-3 sm:p-4 ">
          <div className="text-black font-bold text-xs sm:text-sm px-2 py-1 mb-2">
            DISCLOSURE OF INTEREST:
          </div>
          <div className="text-xs space-y-1">
            <p><span className="font-bold">1.</span>UBK Towing Service Ltd. operates vehicle storage facilities listed above.</p>
            <p><span className="font-bold">2.</span>UBK Towing Service Ltd. DOES NOT have any interest in any person or entity to whom the driver or operator refers to you.</p>
            
          </div>
        </div>


          <div className="font-bold ml-4">PERSON GIVING CONSENT INFORMATION:</div>
        {/* Person Giving Consent - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-2 px-4">
            
          
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
                  name="consentPhoneNumber"
                  value={formData.consentPhoneNumber}
                  onChange={handleChange}
                  className="flex-1 border-b border-black px-1 focus:outline-none focus:border-b-2"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="p-3 sm:p-4 border ">
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
                <label className="font-bold w-40 flex-shrink-0">Call/Occurrence Number:</label>
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
                  name="officerName"
                  value={formData.officerName}
                  onChange={handleChange}
                  className="flex-1 border-b border-black px-1 focus:outline-none focus:border-b-2"
                />
              </div>
              <div className="flex items-center">
                <label className="font-bold w-40 flex-shrink-0">Phone #:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="flex-1 border-b border-black px-1 focus:outline-none focus:border-b-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rate Schedule */}
        <div className="p-3 sm:p-4 border-b-2 border-black">
          <div className="text-xs space-y-2">
            <p className="font-bold">The Maximum Rate Schedule separates charges for indoor storage and outdoor storage, based upon the length of the stored vehicle. It also provides the driver with after-hours access to a vehicle. Vehicle storage rates are set based on a daily rate. Currency for the first day of storage are counted on an hourly basis when calculating charges, with a daily rate taking effect from the 25th hour.</p>
            
         <div className="overflow-x-auto">
  <table className="w-full border-collapse border-2 border-black text-xs mt-2">
    <thead>
      <tr className="bg-gray-300">
        <th className="border-2 border-black p-1.5 text-left font-bold">Vehicle Storage</th>
        <th className="border-2 border-black p-1.5 text-center font-bold w-16">$</th>
        <th className="border-2 border-black p-1.5 text-center font-bold w-24">Rate Structure</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border-2 border-black p-1.5">Indoor storage, vehicle length &le;6.1m</td>
        <td className="border-2 border-black p-1.5 text-center">98.00</td>
        <td className="border-2 border-black p-1.5 text-center">/ day</td>
      </tr>
      <tr>
        <td className="border-2 border-black p-1.5">Indoor storage, vehicle length &gt;6.1 to 7.3m</td>
        <td className="border-2 border-black p-1.5 text-center">115.00</td>
        <td className="border-2 border-black p-1.5 text-center">/ day</td>
      </tr>
      <tr>
        <td className="border-2 border-black p-1.5">Outdoor storage, vehicle length &le;7.6m</td>
        <td className="border-2 border-black p-1.5 text-center">215.00</td>
        <td className="border-2 border-black p-1.5 text-center">/ day</td>
      </tr>
      <tr>
        <td className="border-2 border-black p-1.5">Outdoor storage, vehicle length &gt;7.6m</td>
        <td className="border-2 border-black p-1.5 text-center">110.00</td>
        <td className="border-2 border-black p-1.5 text-center">/ day</td>
      </tr>
      <tr>
        <td className="border-2 border-black p-1.5">Indoor storage, vehicle length &gt;7.3 to 12.5m</td>
        <td className="border-2 border-black p-1.5 text-center">170.00</td>
        <td className="border-2 border-black p-1.5 text-center">/ day</td>
      </tr>
      <tr>
        <td className="border-2 border-black p-1.5">Indoor storage, vehicle length &gt;12.5m and &le;17.5m</td>
        <td className="border-2 border-black p-1.5 text-center">420.00</td>
        <td className="border-2 border-black p-1.5 text-center">/ day</td>
      </tr>
      <tr>
        <td className="border-2 border-black p-1.5">Indoor storage</td>
        <td className="border-2 border-black p-1.5 text-center">0.00</td>
        <td className="border-2 border-black p-1.5 text-center">/ hour</td>
      </tr>
    </tbody>
  </table>
</div>

          </div>
        </div>

        {/* Consent Checkboxes */}
            <div className="p-3 sm:p-4  text-xs space-y-3">
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

            <p className="leading-snug">
                This consent is given freely and voluntarily with a full understanding of the costs and fees set out in the Maximum Rate Schedule. I understand that UBK Towing Service Ltd. is providing towing and roadside services as it is the above-referenced vehicle. You have been provided verbally informing you of your rights pursuits to Ontario Regulation 467/23, Schedule 2 and the Towing and Storage Safety Enforcement Act, 2024 Maximum Rates List on the back of this Consent To Tow form.
            </p>
            </div>



        {/* Signature Section */}
{/* Signature Section */}
<div className="p-3 sm:p-4">
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
          name="consentPhone"
          checked={formData.consentPhone}
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
      <label className="block font-bold mt-1">Date and Time of the consent is given</label>

      {/* Checkbox 2 */}
      <div className="flex justify-center items-center mt-2 gap-2">
        <input
          type="checkbox"
          name="consentEmail"
          checked={formData.consentEmail}
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
      <label className="block font-bold mt-1">Driver Signature</label>
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