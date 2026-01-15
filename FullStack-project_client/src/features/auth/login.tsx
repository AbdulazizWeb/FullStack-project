import { useLoginMutation } from "@/entities/auth/api/auth.api";
import { loginSuccess } from "@/entities/auth/model/auth.slice";
import { messageApi } from "@/shared/ui/message-provider";
import { Button, Card, Form, Input } from "antd";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

type FieldType = { email: string; password: string };

export const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldType>();

  const [loginUser, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldType> = async (data) => {
    try {
      const token = await loginUser(data).unwrap();
      console.log(token);
      dispatch(loginSuccess(token));

      messageApi.open({
        type: "success",
        content: "Login successful!",
      });
      navigate("/", { replace: true });
    } catch {
      messageApi.error("Error");
    }
  };

  return (
    <Card
      className="px-10 min-w-80 w-120  shadow-lg shadow-[#c1c1c1]"
      title="Log in"
    >
      <Form
        style={{ maxWidth: 600 }}
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
      >
        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => <Input size="large" {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field }) => <Input.Password size="large" {...field} />}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          className="w-full mt-8"
          loading={isLoading}
          size="large"
        >
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </Form>
    </Card>
  );
};
