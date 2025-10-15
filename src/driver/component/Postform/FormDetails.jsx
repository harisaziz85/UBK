import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FormDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = 'https://ubktowingbackend-production.up.railway.app/api';

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {

           const token = localStorage.getItem("authToken"); // get token from localStorage
      if (!token) {
        throw new Error("Unauthorized – no token found");
      }

         const response = await fetch(`${BASE_URL}/driver/consentForm/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const result = await response.json();

        console.log('form details page',result);
        setData(result.form);
      } catch (error) {
        console.error('Error fetching form:', error);
        // Handle error as needed
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, BASE_URL]);

  const formatDate = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(', ', ' ');
  };

  const Field = ({ label, value, loading }) => (
    <div className="flex gap-2">
      <p className="font-semibold text-gray-700 min-w-fit">{label}:</p>
      {loading ? (
        <Skeleton height={16} width={200} />
      ) : (
        <p className="text-gray-600">{value}</p>
      )}
    </div>
  );

  const isTow = data?.type === 'Consent to Tow';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-full mx-auto">
          <div className="flex w-full justify-between mb-6">
            <Skeleton height={40} width={300} />
            <Skeleton height={20} width={100} />
          </div>

          {/* Tow Operator Skeleton */}
          <section className="p-4 sm:p-6 mb-0 overflow-hidden">
            <Skeleton height={24} width={250} className="mb-4" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex gap-2">
                  <Skeleton height={16} width={80} />
                  <Skeleton height={16} width={200} />
                </div>
              ))}
            </div>
          </section>

          {/* Tow Driver Skeleton */}
          <section className="p-4 sm:p-6 mb-0 overflow-hidden">
            <Skeleton height={24} width={250} className="mb-4" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-2">
                  <Skeleton height={16} width={120} />
                  <Skeleton height={16} width={150} />
                </div>
              ))}
            </div>
          </section>

          {/* Vehicle Skeleton */}
          <section className="p-4 sm:p-6 mb-6 overflow-hidden">
            <Skeleton height={24} width={200} className="mb-4" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex gap-2">
                  <Skeleton height={16} width={60} />
                  <Skeleton height={16} width={120} />
                </div>
              ))}
              <div className="lg:col-span-2 flex gap-2">
                <Skeleton height={16} width={80} />
                <Skeleton height={16} width={150} />
              </div>
            </div>
          </section>

          {/* Location Generic Skeleton */}
          <section className="p-4 sm:p-6 mb-6 overflow-hidden">
            <Skeleton height={24} width={250} className="mb-4" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-2">
                  <Skeleton height={16} width={100} />
                  <Skeleton height={16} width={180} />
                </div>
              ))}
              <div className="lg:col-span-2">
                <Skeleton height={24} width={200} className="mb-2" />
                <Skeleton height={16} count={3} />
              </div>
            </div>
          </section>

          {/* Consent By Skeleton */}
          <section className="p-4 sm:p-6 mb-0 overflow-hidden">
            <Skeleton height={24} width={300} className="mb-4" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-2">
                  <Skeleton height={16} width={80} />
                  <Skeleton height={16} width={200} />
                </div>
              ))}
            </div>
          </section>

          {/* Police Skeleton (optional, show as potential) */}
          <section className="p-4 sm:p-6 mb-0 overflow-hidden">
            <Skeleton height={24} width={200} className="mb-4" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-2">
                  <Skeleton height={16} width={150} />
                  <Skeleton height={16} width={180} />
                </div>
              ))}
            </div>
          </section>

          {/* Consent Details Skeleton */}
          <section className="p-4 sm:p-6 mb-0 overflow-hidden">
            <Skeleton height={24} width={200} className="mb-4" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-2">
                  <Skeleton height={16} width={120} />
                  <Skeleton height={16} width={150} />
                </div>
              ))}
            </div>
          </section>

          {/* Signature Skeleton */}
          <section className="p-4 sm:p-6 mb-6 overflow-hidden">
            <Skeleton height={24} width={100} className="mb-4" />
            <div className="border border-[#E9E9E961] pt-4">
              <Skeleton height={16} width={50} className="mt-2" />
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!data) {
    return <div>Error loading form data.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-start">
            {data.type}
          </h1>
          <p>Form {data._id.slice(0,7)}</p>
        </div>

        {/* Tow Operator Information */}
        <section className="p-4 sm:p-6 mb-0 overflow-hidden">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
            Tow Operator Information
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
            <Field label="Legal Name" value={data.towOperator?.legalName || ''} loading={loading} />
            <Field label="Address" value={data.towOperator?.address || ''} loading={loading} />
            <Field label="Phone" value={data.towOperator?.phone || ''} loading={loading} />
            <Field label="Email" value={data.towOperator?.email || ''} loading={loading} />
            <Field label="Tow Operator Certificate" value={data.towOperator?.operatorCertificate || ''} loading={loading} />
            <Field label="Vehicle Storage Certificate" value={data.towOperator?.storageCertificate || ''} loading={loading} />
          </div>
        </section>

        {/* Tow Driver Information */}
        <section className="p-4 sm:p-6 mb-0 overflow-hidden">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-start">
            Tow Driver Information
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
            <Field label="Tow Driver Name" value={data.towDriver?.name || ''} loading={loading} />
            <Field label="Tow Truck Number" value={data.towDriver?.truckNumber || ''} loading={loading} />
            <Field label="Tow Driver Certificate" value={data.towDriver?.driverCertificate || ''} loading={loading} />
            <Field
              label={isTow ? 'Call #' : 'Invoice/PO #'}
              value={data.towDriver?.invoiceOrPO || ''}
              loading={loading}
            />
          </div>
        </section>

        {/* Vehicle Details */}
        <section className="p-4 sm:p-6 mb-6 overflow-hidden">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-start">
            Vehicle Details
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base">
            <Field label="Year" value={data.vehicle?.year || ''} loading={loading} />
            <Field label="Make" value={data.vehicle?.make || ''} loading={loading} />
            <Field label="Model" value={data.vehicle?.model || ''} loading={loading} />
            <Field label="Color" value={data.vehicle?.color || ''} loading={loading} />
            <Field label="Plate" value={data.vehicle?.plate || ''} loading={loading} />
            <Field label="VIN" value={data.vehicle?.vin || ''} loading={loading} />
            <div className="lg:col-span-2">
              <Field
                label="Odometer"
                value={`${data.vehicle?.currentMileage || 0} miles`}
                loading={loading}
              />
            </div>
          </div>
        </section>

        {/* Tow/Storage Location Information */}
        {isTow ? (
          <section className="p-4 sm:p-6 mb-6 overflow-hidden">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-start">
              Tow Location Information
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base">
              <Field label="Towed From" value={data.towDetails?.fromLocation || ''} loading={loading} />
              <Field label="Towed To" value={data.towDetails?.toLocation || ''} loading={loading} />
              <Field
                label="Start Date/Time"
                value={formatDateTime(data.towDetails?.towDateTime)}
                loading={loading}
              />
              <Field
                label="End Date/Time"
                value={formatDateTime(data.towDetails?.towEndDateTime)}
                loading={loading}
              />
              <div className="lg:col-span-2">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-start">
                  Description of Services:
                </h2>
                <p className="text-gray-600">{data.towDetails?.descriptionOfServices || ''}</p>
              </div>
            </div>
          </section>
        ) : (
          <section className="p-4 sm:p-6 mb-0 overflow-hidden">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-start">
              Storage Location Information
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base">
              <Field
                label="Pickup Location"
                value={data.storageDetails?.pickupLocation || ''}
                loading={loading}
              />
              <Field
                label="Storage Location"
                value={data.storageDetails?.storageLocation || ''}
                loading={loading}
              />
              <div className="lg:col-span-2">
                <Field
                  label="Start Date/Time"
                  value={formatDateTime(data.storageDetails?.startDateTime)}
                  loading={loading}
                />
              </div>
            </div>
          </section>
        )}

        {/* Person Giving Consent Information */}
        <section className="p-4 sm:p-6 mb-0 overflow-hidden">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-start">
            Person Giving Consent Information
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
            <Field label="Name" value={data.consentBy?.name || ''} loading={loading} />
            <Field label="Address" value={data.consentBy?.address || ''} loading={loading} />
            <Field label="Phone" value={data.consentBy?.phone || ''} loading={loading} />
            <Field label="Email" value={data.consentBy?.email || ''} loading={loading} />
          </div>
        </section>

        {/* Police Directed Details */}
        {data.policeDirected?.isDirected && (
          <section className="p-4 sm:p-6 mb-0 overflow-hidden">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-start">
              Police Officer Details
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
              <Field
                label="Officer Name & Badge #:"
                value={`${data.policeDirected?.officerName || ''} & ${data.policeDirected?.badgeNumber || ''}`}
                loading={loading}
              />
              <Field
                label="Detachment / Division:"
                value={data.policeDirected?.detachmentDivision || ''}
                loading={loading}
              />
              <Field
                label="Call / Occurrence / Incident #:"
                value={data.policeDirected?.incidentNumber || ''}
                loading={loading}
              />
            </div>
          </section>
        )}

        {/* Consent Details */}
        <section className="p-4 sm:p-6 mb-0 overflow-hidden">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-start">
            Consent Details
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
            <Field
              label="Consent Date"
              value={formatDate(data.consentDateTime)}
              loading={loading}
            />
            <Field
              label="Consent Time"
              value={formatTime(data.consentDateTime)}
              loading={loading}
            />
            <Field label="Consent Given" value={data.consentMethod || ''} loading={loading} />
          </div>
        </section>

{/* Signature */}
{(data?.towDetails?.digitalSignature || data?.storageDetails?.digitalSignature) && (
  <section className="p-4 sm:px-3 mb-0 overflow-hidden">
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-start">
      Signature
    </h2>

    <div className="border border-[#E9E9E961] pt-4 pb-2 px-3 rounded-md flex justify-start items-start">
      <img
        src={data?.towDetails?.digitalSignature || data?.storageDetails?.digitalSignature}
        alt="Digital Signature"
        className="max-w-full h-auto border border-gray-300 rounded-md"
      />
    </div>
  </section>
)}





      </div>
    </div>
  );
};

export default FormDetails;