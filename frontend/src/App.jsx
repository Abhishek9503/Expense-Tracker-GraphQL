import { useState } from 'react'
import './App.css'

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
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
}
export default App;

export default App
