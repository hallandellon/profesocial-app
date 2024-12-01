import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Home({ navigation, setUser }) {
  const handleLogout = () => {
    setUser(null);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Rede do Marceneiro</Text>
      <Text style={styles.description}>
        Descubra profissionais, conecte com marceneiros e contrate experts para seus trabalhos.
      </Text>
      <Button title="Encontrar profissionais" onPress={() => navigation.navigate('Profissionais')} />
      {setUser && <Button title="Logout" onPress={handleLogout} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 15 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { textAlign: 'center', marginBottom: 20 },
});
