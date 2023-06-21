import React, {useEffect} from 'react';
import {View, Button,Text} from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {useState} from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const[update,setUpdate] = useState('');
  const[updateName,setUpdateName] = useState([]);
  useEffect(() => {
    fetchAndStoreData();
  }, []);

  const fetchAndStoreData = async () => {
    try {
      const response = await fetch(
        'http://192.168.1.13:3000/todos',
      );
      const data = await response.json();
      setData(data);
      const filePath = RNFS.DocumentDirectoryPath + '/data.txt';
      await RNFS.writeFile(filePath, JSON.stringify(data), 'utf8');

      console.log('Data stored in file:', filePath);
    } catch (error) {
      console.log('Error fetching or storing data:', error);
    }
  };

  const shareFile = async () => {
    try {
      const filePath = RNFS.DocumentDirectoryPath + '/data.txt';

      await Share.open({
        url: 'file://' + filePath,
        type: 'text/plain',
        title: 'Share Data',
      });
    } catch (error) {
      console.log('Error sharing file:', error);
    }
  };

//   const downloadFile = async () => {
//     try {
//       const filePath = RNFS.DocumentDirectoryPath + '/data.txt';
//       const fileUri = 'file://' + filePath;

//       const options = {
//         fromUrl: fileUri,
//         toFile: RNFS.DownloadDirectoryPath + '/data.txt',
//       };

//       const downloadResult = await RNFS.downloadFile(options);
//       console.log('File downloaded:', downloadResult);
//     } catch (error) {
//       console.log('Error downloading file:', error);
//     }
//   };
function deleteData(id){
    // alert(`Deleted1{id}`);
    fetch(`http://192.168.1.13:3000/todos/${id}`,{
      method: 'DELETE'
    
    }).then((result)=>{
      result.json().then((resp)=>{
        console.log(resp);
        fetchAndStoreData();
       
      })
    })
    


    
     }
     const handleSubmit = () => {
      fetch("http://192.168.1.13:3000/todos", {
        method: "POST",
        body: JSON.stringify({
          "id":"28",
          "todo":"ahmed"
        }),
  
        headers: {
         
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          fetchAndStoreData();
        });
    };
    function updateUser() {
      console.log("Update it",updateName);
      fetch(`https://gocathlab4.aidbox.app/fhir/Patient/${update}`, {
        method: "PUT",
        body: JSON.stringify({
         "todo": [updateName] ,
        }),
  
        headers: {
          Authorization: "Basic YmFzaWM6d29ybGQ=",
          credentials: "include",
          Accept: "application/json",
          "Content-type": "application/json",
        },
      }).then((result) => {
        result.json().then((resp) => {
          console.log(resp);
          fetchAndStoreData();
        });
      });
    }
    function selectUser(id, name) {
      console.log("id is", id);
  
      // console.log(item.entry[0].resource)
      setUpdate(id);
      setUpdateName(name);
    }
    console.log("here is id", update);
    console.log("name of updateNameState is", updateName);
  return (
    <View>
      <Button title="Save Data" onPress={handleSubmit} />
      <Button title="Share File" onPress={shareFile} />
      <Button title="Create" />
      <Button title="Update User Data" onPress={updateUser}/>
      
      

      <View>
{data.map(_user=><Text key={_user.id}>{_user.todo}
    <Button title="Delete" onPress={()=>deleteData(_user.id)} />
    <Button title="Update" onPress={()=>selectUser(_user.id,_user.todo)}/>
</Text>)}
</View>
    </View>
  );
};

export default App;
