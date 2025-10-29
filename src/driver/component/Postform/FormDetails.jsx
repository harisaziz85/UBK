import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import TowPdf from './pdf/Towpdf'; // Adjust path as needed
import StoragePdf from './pdf/Storagepgf'; // Adjust path as needed

// Simple inline LoadingSpinner component
const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
);

const FormDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const componentRef = useRef();

  const BASE_URL = 'https://ubktowingbackend-production.up.railway.app/api';

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

  // Flatten data for PDF components
  const pdfData = React.useMemo(() => {
    if (!data) return {};
    const isTow = data.type === 'Consent to Tow';
    const policeData = data.policeDirected || {};
    const officerNameBadge = policeData.isDirected ? `${policeData.officerName || ''} ${policeData.badgeNumber || ''}` : '';
    const consentDateTime = formatDateTime(data.consentDateTime);
    const { towDateTime, towEndDateTime } = data.towDetails || {};
    const { startDateTime } = data.storageDetails || {};
    const startDate = towDateTime ? formatDate(towDateTime) : formatDate(startDateTime);
    const startTime = towDateTime ? formatTime(towDateTime) : formatTime(startDateTime);
    const endDate = towEndDateTime ? formatDate(towEndDateTime) : '';
    const endTime = towEndDateTime ? formatTime(towEndDateTime) : '';

    const baseData = {
      invoicePO: data.towDriver?.invoiceOrPO || '',
      driverName: data.towDriver?.name || '',
      towDriverName: data.towDriver?.name || '',
      driverCertificate: data.towDriver?.driverCertificate || '',
      truckNumber: data.towDriver?.truckNumber || '',
      towTruckNumber: data.towDriver?.truckNumber || '',
      callNumber: data.towDriver?.invoiceOrPO || '',
      year: data.vehicle?.year || '',
      make: data.vehicle?.make || '',
      model: data.vehicle?.model || '',
      color: data.vehicle?.color || '',
      plate: data.vehicle?.plate || '',
      vin: data.vehicle?.vin || '',
      currentMileage: data.vehicle?.currentMileage || '',
      towedFrom: isTow ? (data.towDetails?.fromLocation || '') : (data.storageDetails?.pickupLocation || ''),
      towedTo: isTow ? (data.towDetails?.toLocation || '') : '',
      consentPersonName: data.consentBy?.name || '',
      consentAddress: data.consentBy?.address || '',
      consentPhone: data.consentBy?.phone || '',
      consentEmail: data.consentBy?.email || '',
      providingServiceAtPoliceDirection: policeData.isDirected || false,
      policeDirected: policeData.isDirected || false,
      incidentNumber: policeData.incidentNumber || '',
      callOccurrenceNumber: policeData.incidentNumber || '',
      officerNameBadge,
      detachmentDivision: policeData.detachmentDivision || '',
      consentDateTime,
      consentMethod: data.consentMethod || '',
      informedOfRights: true, // Assume true if not in data; adjust if field exists
      rateSheetShown: true, // Assume true if not in data; adjust if field exists
      consentSignature: isTow ? (data.towDetails?.digitalSignature || '') : (data.storageDetails?.digitalSignature || ''),
      driverSignature: '', // Not in data; adjust if needed
      serviceDescription: isTow ? (data.towDetails?.descriptionOfServices || '') : '',
      startDate,
      startTime,
      endDate,
      endTime,
      startDateTime: isTow ? formatDateTime(towDateTime) : formatDateTime(startDateTime),
      storageType: '', // Adjust if storage type field exists in data
      storageAddressConfirmed: true, // Assume; adjust if needed
      acknowledgementRevisedDestination: false, // Adjust if field exists
      acknowledgementSignature: '', // Adjust if needed
      providingServices: false, // Adjust if needed
      rightsInformed: true, // Assume true
      consentOverPhone: data.consentMethod === 'Phone',
      consentOverEmail: data.consentMethod === 'Email',
    };

    return baseData;
  }, [data]);

  // Download function using html-to-image and jsPDF
  const handleDownload = async () => {
    const element = componentRef.current;
    if (!element) return;

    setIsGeneratingPdf(true);

    try {
      // Wait for layout
      await new Promise((r) => setTimeout(r, 800));

      // Set styles for capture
      const originalWidth = element.style.width;
      const isTow = data?.type === 'Consent to Tow';
      element.style.position = "absolute";
      element.style.left = "0px";
      element.style.top = "0";
      element.style.backgroundColor = "#ffffff";
      element.style.width = isTow ? "1250px" : "1340px";

      const dataUrl = await htmlToImage.toPng(element, {
        useCORS: true,
        backgroundColor: "#ffffff",
        pixelRatio: 2,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(
        `${isTow ? "Tow_Form" : "Storage_Form"}_${data?._id?.slice(0, 7)}.pdf`
      );

      // Restore original styles
      element.style.position = "";
      element.style.left = "";
      element.style.top = "";
      element.style.width = originalWidth;
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex w-full justify-between mb-6">
            <Skeleton height={40} width={300} />
            <Skeleton height={20} width={100} />
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <Skeleton height={800} />
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return <div>Error loading form data.</div>;
  }

  const isTow = data?.type === 'Consent to Tow';
  const PdfComponent = isTow ? TowPdf : StoragePdf;

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-full mx-auto">
        <div className="flex justify-between mb-6 items-center">
          <h1 className="text-[16px] sm:text-3xl md:text-4xl font-bold text-gray-900 text-start">
            {data.type}
          </h1>
          <button
            onClick={handleDownload}
            disabled={isGeneratingPdf}
            className="px-6 py-3 bg-[#043677]/90 text-white rounded-md hover:bg-[#043677] text-[14px] sm:text-[16px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingPdf ? 'Generating...' : 'Download PDF'}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <div ref={componentRef} className="w-[11in] min-h-screen mx-auto py-4">
            <PdfComponent data={pdfData} />
          </div>
        </div>
      </div>

      {isGeneratingPdf && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl flex flex-col items-center gap-4 max-w-sm mx-4">
            <LoadingSpinner />
            <p className="text-gray-700 text-base sm:text-lg font-medium text-center">Generating PDF...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormDetails;