import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { executeQuery } from '../database/db';

export default function CreatePost({ navigation, user }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');

  const handleCreatePost = async () => {
    if (description.length > 255 || phone.length > 11) {
      alert('Descrição ou telefone inválido');
      return;
    }
    try {
      await executeQuery(
        'INSERT INTO posts (name, description, phone, user_id) VALUES (?, ?, ?, ?)',
        [name, description, phone, user.id] // Save post with logged user's ID
      );
      alert('Post criado com sucesso');
      navigation.navigate('Posts'); // Navigate to Posts page
    } catch (error) {
      alert('Erro ao criar post');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nome:</Text>
      <TextInput style={styles.input} onChangeText={setName} value={name} />

      <Text>Descrição:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        maxLength={255}
      />

      <Text>Telefone:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPhone}
        value={phone}
        maxLength={11}
        keyboardType="phone-pad"
      />      

      <Button title="Publicar" onPress={handleCreatePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, marginVertical: 10, padding: 10 },
  image: { width: 100, height: 100, marginTop: 10 },
});
