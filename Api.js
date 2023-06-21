import  { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';



const Api = () => {
    const [usersData,setUsersData]=useState([])
    const getData=()=>{
        fetch("https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json")
        .then(res => res.json()).then(res =>{
            console.log(res.articles);
            setUsersData(res.articles)
          })



    //   fetch('https://dummyjson.com/todos')
    //   .then(response=>response.json())
    //   .then(data=>console.log(data));
    }
 useEffect(()=>{
    getData()
 },[]);


  return (
  
//     <View style={{ flex: 1, padding: 24 }}>
//     {
    
//     isLoading ? <Text>Loading...</Text> : 
//     ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
//         <Text style={{ fontSize: 18, color: 'green', textAlign: 'center'}}>{data.title}</Text>
//         <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>Articles:</Text>
//         <FlatList
//           data={data.articles}
//           keyExtractor={({ id }, index) => id}
//           renderItem={({ item }) => (
//             <Text>{item.id + '. ' + item.title}</Text>
//           )}
//         />
//       </View>
//     )}
//   </View>
<View>
{usersData.map(_user=><Text key={_user.id}>{_user.title}</Text>)}
</View>
  );
};


export default Api;
