import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { AuthLayout, Login, Signup } from "./components/index.js";
import AllPosts from "./pages/AllPosts.jsx";
import EditPost from "./pages/EditPost.jsx";
import AddPost from "./pages/AddPost.jsx"
import Post from "./pages/Post.jsx";
const router = createBrowserRouter([
  { path: "/", element: <App />,
     children: [
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
        element:(
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path:"/signup",
        element:(
          <AuthLayout authentication={false}>
            <Signup/>
          </AuthLayout>
        )
      },
      {
        path:"/all-posts",
        element:(
          <AuthLayout authentication={true}>
            <AllPosts/>
          </AuthLayout>
        )
      },
      {
        path:"/add-post",
        element:(
          <AuthLayout authentication={true}>
            <AddPost/>
          </AuthLayout>
        )
      },
      {
        path:"/edit-post/:id",
        element:(
          <AuthLayout authentication={true}>
            <EditPost/>
          </AuthLayout>
        )
      },
      {
        path:"/post/:id",
        element:<Post/>
      }

  ] },
]);
createRoot(document.getElementById("root")).render(

  <Provider store={store}>
   <RouterProvider router={router}/>
  </Provider>

);
