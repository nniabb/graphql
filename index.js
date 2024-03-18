import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { users, expenses } from './constant.js';


const resolvers = {
    Query:{
        users(){
          return users;
        },
        user(parent, args){
            const id = args.id;
            return users.find((u) => u.id === id)
        },
        expenses(){
          return expenses
        },
    },
    Expense: {
        user(parent){
            return users.find(u => u.id === parent.user_id)
        }
    },
    User: {
        expenses(parent){
            return expenses.filter(e => e.user_id === parent.id)
        }
    },
    Mutation: {
        createUser(parent, args) {
            const newUser = { id: String(users.length + 1), ...args };
            users.push(newUser)
            return newUser;
        },
        updateUser(parent, args) {
            const { id, ...userData } = args;
            const userIndex = users.findIndex(u => u.id === id)
            if (userIndex === -1) throw new Error('not found')
            users[userIndex] = { ...users[userIndex], ...userData };
            return users[userIndex];
        },      
        deleteUser(parent, args) {
            const { id } = args;
            const userIndex = users.findIndex(u => u.id === id)
            if (userIndex === -1) throw new Error('not found')
            const deletedUser = users.splice(userIndex, 1)
            return deletedUser[0]
        },
        createExpense(parent, args) {
            const newExpense = { id: String(expenses.length + 1), ...args }
            expenses.push(newExpense)
            return newExpense;
        },
        updateExpense(parent, args) {
            const { id, ...expenseData } = args;
            const expenseIndex = expenses.findIndex(e => e.id === id)
            if (expenseIndex === -1) throw new Error('not found')
            expenses[expenseIndex] = { ...expenses[expenseIndex], ...expenseData }
            return expenses[expenseIndex];
        },
        deleteExpense(parent, args) {
            const { id } = args;
            const expenseIndex = expenses.findIndex(e => e.id === id)
            if (expenseIndex === -1) throw new Error('not found')
            const deletedExpense = expenses.splice(expenseIndex, 1)
            return deletedExpense[0]
        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const {url} = await startStandaloneServer(server, { listen: { port: 4000}})

console.log(`server running at ${url}`)
