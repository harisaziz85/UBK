

// Storage PDF Component (updated to accept props and render static values)
 const StoragePdf = ({ data }) => {

     console.log("✅ Raw data received:", data);

      if (!data || typeof data !== "object") {
    console.error("❌ Invalid or missing 'data' prop:", data);
  } else {
    Object.entries(data).forEach(([key, value]) => {
      console.log(`➡️ ${key}:`, value);
    });
  }
  console.groupEnd();
  
  const {
    invoicePO = '',
    driverName = '',
    driverCertificate = '',
    truckNumber = '',
    // Assuming towDriverPhone is not in form, default to empty or map to consentPhone if needed
    towDriverPhone = '',
    make = '',
    model = '',
    year = '',
    color = '',
    plate = '',
    vin = '',
    currentMileage = '',
    towedFrom = '',
    startDateTime = '', // Combined date and time
    storageAddressConfirmed = false,
    storageType = '',
    consentPersonName = '',
    consentAddress = '',
    consentPhone = '',
    // consentEmail not used in PDF
    policeDirected = false,
    incidentNumber = '',
    officerNameBadge = '',
    // detachmentDivision not directly in PDF
    consentDateTime = '',
    consentMethod = '',
    informedOfRights = false,
    rateSheetShown = false,
    // Signatures: assuming secondSignature or similar for consentSignature and driverSignature
    consentSignature = '',
    driverSignature = '',
  } = data;


  const storageLocationText = storageAddressConfirmed ? `7 Belvia Road Etobicoke Ontario M8W9R2 - ${storageType?.toUpperCase()}` : '7 Belvia Road Etobicoke Ontario M8W9R2';
  const officerName = officerNameBadge ? officerNameBadge.split(' & ')[0] : '';
  const badgeNumber = officerNameBadge ? officerNameBadge.split(' & ')[1] : '';

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-0">
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
            <span className="border w-20 sm:w-24 h-7 sm:h-8 px-1 text-sm">{invoicePO}</span>
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
              <div><span className="font-bold">Legal Name:</span> 1878272 Ontario Inc O/A UBK Towing</div>
              <div><span className="font-bold">Business/Mailing Address:</span> 3D–35 King St. Toronto, Ontario M9N 3R8</div>
              <div><span className="font-bold">Email address:</span> ubktowing@gmail.com</div>
              <div><span className="font-bold">Telephone Number:</span> (647) 716-3362</div>
              <div><span className="font-bold">Tow Operator Certificate:</span> TO-189-380-467</div>
              <div><span className="font-bold">Vehicle Storage Certificate:</span> VS-189-380-467</div>
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
                <span className="flex-1 border-b border-black px-1">{driverName}</span>
              </div>
              <div className="flex items-center">
                <label className="font-bold w-32 sm:w-40 flex-shrink-0">Driver License Number:</label>
                <span className="flex-1 border-b border-black px-1">{driverCertificate}</span>
              </div>
              <div className="flex items-center">
                <label className="font-bold w-32 sm:w-40 flex-shrink-0">UBK Towing Truck Number:</label>
                <span className="flex-1 border-b border-black px-1">{truckNumber}</span>
              </div>
              <div className="flex items-center">
                <label className="font-bold w-32 sm:w-40 flex-shrink-0">Tow Driver Phone Number:</label>
                <span className="flex-1 border-b border-black px-1">{towDriverPhone}</span>
              </div>
              <div className="flex items-center">
                <label className="font-bold w-32 sm:w-40 flex-shrink-0">Invoice Number:</label>
                <span className="flex-1 border-b border-black px-1">{invoicePO}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclosure Statement */}
        <div className="p-3 sm:p-4">
          <div className="font-bold text-center text-xs sm:text-sm mb-2 underline">
            DISCLOSURE STATEMENT / PURSUANT TO ONTARIO REGULATION 167/23 - SCHEDULE 2
          </div>
          <div className="text-xs leading-snug space-y-1">
            <p><span className="font-bold">1.</span> Tow operators and tow truck drivers must follow the requirements of the Towing and Storage Safety and Enforcement Act, 2021. The Act sets out responsibilities for the operation of a tow truck, conduct toward the public and at the scene of an accident, and the rates that can be charged for towing and vehicle storage services. The Act also sets out rights you have when requesting or receiving towing services.</p>
            <p><span className="font-bold">2.</span> You have the right to,</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Decide who can tow your vehicle and where your vehicle will be towed to;</li>
              <li>view and review the consent to Tow form and Maximum Rate Schedule before towing begins; do not sign a blank form;</li>
              <li>Receive an unaltered copy of the signed Consent to Tow form;</li>
              <li>choose an alternate referral; or</li>
              <li>contact the Ministry of Transportation if you have any concerns about the towing services you receive or the conduct of the tow truck driver or tow operator.</li>
            </ul>
            <p><span className="font-bold">3.</span> Tow truck drivers and tow operators must,</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>notify you if your vehicle is taken to a location that is different from the location you identified;</li>
              <li>not charge higher than the maximum rates published on the Government of Ontario&apos;s website on the Towing and Storage Safety and Enforcement Act, 2021;</li>
              <li>accept multiple forms of payment;</li>
              <li>not advertise or consent to other services, including vehicle storage services;</li>
              <li>not refer you to any medical or legal services and can only refer to other towing, vehicle storage or vehicle repair business if you request it;</li>
              <li>disclose any interest they have or benefit they may receive from the referral at the time of making the referral.</li>
            </ul>
            <p>4. Tow truck drivers and tow operators are identified by name and certificate number on the Consent to Tow form and on the tow truck. Make sure the tow operator&apos;s name and certificate number on the tow truck matches the documentation.</p>
            <p>5. Tow truck drivers and tow operators are subject to a Code of Conduct. See the Government of Ontario&apos;s website on the Towing and Storage Safety and Enforcement Act, 2021.</p>
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
              { label: "Year", value: year },
              { label: "Make", value: make },
              { label: "Model", value: model },
              { label: "Colour", value: color },
              // { label: "Unit", value: '' }, 
            ].map((field, index) => (
              <div key={index} className="flex items-center w-full">
                <label className="font-bold whitespace-nowrap mr-1">{field.label}:</label>
                <span className="w-full border-b border-black">{field.value}</span>
              </div>
            ))}
          </div>

          {/* Line 2 - Plate / VIN + Odometer horizontally */}
          <div className="grid grid-cols-3 gap-4 text-xs">
            {/* Plate */}
            <div className="flex items-center w-full">
              <label className="font-bold whitespace-nowrap mr-1">Plate:</label>
              <span className="w-full border-b border-black">{plate}</span>
            </div>

            {/* VIN + Odometer on same line */}
            <div className="flex items-center w-full col-span-2 justify-between">
              {/* VIN */}
              <div className="flex items-center">
                <label className="font-bold whitespace-nowrap mr-1">VIN#:</label>
                <span className="flex flex-nowrap gap-[2px] ml-1">{vin}</span>
              </div>

              {/* Odometer */}
              <div className="flex items-center ml-6 flex-shrink-0">
                <label className="font-bold whitespace-nowrap mr-1">Odometer:</label>
                <span className="w-24 border-b border-black px-1">{currentMileage}</span>
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
              <span className="w-full border-b border-black">{towedFrom}</span>
            </div>

            <div className="flex items-center">
              <label className="font-bold whitespace-nowrap mr-1">Date & Start Time:</label>
              <span className="w-full border-b border-black">{startDateTime}</span>
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
              <span className={`w-4 h-4 border-2 border-black flex-shrink-0 ${storageAddressConfirmed ? 'bg-black' : ''}`}></span>
              <span>7 Belvia Road Etobicoke Ontario M8W9R2</span>
            </label>

            {/* Indoor */}
            <label className="flex items-center gap-2">
              <span className={`w-4 h-4 border-2 border-black flex-shrink-0 ${storageType === 'indoor' ? 'bg-black' : ''}`}></span>
              <span>INDOOR</span>
            </label>

            {/* Outdoor */}
            <label className="flex items-center gap-2">
              <span className={`w-4 h-4 border-2 border-black flex-shrink-0 ${storageType === 'outdoor' ? 'bg-black' : ''}`}></span>
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
            <p><span className="font-bold">1.</span> UBK Towing Service Ltd. operates vehicle storage facilities listed above.</p>
            <p><span className="font-bold">2.</span> UBK Towing Service Ltd. DOES NOT have any interest in any other locations to which the motor vehicle may be towed for repair, storage, appraisal or other similar purpose.</p>
            <p><span className="font-bold">3.</span> UBK Towing Service Ltd. DOES NOT have any interest in any person or entity to whom the driver or operator refers to you.</p>
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
                <span className="flex-1 border-b border-black px-1">{consentPersonName}</span>
              </div>
              <div className="flex items-center">
                <label className="font-bold w-20 flex-shrink-0">Address:</label>
                <span className="flex-1 border-b border-black px-1">{consentAddress}</span>
              </div>
              <div className="flex items-center">
                <label className="font-bold w-20 flex-shrink-0">Phone #:</label>
                <span className="flex-1 border-b border-black px-1">{consentPhone}</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="p-3 sm:p-4 border ">
            <div className="space-y-2 text-xs">
              <label className="flex items-start gap-2">
                <span className={`mt-0.5 w-4 h-4 flex-shrink-0 border-2 border-black ${policeDirected ? 'bg-black' : ''}`}></span>
                <span>Providing Services at the direction of Police Officer</span>
              </label>
              <div className="flex items-center">
                <label className="font-bold w-40 flex-shrink-0">Call/Occurrence Number:</label>
                <span className="flex-1 border-b border-black px-1">{incidentNumber}</span>
              </div>
              <div className="flex items-center">
                <label className="font-bold w-40 flex-shrink-0">Officer Name & Badge #:</label>
                <span className="flex-1 border-b border-black px-1">{officerNameBadge}</span>
              </div>
              <div className="flex items-center">
                <label className="font-bold w-40 flex-shrink-0">Phone #:</label>
                <span className="flex-1 border-b border-black px-1">{towDriverPhone || consentPhone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rate Schedule */}
        <div className="p-3 sm:p-4 border-b-2 border-black">
          <div className="text-xs space-y-2">
            <p className="font-bold">The Maximum Rate Schedule separates charges for indoor storage and outdoor storage, based upon the length of the stored vehicle. It also provides for charging for after-hours access to a vehicle. Vehicle storage rates are based on a daily rate. Charges for the first day of storage are operated on an hourly basis and each subsequent day of storage is charged the full daily rate.</p>
            
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
                    <td className="border-2 border-black p-1.5">Outdoor storage, vehicle length &le;6.5m</td>
                    <td className="border-2 border-black p-1.5 text-center">85.00</td>
                    <td className="border-2 border-black p-1.5 text-center">/Day</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-1.5">Outdoor storage, vehicle length &gt;6.5m and &le;12.5m</td>
                    <td className="border-2 border-black p-1.5 text-center">170.00</td>
                    <td className="border-2 border-black p-1.5 text-center">/Day</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-1.5">Outdoor storage, vehicle length &gt;12.5m</td>
                    <td className="border-2 border-black p-1.5 text-center">215.00</td>
                    <td className="border-2 border-black p-1.5 text-center">/Day</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-1.5">Indoor storage, vehicle length &le;6.5m</td>
                    <td className="border-2 border-black p-1.5 text-center">170.00</td>
                    <td className="border-2 border-black p-1.5 text-center">/Day</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-1.5">Indoor storage, vehicle length &gt;6.5m and &le;12.5m</td>
                    <td className="border-2 border-black p-1.5 text-center">310.00</td>
                    <td className="border-2 border-black p-1.5 text-center">/Day</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-1.5">Indoor storage, vehicle length &gt;12.5m</td>
                    <td className="border-2 border-black p-1.5 text-center">430.00</td>
                    <td className="border-2 border-black p-1.5 text-center">/Day</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-1.5">After-hours access</td>
                    <td className="border-2 border-black p-1.5 text-center">85.00</td>
                    <td className="border-2 border-black p-1.5 text-center">/Event</td>
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
              <span className={`mt-0.5 w-4 h-4 flex-shrink-0 border-2 border-black ${informedOfRights ? 'bg-black' : ''}`}></span>
              <span className='font-bold'>You must be informed of your rights before you sign this Consent to Tow form.</span>
              </label>

              <label className="flex items-start gap-2 w-full sm:w-1/2">
              <span className={`mt-0.5 w-4 h-4 flex-shrink-0 border-2 border-black ${rateSheetShown ? 'bg-black' : ''}`}></span>
              <span className="font-bold">Rate sheet shown client</span>
              </label>
          </div>

          <p className="leading-snug">
              This consent is given freely and voluntarily with a full understanding of the costs and fees set out in the Maximum Rate Schedule. I understand that UBK Towing Service Ltd. is providing towing and roadside services as it is the above-referenced vehicle. You have been provided verbally informing you of your rights pursuits to Ontario Regulation 167/23, Schedule 2 and the Towing and Storage Safety Enforcement Act, 2021 Maximum Rates List on the back of this Consent To Tow form.
          </p>
        </div>

        {/* Signature Section */}
        <div className="p-3 sm:p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            
            {/* Signature of the person giving consent */}
            <div className="text-center">
  {/* Signature display */}
  <span className="w-full border-b-2 border-black px-1 py-1 block">
    {consentSignature ? (
      <img
        src={consentSignature}
        alt="Digital Signature"
        className="mx-auto max-h-24"
      />
    ) : (
      "No signature provided"
    )}
  </span>

  <label className="block font-bold mt-1">
    Driver Signature
  </label>

  {/* Checkbox 1 */}
  <div className="flex justify-center items-center mt-2 gap-2">
    <span
      className={`w-4 h-4 border-2 border-black ${
        consentMethod === "Phone" ? "bg-black" : ""
      }`}
    ></span>
    <span>Consent given over the phone</span>
  </div>
</div>


            {/* Date and Time of consent */}
            <div className="text-center">
              <span className="w-full border-b-2 border-black px-1 py-1 block">{consentDateTime}</span>
              <label className="block font-bold mt-1">Date and Time of the consent is given</label>

              {/* Checkbox 2 */}
              <div className="flex justify-center items-center mt-2 gap-2">
                <span className={`w-4 h-4 border-2 border-black ${consentMethod === 'Email' ? 'bg-black' : ''}`}></span>
                <span>Consent given over the email</span>
              </div>
            </div>

            {/* Driver Signature */}
            {/* <div className="text-center">
              <span className="w-full border-b-2 border-black px-1 py-1 block">{driverSignature}</span>
              <label className="block font-bold mt-1">Driver Signature</label>
            </div> */}
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
};


export default StoragePdf;