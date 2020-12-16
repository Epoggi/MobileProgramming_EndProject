import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Image, FlatList, Alert } from 'react-native';
import { styles }  from '../stuff/Styles';
import * as SQLite from 'expo-sqlite';
import { Camera } from 'expo-camera';

export default function f2() {
const [hasCameraPermission, setPermission] =useState(null);
const [photoName, setPhotoName] = useState('');
const [photoBase64, setPhotoBase64] = useState('');
const [pics, setPics] = useState ([]);

const camera = useRef(null);

useEffect(() => {
  askCameraPermission();
}, []);

const db = SQLite.openDatabase('picsdb.db')

const updateList = () =>  {
  db.transaction(tx => {
    tx.executeSql('select * from pics;', [], (_, {rows}) =>
    setPics(rows._array)
    );
  });
}

useEffect(()=> {
  db.transaction(tx=> {
    tx.executeSql('create table if not exists pics (id integer primary key not null, name text, base text);');
  }, sqlError, updateList);
})

const askCameraPermission = async () => {
  const { status } = await Camera.requestPermissionsAsync();
  if (status === 'granted') {
      setPermission(true)
  }
}
  const snap = async () => {
    if (camera) {
      const photo = await camera.current.takePictureAsync({base64: true});
      setPhotoName(photo.uri);
      setPhotoBase64(photo.base64);

      db.transaction(tx =>{
        tx.executeSql('insert into pics (name, base) values (?, ?);',
                    [photo.uri, photo.base64]);
      }, sqlError, updateList)
    }
  }
  const sqlError = (props) => {
    console.log('SQLite error' + props )
    Alert.alert('SQLite error', 'SQLite error in: ' + props,
        [{ text: 'ok' },
        { text: 'oh god' },
        { text: 'what do?' }],
        { cancelable: false })
}

  return (
  
        <View style={{flex:1}}>
          {hasCameraPermission ?
        (
          <View style={{flex:1}}>
            <Camera style={{flex:4}} ref={camera}/>
            <View>
              <Button title="Snap" onPress={snap}/>
            </View>
            <View style={{flex:4}}>
            <FlatList
            style={{marginLeft: "5%"}}
            keyExtractor = {item => item.id.toString()}
            renderItem={({item}) =>
            <View>
              <Text>{item.name}</Text>
              <Image style={{flex:1}}
              source={{uri: item.name}}/>
            </View>
          }
          data ={pics}
            />
            </View>
          </View>
        )   : ( <Text>No access to camera</Text>)}
   
      </View>
  )}
 /*  <Image style={{flex:1}}
              source={{uri:photoName}}/>
              <Image style={{flex:1}}
              source={{uri: `data:image/gif;base64,${photoBase64}`}}/> */