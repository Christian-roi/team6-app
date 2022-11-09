import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getCommnetsByBookId } from "../redux/modules/commentsSlices";
import Text  from "../elements/Text";
import  flex  from "../lib/flex";
import Comment from "./Comment";
import AddCommentForm from "./AddComments";

const Comments = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isShow, setisShow] = useState(false);
  const { data }  = useSelector((state) => state.comments.data);

  useEffect(() => {
    if (isShow) {
      dispatch(__getCommnetsByBookId(id));
    }
  }, [dispatch, id, isShow]);

  return (
    <StContainer isShow={isShow}>
      <StToggleContainer
        onClick={() => {
          setisShow((pre) => !pre);
        }}
      >
        <Text size="16">
          {isShow ? "Comments ▲" : "Comments ▼"}
        </Text>
      </StToggleContainer>
      <AddCommentForm />
      <StCommentList>
        {data.comment.map((comment) => (
            <Comment key={comment.id} comment={comment} />
        ))}
        
      </StCommentList>
    </StContainer>
  );
};

export default Comments;

const StContainer = styled.div`
  height: ${({ isShow }) => (isShow ? "400px" : "50px")};
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-color: #fff;
  transition: height 400ms ease-in-out;
`;

const StToggleContainer = styled.div`
  ${flex({
    jusify: "space-between",
  })};
  height: 50px;
  padding: 0 12px;
  border-top: 1px solid #eee;
`;

const StCommentList = styled.div`
  height: 350px;
  overflow: scroll;
`;
