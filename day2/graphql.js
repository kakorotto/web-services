const { ApolloServer, gql } = require('apollo-server');

const articles = [
  {title: "title1", body:"body1"},
  {title: "title2", body:"body2"},
  {title: "title3", body:"body3"},
  {title: "title4", body:"body4"},
  {title: "title5", body:"body5"},
  {title: "title6", body:"body6"},
]

// const users = [
//     { name: "ahmed", dob: "1996" }, 
//     { name: "mohamed", dob: "1995"  }, 
//     { name: "ali", dob: "1995" }, 
// ];

// const posts = [
//     { name: "test" },
//     { name: "test1" },
//     { name: "test2" },
//     { name: "test3" },
// ]
// schema
const typeDefs = gql`
    type Article {
      title: String!
      body: String!
    }
    union SearchResult = Article

    type Query {
        # query to fetch all users
        allArticles (last: Int!): [Article]
        search (keyword: String): SearchResult
    }
        # mutation root type
    type Mutation {
        createArticle (title: String!, body: String!): [Article]
        deleteArticle (title: String!): [Article]
    };

const resolvers = {
    Mutation: {
        createArticle: (_, args, ctx) => {
            console.log(args);
            articles.push(args);
            return articles;
        },
        DeleteArticle: (_, args, ctx) => {
            console.log(args);
            const result = articles.filter((ant) => art.title !== args.title);
            articles=result;
            return result;
        }
    },
    Query: {
        allArtcles: (_, args, ctx) => {
            if (!ctx.isLogged) throw Error('need to authenticate');
            const result = users.slice(-args.last);            
            return [...result];
        }
    }
}
    # type Query {
    #     # query to fetch all users
    #     allUsers (last: Int!): [User]
    #     userById (id: String): User
    #     search (keyword: String): SearchResult
    # }


    # type User {
    #     name: String!
    #     gender: Gender!
    #     dob: String!
    #     posts (lastPosts: Int!): [Post]
    #     friends: [User]
    # }

    # type Post {
    #     name: String!
    # }

    # enum Gender {
    #     Male
    #     Female
    # }
    
    # union SearchResult = Post | User

    # # query root type
    # type Query {
    #     # query to fetch all users
    #     allUsers (last: Int!): [User]
    #     userById (id: String): User
    #     search (keyword: String): SearchResult
    # }

    # # mutation root type
    # type Mutation {
    #     createUser (name: String!, dob: String!): [User]
    # }
`
// const resolvers = {
//     Mutation: {
//         createUser: (_, args, ctx) => {
//             console.log(args);
//             users.push(args);
//             return users;
//         }
//     },
//     Query: {
//         allUsers: (_, args, ctx) => {
//             if (!ctx.isLogged) throw Error('need to authenticate');
//             const result = users.slice(-args.last);            
//             return [...result];
//         }
//     },
//     User: {
//         posts(parent, args, ctx) {
//             console.log('context in posts: ', ctx);
//             if (!ctx.isLogged) throw Error('need to authenticate');
//             return posts.slice(-args.lastPosts);
//         }
//     }
// }


const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    context: ({ req }) => {
        let isLogged = false;
        const token = req.headers.authorization;
        if (token === '123456') isLogged = true
        return {
            isLogged
        }
    }
 });
server.listen(3001).then(({ port }) => { console.log('listening on: ', port) });
