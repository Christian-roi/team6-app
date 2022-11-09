import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Text from "../elements/Text";
import Stack from "../elements/Stack";
import Button from "../elements/Button";
import {
  __deleteBook,
  __getBookId,
  __getBooks,
} from "../redux/modules/bookSlices";
import { FaEraser, FaCheck, FaEye, FaHistory } from "react-icons/fa";

const CardDump = ({ books }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDeleteHandler = () => {
    dispatch(__deleteBook(books.id));
  };

  const onChangeStatus = async () => {
    const confirm = window.confirm(
      "Are you sure you want to change the status?"
    );
    if (confirm) {
      await axios.patch(
        `https://endpoint-for-booklist.herokuapp.com/book/${books.id}`,
        {
          isDone: !books.isDone,
        }
      );
      window.location.reload();
    }
  };

  const onRestore = async () => {
    const confirm = window.confirm(
      "Are you sure you want to restore this book?"
    );
    if (confirm) {
      await axios.patch(
        `https://endpoint-for-booklist.herokuapp.com/book/${books.id}`,
        {
          isDeleted: !books.isDeleted,
        }
      );
      window.location.reload();
    }
  };

  return (
    <StCard>
      <Stack jusify="space-between">
        <Stack jusify="flex-start">
          <Text size="24">{books.title}</Text>
        </Stack>
        <Stack jusify="flex-end">
          <Button
            size="small"
            color="gray"
            onClick={(event) => {
                event.preventDefault();
                onRestore();
            }}
          >
            <FaHistory />
          </Button>
          <Button
            size="small"
            color="red"
            onClick={(event) => {
              event.stopPropagation();
              const result = window.confirm(
                "Are you sure you want to permanently delete this book?"
              );
              if (result) {
                return onDeleteHandler();
              } else {
                return;
              }
            }}
          >
            <FaEraser />
          </Button>
        </Stack>
      </Stack>
      <Stack direction="flex-start" jusify={true}>
        <Text size="14">Author: {books.author}</Text>
      </Stack>
    </StCard>
  );
};

export default CardDump;

const StCard = styled.div`
  padding: 12px;
  height: 90px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 12px;
  width: 100%;
  margin-bottom: 10px;
`;
