/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Text from "../elements/Text";
import Stack from "../elements/Stack";
import Card from "../components/Card";
import { __getBooks } from "../redux/modules/bookSlices";


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { books, isLoading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(__getBooks());
  }, []);

  if (isLoading) return <TextLoad>Loading...</TextLoad>;

  return (
    <Layout>
      <Header />
      <StRow>
        <StAddButton onClick={() => navigate("/add")}>Add</StAddButton>
        <StInput type="text" placeholder="Search" />
        <StDumpButton onClick={() => navigate("/dump")}>Dump</StDumpButton>
      </StRow>
      <h3>Ready to Read</h3>
        {books.map((item) => {
          if (!item.isDone && !item.isDeleted) {
            return <Card books={item} />;
          }
        })}
      
      <h3>Done Read</h3>
        {books.map((item) => {
          if (item.isDone && !item.isDeleted) {
            return <Card books={item} />;
          }
        })}
    </Layout>
  );
};

export default Home;

const StAddButton = styled.button`
  border: none;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  background-color: teal;
  width: 140px;
  color: #fff;
  font-weight: 700;
  margin-right: 10px;
`;

const StDumpButton = styled.button`
  border: none;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  background-color: gray;
  width: 140px;
  color: #fff;
  font-weight: 700;
  margin-right: 10px;
`;

const StRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

const StInput = styled.input`
  box-sizing: border-box;
  height: 46px;
  width: 20%;
  outline: none;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid #eee;
  margin-right: 10px;
`;

const StListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const StListContainer = styled.div`
  padding: 0 24px;
`;

const StCard = styled.div`
  width: 300px;
  height: 200px;
  border: 1px solid #000;
  background-color: #eaeaea;
  font-size: 1.5rem;
  text-align: center;
  padding: 0 20px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const TextLoad = styled.div`
  font-size: 1.5rem;
  text-align: center;
  padding: 0 20px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
