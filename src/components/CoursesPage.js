import React, { useState, useEffect } from "react";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import courseStore from "../stores/CourseStore";
import { loadCourses } from "../actions/courseActions";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
    (async () => {
      courseStore.addChangeListener(onChange);
      if (courseStore.getCourses().length === 0) {
        await loadCourses();
      }

      return () => courseStore.removeListener(onChange);
    })();
  }, []);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

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
