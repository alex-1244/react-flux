import "../appDispatcher";
import * as courseApi from "../api/courseApi";
import dispatcher from "../appDispatcher";
import actionTypes from "./actionTypes";

export async function saveCourse(course) {
  const savedCourse = await courseApi.saveCourse(course);
  dispatcher.dispatch({
    actionType: course.id
      ? actionTypes.UPDATE_COURSE
      : actionTypes.CREATE_COURSE,
    course: savedCourse
  });

  return savedCourse;
}

export async function loadCourses() {
  var courses = await courseApi.getCourses();
  dispatcher.dispatch({
    actionType: actionTypes.LOAD_COURSES,
    courses: courses
  });

  return courses;
}
