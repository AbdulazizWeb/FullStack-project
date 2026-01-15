import { EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, type PopconfirmProps } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteUserMutation } from "@/entities/user/api/user.api";
import type { UserType } from "@/entities/user/model/types";
import { messageApi } from "@/shared/ui/message-provider";

type PropType = {
  setIsModalOpen: (open: boolean) => void;
  user: UserType;
  setMode: (mode: "create" | "edit") => void;
  setSelectedUser: (selectedUser: UserType) => void;
};
export const ActionButtons = ({
  setIsModalOpen,
  user,
  setMode,
  setSelectedUser,
}: PropType) => {
  const [deleteUser] = useDeleteUserMutation();

  const confirm: PopconfirmProps["onConfirm"] = async () => {
    try {
      await deleteUser(user.id).unwrap();
      messageApi.success("User deleted successfully");
    } catch {
      messageApi.error("Error");
    }
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
  };

  return (
    <Space size="middle">
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setSelectedUser(user);
          setMode("edit");
        }}
        size="small"
      >
        <EditOutlined />
        Edit
      </Button>

      <div>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger size="small">
            <DeleteOutlined />
            Delete
          </Button>
        </Popconfirm>
      </div>
    </Space>
  );
};
