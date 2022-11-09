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

const Search = () => {
   const { books, isLoading, error } = useSelector((state) => state.books);
    
    const dispatch = useDispatch();
   useEffect(() => {
     dispatch(__getBooks());
   }, []);

   const filteredData = books.filter((book) => {
        return book.title.toLowerCase().includes(search.toLowerCase());
    });
  

}