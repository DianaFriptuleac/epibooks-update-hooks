
import SingleComment from "./SingleComment";


const CommentList = ({comments, onDelete}) =>{
    return (
      <ul className="px-3">
        {comments.map((comment) => (
          <SingleComment
            key={comment._id}
            comment={comment}
            onDelete={onDelete}
          />
        ))}
      </ul>
    );
  }

export default CommentList;
