import { ApolloProvider } from '@apollo/client'
import './App.css'
import { client } from './constants/apollo-client'
import { RouterProvider } from 'react-router-dom'
import { router } from './components/router/Router'

function App() {

  return (
    <ApolloProvider client={client}>
       <RouterProvider router={router} />
    </ApolloProvider>
  )
}

export default App
