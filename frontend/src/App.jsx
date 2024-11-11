import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import TransactionPage from './pages/TransactionPage';
import NotFound from './pages/NotFound';
import Header from './components/ui/Header';
import { Route, Routes } from 'react-router-dom';

function App() {
	const authUser = true;
	return (
		<>
			{authUser && <Header />}
			<Routes>
				{/* <Route path='/' element={<HomePage />} /> */}
				{/* <Route path='/login' element={<LoginPage />} /> */}
				<Route path='/signup' element={<SignUpPage />} />
				{/* <Route path='/transaction/:id' element={<TransactionPage />} /> */}
				{/* <Route path='*' element={<NotFound />} /> */}
			</Routes>
		</>
	);
}
export default App;

