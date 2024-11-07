import React from 'react'
import {Link} from "react-router-dom"
import appwriteService from "../appwrite/database.js"
const PostCard = ({post}) => {
  return (
   <Link to={`/post/${post.$id}`}>
    <div className='w-full bg-gray-100 rounded-xl p-4 h-full'>
        <div className='w-full flex justify-center mb-4'>
          <img src={appwriteService.getFilePreview(post.featuredImage)} alt="img" className='w-full' />
        </div>
        <h2 className="text-xl font-bold">{post.title}</h2>
    </div>
   </Link>
  )
}

export default PostCard
