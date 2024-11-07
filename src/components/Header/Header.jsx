import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate ,NavLink} from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
    },
    {
      name: "AllPosts",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "AddPost",
      path: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex justify-center items-center">
          <div className="sm:mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex sm:ml-auto justify-center items-center">
              {
                navItems.map((item)=>(
                  item.active && (
                    <li key={item.name}>
                      <NavLink 
                      to={item.path}
                      className={({isActive})=>`${isActive? "text-orange-700 sm:text-xl": " "} inline-block px-1 sm:px-6 sm:py-2 duration-200 hover:bg-blue-100 rounded-full` }
                      >{item.name}</NavLink>
                    </li>
                  )
                ))
              }
              {
                authStatus && (
                  <li>
                    <LogoutBtn/>
                  </li>
                )
              }
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
