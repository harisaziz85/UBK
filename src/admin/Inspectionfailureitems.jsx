import React from 'react';

const Inspectionfailureitems = () => {
  // Sample data for the table
  const failuresData = [
    {
      submittedAt: 'Tue, Feb 20 2025 10:30am',
      formId: '#12344534',
      vehicle: 'EX7872',
      item: 'Safety glasses',
      inspectionForm: 'Pre-trip inspection',
      status: 'Needs action'
    },
    {
      submittedAt: 'Tue, Feb 20 2025 10:30am',
      formId: '#12344534',
      vehicle: 'EX7872',
      item: 'Safety glasses',
      inspectionForm: 'Pre-trip inspection',
      status: 'Needs action'
    },
    {
      submittedAt: 'Tue, Feb 20 2025 10:30am',
      formId: '#12344534',
      vehicle: 'EX7872',
      item: 'Safety glasses',
      inspectionForm: 'Pre-trip inspection',
      status: 'Needs action'
    },
    {
      submittedAt: 'Tue, Feb 20 2025 10:30am',
      formId: '#12344534',
      vehicle: 'EX7872',
      item: 'Safety glasses',
      inspectionForm: 'Pre-trip inspection',
      status: 'Needs action'
    },
    {
      submittedAt: 'Tue, Feb 20 2025 10:30am',
      formId: '#12344534',
      vehicle: 'EX7872',
      item: 'Safety glasses',
      inspectionForm: 'Pre-trip inspection',
      status: 'Needs action'
    },
    {
      submittedAt: 'Tue, Feb 20 2025 10:30am',
      formId: '#12344534',
      vehicle: 'EX7872',
      item: 'Safety glasses',
      inspectionForm: 'Pre-trip inspection',
      status: 'Needs action'
    },
    {
      submittedAt: 'Tue, Feb 20 2025 10:30am',
      formId: '#12344534',
      vehicle: 'EX7872',
      item: 'Safety glasses',
      inspectionForm: 'Pre-trip inspection',
      status: 'Needs action'
    },
    {
      submittedAt: 'Tue, Feb 20 2025 10:30am',
      formId: '#12344534',
      vehicle: 'EX7872',
      item: 'Safety glasses',
      inspectionForm: 'Pre-trip inspection',
      status: 'Needs action'
    },
    {
      submittedAt: 'Tue, Feb 20 2025 10:30am',
      formId: '#12344534',
      vehicle: 'EX7872',
      item: 'Safety glasses',
      inspectionForm: 'Pre-trip inspection',
      status: 'Needs action'
    },
    {
      submittedAt: 'Tue, Feb 20 2025 10:30am',
      formId: '#12344534',
      vehicle: 'EX7872',
      item: 'Safety glasses',
      inspectionForm: 'Pre-trip inspection',
      status: 'Needs action'
    },
    {
      submittedAt: 'Tue, Feb 20 2025 10:30am',
      formId: '#12344534',
      vehicle: 'EX7872',
      item: 'Safety glasses',
      inspectionForm: 'Pre-trip inspection',
      status: 'Needs action'
    },
    {
      submittedAt: 'Tue, Feb 20 2025 10:30am',
      formId: '#12344534',
      vehicle: 'EX7872',
      item: 'Safety glasses',
      inspectionForm: 'Pre-trip inspection',
      status: 'Needs action'
    },
    {
      submittedAt: 'Tue, Feb 20 2025 10:30am',
      formId: '#12344534',
      vehicle: 'EX7872',
      item: 'Safety glasses',
      inspectionForm: 'Pre-trip inspection',
      status: 'Needs action'
    },
    {
      submittedAt: 'Tue, Feb 20 2025 10:30am',
      formId: '#12344534',
      vehicle: 'EX7872',
      item: 'Safety glasses',
      inspectionForm: 'Pre-trip inspection',
      status: 'Needs action'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
       
        {/* Content Area */}
        <div className="flex-1 p-6 ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Inspection Items Failures</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">+ Start Inspection</button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-4">
            <button className="text-blue-600 border-b-2 border-blue-600 pb-2">All</button>
            <button className="text-gray-500 pb-2">Needs action</button>
            <button className="text-gray-500 pb-2">Open issue</button>
            <button className="text-gray-500 pb-2">Acknowledged</button>
            <button className="text-gray-500 pb-2">Resolved</button>
          </div>

          {/* Sub tabs */}
          <div className="flex space-x-4 mb-4 text-sm">
            <button className="text-gray-400 bg-gray-200 px-3 py-1 rounded">Submitted Inspection Form</button>
            <button className="text-gray-400 px-3 py-1">Submitted Inspection Item</button>
            <button className="text-gray-400 px-3 py-1">≡ Filters</button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" className="mr-2" />
                    Submitted At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inspection Form
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Failure Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {failuresData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <input type="checkbox" className="mr-2" />
                      {row.submittedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.formId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src="https://via.placeholder.com/40x30?text=Car" alt="Vehicle" className="w-10 h-8" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.item}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      • {row.inspectionForm}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      View
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-700">1-14 of 14</div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border rounded">‹</button>
              <button className="px-3 py-1 border rounded">›</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inspectionfailureitems;