import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, UpdateUser } from "../actions/userAction.js";
import Message from "../components/Message.js";
import { Link } from "react-router-dom";
import Loader from "../components/Loader.js";
import FormContainer from "../components/FormContainer.js";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setisAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setisAdmin(user.isAdmin);
      }
    }
  }, [user, dispatch, history, userId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(UpdateUser({ _id: userId, name, email, isAdmin }));
  };
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader></Loader>}
        {errorUpdate && (
          <Message variant="danger" message={errorUpdate}></Message>
        )}
        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message variant="danger" message={error}></Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId={name}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Name"
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId={email}>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                placeholder="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Check
                label="Is Admin"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setisAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
