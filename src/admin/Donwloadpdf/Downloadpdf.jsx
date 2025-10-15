import React, { useEffect, useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import axios from "axios";
import StoragePdf from "../../driver/component/Postform/pdf/Storagepgf";
import TowPdf from "../../driver/component/Postform/pdf/Towpdf";

const BASE_URL = "https://ubktowingbackend-production.up.railway.app/api";

const DownloadPdf = ({ id, onComplete }) => {
  const pdfRef = useRef(null);
  const [formData, setFormData] = useState(null);
  const [formType, setFormType] = useState(""); // auto-detect type

useEffect(() => {
    const fetchFormData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BASE_URL}/driver/consentForm/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const form = response.data?.form || {};
        console.log("✅ API Response Data:", form);

        // ✅ Detect form type
        const detectedType =
          form?.type === "Consent to Storage"
            ? "storage"
            : form?.type === "Consent to Tow"
            ? "tow"
            : "";
        setFormType(detectedType);

        let formattedData;
        if (detectedType === "tow") {
          const towDateTime = form?.towDetails?.towDateTime ? new Date(form.towDetails.towDateTime) : null;
            const towEndDateTime = form?.towDetails?.towEndDateTime ? new Date(form.towDetails.towEndDateTime) : null; // ✅ Added
          const consentDT = form?.consentDateTime ? new Date(form.consentDateTime) : null;
          formattedData = {
            invoicePO: form?.towDriver?.invoiceOrPO || "",
            towDriverName: form?.towDriver?.name || "",
            driverCertificate: form?.towDriver?.driverCertificate || "",
            towTruckNumber: form?.towDriver?.truckNumber || "",
            callNumber:form?.towDriver?.call || "",
            make: form?.vehicle?.make || "",
            model: form?.vehicle?.model || "",
            year: form?.vehicle?.year || "",
            color: form?.vehicle?.color || "",
            plate: form?.vehicle?.plate || "",
            vin: form?.vehicle?.vin || "",
            currentMileage: form?.vehicle?.currentMileage || "",
            towedFrom: form?.towDetails?.fromLocation || "",
            towedTo: form?.towDetails?.toLocation || "",
            serviceDescription: form?.towDetails?.descriptionOfServices || "",
            acknowledgementCheckbox: form?.towDetails?.acknowledgementRevisedDestination || false,
            revisedDestinationSignature: "",
            consentPersonName: form?.consentBy?.name || "",
            consentAddress: form?.consentBy?.address || "",
            consentPhone: form?.consentBy?.phone || "",
            consentEmail: form?.consentBy?.email || "",
            providingServiceAtPoliceDirection: form?.policeDirected?.isDirected || false,
            incidentNumber: form?.policeDirected?.incidentNumber || "",
            officerNameBadge: `${form?.policeDirected?.officerName || ""} ${form?.policeDirected?.badgeNumber || ""}`,
            detachmentDivision: form?.policeDirected?.detachmentDivision || "",
            consentDateTime: consentDT ? `${consentDT.toISOString().split('T')[0]} ${consentDT.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}` : "",
            consentMethod: form?.consentMethod || "",
            informedOfRights: form?.informedOfRights || false,
            rateSheetShown: form?.rateSheetShown || false,
            consentSignature: form?.towDetails?.digitalSignature || "",
            driverSignature: "",
            providingServices: false,
            consentOverPhone: form?.consentMethod?.toLowerCase() === "phone",
            consentOverEmail: form?.consentMethod?.toLowerCase() === "email",
            startDate: towDateTime ? towDateTime.toISOString().split('T')[0] : "",
            startTime: towDateTime ? towDateTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : "",
             endDate: towEndDateTime ? towEndDateTime.toISOString().split("T")[0] : "", // ✅ Added
            endTime: towEndDateTime
            ? towEndDateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "", // ✅ Added
            rightsInformed: form?.informedOfRights || false,
          };
        } else {
          // Storage mapping (unchanged to keep exact same as current)
          const startDateTimeObj = form?.storageDetails?.startDateTime ? new Date(form.storageDetails.startDateTime) : null;
          
          const consentDT = form?.consentDateTime ? new Date(form.consentDateTime) : null;
          formattedData = {
            invoicePO: form?.towDriver?.invoiceOrPO || "",
            driverName: form?.towDriver?.name || "",
            driverCertificate: form?.towDriver?.driverCertificate || "",
            truckNumber: form?.towDriver?.truckNumber || "",
            towDriverPhone: form?.towOperator?.phone || "",
             callNumber: form?.towDriver?.call || "",
            make: form?.vehicle?.vehicleId?.make || form?.vehicle?.make || "",
            model: form?.vehicle?.vehicleId?.model || form?.vehicle?.model || "",
            year: form?.vehicle?.vehicleId?.year || form?.vehicle?.year || "",
            color: form?.vehicle?.vehicleId?.color || form?.vehicle?.color || "",
            plate: form?.vehicle?.vehicleId?.plate || form?.vehicle?.plate || "",
            vin: form?.vehicle?.vehicleId?.vin || form?.vehicle?.vin || "",
            currentMileage: form?.vehicle?.currentMileage || "",
            towedFrom: form?.storageDetails?.pickupLocation || "",
            startDateTime: form?.storageDetails?.startDateTime || "",
            storageAddressConfirmed: false,
            storageType: form?.storageDetails?.storageLocation || "",
            consentPersonName: form?.consentBy?.name || "",
            consentAddress: form?.consentBy?.address || "",
            consentPhone: form?.consentBy?.phone || "",
            policeDirected: form?.policeDirected?.isDirected || false,
            incidentNumber: form?.policeDirected?.incidentNumber || "",
            officerNameBadge: `${form?.policeDirected?.officerName || ""} ${form?.policeDirected?.badgeNumber || ""}`,
            consentDateTime: consentDT ? `${consentDT.toISOString().split('T')[0]} ${consentDT.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}` : form?.consentDateTime || "",
            consentMethod: form?.consentMethod || "",
            informedOfRights: form?.informedOfRights || false,
            rateSheetShown: form?.rateSheetShown || false,
            consentSignature: form?.storageDetails?.digitalSignature || "",
            driverSignature: "",
            startDate: startDateTimeObj ? startDateTimeObj.toISOString().split('T')[0] : "",
            startTime: startDateTimeObj ? startDateTimeObj.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : "",
            endDate: "",
            endTime: "",
            rightsInformed: form?.informedOfRights || false,
          };
        }

        console.log("🧩 Formatted Data Ready for PDF:", formattedData);
        setFormData(formattedData);
      } catch (err) {
        console.error("❌ Error fetching form data:", err);
      }
    };

    if (id) fetchFormData();
  }, [id]);

  useEffect(() => {
    const generatePDF = async () => {
      if (!formData || !formType) return;

      try {
        await new Promise((r) => setTimeout(r, 800)); // wait for layout
        const element = pdfRef.current;
        if (!element) {
          console.error("❌ PDF container not found");
          return;
        }

        element.style.position = "absolute";
        element.style.left = "0px";
        element.style.top = "0";
        element.style.backgroundColor = "#ffffff";
        element.style.width = formType === "tow" ? "1070px" : "1300px";

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
          `${formType === "tow" ? "Tow_Form" : "Storage_Form"}_${id}.pdf`
        );
      } catch (err) {
        console.error("❌ PDF generation failed:", err);
      } finally {
        if (onComplete) onComplete();
      }
    };

    generatePDF();
  }, [formData, formType, id, onComplete]);

  return (
    <div
      ref={pdfRef}
      style={{
        position: "absolute",
        left: "0px",
        top: "0",
        backgroundColor: "#ffffff",
        width: formType === "tow" ? "1000px" : "1300px",
        zIndex: "-1",
      }}
    >
      {formData &&
        (formType === "storage" ? (
          <StoragePdf data={formData} />
        ) : (
          <TowPdf data={formData} />
        ))}
    </div>
  );
};

export default DownloadPdf;
