import { defineQuery } from "next-sanity";

export const FEATURED_COURSES_QUERY = defineQuery(`*[
  _type == "course"
  && featured == true
] | order(_createdAt desc)[0...6] {
  _id,
  title,
  description,
  tier,
  featured,
  thumbnail {
    asset-> {
      _id,
      url
    }
  },
  "moduleCount": count(modules),
  "lessonCount": count(modules[]->lessons[])
}`);

export const ALL_COURSES_QUERY = defineQuery(`*[
  _type == "course"
] | order(_createdAt desc) {
  _id,
  title,
  description,
  tier,
  featured,
  thumbnail {
    asset-> {
      _id,
      url
    }
  },
  "moduleCount": count(modules),
  "lessonCount": count(modules[]->lessons[])
}`);

export const COURSE_BY_ID_QUERY = defineQuery(`*[
  _type == "course"
  && _id == $id
][0] {
  _id,
  title,
  description,
  tier,
  featured,
  thumbnail {
    asset-> {
      _id,
      url
    }
  },
  category-> {
    _id,
    title
  },
  modules[]-> {
    _id,
    title,
    description,
    lessons[]-> {
      _id,
      title
    }
  }
}`);

export const STATS_QUERY = defineQuery(`{
  "courseCount": count(*[_type == "course"]),
  "lessonCount": count(*[_type == "lesson"])
}`);
