import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Input, Tooltip, Button, Form, message } from "antd";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../../redux/auth/thunks";
const { Item } = Form;
const { Password } = Input;
export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Traemo el estado de autentificacion para hacer las consultas
  const { status } = useSelector((state) => state.auth);
  //Funciones para Loguear
  //Email and password SignIn
  const onFinish = (values) => {
    dispatch(startLoginWithEmailPassword(values));
    //Activando este console.log podras ver es status y los datos con los que se ha querido loguear el usuario
    //console.log("Success:", values, status);
  };
  const onFinishFailed = (errorInfo) => {
    //No pudo hacer Login el usuario, aqui vemos la info del error
    //console.log("Failed:", errorInfo);
  };
  //Google signIn
  const onGoogleSignIn = () => {
    //console.log("onGoogleSignIn");
    dispatch(startGoogleSignIn());
  };
  //Navigation
  const goToRegister = () => {
    navigate("/register");
  };
  const goToRecovery = () => {
    navigate("/recovery");
  };
  useEffect(() => {
    if (status === "authenticated") {
      navigate("/profile");
    }
  }, [status]);

  return (
    <Form
    className="formLogin"
      name="basic"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Item
        name="email"
        wrapperCol={{
          offset: 8,
          span: 8,
        }}
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
          { type: "email", warningOnly: true },
        ]}
      >
        <Input
          placeholder="Enter your email"
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="You must enter the user email you registered with">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />
      </Item>
      <Item
        name="password"
        wrapperCol={{
          offset: 8,
          span: 8,
        }}
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          { type: "string", min: 6 },
        ]}
      >
        <Password
          placeholder="Input password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Item>

      <Item
        wrapperCol={{
          offset: 8,
          span: 8,
        }}
      >
        <div className="formButtons">
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <Button style={{ marginLeft: "12px" }} onClick={onGoogleSignIn}>
            Login with Google
          </Button>
        </div>
      </Item>
      <Item
        wrapperCol={{
          offset: 8,
          span: 8,
        }}
      >
        <Button type="text" onClick={goToRegister}>
          Still don't have an account?
        </Button>
      </Item>
      <Item
        wrapperCol={{
          offset: 8,
          span: 8,
        }}
      >
        <Button type="text" onClick={goToRecovery}>
          I forgot my password
        </Button>
      </Item>
    </Form>
  );
};
