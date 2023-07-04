import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-http";
import { getComments } from "../../utils/firebase-api";
import Loader from "../UI/Loader";
import CommentsList from "./CommentsList";

const Comments = () => {
  const params = useParams();
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { jokeId } = params;

  const startAddCommentHandler = () => {
    setIsAddingComment(!isAddingComment);
  };
  const {
    sendHttpRequest,
    status,
    data: loadedComments,
  } = useHttp(getComments);

  useEffect(() => {
    sendHttpRequest(jokeId);
  }, [jokeId, sendHttpRequest]);

  const commentAddedHandler = useCallback(() => {
    sendHttpRequest(jokeId);
  }, [sendHttpRequest, jokeId]);

  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <Loader />
      </div>
    );
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No comments</p>;
  }

  return (
    <section className={styles.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          jokeId={params.jokeId}
          onCommentAdded={commentAddedHandler}
          onClose={startAddCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
