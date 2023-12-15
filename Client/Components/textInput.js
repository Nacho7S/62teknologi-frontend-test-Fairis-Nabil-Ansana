import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Styles } from '../Styles/styles';

export default function TextInputComp({ label, handleSubmitText }) {
  const [textValue, setTextValue] = useState('');

  const handleChange = (text) => {
    setTextValue(text);
  };

  const handleSubmit = () => {
    // console.log(textValue);
    handleSubmitText(textValue)
  };

  return (
    <View>
      <TextInput
        label={label}
        style={Styles.textInput}
        onChangeText={handleChange}
        onSubmitEditing={handleSubmit}
        value={textValue}
      />
    </View>
  );
}
