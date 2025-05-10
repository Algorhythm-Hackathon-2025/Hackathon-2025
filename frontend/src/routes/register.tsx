import { App, Button, Card, Form, Input } from "antd";
import { useUser } from "../providers/user-provider";
import { useRequest } from "ahooks";
import { useNavigate } from "react-router";
import { register } from "../api/user/auth";
import phoneNumberRegex from "../consts/phone-num-regex";

export default function SignUpPage() {
  const { message } = App.useApp();
  const { refresh } = useUser();
  const navigate = useNavigate();
  const { loading, run } = useRequest(register, {
    manual: true,
    onSuccess: () => {
      message.success("Бүртгэл амжилттай үүслээ!");
      refresh();
      navigate("/");
    },
    onError: () => {
      message.error("Энэ утасны дугаар бүртгэлтэй байна!");
    },
  });

  return (
    <div className="flex-grow flex items-center justify-center w-full">
      <Card className="max-w-[400px] w-full">
        <h1 className="text-4xl font-bold mb-2">Бүртгэл үүсгэх</h1>
        <div className="flex gap-2 items-center">
          <span>Аль хэдийн бүртгүүлсэн?</span>
          <Button onClick={() => navigate("/login")} type="link" size="small">
            Нэвтрэх
          </Button>
        </div>
        <Form
          className="mt-8"
          layout="vertical"
          onFinish={run}
          disabled={loading}
        >
          <Form.Item
            label="Нэвтрэх нэр"
            name="username"
            rules={[{ required: true }]}
          >
            <Input placeholder="..." />
          </Form.Item>
          <Form.Item
            label="Утасны дугаар"
            name="number"
            rules={[
              {
                required: true,
              },
              {
                pattern: phoneNumberRegex,
                message: "Утасны дугаар буруу байна!",
              },
            ]}
          >
            <Input placeholder="+976 0000 0000" />
          </Form.Item>
          <Form.Item
            label="Нууц үг"
            name="password"
            rules={[
              {
                required: true,
              },
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
