import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { executeQuery } from '../database/db';

export default function Professionals({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await executeQuery('SELECT * FROM posts', []);
      setPosts(result.rows._array);
    };
    fetchPosts();
  }, []);

  const renderPost = ({ item }) => (
    <View style={styles.row}>
      {item.photo && <Image source={{ uri: item.photo }} style={styles.photo} />}
      <View>
        <Text>{item.name}</Text>
        <Text>{item.description}</Text>
        {user && (
          <>
            <Text>{item.phone}</Text>
            <Text>{item.email}</Text>
          </>
        )}
      </View>
    </View>
  );

  return (
    <FlatList data={posts} renderItem={renderPost} keyExtractor={item => item.id.toString()} />
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', padding: 10, alignItems: 'center', borderBottomWidth: 1 },
  photo: { width: 50, height: 50, marginRight: 10 },
});
