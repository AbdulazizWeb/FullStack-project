import type { ReportType } from "@/entities/reports/model/types";
import type { TableProps } from "antd";

export const columns: TableProps<ReportType>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Period",
    dataIndex: "period",
    key: "period",
  },

  {
    title: "Total",
    dataIndex: "total",
    key: "total",
  },
  {
    title: "Created at",
    dataIndex: "generatedAt",
    key: "generatedAt",
  },
];
