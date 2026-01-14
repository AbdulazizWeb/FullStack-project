import { useGetAllPaymentsQuery } from "@/entities/payments/api/payments.api";
import { columns } from "./payments-column";
import type { PaymentType } from "@/entities/payments/model/types";
import { Table } from "antd";

export const PaymentsTable = () => {
  const { data } = useGetAllPaymentsQuery();
  console.log(data);

  return (
    <Table<PaymentType>
      columns={columns}
      dataSource={Array.isArray(data) ? data : []}
    />
  );
};
