import React from "react";
import CourseForm from "./CourseForm";
import { shallow } from "enzyme";

function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderCourseForm();
  // console.log(wrapper.debug());
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("AddCourse");
  // enzyme find is like css e.g.
  // ID:      find('#firstname)
  // Class:   find('.wrapper')
  // Tag:     find('h1')
});

it('labels save buttons as "Save" when not saving', () => {
  const wrapper = renderCourseForm();
  expect(wrapper.find("button").text()).toBe("Save");
});

it('labels save button as "Saving..." when saving', () => {
  const wrapper = renderCourseForm({ saving: true });
  expect(wrapper.find("button").text()).toBe("Saving...");
});
