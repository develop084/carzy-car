import React from "react";
import { Row, Col, Form, Input, Button, Card } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import AOS from "aos";
import Spinner from "../components/Spinner";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();
function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  function onFinish(values) {
    dispatch(userLogin(values));
    console.log(values);
  }

  return (
    <div className="login">
      {loading && <Spinner />}
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img
            className="w-100"
            data-aos="slide-right"
            data-aos-duration="1500"
            width="600"
            height="550"
            src="https://svgshare.com/i/g9N.svg"
          />
        </Col>
        <Col lg={8} className="text-left ">
          <Card hoverable="true" style={{ width: 350 }}>
            <Form
              layout="vertical"
              className="login-form p-2"
              onFinish={onFinish}
            >
              <h1>Login</h1>
              <hr />
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true }]}
              >
                <Input type="string" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input type="password" />
              </Form.Item>

              {/* <button type="primary" className="btn1 mt-2"> */}
              <Button type="primary" htmlType="submit">
                {" "}
                Login
              </Button>

              {/* </button> */}

              <hr />

              <Link className="register" to="/register">
                Click Here to Register
              </Link>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
