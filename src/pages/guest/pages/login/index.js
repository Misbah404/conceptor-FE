import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";
import axios from "axios";

import * as UserProfileActions from "../../../../store/actions/user";

import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Card, Input, Button, Divider, Alert } from "antd";
import MainLayout from "./components/layout";

import AppleIcon from "../../../../assets/svgs/apple";
import GoogleIcon from "../../../../assets/svgs/google";

import { role, token_leads, token_user } from "../../../../helpers/auth";

const LoginPage = () => {
  const { http } = global.services;

  const [form, setForm] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const [errors, setErrors] = useState({});

  if (role === "leads" && token_leads) {
    window.location.href = "/leads";
  } else if (role === "user" && token_user) {
    window.location.href = "/home";
  }

  const onLogin = async () => {
    let error = "";
    try {
      let formData = form;
      let emailValidation =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (emailValidation.test(form.username)) {
        formData = {
          // username: form.username,
          email: form.username,
          password: form.password,
        };
      }
        let { data } = await http.post("login", formData);

      Cookie.set("role", "leads");
      Cookie.set("token_leads", data.token);
      Cookie.set("is_logged_once", JSON.stringify(data.is_logged_once));
      if (data.is_logged_once === 0) {
        window.location.href = "/set-password";
      } else {
        window.location.href = "/leads";
      }
    } catch (err) {
      const { data, status } = err.response;
      if (status === 400) {
        error = { message: data.non_field_errors };
      }
    }

    setErrors(error || {});
  };

  const change = (props) => (e) => {
    let data = { ...form };
    data[props] = e.target.value;
    setForm(data);
  };

  return (
    <React.Fragment>
      <MainLayout>
        <div className="flex justify-center items-center">
          <Card bordered={false}>
            <div className="flex-column items-center" style={{ padding: 40 }}>
              <strong>
                <h1 style={{ fontSize: 25 }}>Login</h1>
              </strong>
              {errors.message && (
                <>
                  <Alert message={errors.message[0]} type="error" />
                  <br />
                </>
              )}
              {/* <p>Log In with one of following options</p>
                            <Button
                                type="primary"
                                block
                                style={{
                                    color: '#000',
                                    borderColor: '#605BFF',
                                    backgroundColor: '#fff',
                                    borderRadius: 8
                                }}
                                icon={<GoogleIcon />}
                            >
                                Login In with Google
                            </Button>
                            <br />
                            <Button
                                type="primary"
                                block
                                style={{
                                    color: '#000',
                                    borderColor: '#605BFF',
                                    backgroundColor: '#fff',
                                    borderRadius: 8
                                }}
                                icon={<AppleIcon />}
                            >
                                Login In with Apple
                            </Button>
                            <Divider plain>or</Divider> */}
              <div className="flex flex-column flex-grow">
                <p style={{ opacity: 0.7 }}>
                  Enter your credentials to acces your account.
                </p>
                <div>
                  <span style={{ display: "block" }}>
                    Email Address / Username
                  </span>
                  <Input
                    value={form.username}
                    className="inputs"
                    placeholder=""
                    onChange={change("username")}
                  />
                </div>
                <br />
                <div>
                  <div className="flex justify-between">
                    <span>Password</span>
                    <Link to="/forgot-password" style={{ color: "#605BFF" }}>
                      Forgot Password?
                    </Link>
                  </div>
                  <Input.Group compact>
                    <Input
                      value={form.password}
                      type={form.showPassword ? "text" : "password"}
                      className="inputs"
                      onChange={change("password")}
                      suffix={
                        form.showPassword ? (
                          <EyeInvisibleOutlined
                            onClick={() =>
                              setForm({ ...form, showPassword: false })
                            }
                          />
                        ) : (
                          <EyeOutlined
                            onClick={() =>
                              setForm({ ...form, showPassword: true })
                            }
                          />
                        )
                      }
                    />
                  </Input.Group>
                </div>
                <br />
                <br />
                <Button
                  type="primary"
                  block
                  style={{
                    color: "#fff",
                    borderColor: "#605BFF",
                    backgroundColor: "#605BFF",
                    borderRadius: 8,
                  }}
                  onClick={onLogin}
                >
                  Login
                </Button>
                {/* <br />
                                <div className='text-center'>
                                    Not a member? <Link to="/signup" style={{ color: '#605BFF' }}>Sign up</Link>
                                </div> */}
              </div>
            </div>
          </Card>
        </div>
      </MainLayout>
    </React.Fragment>
  );
};

export default LoginPage;
