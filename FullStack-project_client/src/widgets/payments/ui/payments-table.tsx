import { useGetAllPaymentsQuery } from "@/entities/payments/api/payments.api";
import { columns } from "./payments-column";
import type { PaymentType } from "@/entities/payments/model/types";
import { Table } from "antd";

export const PaymentsTable = () => {
  const { data, isLoading } = useGetAllPaymentsQuery();
  console.log(data);

  return (
    <Table<PaymentType>
      columns={columns}
      dataSource={Array.isArray(data) ? data : []}
      loading={isLoading}
      scroll={{ x: 1200 }}
    />
  );
};
