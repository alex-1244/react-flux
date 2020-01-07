import React, { useState, useEffect } from "react";
import { getCourses } from "../api/courseApi";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";

function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      setCourses(await getCourses());
    })();
  }, []);

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add course
      </Link>
      <CourseList courses={courses} />
    </>
  );
}

export default CoursesPage;
