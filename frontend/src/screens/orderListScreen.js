import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderActions.js";
import Message from "../components/Message.js";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader.js";
import { Button, Table } from "react-bootstrap";
import { listUser, deleteUser } from "../actions/userAction.js";

const OrderListscreen = ({ history }) => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { error, orders, loading } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" message={error}></Message>
      ) : (
        <Table className="table-sm" striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{String(order.createdAt).substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    String(order.paidAt).substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}>
                      {" "}
                    </i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    String(order.deliveredAt).substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}>
                      {" "}
                    </i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className="btn-sm" variant="light">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListscreen;
