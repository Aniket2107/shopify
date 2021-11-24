import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction.js";
import Message from "../components/Message.js";
import { Link } from "react-router-dom";
import Loader from "../components/Loader.js";
import FormContainer from "../components/FormContainer.js";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const handleGuest = (e) => {
    e.preventDefault();
    dispatch(login("guest@gmail.com", "123456"));
  };

  const handleGuestAdmin = (e) => {
    e.preventDefault();
    dispatch(login("admin@gmail.com", "123456"));
  };

  return (
    <FormContainer>
      <h1>Sing In</h1>
      {
        (console.log(error),
        error && (
          <Message variant="danger" message={error}>
            {error}
          </Message>
        ))
      }
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId={email}>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId={password}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Button className="mt-3" onClick={handleGuest}>
        GUEST Login
      </Button>

      <Button className="ml-3 mt-3" onClick={handleGuestAdmin}>
        GUESt admin Login
      </Button>

      <Row className="py-3">
        <Col>
          New Coustomer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
