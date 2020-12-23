import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Alert, } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { styles } from '../stuff/Styles';
import { Card } from 'react-native-elements';

/*  import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Alert } from 'react-native';
import { Card,  } from 'react-native-elements';
import { styles }  from '../stuff/Styles';
import CheckBox from '@react-native-community/checkbox';

export default function f3() {
   const [allEventTags, setAllEventTags] = useState([]);
   const [events, setEvents] = useState([]);
   const [checklistTags, setChecklistTags] = useState([]);
   const [tagFilter, setTagFilter] = useState('');
   let array = Object.values(allEventTags); */
export default function f3() {
    // Selected item tags
    const [currentTags, setCurrentTags] = useState([]);
    // List for all tags 
    const [allTags, setAllTags] = useState([]);
    const [events, setEvents] = useState([]);
    // List of selected tags
    const [selectedTags, setSelectedTags] = useState([]);
    // String inside the dataFetch url
    const [tagFilter, setTagFilter] = useState('');
    // Get list of activities and tags
    let array = Object.values(allTags);

    const dataFetch = () => {
        let url = `http://open-api.myhelsinki.fi/v1/events/?${tagFilter}language_filter=fi&limit=20`

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setEvents(data.data);
                setCurrentTags(data.tags);
                if (allTags.length === 0) {
                    setAllTags(data.tags)
                }
            })
            .catch((error) => {
                Alert.alert('Something went wrong', error);
            })
    }
    //useEffect filter that changes when user selects new tags
    useEffect(() => {
        filterString();
    }, [selectedTags]);

    //useEffect for new filter
    useEffect(() => {
        dataFetch();
    }, [tagFilter]);

    const filterString = () => {
        let str = ('tags_search=');
        // For loop of selected tags and creating string to url
        if (selectedTags.length > 0) {
            for (let i = 0; i < selectedTags.length; i++) {
                
                if (selectedTags[i + 1]) {
                    //If after a tag comes a tag
                    str = str.concat(selectedTags[i].replace("&", "%26").replace(/\s+/g, "%20") + "%2C")
                } else {
                    //If a tag is the last one 
                    str = str.concat(selectedTags[i].replace("&", "%26").replace(/\s+/g, "%20") + '&')
                }
                setTagFilter(str)
            }
        }
        else {
            setTagFilter('')
        }
    }

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
    //Change users selection of tags
    const tagSelection = (newValue, tag) => {
        if (newValue === true) {
            setSelectedTags([...selectedTags, tag])
        } else {
            setSelectedTags(selectedTags.filter((current) => current !== tag))
        }
    }

    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row' }}>
            
            <CheckBox
                disabled={false}
                value={
                    selectedTags.indexOf(item) >= 0
                }
                onValueChange={(newValue) => { tagSelection(newValue, item) }}
            //If oncheck value is true, add to list
            />
            <Text style={{width:80}}>{item}</Text>
        </View>
    )


    return (

        <View style={styles.screen}>

            <View style={styles.smallcontainer}>

                <FlatList data={array}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={listSeparator}
                    renderItem={renderItem} 
                    numColumns={3}
                    />
            </View>
            <View style={styles.listcontainer}>
                <FlatList
                    style={{ marginLeft: "0%", height: 150 }}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Card>
                            <Card.Title>
                                {item.name.fi}
                            </Card.Title>
                            <Card.Divider />
                           
                        </Card>
                    )}
                    ItemSeparatorComponent={listSeparator} data={events} />

            </View>
        </View>



    );
}

/*

   const dataFetch = () => {
       let url = `http://open-api.myhelsinki.fi/v1/events/?${tagFilter}language_filter=fi&limit=20`

       fetch(url)
           .then(response => response.json())
           .then(data => {
               setEvents(data.data);
               setCurrentTags(data.tags);
               if (allEventTags.length === 0) {
                   setAllEventTags(data.tags)
               }
           })
           .catch((error) => {
               Alert.alert('Something went wrong', error);
           })
   }
   //useEffect filter that changes when user selects new tags
   useEffect(() => {
       createFilterTagsString();
   }, [checklistTags]);

   //useEffect for new filter
   useEffect(() => {
       dataFetch();
   }, [tagFilter]);

   const createFilterTagsString = () => {
       let str = ('tags_search=');
       // For loop of selected tags and creating string to url
       if (checklistTags.length > 0) {
           for (let i = 0; i < checklistTags.length; i++) {
               
               if (checklistTags[i + 1]) {
                   //If after a tag comes a tag
                   str = str.concat(checklistTags[i].replace("&", "%26").replace(/\s+/g, "%20") + "%2C")
               } else {
                   //If a tag is the last one 
                   str = str.concat(checklistTags[i].replace("&", "%26").replace(/\s+/g, "%20") + '&')
               }
               setTagFilter(str)
           }
       }
       else {
           setTagFilter('')
       }
   }

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

   //Change users selection of tags
   const tagControl = (newValue, tag) => {
       if (newValue === true) {
           setChecklistTags([...checklistTags, tag])
       } else {
           setChecklistTags(checklistTags.filter((current) => current !== tag))
       }
   }

    const renderItem = ({ item }) => (
       <View style={{ flexDirection: 'row' }}>
           
           <CheckBox
               disabled={false}
               value={
                   checklistTags.indexOf(item) >= 0
               }
               onValueChange={(newValue) => { tagControl(newValue, item) }}
           />
           <Text style={{width:80}}>{item}</Text>
       </View>
   )
 

   return (

       <View style={styles.screen}>

<View style={styles.smallcontainer}>

<FlatList data={array}
    keyExtractor={(item, index) => index.toString()}
    ItemSeparatorComponent={listSeparator}
    renderItem={renderItem} 
    numColumns={3}
    />
</View>
           <View style={styles.listcontainer}>    
               <FlatList
                   style={{ marginLeft: "0%", height: 150 }}
                   keyExtractor={item => item.id}
                   renderItem={({ item }) => (
                       <Card>
                           <Card.Title>
                               {item.name.fi}
                           </Card.Title>
                           <Card.Divider />
                           <Text style={{ marginBottom: 10 }}>
                               Osoite: {item.location.address.street_address}
                           </Text>
                           <Text style={{ marginBottom: 10 }}>
                              Starts: {item.event_dates.starting_day}
                           </Text><Text style={{ marginBottom: 10 }}>
                              Ends: {item.event_dates.ending_day}
                           </Text>
                       </Card>
                   )}
                   ItemSeparatorComponent={listSeparator} data={events} />
           </View>
       </View>



   );
}
 */