const express = require('express');
const expressGraphQL = require('express-graphql');
const cors = require('cors');
const path = require('path');

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
    if(topic){
        return coursesData.filter((course) => course.topic === topic)
    }
    return coursesData;

};

let getAllCourses = () => {
    return coursesData
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
    courses: getCourses,
    getAllCourses: getAllCourses,
    updateCourseTopic: updateCourseTopic
};

let app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/graphql', (req,res,next)=>{

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'content-type, authorization, content-length, x-requested-with, accept, origin');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.header('Allow', 'POST, GET, OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
}, expressGraphQL({
    schema,
    rootValue,
    graphiql: true
}));

app.use(express.static(path.join(__dirname, 'react-graphql/build')));


let port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('server running on port 5000/graphql')
});