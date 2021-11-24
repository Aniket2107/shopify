import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeybord] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        name="q"
        type="text"
        placeholder="Search Products"
        className="mr-sm-2 ml-sm-5"
        onChange={(e) => setKeybord(e.target.value)}
      ></Form.Control>
      <Button type="submit" className="p-2" variant="outline-success">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
