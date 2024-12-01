import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { executeQuery } from '../database/db';

export default function Login({ navigation, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const result = await executeQuery('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
      if (result.rows.length > 0) {
        setUser(result.rows._array[0]);
        navigation.navigate('Home');
      } else {
        alert('Dados Inválidos');
      }
    } catch (error) {
      alert('Erro ao entrar');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput style={styles.input} onChangeText={setEmail} value={email} />
      <Text>Senha:</Text>
      <TextInput style={styles.input} onChangeText={setPassword} value={password} secureTextEntry />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, marginVertical: 10, padding: 10 },
});
