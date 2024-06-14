import React from 'react';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import { Route, Routes } from 'react-router-dom';

import Users from './scenes/users';
import UserForm from './scenes/userForm';
import UserFormEdit from './scenes/userFormEdit';

function App() {
	const [theme, colorMode] = useMode()

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="app">
					<Sidebar />
					<main className="content">
						<Topbar />
						<Routes>
							<Route path='/' element={<Users />}/>
							<Route path='/user-form' element={<UserForm />}/>
							<Route path='/user-form-edit' element={<UserFormEdit />}/>
						</Routes>
					</main>
				</div>
			</ThemeProvider>
			
		</ColorModeContext.Provider>
		
	);
}

export default App;
