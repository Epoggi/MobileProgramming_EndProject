import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import { Card, } from 'react-native-elements';
import { styles } from '../stuff/Styles';
import { catApi_key } from '../Private/config'
import { Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function f1() {
    const [cats, setCats] = useState([]);
    const [gats, setGats] = useState([]);
    const [gatId, setGatId] = useState('');

    // let array = Object.values(gats);

    const fetchGats = () => {
        let url = `https://api.thecatapi.com/v1/categories`

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setGats(data);
            })
            .catch((error) => {
                Alert.alert('Something went wrong', error);
            })
    }

    const fetchCats = () => {
        let url = `https://api.thecatapi.com/v1/images/search?category_ids=${gatId}&limit=3&api_key=${catApi_key}`

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setCats(data);
            })
            .catch((error) => {
                Alert.alert('Something went wrong', error);
            })
    }
    useEffect(() => {
        fetchGats();
    }, []);
    useEffect(() => {
        fetchCats();
    }, []);
    useEffect(() => {
        fetchCats();
    }, [gatId]);

    const listSeparator = () => {
        return (
            <View style={{
                height: 1,
                width: "90%",
                backgroundColor: "#CED0CE",
                marginLeft: "10%"
            }}
            />
        )
    }

    const clearFilter = () => {
        setGatId('')
    }

    return (

        <View style={styles.screen}>
            <View style={styles.smallcontainer}>
                <Text>Select a category of which you wish to browse wide selection of feline figures</Text>
                <Picker
                    selectedValue={gatId}
                    style={{ height: 50, width: 100 }}
                    onValueChange={value => setGatId(value)}>
                    {
                        gats.map((item) =>
                            <Picker.Item key={item.id} label={item.name} value={item.id} />)
                    }
                </Picker>
                <Button title="Clear Filter" onPress={clearFilter} />
            </View>
            <View style={styles.listcontainer}>
                <FlatList
                    style={{ marginLeft: "0%", height: 150 }}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Card>
                            <Card.Title>
                                <Text>A Cat</Text>
                            </Card.Title>
                            <Card.Divider />
                            <Image style={{ width: item.width, height: item.height, maxHeight: '100%', maxWidth: '100%' }} source={{ uri: item.url }} />
                        </Card>
                    )}
                    ItemSeparatorComponent={listSeparator} data={cats} />
            </View>
        </View>
    );
}
