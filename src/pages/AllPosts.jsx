import React, { useState, useEffect } from "react";
import { Container, Loading, PostCard } from "../components";
import appwriteService from "../appwrite/database";
const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setLoading(false);
      }
    });
  },[]);
  if(loading) return <Loading/>
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap justify-center items-center">
          {posts.length>=1?posts.map((post) => (
            <div key={post.$id} className="p-2 min-w-[15rem] max-w-[25rem] w-full h-[25rem]">
              <PostCard post={post} />
            </div>
          )):<h2 className="text-xl text-blue-600">No Post Available</h2>}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
