import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction.js";
import Message from "../components/Message.js";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader.js";
import Pagenate from "../components/Pagenate.js";
import { Button, Table, Row, Col } from "react-bootstrap";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productAction.js";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListscreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error, products, loading, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    error: errorDelete,
    success: successDelete,
    loading: loadingDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successCreate,
    createdProduct,
    successDelete,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button onClick={createProductHandler} className="my-3">
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader></Loader>}
      {errorCreate && (
        <Message variant="danger" message={errorDelete}></Message>
      )}
      {loadingDelete && <Loader></Loader>}
      {errorDelete && (
        <Message variant="danger" message={errorDelete}></Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" message={error}></Message>
      ) : (
        <>
          <Table className="table-sm" striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button className="btn-sm" variant="light">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagenate page={page} pages={pages} isAdmin={true}></Pagenate>
        </>
      )}
    </>
  );
};

export default ProductListscreen;
