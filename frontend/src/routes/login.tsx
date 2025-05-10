import { App, Button, Card, Form, Input } from "antd";
import { useUser } from "../providers/user-provider";
import { useRequest } from "ahooks";
import { Link, useNavigate } from "react-router";
import { login } from "../api/user/auth";
import phoneNumberRegex from "../consts/phone-num-regex";

export default function LogInPage() {
  const { message } = App.useApp();
  const { refresh } = useUser();
  const navigate = useNavigate();
  const { run, loading } = useRequest(login, {
    manual: true,
    onSuccess: () => {
      message.success("Амжилттай нэвтэрлээ!");
      refresh();
      navigate("/");
    },
    onError: () => {
      message.error("Утасны дугаар эсвэл нууц үг буруу байна!");
    },
  });

  return (
    <div className="flex-grow flex items-center justify-center w-full">
      <Card className="max-w-[400px] w-full">
        <h1 className="text-3xl font-bold mb-2">Нэвтрэх</h1>
        <div className="flex gap-2 items-center">
          <span>Бүртгэл байхгүй?</span>
          <Button
            onClick={() => navigate("/register")}
            type="link"
            size="small"
          >
            Бүртгүүлэх
          </Button>
        </div>
        <Form
          className="mt-8"
          layout="vertical"
          onFinish={run}
          disabled={loading}
        >
          <Form.Item
            label="Утасны дугаар"
            name="number"
            required
            rules={[
              {
                pattern: phoneNumberRegex,
                message: "Утасны дугаар буруу байна!",
              },
            ]}
          >
            <Input placeholder="+976 0000 0000" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            required
            rules={[
              {
                min: 8,
                message: "Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой!",
              },
            ]}
          >
            <Input.Password placeholder="..." visibilityToggle />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Нэвтрэх
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
