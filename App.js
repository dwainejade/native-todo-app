import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler'
import React from 'react';
import { StyleSheet, Text, SafeAreaView, ImageBackground, View } from 'react-native';
import { TodoProvider } from './components/TodoContext';
import TodoList from './components/TodoList';

export default function App() {
  const image = { uri: "https://www.designbolts.com/wp-content/uploads/2018/05/Beautiful-Nature-Apple-iPhone-X-Wallpaper-1.jpg" };

  return (
    <TodoProvider>
      <View style={styles.container}>
        <ImageBackground source={image} style={[StyleSheet.absoluteFill, styles.image]}>
        </ImageBackground>
        <SafeAreaView style={styles.main}>
          <TodoList  />
          <StatusBar  style="auto" />
        </SafeAreaView>
      </View>
    </TodoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  main: {
    flex: 1,
    width: '100%'
  },
  image: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    resizeMode: 'cover',
    // width:400
  }
});
