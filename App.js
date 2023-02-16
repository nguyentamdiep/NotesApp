import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, RefreshControl, ScrollView, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
let ListNote = [];
getData(ListNote).then(value => { ListNote = value });

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="EditNote"
          component={EditScreen}
        />
        <Stack.Screen
          name="NewNote"
          component={NewNoteScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  const [textSearch, setTextSearch] = useState('');
  const [ListNote1, setListNote1] = useState(ListNote);
  const [totalNotes, setTotalNotes] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >

      <TextInput
        style={{
          height: 40,
          padding: 10,
          borderWidth: 1,
          margin: 10,
          borderRadius: 5
        }}
        onChangeText={(textSearch) => {
          setTextSearch(textSearch);
          let x = ListNote.filter(item => {
            return item.value.includes(textSearch)
          })
          setListNote1(x);
        }}
        value={textSearch}
        placeholder="search note"
      />

      <Text>(Press 'Display Notes' to show all notes. Press 'Display Notes' after add new a note/edit note/delete note to update newest data)</Text>

      <View
        style={{
          flex: 1,
          flexDirection: 'row'
        }}
      >
        <TouchableOpacity
          onPress={() => { setListNote1(ListNote), setTotalNotes(ListNote.length) }}
          style={{
            backgroundColor: '#FAEBD7',
            color: 'white',
            padding: 10,
            margin: 10,
            width: '31%',
            borderRadius: 5
          }}
        >
          <Text>Display Notes:</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('NewNote')}
          style={{
            backgroundColor: '#FAEBD7',
            color: 'white',
            padding: 10,
            margin: 10,
            width: '30%',
            borderRadius: 5
          }}
        >
          <Text>New Note</Text>
        </TouchableOpacity>

      </View>

      <Text> {"Số lượng các ghi chú: " + totalNotes}</Text>

      <View
        style={{
          flex: 1,
          padding: 5
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {
            ListNote1.map(
              (item) => (
                <TouchableOpacity
                  key={ListNote.indexOf(item) + Math.random()}
                  onPress={() =>
                    navigation.navigate('EditNote', { item: item })
                  }
                  style={{
                    backgroundColor: 'pink',
                    padding: 10,
                    margin: 10,
                    borderRadius: 5,
                    width: '40%',

                  }}
                >
                  <Text>{item['value'].substring(0, 30) + "..."}</Text>
                </TouchableOpacity>

              )

            )
          }
        </View>

      </View>


    </ScrollView>

  );
};

const NewNoteScreen = ({ navigation }) => {
  const [text, onChangeText] = useState('');

  return (
    <ScrollView>
      <TextInput
        style={{
          height: 500,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          textAlignVertical: 'top'
        }}

        onChangeText={(text) => { onChangeText(text) }}
        value={text}
        multiline={true}

      />

      <TouchableOpacity
        onPress={() => { ListNote.unshift({ 'key': ListNote.length + 1, 'value': text }), storeData(ListNote), navigation.navigate('Home') }
        }
        style={{
          backgroundColor: 'pink',
          padding: 10,
          margin: 10,
          borderRadius: 5
        }}
      >
        <Text>Save</Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

const EditScreen = ({ navigation, route }) => {
  const [text, onChangeText] = useState(route.params.item['value']);
  return (
    <ScrollView>
      <Text>{route.params.index}</Text>
      <TextInput
        style={{
          height: 500,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          textAlignVertical: 'top'
        }}
        onChangeText={(text) => { onChangeText(text), ListNote.map(item => { if (item['key'] == route.params.item['key']) { item['value'] = text } }) }}
        value={text}
        multiline={true}
      />

      <View
        style={{
          flex: 1,
          flexDirection: 'row'
        }}
      >
        <TouchableOpacity
          onPress={() => { ListNote.map(item => { if (item['key'] == route.params.item['key']) { item['value'] = text } }), storeData(ListNote), navigation.navigate('Home') }}
          style={{
            backgroundColor: '#FAEBD7',
            color: 'white',
            padding: 10,
            margin: 10,
            width: '30%',
            borderRadius: 5
          }}
        >
          <Text>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => { ListNote.map(item => { if (item['key'] == route.params.item['key']) { ListNote.splice(ListNote.indexOf(item), 1) } }), storeData(ListNote), navigation.navigate('Home'), console.log(ListNote) }}
          style={{
            backgroundColor: '#FAEBD7',
            color: 'white',
            padding: 10,
            margin: 10,
            width: '30%',
            borderRadius: 5
          }}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>



    </ScrollView>
  );
};


async function storeData(value) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@storage_Key5578', jsonValue);
    console.log('luu thanh cong');
  } catch {
    // saving error
    console.log('luu that bai');
  }
};

async function getData(ListNote) {
  try {
    const value = await AsyncStorage.getItem('@storage_Key5578')
    if (value !== null) {
      ListNote = JSON.parse(value);
      console.log("read data thanh cong");
      return ListNote;
    }
    else
      return [];
  }
  catch {
    console.log("read data that bai");
  }
}





