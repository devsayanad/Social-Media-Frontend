import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  addInitialPosts:() => {},
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
    
    
    else if(action.type==="ADD_INITAIL_POSTS"){
          return(action.payload.posts)
        }
    
  }


const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
  []
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

    const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITAIL_POSTS",
      payload: {
        posts,
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
        addInitialPosts,
        deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};


export default PostListProvider;