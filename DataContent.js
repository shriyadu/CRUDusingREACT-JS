import React, { useState } from "react";
import { Link } from "react-router-dom";
const DataContent = ({ posts,handleDelete }) => {
  const reversedPosts = [...posts].reverse();
  const postsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = reversedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(reversedPosts.length / postsPerPage);
  const visiblePages = 5;
  const renderPaginationItems = () => {
    const paginationItems = [];

    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      if (
        pageNumber <= visiblePages || 
        pageNumber > totalPages - visiblePages || 
        Math.abs(pageNumber - currentPage) <= 1 
      ) {
        paginationItems.push(
          <li
            key={`pagination-item-${pageNumber}`} 
            className={`page-item ${
              currentPage === pageNumber ? "active" : ""
            }`}
          >
            <button className="page-link" onClick={() => paginate(pageNumber)}>
              {pageNumber}
            </button>
          </li>
        );
      }
    }

    return paginationItems;
  };

  return (
    <main>
      {currentPosts.length ? (
        <div>
          <table className="table table-striped text-center table-responsive table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post) => (
                <tr key={post.id}>
                  <td>{post.username}</td>
                  <td>{post.mobile}</td>
                  <td>{post.email_id}</td>
                  <td>
                    <Link to={`edit/${post.id}`}>
                      <button className="btn btn-success btn-sm" >
                        Edit
                      </button>
                      <span className="space02"></span>
                    </Link>
                     
                      <button className="btn btn-danger btn-sm ml-2" onClick={()=>handleDelete(post.id)}>
                        Delete
                      </button> 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav>
            <ul className="pagination justify-content-center">
              {renderPaginationItems()}
            </ul>
          </nav>
        </div>
      ) : (
        <p style={{ marginTop: "2rem" }}>Loading</p>
      )}
    </main>
  );
};

export default DataContent;