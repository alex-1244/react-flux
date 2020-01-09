import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CourseForm from "./CourseForm";
import courseStore from "../stores/CourseStore";
import * as courseActions from "../actions/courseActions";

const ManageCoursePage = props => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: ""
  });

  useEffect(() => {
    (async () => {
      courseStore.addChangeListener(onChange);
      const slug = props.match.params.slug;
      if (courses.length === 0) {
        await courseActions.loadCourses();
      } else if (slug) {
        setCourse(courseStore.getCourseBySlug(slug));
      }
    })();

    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function handleChange({ target }) {
    const updatedCourse = {
      ...course,
      [target.name]: target.value
    };
    setCourse(updatedCourse);
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) {
      _errors.title = "Title is required";
    }
    if (!course.authorId) {
      _errors.authorId = "Author is required";
    }
    if (!course.category) {
      _errors.category = "Category is required";
    }

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) {
      return;
    }

    await courseActions.saveCourse(course);
    props.history.push("/courses");
    toast.success("Course saved");
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
