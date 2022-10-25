import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

import { useDispatch } from "react-redux";
import { startRecovery } from "../../../redux/auth/thunks";
const { Item } = Form;
export const Recovery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    dispatch(startRecovery(values));
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const goLogin = () => {
    navigate("/login");
  };
  return (
    <Form

    className="formLogin"
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Item
        label="Email"
        name="Email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
          { type: "email", warningOnly: true },
        ]}
      >
        <Input />
      </Item>

      <Item
        wrapperCol={{
          offset: 12,
          span: 12,
        }}
      >
        <Button type="primary" htmlType="submit">
          Recover
        </Button>
      </Item>
      <Item
        wrapperCol={{
          offset: 12,
          span: 12,
        }}
      >
        <Button type="text" onClick={goLogin}>
          Login
        </Button>
      </Item>
    </Form>
  );
};
