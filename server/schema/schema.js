const graphql = require('graphql');
const lodash = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt,GraphQLList,GraphQLNonNull} = graphql;
// dummy data
const {books,authors,movies,directors}   = require( '../data/data')
const Book = require('../Models/book');
const Author = require('../Models/author');

 


const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                console.log(parent)
                return Author.findById(parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields:()=>({
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        id:{type:GraphQLID},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({authorId:parent.id});
            }
        }

    })
})

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }, 
        genre: { type: GraphQLString },
        director:{
            type:DirectorType,
            resolve(parent,args){
                return lodash.find(directors,{id:parent.directorId});
            }
        }
    })
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        id: { type: GraphQLID },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent,args){
                return lodash.filter(movies,{directorId:parent.id});
            }
        }
    })
})



const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parent,args){
               return Book.findById(args.id);

            }
           
        },
        author:{
            type:AuthorType,
            args:{
                id:{type:GraphQLID}

            },
            resolve(parent,args){
                return Author.findById(args.id);
            }
        },
        movie:{
            type:MovieType,
            args:{
                id:{type:GraphQLID}
            },
        resolve(parent,args){
            return lodash.find(movies,{id:args.id});
        }
        },
        director:{
            type:DirectorType,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parent,args){
                return lodash.find(directors,{id:args.id});
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({});
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                return Author.find({});
            }
        },
        movies:{
            type:new GraphQLList(MovieType),
            resolve(parent,args){
                return movies;
            }
        },
        directors:{
            type: new GraphQLList(DirectorType),
            resolve(parent,args){
                return directors;
            }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull( GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                const book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                })
                book.save();
                return book;
            }
        },
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                const author = new Author({
                    name:args.name,
                    age:args.age
                })
                author.save();
                return author;
            }
        },
        addMovie:{
            type:MovieType,
            args:{
                name:{type:GraphQLString},
                genre:{type:GraphQLString},
                directorId:{type:GraphQLID}
            },
            resolve(parent,args){
                const movie = new Movie({
                    name:args.name,
                    genre:args.genre,
                    directorId:args.directorId

                })
                movie.save();
                return movie;
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation,
})