import React, { useState } from "react";
// import { Prompt } from "react-router-dom";
import { toast } from "react-toastify";
import * as courseApi from "../api/courseApi";
import CourseForm from "./CourseForm";

const ManageCoursePage = props => {
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: ""
  });

  function handleChange({ target }) {
    const updatedCourse = {
      ...course,
      [target.name]: target.value
    };
    setCourse(updatedCourse);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await courseApi.saveCourse(course);
    props.history.push("/courses");
    toast.success("Course saved");
  }

  return (
    <>
      <h2>Manage Course</h2>
      {/* <Prompt when={true} message="are you sure?" /> */}
      <CourseForm
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
