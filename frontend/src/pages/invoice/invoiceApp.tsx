import React from "react";
import "./invoice.css";
import { Invoice } from "../../data/invoice/types";
import InvoicePage from "./components/InvoicePage";

export default function InvoiceApp() {
  const savedInvoice = window.localStorage.getItem("invoiceData");
  let data = null;

  try {
    if (savedInvoice) {
      data = JSON.parse(savedInvoice);
    }
  } catch (_e) {}

  const onInvoiceUpdated = (invoice: Invoice) => {
    //window.localStorage.setItem('invoiceData', JSON.stringify(invoice))
  };
  return (
    <div className="app">
      <h1 className="center fs-30">Invoice Generator</h1>
      <InvoicePage data={data} onChange={onInvoiceUpdated} />
    </div>
  );
}
