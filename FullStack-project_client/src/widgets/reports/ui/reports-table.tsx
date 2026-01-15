import { columns } from "./reports-column";
import { Table } from "antd";
import { useGetAllReportsQuery } from "@/entities/reports/api/reports.api";
import type { ReportType } from "@/entities/reports/model/types";

export const ReportsTable = () => {
  const { data, isLoading } = useGetAllReportsQuery();
  console.log(data);

  return (
    <Table<ReportType>
      columns={columns}
      dataSource={Array.isArray(data) ? data : []}
      scroll={{ x: 1200 }}
      loading={isLoading}
    />
  );
};
