import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { executeQuery } from '../database/db';

export default function Profile({ user, navigation }) {
  const [email, setEmail] = useState(user?.email || '');
  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState(user?.password || '');

  const handleSave = async () => {
    try {
      await executeQuery(
        'UPDATE users SET email = ?, username = ?, password = ? WHERE id = ?',
        [email, username, password, user.id]
      );
      alert('Perfil atualizado com sucesso');
    } catch (error) {
      alert('Erro ao atualizar perfil');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text>Usuário:</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} />
      <Text>Senha:</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Salvar" onPress={handleSave} />
      <Button title="Voltar para Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, marginVertical: 10, padding: 10 },
});
