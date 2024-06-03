import './App.css';
import LoginButton from './components/auth/auth_btns/loginButton';
import LogoutButton from './components/auth/auth_btns/logoutButton';
import 'bootstrap/dist/css/bootstrap.min.css';
 
function App() {
    return (
        <>
            <nav className="navbar bg-dark">
                <div className="container-fluid">
                    <span className="appName">
                        React User Authentication</span>
                </div>
            </nav>
            <LoginButton />
            <LogoutButton />
        </>
    );
}
 
export default App;
