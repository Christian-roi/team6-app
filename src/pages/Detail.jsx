import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../elements/Button";
import Input from "../elements/Input";
import Text from "../elements/Text";
import Wrapper from "../elements/Wrapper";
import flex from "../lib/flex";
import Layout from "../components/Layout";
import { clearBook } from "../redux/modules/bookSlices";
import { __addBook, __getBookId } from "../redux/modules/bookSlices";
import Comments from "../components/Comments";

const Detail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const books = useSelector((state) => state.books);
  
    useEffect(() => {
        dispatch(__getBookId(id));
    }, [dispatch, id]);


    return (
      <Layout>
        <StContainer>
          <div>Detail</div>
        </StContainer>
        <StMain>
          <Wrapper mg="10px 0">
            <Text size="35">Title: </Text>
          </Wrapper>
          <Text size="24">{books.books.title}</Text>
          <Wrapper mg="10px 0">
            <Text size="35">Author: </Text>
          </Wrapper>
          <Text size="24">{books.books.author}</Text>
          <Wrapper mg="10px 0">
            <Text size="35">Synopsis: </Text>
          </Wrapper>
          <Text size="24">{books.books.synopsis}</Text>
        </StMain>
        <Button size="medium" color="red" onClick={() => navigate("/")}>
          Back
        </Button>
        <Comments />
      </Layout>
    );
}

export default Detail;

const StContainer = styled.div`
  border: 1px solid #000;
  background-color: #eaeaea;
  font-size: 1.5rem;
  text-align: center;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin-top: 30px;
  margin-bottom: 24px;
  border-radius: 10px;
`;

const StMain = styled.div`
  width: 100%;
`;