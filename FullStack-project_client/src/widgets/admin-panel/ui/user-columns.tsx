import type { UserType } from "@/entities/user/model/types";
import { Flex, Tag } from "antd";
import type { TableProps } from "antd";
import { ActionButtons } from "./action-buttons";

export const columns = (
  setIsModalOpen: (open: boolean) => void,
  setMode: (mode: "create" | "edit") => void,
  setSelectedUser: (selectedUser: UserType) => void
): TableProps<UserType>["columns"] => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text.slice(0, 8)}</a>,
    width: 100,
    fixed: "left",
  },
  {
    title: "First name",
    dataIndex: "firstName",
    key: "firstName",
    width: 250,
  },
  {
    title: "Last name",
    dataIndex: "lastName",
    key: "lastName",
    width: 250,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 250,
  },
  {
    title: "Roles",
    key: "roleIds",
    dataIndex: "roleIds",
    render: (_, { roles }) => (
      <Flex gap="small" align="center" wrap>
        {roles.map((role) => {
          const color = "green";

          return (
            <Tag color={color} key={role.id}>
              {role.name.toUpperCase()}
            </Tag>
          );
        })}
      </Flex>
    ),
    width: 300,
  },
  {
    title: "Action",
    key: "action",
    render: (_, user) => (
      <ActionButtons
        setIsModalOpen={setIsModalOpen}
        user={user}
        setMode={setMode}
        setSelectedUser={setSelectedUser}
      />
    ),
    width: 220,
    fixed: "right",
  },
];
