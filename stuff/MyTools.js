const dataFetch = (fetchString) => {
    let url = `http://open-api.myhelsinki.fi/v1/activities/?${fetchString}language_filter=fi&limit=20`
    let activities
    fetch(url)
        .then(response => response.json())
        .then(data => {
            activities = data.data;
        })
        .catch((error) => {
            Alert.alert('Something went wrong', error);
        })
        return(activities)
}