import React from 'react';

export default function TowBillPdf() {
  return (
    <div className="max-w-full mx-auto bg-white p-6 text-xs robotomedium ">
      {/* Header */}
      <div className="flex items-start justify-between mb-2 pb-2 ">
        <div className="flex items-center">
          <div className="text-center mr-2">
            <div className="text-4xl font-bold text-blue-900 leading-none">UBK</div>
            <div className="bg-orange-500 text-white px-4 py-0.5 text-lg font-bold -mt-1">TOWING</div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold">PO#</span>
          <div className="border border-black w-24 h-6"></div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-2   border-black">
        {/* Left Column */}
        <div className=" border border-black p-2">
          {/* Date */}
          <div className="mb-2 pb-1 border-b border-black">
            <span className="font-bold">DATE:</span>
            <span className="ml-16 border-b border-black inline-block w-56"></span>
          </div>

          {/* Hirer Information */}
          <div className="mb-2">
            <div className="font-bold mb-1">HIRER INFORMATION:</div>
            <div className="mb-0.5">Name: <span className="border-b border-black inline-block w-64"></span></div>
            <div className="mb-0.5">Address: <span className="border-b border-black inline-block w-60"></span></div>
            <div className="mb-0.5">Phone #: <span className="border-b border-black inline-block w-60"></span></div>
          </div>

          {/* Billing Information */}
          <div className="mb-2 pb-2 border-b border-black">
            <div className="font-bold mb-1">BILLING INFORMATION:</div>
            <div className="mb-0.5">Name: <span className="border-b border-black inline-block w-64"></span></div>
            <div className="mb-0.5">Address: <span className="border-b border-black inline-block w-60"></span></div>
            <div className="mb-0.5">Phone#: <span className="border-b border-black inline-block w-60"></span></div>
            <div className="mb-0.5">Email: <span className="border-b border-black inline-block w-62"></span></div>
            <div className="mb-0.5">Purchase Order #: _______ Tow/lock Call#: <span className="border-b border-black inline-block w-24"></span></div>
          </div>

          {/* Police Services */}
                <div className="text-[12px] leading-tight mb-2">
                <div className="flex items-center mb-0.5">
                    <input
                    type="checkbox"
                    className="mr-1.5 w-[12px] h-[12px]"
                    />
                    <span>Providing Services at the direction of a Police Officer</span>
                </div>
                <div className="mb-1">
                    Call/Occurrence/Incident #:{" "}
                    <span className="border-b border-black inline-block w-40"></span>
                </div>
                <div className="mb-1">
                    Officer Name & Badge #:{" "}
                    <span className="border-b border-black inline-block w-44"></span>
                </div>
                <div className="mb-1">
                    Detachment / Division:{" "}
                    <span className="border-b border-black inline-block w-48"></span>
                </div>
                </div>

        </div>

        {/* Right Column */}
        <div className="p-2 border border-black">
          {/* Tow Driver Information */}
          <div className="mb-2 pb-2 border-b border-black">
            <div className="font-bold mb-1">TOW DRIVER INFORMATION:</div>
            <div className="mb-0.5">Name: <span className="border-b border-black inline-block w-56"></span></div>
            <div className="mb-0.5">UBK Towing Driver Number: <span className="border-b border-black inline-block w-36"></span></div>
            <div className="mb-0.5">Tow Driver Certificate Number: TD- <span className="border-b border-black inline-block w-32"></span></div>
          </div>

          {/* Tow Truck Information */}
          <div className="mb-2 pb-2 border-b border-black">
            <div className="font-bold mb-1">TOW TRUCK INFORMATION:</div>
            <div className="mb-0.5">UBK Towing Unit Number: <span className="border-b border-black inline-block w-40"></span></div>
            <div className="mb-0.5">License Plate: <span className="border-b border-black inline-block w-52"></span></div>
          </div>

          {/* Tow Operator Information */}
          <div className="text-[12px]  leading-tight">
            <div className="font-bold mb-1">TOW OPERATOR INFORMATION:</div>
            <div className="mb-1">Legal Name: 1878272 Ontario Inc O/A UBK Towing</div>
            <div className="mb-1">Business/Mailing Address: 3D-35 King St, Toronto Ontario M9N3H3</div>
            <div className="mb-1">Tow Operator Certificate Number: TO-88-3607</div>
            <div className="mb-1">Vehicle Storage Certificate Number: VS-189-388-487</div>
          </div>
        </div>
      </div>

      {/* Towed Vehicle Information */}
      <div className=" text-[12px]  border-black p-2">
        <div className="font-bold mb-1">TOWED VEHICLE INFORMATION</div>
        <div className="flex gap-2 text-[12px]">
          <div>Year: <span className="border-b border-black inline-block w-16"></span></div>
          <div>Make: <span className="border-b border-black inline-block w-20"></span></div>
          <div>Model: <span className="border-b border-black inline-block w-20"></span></div>
          <div>Colour: <span className="border-b border-black inline-block w-20"></span></div>
          <div>Unit: <span className="border-b border-black inline-block w-24"></span></div>
        </div>
        <div className="flex gap-4 mt-1 text-[12px]">
          <div>Plate: <span className="border-b border-black inline-block w-32"></span></div>
          <div className="flex items-center">
            VIN#: 
            <div className="flex ml-1">
              {[...Array(17)].map((_, i) => (
                <div key={i} className="w-4 h-5 border border-black ml-px"></div>
              ))}
            </div>
          </div>
          <div>Odometer: <span className="border-b border-black inline-block w-20"></span></div>
        </div>
      </div>

      {/* Towed Location Information */}
<div className="border border-black p-2">
  <div className="font-bold mb-1">TOWED LOCATION INFORMATION</div>


  <div>

     {/* Row 1 */}
  <div className="flex items-center text-[12px] mb-0.5">
    <span className="whitespace-nowrap mr-1">Towed From:</span>
    <span className="border-b border-black flex-1 max-w-[380px] inline-block mr-2"></span>
    <span className="whitespace-nowrap mr-1">Date & End Time:</span>
    <span className="border-b border-black w-[130px] inline-block"></span>
  </div>

  {/* Row 2 */}
  <div className="flex items-center text-[12px] mb-0.5">
    <span className="whitespace-nowrap mr-1">Towed To:</span>
    <span className="border-b border-black flex-1 max-w-[380px] inline-block mr-2"></span>
    <span className="whitespace-nowrap mr-1">Date & End Time:</span>
    <span className="border-b border-black w-[130px] inline-block"></span>
  </div>

  </div>

  {/* Row 3 */}
  <div className="flex items-center text-[12px]">
    <span className="whitespace-nowrap mr-1">Vehicle Towed into Storage Lot - Timestamp:</span>
    <span className="border-b border-black flex-1 max-w-[520px] inline-block"></span>
  </div>
</div>



      {/* Services Description */}
     <div className="font-bold p-2 pb-1 text-[12px]">ITEMIZED DESCRIPTION OF SERVICES TO BE PROVIDED</div>
      <div className="border-l border-r border-b border-black">
        <table className="w-full">
          <tbody>
            <tr className="border-t border-black">
              <td className="border-r border-black p-2 h-8"></td>
              <td className="w-16 text-left pl-1.5">$</td>
            </tr>
            <tr className="border-t border-black">
              <td className="border-r border-black p-2 h-8"></td>
              <td className="w-16 text-left pl-1.5">$</td>
            </tr>
            <tr className="border-t border-black">
              <td className="border-r border-black p-2 h-8"></td>
              <td className="w-16 text-left pl-1.5">$</td>
            </tr>
            <tr className="border-t border-black">
              <td className="border-r border-black p-2 h-8"></td>
              <td className="w-16 text-left pl-1.5">$</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment Method */}
      <div className="border-l border-r border-b border-black">
        <table className="w-full">
          <tbody>
            <tr className="border-t border-black">
              <td className=" border-black p-2 align-top" rowSpan="3">
                <div className="font-bold mb-1 text-[12px]">PAYMENT METHOD:</div>
                <div className="flex gap-3 text-[12px] mb-2">
                  <label className="flex items-center gap-1">
                    <span className="border border-black w-3 h-3 inline-block"></span>
                    <span>Account</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <span className="border border-black w-3 h-3 inline-block"></span>
                    <span>Cash</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <span className="border border-black w-3 h-3 inline-block"></span>
                    <span>Debit</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <span className="border border-black w-3 h-3 inline-block"></span>
                    <span>Visa</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <span className="border border-black w-3 h-3 inline-block"></span>
                    <span>MC</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <span className="border border-black w-3 h-3 inline-block"></span>
                    <span>AMEX</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <span className="border border-black w-3 h-3 inline-block"></span>
                    <span>E-Transfer</span>
                  </label>
                </div>
                <div className="text-[12px]">
                  AUTH #: <span className="border-b border-black inline-block w-40"></span>
                </div>
              </td>
              <td className="w-28 text-right pr-2 text-[12px] py-1">SUB TOTAL</td>
              <td className="w-16 text-left pl-1.5 border-b border-l border-black">$</td>
            </tr>
            <tr className=" border-black">
              <td className="w-24 text-right pr-2 text-[12px] py-1">HST # (788576701)</td>
              <td className="w-16 text-left pl-1.5 border-b border-l border-black">$</td>
            </tr>
            <tr className=" border-black">
              <td className="w-24 text-right pl-1.5 text-[12px] font-bold py-1">TOTAL</td>
              <td className="w-16 text-left pl-1.5 border-l border-black">$</td>
            </tr>
          </tbody>
        </table>
      </div>

      

      {/* Additional Information */}
      <div className="border-l border-r border-b border-black p-2 text-[12px] leading-tight">
        <div className="mb-1">
          <span className="font-bold">For Internal Purpose Only:</span> Vehicle drop zone in the year: _______ | Keys: Yes / No
        </div>
        <div className="mb-1">
          Invoice status drop is dispatch: Yes / No  Documents given to: <span className="border-b border-black inline-block w-64"></span>
        </div>
       
      </div>
       <div className='mt-1.5 text-[12px]'>
          I, the undersigned, do hereby certify that I am legally authorized to take possession of the vehicle referenced above. I have received the vehicle in satisfactory condition.
        </div>


    {/* Signature Section */}
<div className=" mt-6">
  {/* Header Row */}
  <div className="grid grid-cols-4 gap-2 text-center  border-black">
    <div className=" border-t border-black py-1">
      <div className="italic text-[14px]">Name of the person signing</div>
    </div>
    <div className=" border-t border-black py-1">
      <div className="italic text-[14px]">Customer Signature</div>
    </div>
    <div className=" border-t border-black py-1">
      <div className="italic text-[14px]">Date & Time</div>
    </div>
    <div className=" border-t border-black py-1">
      <div className="italic text-[14px]">UBK Driver Signature</div>
    </div>
  </div>

 
</div>

 <div className='text-center text-[13px] mt-2'>
        <p>I hereby certify that the contents of this document are true and accurate</p>
        <p>
          This company is not responsible for loss or damage caused by faulty tires, bumper
          brackets, etc. and assumes no responsibility for loss or damage by theft, fire or any
          other cause beyond our control, to any vehicle placed with us for storage or repair.
        </p>
      </div>

{/* Footer */}
<div className="text-center text-[15px] italic mt-1">
  <div>
    Address: <span className="font-semibold not-italic">3D-35 King St. Toronto Ontario M9N3R8</span>{" "}
    Phone: <span className="font-semibold not-italic">(647)716-3362</span>
  </div>
  <div>
    Email: <span className="font-semibold not-italic">ubktowing@gmail.com</span>
  </div>
</div>

<div className="flex justify-between text-[12px] italic mt-0.5">
  <div>Blue Copy - UBK Towing</div>
  <div>Yellow Copy _ Customer</div>
  <div>Pink Copy _ Accounting</div>
</div>

    </div>
  );
}