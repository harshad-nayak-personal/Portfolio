export interface Holding {
  id: number;
  symbol: string;
  quantity: number;
  ltp: number;
  avgPrice: number;
  close: number;
}

export interface HoldingWithComputedValues extends Holding {
  currentValue: number;
  investmentValue: number;
  pnl: number;
}
