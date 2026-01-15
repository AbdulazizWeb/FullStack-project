import { ReportsTable } from "@/widgets/reports/ui/reports-table";
import { Button } from "antd";

export const ReportsPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end">
        <Button type="primary" variant="outlined" disabled>
          Add report
        </Button>
      </div>

      <ReportsTable />
    </div>
  );
};
