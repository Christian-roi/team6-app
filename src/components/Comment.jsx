import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VscClose, VscTrash } from "react-icons/vsc";
import { VscEdit } from "react-icons/vsc";
import Text from "../elements/Text";
import Stack from "../elements/Stack";
import Button from "../elements/Button";
import flex from "../lib/flex";
import {
  __deleteComment,
  __updateComment,
} from "../redux/modules/commentsSlices";
import {
  clearComment,
  globalEditModeToggle,
  __getComment,
} from "../redux/modules/commentSlices";

const Comment = ({ comment }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("");

  const { content } = useSelector((state) => state.comment.data);
  const { isGlobalEditmode } = useSelector((state) => state.comment);

  const onDeleteButtonHandler = () => {
    const result = window.confirm("Are you sure you want to delete this comment?");
    if (result) {
      dispatch(__deleteComment(comment.id));
    } else {
      return;
    }
  };

  const onUpdateButtonHandler = () => {
    dispatch(
      __updateComment({
        id: comment.id,
        content: updatedComment,
        username: comment.username,
        bookId: id,
      })
    );
    setIsEdit(false);
    dispatch(globalEditModeToggle(false));
  };

  const onChangeEditButtonHandler = () => {
    setIsEdit(true);
    dispatch(__getComment(comment.id));
    dispatch(globalEditModeToggle(true));
  };

  const onCancelButtonHandler = () => {
    setIsEdit(false);
    dispatch(clearComment());
    dispatch(globalEditModeToggle(false));
  };

  useEffect(() => {
    setUpdatedComment(content);
  }, [content]);

  return (
    <StComment>
      {isEdit ? (
        <>
          <StInputWrapper>
            <input
              type="text"
              value={updatedComment}
              maxlength={100}
              onChange={(event) => {
                setUpdatedComment(event.target.value);
              }}
            />
          </StInputWrapper>
          <StControlGroup>
            <Button
              size="small"
              bgColor="#FE531F"
              onClick={onCancelButtonHandler}
            >
              <VscClose />
            </Button>
            <Button
              size="small"
              bgColor="#FE531F"
              onClick={onUpdateButtonHandler}
            >
                <VscEdit />
            </Button>
          </StControlGroup>
        </>
      ) : (
        <>
          <StInputWrapper>
            <Text>{comment.username}</Text>
            <Text size="16">{comment.content}</Text>
          </StInputWrapper>

          <StControlGroup>
            <Button
              size="small"
              bgColor="#FE531F"
              disabled={isGlobalEditmode}
              onClick={onChangeEditButtonHandler}
            >
              <VscEdit size="16" color="#000" />
            </Button>
            <Button
              size="small"
              bgColor="#FE531F"
              onClick={onDeleteButtonHandler}
              disabled={isGlobalEditmode}
            >
              <VscTrash size="16" color="#000" />
            </Button>
          </StControlGroup>
        </>
      )}
    </StComment>
  );
};

export default Comment;

const StComment = styled.div`
  ${flex({
    jusify: "space-between",
  })}
  border-bottom: 1px solid #eee;
  height: 70px;
  padding: 0 12px;
`;

const StControlGroup = styled.div`
  ${flex({})}
  flex-shrink: 0;
  gap: 3px;
`;

const StInputWrapper = styled.div`
  width: 70%;
`;
