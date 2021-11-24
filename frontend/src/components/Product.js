import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded " style={{ height: "90%" }}>
      <Link
        to={`/product/${product._id}`}
        style={{ height: "220px", width: "220px" }}
      >
        <Card.Img
          src={product.image}
          variant="top"
          style={{ maxHeight: "100%", margin: "0 auto" }}
        ></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" style={{ height: "60px" }}>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} review`}
          ></Rating>
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
