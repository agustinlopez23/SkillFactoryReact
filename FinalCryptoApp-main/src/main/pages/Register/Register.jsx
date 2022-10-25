import { Button, Form, Input, Row, Col } from "antd";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { startCreatingUserWithEmail } from "../../../redux/auth/thunks";

const formData = {
  email: "",
  password: "",
  displayName: "",
};
const { Item } = Form;
export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Register submit
  const onFinish = (values) => {
    // console.log("Success:", values);

    dispatch(startCreatingUserWithEmail(values));
  };
  //Register Fail
  const onFinishFailed = (errorInfo) => {
    //console.log("Failed:", errorInfo);
    //console.log(formData);
  };
  //Navigation
  const backToLogin = () => {
    navigate("/login");
  };
  return (
    <Row justify="center">
      <Col span={16}>
        <Form
        className="formLogin"
          wrapperCol={{
            span: 24,
          }}
          scrollToFirstError
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Item
            label="Username"
            name="Username"
            labelCol={{ span: 4 }}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              { type: "string", min: 6 },
            ]}
          >
            <Input />
          </Item>
          <Item
            label="Email"
            name="Email"
            labelCol={{ span: 4 }}
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
            label="Password"
            name="Password"
            labelCol={{ span: 4 }}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              { type: "string", min: 6 },
            ]}
          >
            <Input.Password />
          </Item>

          <Item wrapperCol={{ offset: 12 }}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Item>
          <Item wrapperCol={{ offset: 12 }}>
            <Button type="text" onClick={backToLogin}>
              Go Login
            </Button>
          </Item>
        </Form>
      </Col>
    </Row>
  );
};
