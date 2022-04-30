const graphql = require('graphql');
const Author = require('../models/Author');
const Book = require('../models/book');
const Library = require('../models/library');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

// dummy data



const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
               // return authors.find(author=>author.id=== parent.authorId);
               return Author.findById(parent.authorId);

            }
        },
        library: {
            type: LibraryType,
            resolve(parent, args){
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
               // return books.filter(book=>book.authorId=== parent.id );
            }
        }
    })
});


const LibraryType = new GraphQLObjectType({
    name: 'Library',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
            }
        },
        library: {
            type: LibraryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
            }
        },
        books: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Object.entries(Book).every(library=>library.name );
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
        
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation

});