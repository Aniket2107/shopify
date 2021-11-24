import React from "react";
import { Helmet } from "react-helmet";
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords}></meta>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to Shopify",
  description: "We sell the best porduct for cheap",
  keywords: "electronics , buy electroncs , cheap electronics",
};

export default Meta;
