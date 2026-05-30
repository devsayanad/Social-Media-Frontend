import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  if (action.type==="DELETE_POST") {
    
      return currPostList.filter(
        (post) => post.id !== action.payload.postId
      );
    }
    else if(action.type==="ADD_POST"){
     return [action.payload, ...currPostList];
    }
    
  }


const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST,
  );

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: crypto.randomUUID(),
        userId: userId,
        title: postTitle,
        body: postBody,
        reaction: reactions,
        tags: tags,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider
      value={{
        postList,
        addPost,
        deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Kathmandu",
    body: "Hi Friend, I am going to Kathmandu for my vacation. Hope to enjoy a lot. Peace Out.",
    reaction: 2,
    userId: "user-9",
    tags: ["vacation", "kathmandu", "enjoy"],
  },
  {
    id: "2",
    title: "I am Pass",
    body: "I Pass in Class 12 Board Examination. Hard to Believe",
    reaction: 15,
    userId: "user12",
    tags: ["Undergraduating", "Unbelievable"],
  },
];

export default PostListProvider;