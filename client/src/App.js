import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import './App.css';
import Books from './components/Books';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  // cache: new InMemoryCache()
});

function App() {
  return (
    <div className="App">
      <Books/>
    </div>
    );
}

export default App;
