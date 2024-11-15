import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import TransactionPage from './pages/TransactionPage';
import NotFound from './pages/NotFound';
import Header from './components/ui/Header';
import { Route, Routes } from 'react-router-dom';
import { useQuery, useReadQuery } from '@apollo/client';
import { GET_AUTHENTICATED_USER } from './graphql/queries/user.query';
import { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
function App() {
	const {loading, data, error}= useQuery(GET_AUTHENTICATED_USER);
	console.log("Loading", loading);
	console.log("Error", error);
	console.log("Authenticated user", data);

	if(loading)return null;

	return (
		<>
			{data?.authUser && <Header />}
			<Routes>
				 <Route path='/' element={ data?.authUser ?  <HomePage />  :<Navigate to="/login"/>  } /> 
				<Route path='/login' element={ !data.authUser ?  <LoginPage /> :<Navigate to="/"/>  }  />
				 <Route path='/signup' element={ !data.authUser ? <SignUpPage/>:<Navigate to="/"/>} />
				<Route path='/transaction' element={data?.authUser ? <TransactionPage /> :<Navigate to="/login"/> } />
				<Route path='/transaction/:id' element={<TransactionPage />} />
				<Route path='*' element={<NotFound />} />

			</Routes>
			<Toaster/>
		</>
	);
}
export default App;

