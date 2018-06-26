let express = require('express');
let expressGraphQL = require('express-graphql');

let { buildSchema } = require('graphql');

//GraphQl schema
let schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    }
    type Mutation{
        updateCourseTopic(id: Int!, topic: String) : Course
    }
    type Course {
        id: Int
        title: String
        name: String
        author: String
        description: String
        topic: String
        url: String    
    }
    
`);


let coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
];

let getCourse = (args) => {
    let { id } = args;
    return coursesData.filter((course) => course.id === id)[0]
};

let getCourses = (args) => {
    let { topic } = args;
    return coursesData.filter((course) => course.filter === topic)
};

let updateCourseTopic = function({id, topic}) {
    coursesData.map(course => {
        if (course.id === id) {
            course.topic = topic;
            return course;
        }
    });
    return coursesData.filter(course => course.id === id)[0];
};

//GraphQl resolver
let rootValue = {
    course: getCourse,
    courses: getCourse,
    updateCourseTopic: updateCourseTopic
};

let app = express();

app.use('/graphql', expressGraphQL({
    schema,
    rootValue,
    graphiql: true
}))

app.listen(5000, () => {
    console.log('server running on port 5000/graphql')
})