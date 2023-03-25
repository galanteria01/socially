import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react'
import { AuthContext } from '../context/auth';

const MenuBar = () => {

    const pathName = window.location.pathname;
    const path = pathName === "/" ? 'home' : pathName.substr(1);
    const [active, setActive] = useState(path);

    const handleItemClick = (e, { name }) => setActive(name)
    
    const logUserOut = () => {
        handleItemClick();
        logout();
        
    }


    const { user, logout } = useContext(AuthContext);

    return (
        user ?
            <Menu pointing secondary size="massive" color="green">
                <Menu.Item
                    name="home"
                    active={active === 'home'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/"
                >
                    <Icon name="home" />
                    Home
                </Menu.Item>
                
                <Menu.Menu position='right'>
                    <Menu.Item
                        name={user.username}
                        onClick={handleItemClick}
                        as={Link}
                        to="/"
                    >
                        <Icon name="user"/>
                        {user.username}
                    </Menu.Item>
                    <Menu.Item
                        name='logout'
                        active={active === 'logout'}
                        onClick={logUserOut}
                        as={Link}
                        to="/login"
                    >
                        <Icon name="sign out alternate icon"></Icon>
                        Logout
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            : 
            <Menu pointing secondary size="massive" color="green">
                <Menu.Item
                    name='home'
                    active={active === 'home'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/"
                >
                    <Icon name="home" />
                    Home
                </Menu.Item>
                
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='login'
                        active={active === 'login'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/login"
                    >
                        <Icon name="sign-in" />
                        
                    Login

                    </Menu.Item>
                    <Menu.Item
                        name='register'
                        active={active === 'register'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/register"
                    >
                        <Icon name="user plus" />
                    Register

                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            
            

    )
}

export default MenuBar
