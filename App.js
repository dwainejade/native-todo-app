import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import 'react-native-gesture-handler'
import { Button, Menu, Provider, Divider } from 'react-native-paper';
import { TodoProvider } from './components/TodoContext';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, SafeAreaView, ImageBackground, View } from 'react-native';
import TodoList from './components/TodoList';
import { BackgroundImage } from 'react-native-elements/dist/config';


export default function App() {
  const [visible, setVisible] = useState(false);
  const images = [
    { uri: "https://www.designbolts.com/wp-content/uploads/2018/05/Beautiful-Nature-Apple-iPhone-X-Wallpaper-1.jpg" },
    { uri: "https://russfuss.com/site/assets/files/1246/maxin_iphone_wallpaper_by_russfuss_002.jpg" },
    { uri: "https://source.unsplash.com/random" },
  ]
  const [background, setBackground] = useState(images[0]);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <TodoProvider>
      <Provider>
        <View style={styles.container}>
          <View style={styles.menu}>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={<MaterialIcons onPress={openMenu} name="menu" size={30} color="white" />}>
              <Menu.Item onPress={() => { setBackground(images[0]) }} title="default bg" />
                {/* <Divider/> */}
              <Menu.Item onPress={() => { setBackground(images[2]) }} title="random bg" />
            </Menu>
          </View>
          <ImageBackground source={ background } style={[StyleSheet.absoluteFill, styles.image]}></ImageBackground>
          <SafeAreaView style={styles.main}>
            <Menu />
            <TodoList />
            <StatusBar style="auto" />
          </SafeAreaView>
        </View>
      </Provider>
    </TodoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor:'black' 
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
  },
  menu: {
    position: 'absolute',
    // backgroundColor:'red',
    height: 50,
    zIndex: 10,
    top: '5.5%',
    right: "5%"
  }
});
