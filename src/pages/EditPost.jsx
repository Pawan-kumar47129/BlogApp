import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/database";
import { useParams, useNavigate } from "react-router-dom";
const EditPost = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const $id=id;
  const navigate = useNavigate();
  useEffect(() => {
    if ($id) {
      appwriteService.getPost($id).then((post) => {
        console.log(post);
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [$id, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
