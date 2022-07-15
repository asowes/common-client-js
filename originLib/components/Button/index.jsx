import React from "react";
import styled from "@emotion/styled";
import "./index.css";

const Text = styled.div`
  color: red;
`;

const Button = (props) => {
  return (
    <button className="btn-wrapper">
      <Text>test</Text>
    </button>
  );
};

export default Button;
