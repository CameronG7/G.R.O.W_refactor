const { User } = require('../models')
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express')

const resolvers = {

  Query: {
    me: async (root, args, context) => {
      const foundUser = await User.findOne({ email: context.user.email })
      return foundUser
    },
    // all just for testing
    all: async () => {
      const foundUsers = await User.find({})
      return foundUsers
    }
  },

  Mutation: {
    login: async (root, {email, password}) => {
      const user = await User.findOne({ email })
      
      if (!user) {
        throw new AuthenticationError('Incorrect credentials')
      }

      const correctPw = await user.isCorrectPassword(password)

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials')
      }
      const token = signToken(user)
      return { token, user }

    },

    addUser: async (root, {username, email, password }) => {
      const user = await User.create({username, email, password })
      const token = signToken(user)
      return { token, user }
    },

    saveBook: async (root, { input }, context) => {

      if (context.user) {
        console.log(context.user, input)
        const updatedUser = await User.findOneAndUpdate(
          { email: context.user.email },
          { $addToSet: { savedBooks: { ...input } } },
          { new: true, runValidators: true }
        )
        return updatedUser
      }
      throw new AuthenticationError('You need to be logged in!')
    },

    removeBook: async (root, { bookId }, context) => {
      if(context.user) {
      const updatedUser = await User.findOneAndUpdate(
        { email: context.user.email },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      )
      return updatedUser
     }
      throw new AuthenticationError('You need to be logged in!')
    }
     
  }

}
module.exports = resolvers