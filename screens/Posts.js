import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { executeQuery } from '../database/db';

export default function Posts({ user, navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const result = await executeQuery('SELECT * FROM posts WHERE user_id = ?', [user.id]);  // Fetch posts by logged user
      const rows = result.rows._array;
      setPosts(rows);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await executeQuery('DELETE FROM posts WHERE id = ?', [postId]);
      fetchPosts();  // Reload posts after deletion
      alert('Post deleted successfully');
    } catch (error) {
      alert('Error deleting post');
    }
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.photo }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Nome: {item.name}</Text>
        <Text style={styles.text}>Telefone: {item.phone}</Text>
        <Text style={styles.text}>Email: {item.email}</Text>
        <TouchableOpacity onPress={() => deletePost(item.id)} style={styles.deleteButton}>
          <Text>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPost}
      />
      <Button
        title="Criar Publicação"
        onPress={() => navigation.navigate('Criar Publicação')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  postContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  image: { width: 80, height: 80, marginRight: 10, borderRadius: 5 },
  infoContainer: { flex: 1, justifyContent: 'center' },
  text: { fontSize: 16 },
  deleteButton: { marginTop: 10, backgroundColor: 'red', padding: 5, borderRadius: 5 },
});
