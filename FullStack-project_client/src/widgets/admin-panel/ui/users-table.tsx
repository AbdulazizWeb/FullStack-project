import { Table } from "antd";
import { columns } from "./user-columns";
import type { UserType } from "@/entities/user/model/types";
import { useGetAllUsersQuery } from "@/entities/user/api/user.api";

export const UserTable = () => {
  const { data } = useGetAllUsersQuery();
  console.log(data);

  return (
    <Table<UserType>
      columns={columns}
      dataSource={Array.isArray(data) ? data : []}
    />
  );
};
