import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Course from './Course';

const Courses = () => (
    <Query
        query={gql`
      {
        courses {
          id
          title
          author
          description
          topic
          url
        }
      }
    `}
    >
        {({ loading, error, data }) => {
            console.log(data)
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            // return data.allCourses.map(({ id, title, author, description, topic, url }) => (
            //     <div key={id}>
            //         <p>{`${title} by ${author}`}</p>
            //     </div>
            // ));

            return data.courses.map((currentCourse) => (
                <Course course={currentCourse} />
            ));
        }}
    </Query>
);
export default Courses;