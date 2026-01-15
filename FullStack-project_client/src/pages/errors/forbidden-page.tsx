import { Button, Result } from "antd";
import { useNavigate } from "react-router";

export const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen flex items-center justify-center p-4 bg-white">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not permission to access this page."
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
