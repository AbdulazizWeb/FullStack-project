import { Button, Result } from "antd";
import { useNavigate } from "react-router";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen flex items-center justify-center p-4 bg-white">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={[
          <Button key="back" onClick={() => navigate(-1)}>
            Go Back
          </Button>,
          <Button key="home" type="primary" onClick={() => navigate("/")}>
            Go Home
          </Button>,
        ]}
      />
    </div>
  );
};
