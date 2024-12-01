import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { db } from '../database/db'; // Import db object

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle user registration
  const handleRegister = () => {
    // Check if db is defined before using it
    if (!db) {
      alert('Database connection failed');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
        [email, username, password],
        (_, result) => {
          // Success callback
          alert('Cadastro realizado com sucesso');
          navigation.navigate('Entrar');
        },
        (_, error) => {
          // Error callback
          alert('Error registering user');
          console.error(error);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput style={styles.input} onChangeText={setEmail} value={email} />

      <Text>Usuário:</Text>
      <TextInput style={styles.input} onChangeText={setUsername} value={username} />

      <Text>Senha:</Text>
      <TextInput style={styles.input} onChangeText={setPassword} value={password} secureTextEntry />      

      <Button title="Cadastrar" onPress={handleRegister} />
      
      <View style={{ height: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, marginVertical: 10, padding: 10 },
  removeButton: { backgroundColor: 'red', padding: 5, borderRadius: 5 },
});
