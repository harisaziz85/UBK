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
    detachmentDivision = '',
    consentDateTime = '',
    consentMethod = '',
    informedOfRights = false,
    rateSheetShown = false,
    // Signatures: assuming secondSignature or similar for consentSignature and driverSignature
    consentSignature = '',
    driverSignature = '',
    callNumber
  } = data;

  const storageLocationText = storageAddressConfirmed ? `7 Belvia Road Etobicoke Ontario M8W9R2 - ${storageType?.toUpperCase()}` : '7 Belvia Road Etobicoke Ontario M8W9R2';
  const officerName = officerNameBadge ? officerNameBadge.split('  ')[0] : '';
  const badgeNumber = officerNameBadge ? officerNameBadge.split('  ')[1] : '';

  return (
    <div className="min-h-screen bg-gray-100 p-[0px]">
      <div className="w-full mx-auto bg-white ">
        
        {/* Header Section */}
        <div className="flex flex-row items-center justify-between p-[16px] gap-[12px]">
          <div className="flex items-end gap-[8px]">
            <div className="relative">
              <div className="bg-blue-900 text-white px-[32px] py-[4px]">
                <div className="text-[36px] font-bold tracking-wider">UBK</div>
              </div>
              <div className="bg-orange-500 text-white text-center text-[14px] font-bold py-[4px] mt-[4px]">
                TOWING.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[8px] text-[16px]">
            <span className="font-bold italic">CONSENT TO STORAGE</span>
            <span className="text-[14px]">PO#</span>
            <span className="border w-[96px] h-[32px] px-[4px] text-[14px]">{invoicePO}</span>
          </div>
        </div>

        {/* Two Column Section - Operator and Driver Info */}
        <div className="grid grid-cols-2 gap-[8px]  mx-[16px]">
          
          {/* Left Column - Tow Operator Information */}
          <div className="p-[16px] border  ">
            <div className=" text-black font-bold text-[14px] px-[8px] py-[4px] mb-[8px]">
              TOW OPERATOR INFORMATION:
            </div>
            <div className="space-y-[2px] text-[12px] leading-tight">
              <div><span className="font-bold">Legal Name:</span> 1878272 Ontario Inc O/A UBK Towing</div>
              <div><span className="font-bold">Business/Mailing Address:</span> 3D–35 King St. Toronto, Ontario M9N 3R8</div>
              <div><span className="font-bold">Email address:</span> ubktowing@gmail.com</div>
              <div><span className="font-bold">Telephone Number:</span> (647) 716-3362</div>
              <div><span className="font-bold">Tow Operator Certificate:</span> TO-189-380-467</div>
              <div><span className="font-bold">Vehicle Storage Certificate:</span> VS-189-380-467</div>
            </div>
          </div>

          {/* Right Column - Tow Driver Information */}
          <div className="p-[16px] border ">
            <div className="text-black font-bold text-[14px] px-[8px] py-[4px] mb-[8px]">
              TOW DRIVER INFORMATION:
            </div>
            <div className="space-y-[6px] text-[12px]">
              <div className="flex items-center">
                <label className="font-bold w-[160px] flex-shrink-0">Name:</label>
                <span className="flex-1 border-b border-black px-[4px]">{driverName}</span>
              </div>
              <div className="flex items-center">
                <label className="font-bold w-[160px] flex-shrink-0">Driver License Number:</label>
                <span className="flex-1 border-b border-black px-[4px]">{driverCertificate}</span>
              </div>
              <div className="flex items-center">
                <label className="font-bold w-[160px] flex-shrink-0">UBK Towing Truck Number:</label>
                <span className="flex-1 border-b border-black px-[4px]">{truckNumber}</span>
              </div>
              {/* <div className="flex items-center">
                <label className="font-bold w-32 sm:w-40 flex-shrink-0">Tow Driver Phone Number:</label>
                <span className="flex-1 border-b border-black px-1">{towDriverPhone}</span>
              </div> */}
              <div className="flex items-center">
                <label className="font-bold w-[160px] flex-shrink-0">Invoice Number:</label>
                <span className="flex-1 border-b border-black px-[4px]">{invoicePO}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclosure Statement */}
          <div className="p-[16px] mx-[16px]">
          <div className="font-bold text-center text-[14px] mb-[8px] underline">
           DISCLOSURE STATEMENT / PURSUANT TO ONTARIO REGULATION 167/23 - SCHEDULE 2
          </div>
          <div className="text-[12px] leading-snug space-y-[4px]">
            <p><span className="font-bold">1.</span>Tow operators and tow truck drivers must follow the requirements of the Towing and Storage Safety and Enforcement Act, 2021. The Act sets out responsibilities for the operation of a tow truck, conduct toward the public and at the scene of an accident, and the rates that can be charged for towing a motor vehicle. The Act also sets out rights you have when requesting or receiving towing services.
</p>
            <p><span className="font-bold">2.</span>You have the right to,</p>
            <p className="pl-[16px]">(a) decide who can tow your vehicle and where your vehicle will be towed to;</p>
            <p className="pl-[16px]">(b) receive and review the Consent to Tow form and Maximum Rate Schedule before towing begins; do not sign a blank form;</p>
            <p className="pl-[16px]">(c) receive an unaltered copy of the signed Consent to Tow form;</p>
            <p className="pl-[16px]">(d) receive an itemized invoice before paying and get a receipt when you pay;</p>
            <p className="pl-[16px]">(e) choose the payment method; and</p>
            <p className="pl-[16px]">(1) contact the Ministry of Transportation if you have any concerns about the towing services you receive or the conduct of the tow truck driver or tow operator.</p>
            <p><span className="font-bold">3.</span> Tow truck drivers and tow operators must,</p>
            <p className="pl-[16px]">(a) notify you if your vehicle is taken to a location that is different from the location you identified;</p>
            <p className="pl-[16px]">(b) not charge more than the rates published on the Government of Ontario’s website on the Towing and Storage Safety and Enforcement Act, 2021;</p>
            <p className="pl-[16px]">(c) accept multiple forms of payment;</p>
            <p className="pl-[16px]">(d) not solicit you to consent to other services, including vehicle storage services;</p>
            <p className="pl-[16px]">(e) not refer you to any medical or legal services and can only refer you to another towing, vehicle storage or vehicle repair business if you request it; and</p>
            <p className="pl-[16px]">(f) disclose any interest they have or benefit they may receive from the referral at the time of making the referral.</p>

            <p><span className="font-bold">4.</span> Tow truck drivers and tow operators are identified by name and certificate number on the Consent to Tow form and on the tow truck. Make sure the tow operator’s name and certificate number on the tow truck match the documentation. </p>
            <p><span className="font-bold">5.</span> Tow truck drivers and tow operators are subject to a Code of Conduct. See the Government of Ontario’s website on the Towing and Storage Safety and Enforcement Act, 2021.</p>
          </div>
        </div>



        {/* Towed Vehicle Information */}
        <div className="p-[16px] ">
          <div className=" text-black font-bold text-[14px] px-[8px] py-[4px] mb-[8px]">
            TOWED VEHICLE INFORMATION
          </div>

          {/* Line 1 - Year / Make / Model / Colour / Unit */}
          <div className="grid grid-cols-5 gap-[16px] text-[12px] mb-[8px]">
            {[
              { label: "Year", value: year },
              { label: "Make", value: make },
              { label: "Model", value: model },
              { label: "Colour", value: color },
              // { label: "Unit", value: '' }, 
            ].map((field, index) => (
              <div key={index} className="flex items-center w-full">
                <label className="font-bold whitespace-nowrap mr-[4px]">{field.label}:</label>
                <span className="w-full border-b border-black">{field.value}</span>
              </div>
            ))}
          </div>

          {/* Line 2 - Plate / VIN + Odometer horizontally */}
          <div className="grid grid-cols-3 gap-[16px] text-[12px]">
            {/* Plate */}
            <div className="flex items-center w-full">
              <label className="font-bold whitespace-nowrap mr-[4px]">Plate:</label>
              <span className="w-full border-b border-black">{plate}</span>
            </div>

            {/* VIN + Odometer on same line */}
            <div className="flex items-center w-full col-span-2 justify-between">
              {/* VIN Section */}
              <div className="flex items-center mt-[4px]">
                <label className="font-bold text-[13px] text-black whitespace-nowrap mr-[8px]">
                  VIN#:
                </label>

                {/* VIN boxes */}
                <div className="flex flex-nowrap gap-[2px] ml-[4px]">
                  {(vin || "").padEnd(17, " ").split("").map((char, index) => (
                    <div
                      key={index}
                      className="w-[22px] h-[24px] border border-black flex items-center justify-center text-[13px] font-medium text-black leading-none"
                    >
                      {char.trim() || ""}
                    </div>
                  ))}
                </div>
              </div>


              {/* Odometer */}
              <div className="flex items-center ml-[24px] flex-shrink-0">
                <label className="font-bold whitespace-nowrap mr-[4px]">Odometer:</label>
                <span className="w-[96px] border-b border-black px-[4px]">{currentMileage}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Towed Location Information */}
        <div className="p-[16px]">
          <div className="text-black font-bold text-[14px] px-[8px] py-[4px] mb-[8px]">
            TOWED LOCATION INFORMATION
          </div>

          <div className="grid grid-cols-2 gap-[16px] text-[12px]">
            <div className="flex items-center">
              <label className="font-bold whitespace-nowrap mr-[4px]">Towed From:</label>
              <span className="w-full border-b border-black">{towedFrom}</span>
            </div>

            <div className="flex items-center">
              <label className="font-bold whitespace-nowrap mr-[4px]">Date & Start Time:</label>
              <span className="w-full border-b border-black">{startDateTime}</span>
            </div>
          </div>
        </div>

       {/* Storage Locations */}
<div className="p-[16px]">
  <div className="text-black font-bold text-[14px] px-[8px] py-[4px] mb-[8px]">
    STORAGE LOCATIONS
  </div>

  {/* Checkboxes Row */}
  <div className="flex flex-wrap items-center gap-[24px] text-[12px]">
    {/* Main Location */}
    <label className="flex items-center gap-[8px]">
      <span
        className={`w-[16px] h-[16px] border-2 border-black flex-shrink-0 ${
          storageType?.toLowerCase().includes("belvia") ||
          storageType?.toLowerCase().includes("etobicoke")
            ? "bg-black"
            : ""
        }`}
      ></span>
      <span>7 Belvia Road Etobicoke Ontario M8W9R2</span>
    </label>

    {/* Indoor */}
    <label className="flex items-center gap-[8px]">
      <span
        className={`w-[16px] h-[16px] border-2 border-black flex-shrink-0 ${
          storageType?.toLowerCase().includes("indoor") ? "bg-black" : ""
        }`}
      ></span>
      <span>INDOOR</span>
    </label>

    {/* Outdoor */}
    <label className="flex items-center gap-[8px]">
      <span
        className={`w-[16px] h-[16px] border-2 border-black flex-shrink-0 ${
          storageType?.toLowerCase().includes("outdoor") ? "bg-black" : ""
        }`}
      ></span>
      <span>OUTDOOR</span>
    </label>
  </div>
</div>


        {/* Disclosure of Interest */}
        <div className="p-[16px] ">
          <div className="text-black font-bold text-[14px] px-[8px] py-[4px] mb-[8px]">
            DISCLOSURE OF INTEREST:
          </div>
          <div className="text-[12px] space-y-[4px]">
            <p><span className="font-bold">1.</span> UBK Towing Service Ltd. operates vehicle storage facilities listed above.</p>
            <p><span className="font-bold">2.</span> UBK Towing Service Ltd. DOES NOT have any interest in any person or entity to whom the driver or operator refers to you.</p>
          </div>
        </div>

        <div className="font-bold ml-[16px]">PERSON GIVING CONSENT INFORMATION:</div>
        {/* Person Giving Consent - Two Column Layout */}
        <div className="grid grid-cols-2  gap-[8px] px-[16px]">
          
          {/* Left Column */}
          <div className="p-[16px] border">
            <div className="space-y-[8px] text-[12px]">
              <div className="flex items-center">
                <label className="font-bold w-[80px] flex-shrink-0">Name:</label>
                <span className="flex-1 border-b border-black px-[4px]">{consentPersonName}</span>
              </div>
              <div className="flex items-center">
                <label className="font-bold w-[80px] flex-shrink-0">Address:</label>
                <span className="flex-1 border-b border-black px-[4px]">{consentAddress}</span>
              </div>
              <div className="flex items-center">
                <label className="font-bold w-[80px] flex-shrink-0">Phone #:</label>
                <span className="flex-1 border-b border-black px-[4px]">{consentPhone}</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="p-[16px] border ">
            <div className="space-y-[8px] text-[12px]">
              <label className="flex items-start gap-[8px]">
                <span className={`mt-[2px] w-[16px] h-[16px] flex-shrink-0 border-2 border-black ${policeDirected ? 'bg-black' : ''}`}></span>
                <span>Providing Services at the direction of Police Officer</span>
              </label>
              <div className="flex items-center">
                <label className="font-bold w-[160px] flex-shrink-0">Call/Occurrence Number:</label>
                <span className="flex-1 border-b border-black px-[4px]">{incidentNumber}</span>
              </div>
              <div className="flex items-center">
                <label className="font-bold w-[160px] flex-shrink-0">Officer Name & Badge #:</label>
                <span className="flex-1 border-b border-black px-[4px]">{officerNameBadge}</span>
              </div>
              <div className="flex items-center">
                <label className="font-bold w-[160px] flex-shrink-0">Detachment/ Division#:</label>
                <span className="flex-1 border-b border-black px-[4px]">{detachmentDivision }</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rate Schedule */}
        <div className="p-[16px] border-b-2 border-black">
          <div className="text-[12px] space-y-[8px]">
            <p className="font-bold">The Maximum Rate Schedule separates charges for indoor storage and outdoor storage, based upon the length of the stored vehicle. It also provides for chaeging for after-hours access to a vehicle. Vehicle storage rates are based on a daily rate. Charges for the first day of storage are operated on an hourly basis and each subsequent day of storage is chrged the full daily rate.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border-2 border-black text-[12px] mt-[8px]">
                <thead>
                  <tr className="bg-gray-300">
                    <th className="border-2 border-black p-[6px] text-left font-bold">Vehicle Storage</th>
                    <th className="border-2 border-black p-[6px] text-center font-bold w-[64px]">$</th>
                    <th className="border-2 border-black p-[6px] text-center font-bold w-[96px]">Rate Structure</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 border-black p-[6px]">Outdoor storage, vehicle length &le;6.5m</td>
                    <td className="border-2 border-black p-[6px] text-center">85.00</td>
                    <td className="border-2 border-black p-[6px] text-center">/Day</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-[6px]">Outdoor storage, vehicle length &gt;6.5m and &le;12.5m</td>
                    <td className="border-2 border-black p-[6px] text-center">170.00</td>
                    <td className="border-2 border-black p-[6px] text-center">/Day</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-[6px]">Outdoor storage, vehicle length &gt;12.5m</td>
                    <td className="border-2 border-black p-[6px] text-center">215.00</td>
                    <td className="border-2 border-black p-[6px] text-center">/Day</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-[6px]">Indoor storage, vehicle length &le;6.5m</td>
                    <td className="border-2 border-black p-[6px] text-center">170.00</td>
                    <td className="border-2 border-black p-[6px] text-center">/Day</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-[6px]">Indoor storage, vehicle length &gt;6.5m and &le;12.5m</td>
                    <td className="border-2 border-black p-[6px] text-center">310.00</td>
                    <td className="border-2 border-black p-[6px] text-center">/Day</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-[6px]">Indoor storage, vehicle length &gt;12.5m</td>
                    <td className="border-2 border-black p-[6px] text-center">430.00</td>
                    <td className="border-2 border-black p-[6px] text-center">/Day</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-[6px]">After-hours access</td>
                    <td className="border-2 border-black p-[6px] text-center">85.00</td>
                    <td className="border-2 border-black p-[6px] text-center">/Event</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* Consent Checkboxes */}
        <div className="p-[16px]  text-[12px] space-y-[12px]">
          {/* Checkboxes Row */}
          <div className="flex flex-row items-center gap-[24px]">
              <label className="flex items-start gap-[8px] w-[576px]">
              <span className={`mt-[2px] w-[16px] h-[16px] flex-shrink-0 border-2 border-black ${informedOfRights ? 'bg-black' : ''}`}></span>
              <span className='font-bold'>You must be informed of your rights before you sign this Consent to Tow form.</span>
              </label>

              <label className="flex items-start gap-[8px] w-[576px]">
              <span className={`mt-[2px] w-[16px] h-[16px] flex-shrink-0 border-2 border-black ${rateSheetShown ? 'bg-black' : ''}`}></span>
              <span className="font-bold">Rate sheet shown client</span>
              </label>
          </div>

          <p className="leading-snug">
              You hereby consent to the terms and conditions outlined in this document and authorize UBK Towing Service Ltd. to provide towing, recovery, labour 
and roadside services as requested to the above-mentioned vehicle.
 Towed vehicles will be held until full payment is received pursuant to the Repair and Storage Liens Act.
          </p>
        </div>

        {/* Signature Section */}
        <div className="p-[16px]">
          <div className="grid grid-cols-3 gap-[16px] text-[12px]">
            
            {/* Signature of the person giving consent */}
            <div className="text-center w-[384px]">
  {/* Signature display */}
  <span className="w-full border-b-2 border-black px-[4px] py-[4px] block">
    {consentSignature ? (
      <img
        src={consentSignature}
        alt="Digital Signature"
        className="mx-auto max-h-[96px]"
      />
    ) : (
      "No signature provided"
    )}
  </span>

  <label className="block font-bold mt-[4px]">
    Driver Signature
  </label>

  {/* Checkbox 1 */}
  <div className="flex justify-center items-center mt-[8px] gap-[8px]">
    <span
      className={`w-[16px] h-[16px] border-2 border-black ${
        consentMethod === "Phone" ? "bg-black" : ""
      }`}
    ></span>
    <span>Consent given over the phone</span>
  </div>
</div>


            {/* Date and Time of consent */}
            <div className="text-center w-[384px]">
              <span className="w-full border-b-2 border-black px-[4px] py-[4px] block">{consentDateTime}</span>
              <label className="block font-bold mt-[4px]">Date and Time of the consent is given</label>

              {/* Checkbox 2 */}
              <div className="flex justify-center items-center mt-[8px] gap-[8px]">
                <span className={`w-[16px] h-[16px] border-2 border-black ${consentMethod === 'Email' ? 'bg-black' : ''}`}></span>
                <span>Consent given over the email</span>
              </div>
            </div>

            {/* Driver Signature */}
            {/* <div className="text-center w-[384px]">
              <span className="w-full border-b-2 border-black px-1 py-1 block">{driverSignature}</span>
              <label className="block font-bold mt-1">Driver Signature</label>
            </div> */}

              {/* Checkbox 2 - In Person */}
      <div className="flex justify-center items-center mt-[8px] gap-[8px]">
        <span
          className={`w-[16px] h-[16px] border-2 border-black ${
            consentMethod === "In-Person" ? "bg-black" : ""
          }`}
        ></span>
        <span>Consent given in person</span>
      </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-[8px] flex flex-row justify-between items-center gap-[8px] text-[12px] bg-gray-100">
          <span className="font-bold">White Copy - UBK Towing</span>
          <span className="font-bold">Yellow Copy - Customer</span>
           <span className="font-bold underline">ubktowing@gmail.com</span>
        </div>

      </div>
    </div>
  );
};

export default StoragePdf;