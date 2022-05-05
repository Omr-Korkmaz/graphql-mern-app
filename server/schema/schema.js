const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/Author');
const Library=require('../models/library');
const _ = require('lodash');
const book = require('../models/book');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return Author.find(author=>author.id===parent.authorId);
            }
        },
        library:{
            type: LibraryType,
            resolve(parent, args){
                return Library.find(library=>library.id===parent.libraryId);
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
                return Book.find(book=>book.authorId===parent.id);
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
                return Book.find(book=>book.libraryId===parent.id);
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
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Author.findById(args.id);
                // the folowing code works to get the id. id is working differently in mongo
                // Author.find({}).lean().exec(function(error, records) {
                //     records.forEach(function(record) {
                //       console.log(record._id);
                //     });
                //   });
            }
        },
        Library: {
            type: LibraryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Library.findById(args.id);
            }
        },


        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find({});
            }
        },
        libraies: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Library.find({});
            }
        }
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
        addLibrary: {
            type: LibraryType,
            args: {
                name: { type: GraphQLString },
            },
            resolve(parent, args){
                let library = new Library({
                    name: args.name,
                });
                return library.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) },
                libraryId:{ type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId,
                    libraryId:args.libraryId
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