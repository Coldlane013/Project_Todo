import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from "react";
//styles
import { Container } from './styles/appStyles';
import Home from "./components/Home";
//Storage async
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from "expo-app-loading";


export default function App() {
  // initializing app and list
  const [ready,setReady] = useState(false);
  const initialtask = [];
  const[todos,setTodos] = useState(initialtask);
// task sync
  const LoadTask = () => {
    AsyncStorage.getItem("storedTasks").then(data => {
      if (data !== null) {
        setTodos(JSON.parse(data))
      }
    }).catch((error) => console.log(error))
  }

if (!ready){
  return(
    <AppLoading
      startAsync ={LoadTask} 
      onFinish = {()=> setReady(true)}
      onError ={console.warn}
    />
  )
}
  return ( 
      <Container>
      <Home todos={todos} setTodos={setTodos} />
      <StatusBar style='light' />
    </Container>
      
  );
}
