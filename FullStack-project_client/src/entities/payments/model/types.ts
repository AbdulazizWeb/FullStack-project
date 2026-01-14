export interface PaymentType {
  id: string;
  amount: number;
  currency: "UZS" | "USD";
  status: string;
  createdAt: string;
}

export interface PaymentResponse {
  data: PaymentType[];
}
