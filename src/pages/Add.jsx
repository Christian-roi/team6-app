import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../elements/Button";
import Input from "../elements/Input";
import Text from "../elements/Text";
import Wrapper from "../elements/Wrapper";
import flex from "../lib/flex";
import Layout from "../components/Layout";
import { clearBook } from "../redux/modules/bookSlices";
import { __addBook } from "../redux/modules/bookSlices";

function Add() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSuccess = useSelector((state) => state.books.isSuccess);

  const [book, setBook] = useState({
    id: 0,
    title: "",
    author: "",
    synopsis: "",
    isDone: false,
    isDeleted: false,
  });

 useEffect(() => {
   if (!isSuccess) return;
   if (isSuccess) navigate("/");

   return () => dispatch(clearBook());
 }, [dispatch, isSuccess, navigate]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  return (
    <Layout>
      <StContainer>
        <div>Add Book</div>
      </StContainer>
      <StForm
        onSubmit={(event) => {
          event.preventDefault();
          if (book.title === "" || book.author === "" || book.synopsis === "") {
            alert("Please fill all the fields");
            return;
          }
          dispatch(__addBook(book));
          setBook({
            title: "",
            author: "",
            synopsis: "",
          });
        }}
      >
        <StMain>
          <Wrapper mg="10px 0">
            <Text size="24">Title</Text>
          </Wrapper>
          <Input type="text" name="title" value={book.title} onChange={onChangeHandler} />
          <Wrapper mg="10px 0">
            <Text size="24">Author</Text>
          </Wrapper>
          <Input type="text" name="author" value={book.author} onChange={onChangeHandler} />
          <Wrapper mg="10px 0">
            <Text size="24">Synopsis</Text>
          </Wrapper>
          <Textarea name="synopsis" rows="10" value={book.synopsis} onChange={onChangeHandler} />
        </StMain>
        <Button size="medium" color="teal">
          Add
        </Button>
      </StForm>
        <Button size="medium" color="red" onClick={() => navigate("/")}>
          Back
        </Button>
    </Layout>
  );
}

export default Add;

const StForm = styled.form`
  width: 100%;
  height: 100%;
  ${flex({
    direction: "column",
    align: "start",
    jusify: "space-between",
  })}
`;

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

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid #eee;
  padding: 12px;
  font-size: 14px;
`;

const StMain = styled.div`
  width: 100%;
`;
