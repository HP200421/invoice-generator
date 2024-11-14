import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoiceSchema } from "../utils/validationSchema";
import { useDebounce } from "@uidotdev/usehooks";
import InvoicePage from "./InvoicePage";
import FileSaver from "file-saver";

const Download = () => {
  const [data, setData] = useState({
    invoiceTitle: "",
    logo: "",
    logoWidth: 100,
    title: "",
    companyName: "",
    name: "",
    companyAddress: "",
    companyAddress2: "",
    companyCountry: "",
    billTo: "",
    clientName: "",
    clientAddress: "",
    clientAddress2: "",
    clientCountry: "",
    invoiceTitleLabel: "",
    invoiceDateLabel: "",
    invoiceDate: "",
    invoiceDueDateLabel: "",
    invoiceDueDate: "",
    productLineDescription: "",
    productLineQuantity: "",
    productLineQuantityRate: "",
    productLineQuantityAmount: "",
    productLines: [],
    subTotalLabel: "",
    taxLabel: "",
    totalLabel: "",
    currency: "",
    notesLabel: "",
    notes: "",
    termLabel: "",
    term: "",
  });

  const debounced = useDebounce(data, 500);

  function handleInput(e) {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    file
      .text()
      .then((str) => {
        try {
          if (!(str.startsWith("{") && str.endsWith("}"))) {
            str = atob(str); // Decode base64 if it's not JSON
          }
          const d = JSON.parse(str);
          // Validate using Yup schema
          InvoiceSchema.validateSync(d); // Will throw an error if validation fails
          console.info("parsed and validated correctly");
          setData(d); // Update the state with validated data
        } catch (e) {
          console.error("Error parsing the template:", e);
          return;
        }
      })
      .catch((err) => console.error("File reading error:", err));
  }

  function handleSaveTemplate() {
    const blob = new Blob([JSON.stringify(debounced)], {
      type: "text/plain;charset=utf-8",
    });
    FileSaver(blob, `${data.invoiceTitle.toLowerCase() || "invoice"}.template`);
  }

  const title = data.invoiceTitle ? data.invoiceTitle.toLowerCase() : "invoice";

  return (
    <div className={"download-pdf"}>
      <PDFDownloadLink
        key="pdf"
        document={<InvoicePage pdfMode={true} data={debounced} />}
        fileName={`${title}.pdf`}
        aria-label="Save PDF"
        title="Save PDF"
        className="download-pdf__pdf"
      />
      <p>Save PDF</p>

      <button
        onClick={handleSaveTemplate}
        aria-label="Save Template"
        title="Save Template"
        className="download-pdf__template_download mt-40"
      >
        Save Template
      </button>

      <label className="download-pdf__template_upload">
        <input type="file" accept=".json,.template" onChange={handleInput} />
      </label>
      <p className="text-small">Upload Template</p>
    </div>
  );
};

export default Download;
