import type { UserType } from "@/entities/user/model/types";
import { UserTable } from "@/widgets/admin-panel";
import { UserModal } from "@/widgets/admin-panel/ui/user-modal";
import { UserAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

export const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end">
        <Button
          type="primary"
          variant="outlined"
          onClick={() => {
            setIsModalOpen(true);
            setMode("create");
          }}
        >
          <UserAddOutlined />
          Add user
        </Button>
      </div>

      <UserTable
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setMode={setMode}
        setSelectedUser={setSelectedUser}
      />
      <UserModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        mode={mode}
        user={selectedUser}
      />
    </div>
  );
};
