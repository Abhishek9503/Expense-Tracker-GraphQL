
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import GridBackground from './components/ui/GridBackground.jsx';
import ReactDOM from 'react-dom';
import React from 'react';

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

//TODO: Update the uri on production
const client = new ApolloClient({
	uri:import.meta.env.VITE_NODE_ENV ==="developmnet"? 'http://localhost:4000/graphql' :"/graphql",  // the URL of our GraphQL server
	cache: new InMemoryCache(), // Apollo Client uses a cache to store the results of queries
	credentials: 'include', //tells the server to include the cookies in the request
  });

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<GridBackground>
				<ApolloProvider client={client}>
				<App />
				</ApolloProvider>
			</GridBackground>
		</BrowserRouter>
	</React.StrictMode>
);