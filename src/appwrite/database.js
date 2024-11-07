import config from "../config/config";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(),
        {
          slug,
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("appwrite service :: creat post :: error ", error);
    }
  }
  async updatePost($id, { title,slug, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        $id,
        {
          slug,
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: upadate post :: error", error);
    }
  }
  async deletePost($id) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        $id
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: delete Post :: error", error);
      return false;
    }
  }

  async getPost($id) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        $id
      );
    } catch (error) {
      console.log("Appwrite service :: get Post :: error", error);
      return false;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("appwrite service :: get Post :: error", error);
      return false;
    }
  }
// file upload services
  async uploadFile(file){
    try {
        return await this.storage.createFile(config.appwriteBucketId,ID.unique(),file)
    } catch (error) {
        console.log("appwrite service :: upload file :: error ",error);
        return null;
    }
  }

  async deleteFile(fileId){
    try {
        await this.storage.deleteFile(config.appwriteBucketId,fileId);
        return true;
    } catch (error) {
        console.log("Appwrite service deleteFile:: error",error)
        return false;
    }
  }

  getFilePreview(fileId){
    return this.storage.getFilePreview(config.appwriteBucketId,fileId);
  }



}
const service = new Service();
export default service;
