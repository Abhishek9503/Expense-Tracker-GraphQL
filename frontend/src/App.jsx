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

function App() {
	const authUser = true;
	const {loading, data, error}= useQuery(GET_AUTHENTICATED_USER);
	console.log("Loading", loading);
	console.log("Error", error);
	console.log("Authenticated user", data);

	return (
		<>
			{data?.authUser && <Header />}
			<Routes>
				<Route path='/' element={data?.authUser ? <HomePage /> :<Navigate to="/login"/> } />
				<Route path='/login' element={<LoginPage />}  />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/transaction' element={<TransactionPage />} />
				{/* <Route path='/transaction/:id' element={<TransactionPage />} /> */}
				<Route path='*' element={<NotFound />} />
			</Routes>
			<Toaster/>
		</>
	);
}
export default App;

