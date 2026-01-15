/* eslint-disable react-hooks/immutability */
import { message } from "antd";

// eslint-disable-next-line react-refresh/only-export-components
export const messageApi = message;

export const MessageProvider = () => {
  const [api, contextHolder] = message.useMessage();

  messageApi.open = api.open;
  messageApi.success = api.success;
  messageApi.error = api.error;
  messageApi.warning = api.warning;

  return <>{contextHolder}</>;
};
