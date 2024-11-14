import * as Yup from "yup";

// Define ProductLine schema
export const ProductLineSchema = Yup.object({
  description: Yup.string(),
  quantity: Yup.string(),
  rate: Yup.string(),
});

// Define Invoice schema
export const InvoiceSchema = Yup.object({
  logo: Yup.string(),
  logoWidth: Yup.number(),
  title: Yup.string(),
  companyName: Yup.string(),
  name: Yup.string(),
  companyAddress: Yup.string(),
  companyAddress2: Yup.string(),
  companyCountry: Yup.string(),
  billTo: Yup.string(),
  clientName: Yup.string(),
  clientAddress: Yup.string(),
  clientAddress2: Yup.string(),
  clientCountry: Yup.string(),
  invoiceTitleLabel: Yup.string(),
  invoiceTitle: Yup.string(),
  invoiceDateLabel: Yup.string(),
  invoiceDate: Yup.string(),
  invoiceDueDateLabel: Yup.string(),
  invoiceDueDate: Yup.string(),
  productLineDescription: Yup.string(),
  productLineQuantity: Yup.string(),
  productLineQuantityRate: Yup.string(),
  productLineQuantityAmount: Yup.string(),
  productLines: Yup.array().of(ProductLineSchema),
  subTotalLabel: Yup.string(),
  taxLabel: Yup.string(),
  totalLabel: Yup.string(),
  currency: Yup.string(),
  notesLabel: Yup.string(),
  notes: Yup.string(),
  termLabel: Yup.string(),
  term: Yup.string(),
});
