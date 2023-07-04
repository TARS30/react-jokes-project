import { useEffect, useRef } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../utils/firebase-api";
import styles from "./NewCommentForm.module.css";
import Loader from "../../components/UI/Loader";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { onCommentAdded } = props;
  const { sendHttpRequest, status, error } = useHttp(addComment);

  useEffect(() => {
    if (status === "completed" && !error) {
      onCommentAdded();
    }
  }, [status, error, onCommentAdded]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredComment = commentTextRef.current.value;

    sendHttpRequest({ commentData: {text:enteredComment}, jokeId: props.jokeId });
    commentTextRef.current.value = ''
  };

  return (
    <form className={styles.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <Loader />
        </div>
      )}
      <div className={styles.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={styles.actions}>
        <button  className="btn">Add Comment</button>
        <button onClick={props.onClose} className="btn">
          Close
        </button>
      </div>
    </form>
  );
};

export default NewCommentForm;
