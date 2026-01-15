import type { ReportType } from "@/entities/reports/model/types";
import type { TableProps } from "antd";

export const columns: TableProps<ReportType>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text.slice(0, 8)}</a>,
    width: 100,
    fixed: "left",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: 250,
  },
  {
    title: "Period",
    dataIndex: "period",
    key: "period",
    width: 250,
  },

  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    width: 250,
  },
  {
    title: "Created at",
    dataIndex: "generatedAt",
    key: "generatedAt",
    width: 250,
  },
];
