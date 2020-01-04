import React, { useState, useEffect } from "react";
import { getCourses } from "../api/courseApi";

function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      setCourses(await getCourses());
    })();
  }, []);

  const renderRow = c => {
    return (
      <tr key={c.id}>
        <td>{c.title}</td>
        <td>{c.authorId}</td>
        <td>{c.category}</td>
      </tr>
    );
  };

  return (
    <>
      <h2>Courses</h2>
      <table calssname="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author ID</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>{courses.map(renderRow)}</tbody>
      </table>
    </>
  );
}

export default CoursesPage;
