const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs } = require('./schema/typeDefs');
const { resolvers } = require('./resolvers/resolvers');
const db = require('./config/database');

const app = express();
app.use(express.json());

// No rate limiting middleware
// No CORS configuration
// No security headers

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // No authentication context
  // No error formatting
});

async function startServer() {
  await server.start();
  
  app.use('/graphql', expressMiddleware(server, {
    // No context function for authentication
    // No error handling
  }));

  // Hardcoded port
  const PORT = 4000;
  
  app.listen(PORT, () => {
    console.log(`[DEBUG] Server running on http://localhost:${PORT}/graphql`);
    console.log(`[DEBUG] GraphQL Playground available`);
  });
}

// No error handling
startServer().catch(err => {
  console.error('[ERROR] Failed to start server:', err);
  process.exit(1);
});

