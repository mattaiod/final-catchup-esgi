import mongoose, { Schema } from 'mongoose';

type StatusStockOnShelf = {
  aisle: string;
  employee: string;
  dateTime: Date;
}

type StatusStockDestroyed = {
  dateTime: Date;
  reason: string;
}

enum PriceUnits {
  PIECE = 'Piece',
  KILOGRAM = 'Kilogram',
  LITER = 'Liter',
  OTHER = 'Other',
}

type StatusStockInStock = {
  nameCompany: string
  truckType: string
  licensePlate: string
  purchasePrice: number
  sellingPrice: number
  sellingPriceExcludingTax: number
  priceUnit: PriceUnits
  dateTime: Date
}

// pour connaitre l'entiereté de la livraison il faudra voir tous les stocks qui ont la meme statusStockInStock.dateTime et licensePlate.dateTime
const StockSchema = new mongoose.Schema({
  idProduct: { type: String, required: true },
  orderNum: { type: String, required: true }, 
  quantity: { type: Number, required: true },
  expirationDate: { type: Date,default: null },
  statusStockInStock: { type: {
    nameCompany: String,
    truckType: String,
    licensePlate: String,
    purchasePrice: Number,
    sellingPrice: Number,
    sellingPriceExcludingTax: Number,
    priceUnit: String,
    dateTime: Date,
  }, default: null },
  statusStockOnShelf: { type: {
    aisle: String,
    employee: String,
    dateTime: Date,
  } , default: null },
  statusStockDestroyed: { type: {
    dateTime: Date,
    reason: String,
  }, default: null },
});

export const Stock = mongoose.model('Stock', StockSchema);