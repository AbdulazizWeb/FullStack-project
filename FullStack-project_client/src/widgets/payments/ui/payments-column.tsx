import type { PaymentType } from "@/entities/payments/model/types";
import { Flex, Tag } from "antd";
import type { TableProps } from "antd";

export const columns: TableProps<PaymentType>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text.slice(0, 8)}</a>,
    width: 100,
    fixed: "left",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width: 250,
  },
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
    width: 250,
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (_, { status, id }) => (
      <Flex gap="small" align="center" wrap>
        <Tag color={"blue"} key={id}>
          {status.toUpperCase()}
        </Tag>
      </Flex>
    ),
    width: 250,
  },
];
