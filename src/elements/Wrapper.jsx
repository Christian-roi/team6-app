import React from "react";
import styled from "styled-components";

const Wrapper = (props) => {
  return <StContainer {...props}>{props.children}</StContainer>;
};

export default Wrapper;

const StContainer = styled.div`
  width: 100%;
  padding: ${({ pd }) => pd};
  margin: ${({ mg }) => mg};
`;
