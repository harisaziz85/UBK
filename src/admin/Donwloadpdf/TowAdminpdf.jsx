// Tow PDF Component (dynamic, similar to StoragePdf)
import { useState, useEffect } from 'react';

const TowAdminPdf = ({ id }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        console.error('❌ Missing ID prop');
        return;
      }
      try {
        const token = localStorage.getItem('authToken');
        const BASE_URL = 'https://ubktowingbackend-production.up.railway.app/api';
        const response = await fetch(`${BASE_URL}/driver/consentForm/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        setFormData(responseData.form);
      } catch (error) {
        console.error('❌ Error fetching consent form data:', error);
      }
    };

    fetchData();
  }, [id]);

  console.log("✅ Raw data received:", formData);

  if (!formData || typeof formData !== "object") {
    console.error("❌ Invalid or missing formData:", formData);
  } else {
    Object.entries(formData).forEach(([key, value]) => {
      console.log(`➡️ ${key}:`, value);
    });
  }

  const {
    invoicePO = '', // ✅ Add this line
    towTruckNumber = "",
    driverCertificate = "",
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
    acknowledgementCheckbox = false,
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
  } = formData || {};

  const towDateTime = formData?.towDetails?.towDateTime ? new Date(formData.towDetails.towDateTime) : null;
  const consentDt = formData?.consentDateTime ? new Date(formData.consentDateTime) : null;

  if (towDateTime) {
    startDate = towDateTime.toISOString().split('T')[0];
    startTime = towDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    endDate = startDate;
    endTime = startTime;
  }

  if (consentDt) {
    consentDateTime = consentDt.toLocaleString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });
  }

  const mappedInvoicePO = formData?.towDriver?.invoiceOrPO || '';
  const mappedTowTruckNumber = formData?.towDriver?.truckNumber || '';
  const mappedDriverCertificate = formData?.towDriver?.driverCertificate || '';
  const mappedYear = formData?.vehicle?.year || '';
  const mappedMake = formData?.vehicle?.make || '';
  const mappedModel = formData?.vehicle?.model || '';
  const mappedColor = formData?.vehicle?.color || '';
  const mappedPlate = formData?.vehicle?.plate || '';
  const mappedVin = formData?.vehicle?.vin || '';
  const mappedCurrentMileage = formData?.vehicle?.currentMileage || '';
  const mappedTowedFrom = formData?.towDetails?.fromLocation || '';
  const mappedTowedTo = formData?.towDetails?.toLocation || '';
  const mappedServiceDescription = formData?.towDetails?.descriptionOfServices || '';
  const mappedAcknowledgementCheckbox = formData?.towDetails?.acknowledgementRevisedDestination || false;
  const mappedConsentPersonName = formData?.consentBy?.name || '';
  const mappedConsentAddress = formData?.consentBy?.address || '';
  const mappedConsentPhone = formData?.consentBy?.phone || '';
  const mappedConsentEmail = formData?.consentBy?.email || '';
  const mappedProvidingServiceAtPoliceDirection = formData?.policeDirected?.isDirected || false;
  const mappedIncidentNumber = formData?.policeDirected?.incidentNumber || '';
  const mappedOfficerNameBadge = `${formData?.policeDirected?.officerName || ''} ${formData?.policeDirected?.badgeNumber || ''}`.trim() || '';
  const mappedDetachmentDivision = formData?.policeDirected?.detachmentDivision || '';
  const mappedRateSheetShown = formData?.rateSheetShown || false;
  const mappedRightsInformed = formData?.informedOfRights || false;
  const mappedConsentSignature = formData?.towDetails?.digitalSignature || '';
  const mappedDriverSignature = formData?.towDetails?.digitalSignature || '';
  const mappedConsentMethod = formData?.consentMethod || '';

  const formattedEndDateTime = dateEndTime || ''; // Assuming dateEndTime is formatted as "YYYY-MM-DD HH:MM"

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-0">
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
            <span className="border w-20 sm:w-24 h-7 sm:h-8 px-1 text-sm">{mappedInvoicePO}</span>
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
              <div><span className="font-bold">Legal Name:</span> 1878272 Ontario Inc O/A UBK Towing</div>
              <div><span className="font-bold">Business/Mailing Address:</span> 3D–35 King St. Toronto, Ontario M9N 3R8</div>
              <div><span className="font-bold">Email address:</span> ubktowing@gmail.com</div>
              <div><span className="font-bold">Telephone Number:</span> (647) 716-3362</div>
              <div><span className="font-bold">Tow Operator Certificate:</span> TO-189-380-467</div>
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
                 <span className="flex-1 border-b border-black px-1"> {mappedTowTruckNumber }</span>

              </div>
              <div className="flex items-center">
                <label className="font-bold w-32 sm:w-40 flex-shrink-0">Tow Driver Certificate:</label>
                <span className="flex-1 border-b border-black px-1">TD {mappedDriverCertificate}</span>
              </div>
              <div className="flex items-center">
                <label className="font-bold w-32 sm:w-40 flex-shrink-0">Call #:</label>
                <span className="flex-1 border-b border-black px-1">{callNumber}</span>
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
            <p><span className="font-bold">1.</span> Tow operators and tow truck drivers must follow /pursuant to the Towing and Storage Safety and Enforcement Act, 2021. The Act sets out responsibilities for tow operators and tow drivers related to towing services.</p>
            <p><span className="font-bold">2.</span> You have the right to:</p>
            <p className="pl-4">(a) decide where your vehicle will be towed to;</p>
            <p className="pl-4">(b) receive and review your Consent to Tow form and Maximum Rate Schedule before towing begins; do not sign a blank form;</p>
            <p className="pl-4">(c) choose the payment method and get a receipt when you pay;</p>
            <p><span className="font-bold">3.</span> Tow truck drivers and tow operators must:</p>
            <p className="pl-4">(a) contact the Ministry of Transportation if you have any concerns about the towing services you receive or the conduct of the tow truck driver or tow operator.</p>
            <p className="pl-4">(b) not charge multiple forms of payment rates published on the Government of Ontario&apos;s website on the Towing and Storage Safety and Enforcement Act, 2021;</p>
            <p><span className="font-bold">4.</span> Tow operators and tow drivers should read this form carefully before asking a person to sign it. Tow operators are responsible for the safety of tow truck drivers; the operation of a tow truck; conduct toward persons whose vehicles are being towed; and the handling and storage of towed vehicles. See the Ministry of Transportation&apos;s website on the Towing and Storage Safety and Enforcement Act, 2021;</p>
            <p><span className="font-bold">5.</span> Towed vehicle information is subject to a Code of Conduct. See the Government of Ontario&apos;s website on the Towing and Storage Safety and Enforcement Act, 2021.</p>
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
    { label: "Year", value: mappedYear || "—" },
{ label: "Make", value: mappedMake || "—" },
{ label: "Model", value: mappedModel || "—" },
{ label: "Colour", value: mappedColor || "—" },

    ].map((field, index) => (
      <div key={index} className="flex items-center w-full">
        <label className="font-bold whitespace-nowrap mr-1">{field.label}:</label>
        <span className="w-full border-b border-black px-1">{field.value}</span>
      </div>
    ))}
  </div>

  {/* Line 2 - Plate / VIN + Odometer horizontally */}
  <div className="grid grid-cols-3 gap-4 text-xs">
    {/* Plate */}
    <div className="flex items-center w-full">
      <label className="font-bold whitespace-nowrap mr-1">Plate:</label>
      <span className="w-full border-b border-black px-1">{mappedPlate || "—"}</span>
    </div>

    {/* VIN + Odometer on same line */}
    <div className="flex items-center w-full col-span-2 justify-between">
      {/* VIN */}
     <div className="flex items-center mb-2">
  <label className="font-bold text-[12px] sm:text-[13px] text-black whitespace-nowrap mr-2">
    VIN#:
  </label>

          {/* VIN Box Row */}
          <div className="flex flex-nowrap gap-[2px]">
            {(mappedVin || '').padEnd(17, ' ').split('').map((char, index) => (
              <div
                key={index}
                className="w-[18px] h-[20px] sm:w-[20px] sm:h-[22px] border border-black flex items-center justify-center text-[11px] sm:text-[12px] font-medium text-black"
              >
                {char.trim() || ''}
              </div>
            ))}
          </div>
        </div>


      {/* Odometer */}
      <div className="flex items-center ml-6 flex-shrink-0">
        <label className="font-bold whitespace-nowrap mr-1">Odometer:</label>
        <span className="w-24 border-b border-black px-1">
          {mappedCurrentMileage || "—"}
        </span>
      </div>
    </div>
  </div>
</div>


        {/* Towed Location Information */}
{/* Towed Location Information */}
<div className="p-3 sm:p-4 mx-4">
  <div className="text-black font-bold text-xs sm:text-sm px-2 py-1 mb-2">
    TOWED LOCATION INFORMATION
  </div>

  <div className="grid grid-cols-2 gap-4 text-xs">
    {/* Towed From */}
    <div className="flex items-center">
      <label className="font-bold whitespace-nowrap mr-1">Towed From:</label>
      <span className="w-full border-b border-black">{mappedTowedFrom}</span>
    </div>

    {/* Start Date & Time */}
    <div className="flex items-center">
      <label className="font-bold whitespace-nowrap mr-1">Start Date & Time:</label>
      <span className="w-full border-b border-black">
        {startDate} {startTime}
      </span>
      <span className="ml-2 text-xs italic">(must be after time consent given)</span>
    </div>

    {/* Towed To */}
    <div className="flex items-center">
      <label className="font-bold whitespace-nowrap mr-1">Towed To:</label>
      <span className="w-full border-b border-black">{mappedTowedTo}</span>
    </div>

    {/* End Date & Time */}
    <div className="flex items-center">
      <label className="font-bold whitespace-nowrap mr-1">End Date & Time:</label>
      <span className="w-full border-b border-black">
        {endDate} {endTime}
      </span>
    </div>
  </div>
</div>




        {/* Description of Services */}
        <div className="p-3 sm:p-4 mx-4">
          <div className="text-black font-bold text-xs sm:text-sm px-2 py-1 mb-2">
            DESCRIPTION OF SERVICES
          </div>
          <div className="text-xs space-y-2">
            <div className="w-full border-b border-black px-1">{mappedServiceDescription}</div>
            <div className="flex items-center">
              <span className={`w-4 h-4 border-2 border-black flex-shrink-0 mr-2 ${mappedAcknowledgementCheckbox ? 'bg-black' : ''}`}></span>
              <span>Acknowledgement of client&apos;s revised destination address - Signature:</span>
              <span className="flex-1 border-b border-black px-1 ml-2">{revisedDestinationSignature}</span>
            </div>
            <div className="font-semibold">DISCLOSURE OF INTEREST:</div>
            <p>1. UBK Towing Service Ltd. operates vehicle storage facilities.</p>
            <p>2. UBK Towing Service Ltd. DOES NOT have any interest in any other locations to which the motor vehicle may be towed for repair, storage, appraisal or other similar purpose.</p>
            <p>3. UBK Towing Service Ltd. DOES NOT have any interest in any person or entity to whom the driver or operator refers to you.</p>
          </div>
        </div>

        {/* Person Giving Consent Information */}
        <div className="font-bold ml-4 text-xs sm:text-sm mb-2">PERSON GIVING CONSENT INFORMATION:</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 px-4">
          
          {/* Left Column */}
          <div className="p-3 sm:p-4 border">
            <div className="space-y-2 text-xs">
              <div className="flex items-center">
                <label className="font-bold w-20 flex-shrink-0">Name:</label>
                <span className="flex-1 border-b border-black px-1">{mappedConsentPersonName}</span>
              </div>
              <div className="flex items-center">
                <label className="font-bold w-20 flex-shrink-0">Address:</label>
                <span className="flex-1 border-b border-black px-1">{mappedConsentAddress}</span>
              </div>
              <div className="flex items-center">
                <label className="font-bold w-20 flex-shrink-0">Phone #:</label>
                <span className="flex-1 border-b border-black px-1">{mappedConsentPhone}</span>
              </div>
              <div className="flex items-center">
                <label className="font-bold w-20 flex-shrink-0">Email Address:</label>
                <span className="flex-1 border-b border-black px-1">{mappedConsentEmail}</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="p-3 sm:p-4 border">
  <div className="space-y-2 text-xs">
    {/* ✅ Police Direction Checkbox */}
    <label className="flex items-start gap-2">
      <span
        className={`mt-0.5 w-4 h-4 flex-shrink-0 border-2 border-black ${
          mappedProvidingServiceAtPoliceDirection ? "bg-black" : ""
        }`}
      ></span>
      <span>Providing Services at the direction of Police Officer</span>
    </label>

    {/* ✅ Call / Occurrence Number */}
    <div className="flex items-center">
      <label className="font-bold w-40 flex-shrink-0">Call/Occurrence #:</label>
      <span className="flex-1 border-b border-black px-1">
         {mappedIncidentNumber || "—"}
      </span>
    </div>

    {/* ✅ Officer Name & Badge */}
    <div className="flex items-center">
      <label className="font-bold w-40 flex-shrink-0">Officer Name & Badge #:</label>
      <span className="flex-1 border-b border-black px-1">
        {mappedOfficerNameBadge || "—"}
      </span>
    </div>

    {/* ✅ Detachment / Division */}
    <div className="flex items-center">
      <label className="font-bold w-40 flex-shrink-0">Detachment/ Division:</label>
      <span className="flex-1 border-b border-black px-1">
        {mappedDetachmentDivision || "—"}
      </span>
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <label className="flex items-start gap-2 w-full sm:w-1/2">
              <span className={`mt-0.5 w-4 h-4 flex-shrink-0 border-2 border-black ${mappedRightsInformed ? 'bg-black' : ''}`}></span>
              <span className='font-bold'>You must be informed of your rights before you sign this Consent to Tow form.</span>
            </label>

            <label className="flex items-start gap-2 w-full sm:w-1/2">
              <span className={`mt-0.5 w-4 h-4 flex-shrink-0 border-2 border-black ${mappedRateSheetShown ? 'bg-black' : ''}`}></span>
              <span className="font-bold">Rate sheet shown client</span>
            </label>
          </div>
        </div>

        {/* Signature Section */}
        <div className="p-3 sm:p-4 mx-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            
            {/* Signature of the person giving consent */}
            <div className="text-center">
           <span className="w-full border-b-2 border-black px-1 py-1 block text-center">
  {mappedConsentSignature ? (
    <img
      src={mappedConsentSignature}
      alt="Consent Signature"
      className="mx-auto max-h-24 object-contain"
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

              <label className="block font-bold mt-1">Signature of the person giving consent</label>

                <div className="flex justify-center items-center mt-2 gap-2">
    <span
      className={`w-4 h-4 border-2 border-black ${
        mappedConsentMethod?.toLowerCase() === "phone" ? "bg-black" : ""
      }`}
    ></span>
    <span>Consent given over the phone</span>
  </div>

            </div>

            {/* Date and Time of consent */}
            <div className="text-center">
              <span className="w-full border-b-2 border-black px-1 py-1 block">{consentDateTime}</span>
              <label className="block font-bold mt-1">Date & Time of the consent given</label>

              <div className="flex justify-center items-center mt-2 gap-2">
              <span
                className={`w-4 h-4 border-2 border-black ${
                  mappedConsentMethod?.toLowerCase() === "email" ? "bg-black" : ""
                }`}
              ></span>
              <span>Consent given over the email</span>
            </div>
            </div>

            {/* Driver Signature */}
            <div className="text-center">
              <span className="w-full border-b-2 border-black px-1 py-1 block">
                {mappedDriverSignature ? (
                  <img
                    src={mappedConsentSignature}
                    alt="Driver Signature"
                    className=""
                  />
                ) : (
                  "No signature provided"
                )}
              </span>
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
};

export default TowAdminPdf;