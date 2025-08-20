import { ProductLine, Invoice } from './types'

export const initialProductLine: ProductLine = {
  description: '',
  quantity: '1',
  rate: '0',
  taxrate: '0 %'
}

export const initialInvoice: Invoice = {
  logo: '',
  logoWidth: 100,
  title: 'INVOICE',
  companyName: '',
  name: '',
  companyAddress: '',
  companyGSTIN: '',
  companyState: 'Telangana',
  billTo: 'Bill To:',
  clientName: '',
  clientAddress: '',
  clientGSTIN: '',
  clientState: 'Telangana',
  invoiceTitleLabel: 'Invoice#',
  invoiceTitle: '',
  invoiceDateLabel: 'Invoice Date',
  invoiceDate: '',
  invoiceDueDateLabel: 'Due Date',
  invoiceDueDate: '',
  productLineDescription: 'Item Description',
  productLineTaxRateLabel: 'GST',
  productLineQuantity: 'Qty',
  productLineQuantityRate: 'Rate',
  productLineQuantityAmount: 'Amount',
  productLines: [
    { ...initialProductLine },
    { ...initialProductLine },
    //{ ...initialProductLine },
   // { ...initialProductLine },
   // { ...initialProductLine },
  ],
  taxableValueLabel: 'Taxable Value',
  taxLabel: 'GST',
  totalLabel: 'Invoice Value',
  currency: 'Rs.',
  notesLabel: 'Notes',
  notes: 'It was great doing business with you.',
  termLabel: 'Terms & Conditions',
  term: 'Goods Once sold are not returnable'
}
