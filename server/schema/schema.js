const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

// dummy data

const libraries= [
    {name:'stockholm', id:'1'},
    {name:'handen', id:'2'}
]

var books = [
    { name: 'Name 1', genre: 'Fantasy', id: '1', authorId: '1', libraryId:'1' },
    { name: 'Name 2', genre: 'Fantasy', id: '2', authorId: '2', libraryId:'2' },
    { name: 'Name 3', genre: 'Fantasy', id: '4', authorId: '2', libraryId:'2' },
    { name: 'Name 4', genre: 'Sci-Fi', id: '3', authorId: '3', libraryId:'2' },
    { name: 'Name 5', genre: 'Fantasy', id: '5', authorId: '3', libraryId:'1' },
];

var authors = [
    { name: 'Author 3', age: 42, id: '1' },
    { name: 'Author 2', age: 32, id: '2' },
    { name: 'Author 1', age: 46, id: '3' }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return authors.find(author=>author.id=== parent.authorId);
            }
        },
        library: {
            type: LibraryType,
            resolve(parent, args){
                return libraries.find(library=>library.id=== parent.libraryId);
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
                return books.filter(book=>book.authorId=== parent.id );
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
                return books.filter(book=>book.libraryId=== parent.id );
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
                return books.find(book=>book.id=== args.id );
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return authors.find(author=>author.id===args.id );
            }
        },
        library: {
            type: LibraryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return libraries.find(library=>library.id===args.id );
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});