import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";

const CommentArea = ({ asin }) => {
  //  state = {
   // comments: [], // Inizializzo lo stato per i commenti
   // updateCommentsList: false,
  //};
  const [comments, setComments] = useState([]);
  const [updateCommentsList, setUpdateCommentsList] = useState(false);

  const fetchComments = () => {
    fetch(`https://striveschool-api.herokuapp.com/api/comments/${asin}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjJlYWYyNjBjYzAwMTVjYzBkZWUiLCJpYXQiOjE3MjQzMjc1NjQsImV4cCI6MTcyNTUzNzE2NH0.g888918CD5qke7EIIwh90BjBGeHnwAIHTubT-bzC7fI",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Errore nella chiamata");
          }
        })
        .then((data) => {
          setComments(data);
        })
        .catch((err) => {
          console.log("Chiamata andata male", err);
        });
    };
  
    useEffect(() => {
      fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [asin, updateCommentsList]);
  
    const deleteComment = (commentId) => {
      fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
     Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjJlYWYyNjBjYzAwMTVjYzBkZWUiLCJpYXQiOjE3MjQzMjc1NjQsImV4cCI6MTcyNTUzNzE2NH0.g888918CD5qke7EIIwh90BjBGeHnwAIHTubT-bzC7fI",
    },
  })
    .then((response) => {
      if (response.ok) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
      } else {
        alert("Errore nella cancellazione del commento!");
      }
    })
    .catch((err) => {
      console.log("Errore: ", err);
    });
};

const changeUpdateCommentsList = () => {
  setUpdateCommentsList((prev) => !prev);
};

return (
  <div className="bg-light my-3">
    <h4 className="text-center pt-2">Commenti</h4>
    <CommentList comments={comments} onDelete={deleteComment} />
    <AddComment asin={asin} changeUpdateCommentsList={changeUpdateCommentsList} />
  </div>
);
};

export default CommentArea;
