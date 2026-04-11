export type OrderStatus = "pending" | "reviewed" | "contacted";

export interface OrderRecord {
  id?: string;
  orderNumber: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  patientType: "diabetic" | "post-surgery" | "other";
  notes?: string;
  status: OrderStatus;
  createdAt: string;
}
