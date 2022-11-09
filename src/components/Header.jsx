import React from "react";
import styled from "styled-components";


const Header = () => {
  return (
    <StContainer>
      <div>My Booklist</div>
    </StContainer>
  );
};
export default Header;

const StContainer = styled.div`
  border: 1px solid #000;
  background-color: #EAEAEA;
  font-size: 1.5rem;
  text-align: center;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin-top: 20px;
  margin-bottom: 24px;
  border-radius: 10px;
`;
