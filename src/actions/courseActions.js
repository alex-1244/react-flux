import "../appDispatcher";
import * as courseApi from "../api/courseApi";
import dispatcher from "../appDispatcher";
import actionTypes from "./actionTypes";

export async function saveCourse(course) {
  const savedCourse = await courseApi.saveCourse(course);
  dispatcher.dispatch({
    actionType: actionTypes.CREATE_COURSE,
    course: savedCourse
  });

  return savedCourse;
}

export function loadCourses() {
  return courseApi.getCourses().then(courses => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_COURSES,
      courses: courses
    });
  });
}
