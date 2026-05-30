import { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { PostList } from "../store/post-list-store";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostList);

  return (
    <div className="card post-card">
      <div className="card-body">
        <h5 className="card-title">
          {post.title}

          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            <AiFillDelete onClick={() => deletePost(post.id)} />
          </span>
        </h5>

        <p className="card-text">{post.body}</p>

        <div>
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="badge text-bg-primary me-1 hashtag"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="alert alert-success reactions" role="alert">
          This post has been reacted by {post.reaction} people
        </div>
      </div>
    </div>
  );
};

export default Post;