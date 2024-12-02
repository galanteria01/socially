import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import './App.css';
import MenuBar from './components/MenuBar';
import { AuthProvider } from './context/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';
import UserProfile from './pages/UserProfile';
import AuthRoute from './utils/AuthRoute';
import Peoples from './pages/Peoples';


function App() {
	return (
		<AuthProvider>
			<Router>
				<Container>
					<MenuBar />
					<Route exact path='/' component={Home} />
					<Route exact path='/peoples' component={Peoples} />
					<AuthRoute exact path='/login' component={Login} />
					<AuthRoute exact path='/register' component={Register} />
					{/* <Route exact path='/:id' component={UserProfile} /> */}
					<Route exact path="/posts/:postId" component={SinglePost} />
					<Route exact path="/user" component={UserProfile} />
				</Container>
			</Router>
		</AuthProvider>
	);
}

export default App;
