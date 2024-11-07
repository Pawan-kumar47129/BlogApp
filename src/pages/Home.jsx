import React, { useState, useEffect } from "react";
import { Container, Loading, PostCard } from "../components";
import appwriteService from "../appwrite/database";
import { useSelector } from "react-redux";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const { userData, status } = useSelector((state) => state.auth);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setLoading(false);
      }
    });
  }, []);
  if (!status) {
    return (
      <div className="flex py-8 mt-4 text-center ">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full ">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read Posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  } 
  else if(loading) return <Loading/>
  else {
    return (
      <div className="w-full py-8">
        <Container>
          {posts.length >= 1 ? (
            <div className="flex flex-wrap justify-center items-center">
              {posts.map((post) => (
                <div
                  key={post.$id}
                  className="sm:p-2 min-w-[15rem] max-w-[25rem]"
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-xl text-blue-600">No Post Available</h1>
          )}
        </Container>
      </div>
    );
  }
};

export default Home;
