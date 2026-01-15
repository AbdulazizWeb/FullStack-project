import { Table } from "antd";
import { columns } from "./user-columns";
import type { UserType } from "@/entities/user/model/types";
import { useGetAllUsersQuery } from "@/entities/user/api/user.api";

type PropType = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  setMode: (mode: "create" | "edit") => void;
  setSelectedUser: (selectedUser: UserType) => void;
};

export const UserTable = ({
  setIsModalOpen,
  setMode,
  setSelectedUser,
}: PropType) => {
  const { data, isLoading } = useGetAllUsersQuery();
  console.log(data);

  return (
    <Table<UserType>
      columns={columns(setIsModalOpen, setMode, setSelectedUser)}
      dataSource={Array.isArray(data) ? data : []}
      scroll={{ x: 1200 }}
      loading={isLoading}
    />
  );
};
