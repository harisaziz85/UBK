// Tow PDF Component (dynamic, similar to StoragePdf)
const TowPdf = ({ data }) => {
  console.log("✅ Raw data received:", data);

  if (!data || typeof data !== "object") {
    console.error("❌ Invalid or missing 'data' prop:", data);
  } else {
    Object.entries(data).forEach(([key, value]) => {
      console.log(`➡️ ${key}:`, value);
    });
  }

 const {
   invoicePO ='', // ✅ Add this line
  towTruckNumber = "",
    towDriverName = "", // ✅ add this line
  driverCertificate = "",
  name,
   callNumber = "",
  year = "",
  make = "",
  model = "",
  color = "",
  plate = "",
  vin = "",
  currentMileage = "",
    towedFrom = "",
    dateStartTime = "",
    towedTo = "",
    dateEndTime = "",
    serviceDescription = "",
    revisedDestinationSignature = "",
    consentPersonName = "",
    consentAddress = "",
    consentPhone = "",
    consentEmail = "",
    providingServices = false,
   providingServiceAtPoliceDirection = "",
    callOccurrenceNumber = "",
    officerNameBadge = "",
    detachmentDivision = "",
    rateSheetShown = false,
    rightsInformed = false,
    consentSignature = "",
    consentDateTime = "",
    driverSignature = "",
    consentOverPhone = false,
    consentOverEmail = false,
     startDate = "",
    startTime = "",
    endDate = "",
    endTime = "",
    acknowledgementSignature = "",
acknowledgementRevisedDestination = false,


  } = data;

  
  const formattedEndDateTime = dateEndTime || ''; // Assuming dateEndTime is formatted as "YYYY-MM-DD HH:MM"

  return (
    <div className="min-h-screen bg-gray-100 p-[0px]">
      <div className="w-full mx-auto bg-white">
        
        {/* Header Section */}
        <div className="flex flex-row items-start items-center justify-between p-[16px] gap-[12px]">
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
            <span className="font-bold italic">CONSENT TO TOW</span>
            <span className="text-[14px]">PO#</span>
            <span className="border w-[96px] h-[32px] px-[4px] text-[14px]">{invoicePO}</span>
          </div>
        </div>

        {/* Two Column Section - Operator and Driver Info */}
        <div className="grid grid-cols-2 gap-[8px] mx-[16px]">
          
          {/* Left Column - Tow Operator Information */}
          <div className="p-[16px] border">
            <div className="text-black font-bold text-[14px] px-[8px] py-[4px] mb-[8px]">
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
          <div className="p-[16px] border">
            <div className="text-black font-bold text-[14px] px-[8px] py-[4px] mb-[8px]">
              TOW DRIVER INFORMATION
            </div>
            <div className="space-y-[6px] text-[12px]">
              <div className="flex items-center">
                <label className="font-bold w-[160px] flex-shrink-0">Name:</label>
                 <span className="flex-1 border-b border-black px-[4px]"> {towDriverName}</span>

              </div>
              <div className="flex items-center">
                <label className="font-bold w-[160px] flex-shrink-0">Tow Truck Number:</label>
                 <span className="flex-1 border-b border-black px-[4px]"> {data.towTruckNumber }</span>

              </div>
              <div className="flex items-center">
                <label className="font-bold w-[160px] flex-shrink-0">Tow Driver Certificate:</label>
                <span className="flex-1 border-b border-black px-[4px]">TD {driverCertificate}</span>
              </div>
              <div className="flex items-center">
                <label className="font-bold w-[160px] flex-shrink-0">Call #:</label>
                <span className="flex-1 border-b border-black px-[4px]">{callNumber}</span>
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
       <div className="p-[16px] mx-[16px]">
  <div className="text-black font-bold text-[14px] px-[8px] py-[4px] mb-[8px]">
    TOWED VEHICLE INFORMATION
  </div>

  {/* Line 1 - Year / Make / Model / Colour / Unit */}
  <div className="grid grid-cols-5 gap-[16px] text-[12px] mb-[8px]">
    {[
    { label: "Year", value: data?.year || "—" },
{ label: "Make", value: data?.make || "—" },
{ label: "Model", value: data?.model || "—" },
{ label: "Colour", value: data?.color || "—" },

    ].map((field, index) => (
      <div key={index} className="flex items-center w-full">
        <label className="font-bold whitespace-nowrap mr-[4px]">{field.label}:</label>
        <span className="w-full border-b border-black px-[4px]">{field.value}</span>
      </div>
    ))}
  </div>

  {/* Line 2 - Plate / VIN + Odometer horizontally */}
  <div className="grid grid-cols-3 gap-[16px] text-[12px]">
    {/* Plate */}
    <div className="flex items-center w-full">
      <label className="font-bold whitespace-nowrap mr-[4px]">Plate:</label>
      <span className="w-full border-b border-black px-[4px]">{data?.plate || "—"}</span>
    </div>

    {/* VIN + Odometer on same line */}
    <div className="flex items-center w-full col-span-2 justify-between">
      {/* VIN */}
     <div className="flex items-center mb-[8px]">
  <label className="font-bold text-[13px] text-black whitespace-nowrap mr-[8px]">
    VIN#:
  </label>

          {/* VIN Box Row */}
          <div className="flex flex-nowrap gap-[2px]">
            {(data?.vin || '').padEnd(17, ' ').split('').map((char, index) => (
              <div
                key={index}
                className="w-[22px] h-[24px] border border-black flex items-center justify-center text-[13px] font-medium text-black"
              >
                {char.trim() || ''}
              </div>
            ))}
          </div>
        </div>


      {/* Odometer */}
      <div className="flex items-center ml-[24px] flex-shrink-0">
        <label className="font-bold whitespace-nowrap mr-[4px]">Odometer:</label>
        <span className="w-[96px] border-b border-black px-[4px]">
          {data?.currentMileage || "—"}
        </span>
      </div>
    </div>
  </div>
</div>


        {/* Towed Location Information */}
{/* Towed Location Information */}
<div className="p-[16px] mx-[16px]">
  <div className="text-black font-bold text-[14px] px-[8px] py-[4px] mb-[8px]">
    TOWED LOCATION INFORMATION
  </div>

  <div className="grid grid-cols-2 gap-[16px] text-[12px]">
    {/* Towed From */}
    <div className="flex items-center">
      <label className="font-bold whitespace-nowrap mr-[4px]">Towed From:</label>
      <span className="w-full border-b border-black">{towedFrom}</span>
    </div>

    {/* Start Date & Time */}
    <div className="flex items-center">
      <label className="font-bold whitespace-nowrap mr-[4px]">Start Date & Time:</label>
      <span className="w-full border-b border-black">
        {startDate} {startTime}
      </span>
      <span className="ml-[8px] text-[12px] italic">(must be after time consent given)</span>
    </div>

    {/* Towed To */}
    <div className="flex items-center">
      <label className="font-bold whitespace-nowrap mr-[4px]">Towed To:</label>
      <span className="w-full border-b border-black">{towedTo}</span>
    </div>

    {/* End Date & Time */}
    <div className="flex items-center">
      <label className="font-bold whitespace-nowrap mr-[4px]">End Date & Time:</label>
      <span className="w-full border-b border-black">
        {endDate} {endTime}
      </span>
    </div>
  </div>
</div>




       {/* Description of Services */}
<div className="p-[16px] mx-[16px]">
  <div className="text-black font-bold text-[14px] px-[8px] py-[4px] mb-[8px]">
    DESCRIPTION OF SERVICES
  </div>
  <div className="text-[12px] space-y-[8px]">
    <div className="w-full border-b border-black px-[4px]">{serviceDescription}</div>

    {/* ✅ Acknowledgement Checkbox + Signature */}
   <div className="flex items-center">
  <span
    className={`w-[16px] h-[16px] border-2 border-black flex-shrink-0 mr-[8px] ${
      acknowledgementRevisedDestination ? "bg-black" : ""
    }`}
  ></span>
  <span>Acknowledgement of client&apos;s revised destination address - Signature:</span>
  
  <span className="flex-1 border-b border-black px-[4px] ml-[8px]">
    {acknowledgementSignature ? (
      <img
        src={acknowledgementSignature}
        alt="Acknowledgement Signature"
        className="h-[32px] object-contain inline-block"
      />
    ) : (
      "—"
    )}
  </span>
</div>


    <div className="font-semibold">DISCLOSURE OF INTEREST:</div>
    <p>1. UBK Towing Service Ltd. operates vehicle storage facilities.</p>
    <p>2. UBK Towing Service Ltd. DOES NOT have any interest in any other locations to which the motor vehicle may be towed for repair, storage, appraisal or other similar purpose.</p>
    <p>3. UBK Towing Service Ltd. DOES NOT have any interest in any person or entity to whom the driver or operator refers to you.</p>
  </div>
</div>


        {/* Person Giving Consent Information */}
        <div className="font-bold ml-[16px] text-[14px] mb-[8px]">PERSON GIVING CONSENT INFORMATION:</div>
        <div className="grid grid-cols-2 gap-[8px] px-[16px]">
          
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
              <div className="flex items-center">
                <label className="font-bold w-[80px] flex-shrink-0">Email Address:</label>
                <span className="flex-1 border-b border-black px-[4px]">{consentEmail}</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="p-[16px] border">
  <div className="space-y-[8px] text-[12px]">
    {/* ✅ Police Direction Checkbox */}
    <label className="flex items-start gap-[8px]">
      <span
        className={`mt-[2px] w-[16px] h-[16px] flex-shrink-0 border-2 border-black ${
          data?.providingServiceAtPoliceDirection ? "bg-black" : ""
        }`}
      ></span>
      <span>Providing Services at the direction of Police Officer</span>
    </label>

    {/* ✅ Call / Occurrence Number */}
    <div className="flex items-center">
      <label className="font-bold w-[160px] flex-shrink-0">Call/Occurrence #:</label>
      <span className="flex-1 border-b border-black px-[4px]">
         {data?.incidentNumber || "—"}
      </span>
    </div>

    {/* ✅ Officer Name & Badge */}
    <div className="flex items-center">
      <label className="font-bold w-[160px] flex-shrink-0">Officer Name & Badge #:</label>
      <span className="flex-1 border-b border-black px-[4px]">
        {data?.officerNameBadge || "—"}
      </span>
    </div>

    {/* ✅ Detachment / Division */}
    <div className="flex items-center">
      <label className="font-bold w-[160px] flex-shrink-0">Detachment/ Division:</label>
      <span className="flex-1 border-b border-black px-[4px]">
        {data?.detachmentDivision || "—"}
      </span>
    </div>
  </div>
</div>

        </div>

        {/* Terms and Conditions Paragraph */}
        <div className="p-[16px] mx-[16px] text-[12px] leading-snug">
          <p>You hereby consent to the terms and conditions outlined in this document and authorize UBK Towing Service Ltd. to provide towing, recovery, labour and roadside services as requested to the above-mentioned vehicle. You have been provided wording informing you of your rights pursuant to Ontario Regulation 167/23. Schedule 2 and the Towing and Storage Safety and Enforcement Act, 2021 Maximum price list on the back of this Consent Tow form</p>
          <p>Towed vehicles will be held until full payment receive pursuant to the repair and storage liens Act</p>
        </div>

        {/* Consent Checkboxes */}
        <div className="p-[16px] mx-[16px] text-[12px] space-y-[12px]">
          <div className="flex flex-row items-start items-center gap-[24px]">
            <label className="flex items-start gap-[8px] w-[576px]">
              <span className={`mt-[2px] w-[16px] h-[16px] flex-shrink-0 border-2 border-black ${rightsInformed ? 'bg-black' : ''}`}></span>
              <span className='font-bold'>You must be informed of your rights before you sign this Consent to Tow form.</span>
            </label>

            <label className="flex items-start gap-[8px] w-[576px]">
              <span className={`mt-[2px] w-[16px] h-[16px] flex-shrink-0 border-2 border-black ${rateSheetShown ? 'bg-black' : ''}`}></span>
              <span className="font-bold">Rate sheet shown the client</span>
            </label>
          </div>
        </div>

        {/* Signature Section */}
        <div className="p-[16px] mx-[16px]">
          <div className="grid grid-cols-3 gap-[16px] text-[12px]">
            
            {/* Signature of the person giving consent */}
            <div className="text-center">
           <span className="w-full border-b-2 border-black px-[4px] py-[4px] block text-center">
  {consentSignature ? (
    <img
      src={consentSignature}
      alt="Consent Signature"
      className="mx-auto max-h-[96px] object-contain"
      onError={(e) => {
        console.error("❌ Invalid signature image");
        e.target.style.display = "none";
        e.target.insertAdjacentHTML(
          "afterend",
          '<span style="color:#333;font-size:14px;">Signature not available</span>'
        );
      }}
    />
  ) : (
    <span>No signature provided</span>
  )}
</span>

              <label className="block font-bold mt-[4px]">Signature of the person giving consent</label>

                <div className="flex justify-center items-center mt-[8px] gap-[8px]">
                  <span
                    className={`w-[16px] h-[16px] border-2 border-black ${
                      data?.consentMethod?.toLowerCase() === "phone" ? "bg-black" : ""
                    }`}
                  ></span>
                  <span>Consent given over the phone</span>
                </div>

            </div>

            {/* Date and Time of consent */}
            <div className="text-center">
              <span className="w-full border-b-2 border-black px-[4px] py-[4px] block">{consentDateTime}</span>
              <label className="block font-bold mt-[4px]">Date & Time of the consent given</label>

              <div className="flex justify-center items-center mt-[8px] gap-[8px]">
              <span
                className={`w-[16px] h-[16px] border-2 border-black ${
                  data?.consentMethod?.toLowerCase() === "email" ? "bg-black" : ""
                }`}
              ></span>
              <span>Consent given over the email</span>
            </div>
            </div>

         {/* Driver Signature */}
    <div className="text-center">
      <span className="w-full border-b-2 border-black px-[4px] py-[4px] block">
        No signature provided
      </span>
      <label className="block font-bold mt-[4px]">
        Driver signature 
      </label>

      {/* ✅ In-Person consent (moved here) */}
      <div className="flex justify-center items-center mt-[8px] gap-[8px]">
        <span
          className={`w-[16px] h-[16px] border-2 border-black ${
            data?.consentMethod?.toLowerCase() === "in-person" ? "bg-black" : ""
          }`}
        ></span>
        <span>Consent given in person</span>
      </div>
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

export default TowPdf;