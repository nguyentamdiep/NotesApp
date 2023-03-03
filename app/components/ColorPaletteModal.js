import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

const ColorPaletteModal = ({visible, onClose, onSelect}) => {
  const [radioButtons, setRadioButtons] = useState([
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Note Color',
        value: 'option1',
        selected: true,
    },
    {
        id: '2',
        label: 'Background Color',
        value: 'option2',
        selected: false,
    }
  ]);
  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    
}
 // const [modalVisible, setModalVisible] = useState(false);
 const colors = ['#dbb2ff', '#00FF7F', '#4682B4', '#F0E68C', '#7FFFD4', '#A52A2A', '#E9967A', '#FF1493', '#008000', '#D2691E', '#FFE4B5', '#FFC0CB'];
 
 const handleSelectColor1=()=>{
    onSelect(colors[0], radioButtons[1].selected);
    onClose();

 }

 const handleSelectColor2=()=>{
    onSelect(colors[1], radioButtons[1].selected);
    onClose();

 }

 const handleSelectColor3=()=>{
    onSelect(colors[2], radioButtons[1].selected);
    onClose();

 }

 const handleSelectColor4=()=>{
    onSelect(colors[3], radioButtons[1].selected);
    onClose();

 }

 const handleSelectColor5=()=>{
    onSelect(colors[4], radioButtons[1].selected);
    onClose();

 }

 const handleSelectColor6=()=>{
    onSelect(colors[5], radioButtons[1].selected);
    onClose();

 }

 const handleSelectColor7=()=>{
    onSelect(colors[6], radioButtons[1].selected);
    onClose();

 }

 const handleSelectColor8=()=>{
    onSelect(colors[7], radioButtons[1].selected);
    onClose();

 }

 const handleSelectColor9=()=>{
    onSelect(colors[8], radioButtons[1].selected);
    onClose();

 }

 const handleSelectColor10=()=>{
    onSelect(colors[9], radioButtons[1].selected);
    onClose();

 }

 const handleSelectColor11=()=>{
    onSelect(colors[10], radioButtons[1].selected);
    onClose();

 }

 const handleSelectColor12=()=>{
    onSelect(colors[11], radioButtons[1].selected);
    onClose();

 }


  return (
        <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <RadioGroup 
            layout='row'
            radioButtons={radioButtons} 
            onPress={onPressRadioButton} 
        />
            <Text style={styles.modalText}>Select Color:</Text>
            <View style={styles.row}>
                
              <Pressable
                style={[styles.button, {backgroundColor:colors[0]}]}
                onPress={handleSelectColor1}>
              </Pressable>
                
              <Pressable
                style={[styles.button, {backgroundColor:colors[1]}]}
                onPress={handleSelectColor2}>
              </Pressable>

              <Pressable
                style={[styles.button, {backgroundColor:colors[2]}]}
                onPress={handleSelectColor3}>
              </Pressable>

              <Pressable
                style={[styles.button, {backgroundColor:colors[3]}]}
                onPress={handleSelectColor4}>
              </Pressable>

              <Pressable
                style={[styles.button, {backgroundColor:colors[4]}]}
                onPress={handleSelectColor5}>
              </Pressable>

              <Pressable
                style={[styles.button, {backgroundColor:colors[5]}]}
                onPress={handleSelectColor6}>
              </Pressable>

              <Pressable
                style={[styles.button, {backgroundColor:colors[6]}]}
                onPress={handleSelectColor7}>
              </Pressable>

              <Pressable
                style={[styles.button, {backgroundColor:colors[7]}]}
                onPress={handleSelectColor8}>
              </Pressable>

              <Pressable
                style={[styles.button, {backgroundColor:colors[8]}]}
                onPress={handleSelectColor9}>
              </Pressable>

              <Pressable
                style={[styles.button, {backgroundColor:colors[9]}]}
                onPress={handleSelectColor10}>
              </Pressable>

              <Pressable
                style={[styles.button, {backgroundColor:colors[10]}]}
                onPress={handleSelectColor11}>
              </Pressable>

              <Pressable
                style={[styles.button, {backgroundColor:colors[11]}]}
                onPress={handleSelectColor12}>
              </Pressable>
            
            </View>
            
      
            
            
          </View>
        </View>
      </Modal>
      
      </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    
  },
  row:{
    flexDirection:'row',
    flexWrap:'wrap',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 50,
    padding: 10,
    elevation: 2,
    width: 30,
    height:30,
    backgroundColor: '#00FF7F',
    marginBottom: 15,
    marginHorizontal: '1.5%',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ColorPaletteModal;