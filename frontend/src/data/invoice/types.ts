import { CSSProperties } from 'react'

export interface ProductLine {
  description: string
  quantity: string
  rate: string
  taxrate: string
}

export interface Invoice {
  logo: string
  logoWidth: number
  title: string
  companyName: string
  name: string
  companyAddress: string
  companyGSTIN: string
  companyState: string

  billTo: string
  clientName: string
  clientAddress: string
  clientGSTIN: string
  clientState: string

  invoiceTitleLabel: string
  invoiceTitle: string
  invoiceDateLabel: string
  invoiceDate: string
  invoiceDueDateLabel: string
  invoiceDueDate: string

  productLineDescription: string
  productLineTaxRateLabel: string
  productLineQuantity: string
  productLineQuantityRate: string
  productLineQuantityAmount: string

  productLines: ProductLine[]

  taxableValueLabel: string
  taxLabel: string

  totalLabel: string
  currency: string

  notesLabel: string
  notes: string
  termLabel: string
  term: string
}

export interface CSSClasses {
  [key: string]: CSSProperties
}
