/*
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/

//Hola este es un comentario por Roll
//Ahora voy yoooooo
//3rd

import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    Button
} from 'react-native'

import { API, graphqlOperation } from 'aws-amplify'
import { createOSvCApp } from './src/graphql/mutations'
import { listOSvCApps } from './src/graphql/queries'
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

const initialState = { name: '', description: '' }

const App = () => {
    const [formState, setFormState] = useState(initialState)
    const [OSvCApps, setOSvCApps] = useState([])

    useEffect(() => {
        fetchOSvCApps()
    }, [])

    function setInput(key, value) {
        setFormState({ ...formState, [key]: value })
    }

    async function fetchOSvCApps() {
        try {
            const OSvCAppData = await API.graphql(graphqlOperation(listOSvCApps))
            const OSvCApps = OSvCAppData.data.listOSvCApps.items
            setOSvCApps(OSvCApps)
        } catch (err) { console.log('error fetching OSvCApps') }
    }

    async function addOSvCApp() {
        try {
            const OSvCApp = { ...formState }
            setOSvCApps([...OSvCApps, OSvCApp])
            setFormState(initialState)
            await API.graphql(graphqlOperation(createOSvCApp, { input: OSvCApp }))
        } catch (err) {
            console.log('error creating OSvCApp:', err)
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={val => setInput('name', val)}
                style={styles.input}
                value={formState.name}
                placeholder="Name"
            />
            <TextInput
                onChangeText={val => setInput('description', val)}
                style={styles.input}
                value={formState.description}
                placeholder="Description"
            />
            <Text>Imagine CX!</Text>
            <Image source={{uri: 'https://imaginecx.custhelp.com/euf/assets/images/ImagineCXLogo2.png'}}
                style={{width: 500, height: 400}} />
            <Button title="Create OSvCApp" onPress={addOSvCApp} />
            {
                OSvCApps.map((OSvCApp, index) => (
                    <View key={OSvCApp.id ? OSvCApp.id : index} style={styles.OSvCApp}>
                        <Text style={styles.OSvCAppName}>{OSvCApp.name}</Text>
                        <Text>{OSvCApp.description}</Text>
                    </View>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    OSvCApp: { marginBottom: 15 },
    input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
    OSvCAppName: { fontSize: 18 }
})

export default App