import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useState } from 'react';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as Asset from 'expo-asset';

//expo install expo-print
//expo install expo-sharing
//expo install expo-file-system
//expo install expo-asset

export default function App() {
  const [name, setName] = useState('');

  const generatePdf = async () => {
    // const imageAsset = Asset.fromModule(require('./assets/splash.png'));
    //
    // console.log('imageAsset', imageAsset);
    //
    // await imageAsset.downloadAsync();
    // const imageUri = imageAsset.localUri;
    //
    // const base64Image = await FileSystem.readAsStringAsync(imageUri, {
    //   encoding: FileSystem.EncodingType.Base64,
    // });

    const html = `
    <html>      
         <body> 
            <h1>Hi ${name}</h1> 
             <img src="data:image/png;base64,${base64Image}" alt="logo" style="width: 50px; height: 50px"/> 
            <p style="color: red; font-size: 16px">Hello.</p>        
            <p style="color: red; font-size: 16px">Bonjour</p>        
            <p style="color: red; font-size: 16px">Hola</p>        
         </body>
     </html>
    `;

    const file = await printToFileAsync({
      html: html,
      base64: false,
    });
    const fileName = 'example.pdf';

    await FileSystem.moveAsync({
      from: file.uri,
      to: FileSystem.documentDirectory + fileName,
    });

    await shareAsync(FileSystem.documentDirectory + fileName, {
      mimeType: 'application/pdf',
      dialogTitle: 'Share PDF',
      UTI: 'com.adobe.pdf',
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput value={name} placeholder={'name'} onChangeText={(value) => setName(value)} style={styles.textInput} />
      <Button title={'Generate PDF'} onPress={generatePdf} />
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
  textInput: {
    alignSelf: 'stretch',
    padding: 8,
    margin: 10,
  },
});
