import { UserTable } from "@/widgets/admin-panel";
import { Button } from "antd";

export const UsersPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end">
        <Button className="w-20" type="primary" variant="outlined">
          Add user
        </Button>
      </div>

      <UserTable />
    </div>
  );
};
