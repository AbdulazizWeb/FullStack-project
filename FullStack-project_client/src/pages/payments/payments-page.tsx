import { PaymentsTable } from "@/widgets/payments/ui/payments-table";
import { Button } from "antd";

export const PaymentsPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end">
        <Button type="primary" variant="outlined" disabled>
          Add payment
        </Button>
      </div>

      <PaymentsTable />
    </div>
  );
};
