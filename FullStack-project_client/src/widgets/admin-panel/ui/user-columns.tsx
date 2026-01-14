import type { UserType } from "@/entities/user/model/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Flex, Space, Tag } from "antd";
import type { TableProps } from "antd";

export const columns: TableProps<UserType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Roles",
    key: "roles",
    dataIndex: "roles",
    render: (_, { roles }) => (
      <Flex gap="small" align="center" wrap>
        {roles.map((role) => {
          const color = "green";
          //   if (role === "loser") {
          //     color = "volcano";
          //   }
          return (
            <Tag color={color} key={role.id}>
              {role.name.toUpperCase()}
            </Tag>
          );
        })}
      </Flex>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>
          <EditOutlined />
        </a>
        <a>
          <DeleteOutlined />
        </a>
      </Space>
    ),
  },
];
