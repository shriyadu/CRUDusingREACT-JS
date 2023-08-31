import "./App.css";
import api from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomHeader from "./CustomHeader";
import DataContent from "./DataContent";
import FormData from "./FormData";

function MainApp() {
  const [posts, setPosts] = useState([]);

  const [postName, setPostName] = useState("");
  
  const [postPhone, setPostPhone] = useState("");
  const [postEmail, setPostEmail] = useState("");

  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await api.get(
        "https://fugk2m8ox2.execute-api.ap-south-1.amazonaws.com/dev/api/lookups?type=user"
      );
      setPosts(response.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      id : 0 ,
      username: postName,
      password: "gfhtd",
      user_role: "admin",
      active: 1,
      created_by: 23,
      mobile: postPhone,
      location: "gftftd",
      designation: "dddd",
      division: "ddd",
      division_id: 1,
      email_id: postEmail,
      section_office: "oirnsf",
    };

    try {
      await api.post(
        "https://fugk2m8ox2.execute-api.ap-south-1.amazonaws.com/dev/api/users",
        newUser
      );

      fetchPosts();
      setPostName("");
       setPostPhone("");
      setPostEmail("");
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const handleEdit = async (id) => {
    const updatedUser = {
      id: id,
      username: postName,
      password: "huihgui",
      user_role: "admin",
      active: 1,
      created_by: 23,
      mobile: postPhone,
      location: "uthurihg",
      designation: "sas",
      division: "sasa",
      division_id: 1,
      email_id: postEmail,
      section_office: "kv",
    };

    try {
      await api.put(
        `https://fugk2m8ox2.execute-api.ap-south-1.amazonaws.com/dev/api/users`,
        updatedUser
      );

      fetchPosts();

      setPostName("");
      
      setPostPhone("");
      setPostEmail("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    
  };

  return ( 
      <main className="container shadow-lg p-3 mb-5 bg-white rounded">
        <CustomHeader />
        <Routes>
          <Route
            path="/"
            element={
              <DataContent
                posts={posts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            }
          />
          <Route
            path="/post"
            index
            element={
              <FormData
                isEditing={false} 
                postName={postName}
                setPostName={setPostName}
                
                postPhone={postPhone}
                setPostPhone={setPostPhone}
                postEmail={postEmail}
                setPostEmail={setPostEmail}
                handleSubmit={handleSubmit}
                posts={posts}
              />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <FormData
                isEditing={true}  
                postName={postName}
                setPostName={setPostName}
                
                postPhone={postPhone}
                setPostPhone={setPostPhone}
                postEmail={postEmail}
                setPostEmail={setPostEmail}
                handleEdit={handleEdit}
                posts={posts}
              />
            }
          />
        </Routes>
      </main>
    );
}

export default MainApp;