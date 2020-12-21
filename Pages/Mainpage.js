import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../stuff/Styles';
import { Icon, Button } from 'react-native-elements';
import { catApi_key } from '../Private/config';
import { SliderBox } from 'react-native-image-slider-box';


export default function Main({ navigation }) {

  const [cats, setCats] = useState([]);
  const getImages = (images) => images.map(image => image.url);

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = () => {
    let url = `https://api.thecatapi.com/v1/images/search?limit=3&api_key=${catApi_key}`

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setCats(data);
      })
      .catch((error) => {
        Alert.alert('Something went wrong', error);
      })
  }
  const justCats = (cats) => {
    let picArray = [];
    for (let i = 0; i < cats.length; i++) {
      picArray.concat(cats[i].url)
    }
    return picArray
  }

  return (

    <View style={styles.screen}>
      <View style={styles.smallcontainer}>
        <Text>The SliderBox</Text>
        <SliderBox
          resizeMethod={'resize'}
          resizeMode={'cover'}
          parentWidth={280}
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
          images={getImages(cats)} />
      </View>
      <View style={styles.smallcontainer}>
        <Button title='Api_usage' onPress={() => { navigation.navigate('Api,Checklist,ImgSlider') }} />
        <Button title='Camera,SqLite' onPress={() => { navigation.navigate('Camera,SqLite') }} />
      </View>
    </View>
  );
}
