import React, { useState, useEffect } from "react";
import InvoicePage from "./components/InvoicePage";
import { InvoiceSchema } from "./utils/validationSchema";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const savedInvoice = window.localStorage.getItem("invoiceData");
    if (savedInvoice) {
      try {
        const parsedInvoice = JSON.parse(savedInvoice);
        InvoiceSchema.validate(parsedInvoice)
          .then((validInvoice) => {
            setData(validInvoice); // Set valid data to state
          })
          .catch((error) => {
            console.error("Invalid invoice data:", error);
          });
      } catch (error) {
        console.error("Error parsing invoice from localStorage:", error);
      }
    }
  }, []);

  const onInvoiceUpdated = (invoice) => {
    InvoiceSchema.validate(invoice)
      .then((validInvoice) => {
        setData(validInvoice); // Update state with valid data
        window.localStorage.setItem(
          "invoiceData",
          JSON.stringify(validInvoice)
        ); // Save to localStorage
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  return (
    <div className="app">
      <h2 className="center">Touchmedia Ads Powered Invoice Generator</h2>
      <InvoicePage data={data} onChange={onInvoiceUpdated} />
    </div>
  );
};

export default App;
