import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
const FormData = ({
  isEditing,
  handleSubmit,
  handleEdit,
  posts,
  postName,
  setPostName,
  postEmail,
  setPostEmail,
  postPhone,
  setPostPhone,
  
}) => {
  function onlyNumbers(inputElement) {
    inputElement.value = inputElement.value.replace(/[^0-9]/, "");
  }

  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setPostName(post.username);
      
      setPostPhone(post.mobile);
      setPostEmail(post.email_id);
    }
  }, [post, setPostName, , setPostPhone, setPostEmail]);

  function handleFormSubmit(event) {
    event.preventDefault();

    const inputName = document.getElementById("postName").value;
    const inputPhone = document.getElementById("postPhone").value;
    const inputEmail = document.getElementById("postEmail").value;

    if (inputName.trim() === "" ||  inputPhone.trim() === "" || inputEmail.trim() === "") {
      alert("All fields are required!");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(inputEmail)) {
    alert("Invalid email address!");
    document.getElementById("postEmail").focus();
    return;
  }

    const inputValue = inputPhone;

    if (inputValue.length >= 1 && parseInt(inputValue[0]) < 6) {
      alert("The first digit must be greater than or equal to six.");
      document.getElementById("postPhone").focus();
      return;
    }

    if (inputValue.length < 10) {
      alert("The phone number must be at least 10 digits long.");
      document.getElementById("postPhone").focus();
      return;
    }
    

    if (!isEditing) {
      handleSubmit(event);
    } else {
      handleEdit(post.id);
    }
  }

  return (
    <main className="container">
      
      <h2 className="mt-3">{isEditing ? "Edit Post" : ""}</h2>
     
      <form onSubmit={handleFormSubmit} className="form">
        <div className="mb-3">
          <label htmlFor="postName" className="form-label">
             Name:
          </label>
          <input
            id="postName"
            type="text"
            className="form-control"
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postPhone" className="form-label">
            Phone:
          </label>
          <input
            id="postPhone"
            type="text"
            className="form-control"
            maxLength={10}
            minLength={10}
            value={postPhone}
            onChange={(e) => setPostPhone(e.target.value)}
            onInput={(e) => {
              onlyNumbers(e.target);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postEmail" className="form-label">
            Email
          </label>
          <input
            id="postEmail"
            type="text"
            
            className="form-control"
            value={postEmail}
            onChange={(e) => setPostEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update" : "Submit"}
        </button>
      </form>
    </main>
  );
};
export default FormData;