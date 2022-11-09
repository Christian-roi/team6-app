import React from "react";
import styled, { css } from "styled-components";
import flex from "../lib/flex";

const Button = (props) => {
  return (
    <StButton {...props} disabled={props.disabled} title={props.title}>
      {props.children}
    </StButton>
  );
};

export default Button;

const StButton = styled.button`
  ${flex({})};
  border: 1px solid #eee;
  background-color: #fff;
  height: 46px;
  border-radius: 8px;
  background-color: ${({ bgColor, disabled }) => (disabled ? "#ddd" : bgColor)};
  cursor: pointer;

  ${({ size }) => {
    switch (size) {
      case "large":
        return css`
          width: 100%;
        `;
      case "medium":
        return css`
          width: 80px;
        `;
      case "small":
        return css`
          width: 30px;
          height: 30px !important;
        `;
      default:
        return css`
          width: 120px;
        `;
    }
  }}

  ${({ color }) => {
    switch(color){
      case "teal":
        return css`
          background-color: teal;
          color: #ddd;
        `;
      case "red":
        return css`
          background-color: red;
          color: #fff;
        `;
      case "gray":
        return css`
          background-color: gray;
          color: #ddd;
        `;
      default:
        return css`
          background-color: #fff;
          color: #000;
        `;
    }

  }}
`;
