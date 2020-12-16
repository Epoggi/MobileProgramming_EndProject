import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { styles }  from '../stuff/Styles';
import { Icon, Button} from 'react-native-elements'

export default function Main({navigation}) {

  return (

    <View style={styles.screen}>
    <Text>Hei vain, Ensimmäisenä esittelen Ohjelmointi Projekti 2 kurssilla tuotettua koodia.</Text>
    <Text>Checklistan sain toimimaan Teemu Havulinnan kanssa, sekä card elementti ja asettelu on Niina Blommin käsialaa</Text>
    <Text>Muu koodi on omaa käsialaa, osittain opettajien avustuksella toki.</Text>
    <Button title='Api,checklist,imgslider' onPress={()=>{navigation.navigate('Api,Checklist,ImgSlider')}}/>
    <Text>Seuraavalla sivulla on puhelimen kameran käyttö ja kuvan tallettaminen SqLitellä</Text>
    <Button title='Camera,SqLite' onPress={()=>{navigation.navigate('Camera,SqLite')}}/>
   </View>
  );
}
