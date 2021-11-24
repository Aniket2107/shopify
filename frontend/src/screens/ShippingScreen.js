import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer.js";
import ChechoutSteps from "../components/chechoutSteps.js";
import { saveShippingAddress } from "../actions/cartAction.js";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [postalCode, setpostalCode] = useState(shippingAddress.postalCode);
  const [city, setCity] = useState(shippingAddress.city);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <ChechoutSteps step1 step2></ChechoutSteps>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId={address}>
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder="Address"
            type="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId={city}>
          <Form.Label>City</Form.Label>
          <Form.Control
            placeholder="City"
            type="city"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId={postalCode}>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            placeholder="Postal Code"
            type="postalCode"
            required
            value={postalCode}
            onChange={(e) => setpostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId={country}>
          <Form.Label>Country</Form.Label>
          <Form.Control
            placeholder="Country"
            type="country"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="primary" type="submit">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
