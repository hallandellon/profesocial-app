import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { setupDatabase } from './database/db';
import Home from './screens/Home';
import Register from './screens/Register';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Professionals from './screens/Professionals';
import Posts from './screens/Posts';
import CreatePost from './screens/CreatePost';  // Import the CreatePost screen

const Drawer = createDrawerNavigator();

export default function App() {
  const [user, setUser] = useState(null); // Tracks logged-in user

  useEffect(() => {
    const initDatabase = async () => {
      try {
        await setupDatabase();
        console.log('Database initialized');
      } catch (error) {
        console.error('Database initialization error:', error);
      }
    };

    initDatabase();
  }, []);

  const RenderLogin = (props) => <Login {...props} setUser={setUser} />;
  const RenderProfessionals = (props) => <Professionals {...props} user={user} />;
  const RenderProfile = (props) => <Profile {...props} user={user} />;
  
  const handleLogout = (props) => {
    setUser(null); // Clear user state (log out)
    props.navigation.navigate('Entrar'); // Navigate to the Login screen
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        {!user && <Drawer.Screen name="Cadastrar" component={Register} />}
        {!user && <Drawer.Screen name="Entrar" component={RenderLogin} />}
        <Drawer.Screen name="Profissionais" component={RenderProfessionals} />
        {user && <Drawer.Screen name="Publicações" component={Posts} />}
        {user && <Drawer.Screen name="Perfil" component={RenderProfile} />}
        {user && <Drawer.Screen name="Criar Publicação" component={CreatePost} />}
        {user && (
          <Drawer.Screen
            name="Sair"
            component={Profile} // We can keep any component here since it's used for triggering logout only
            listeners={({ navigation }) => ({
              focus: () => handleLogout(navigation), // Pass the navigation prop to handleLogout
            })}
          />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
