import React, { useState } from "react"
import { Keyboard } from "react-native";
import { Searchbar, Text } from "react-native-paper"

export default function SearchBarComponents({seachInput}) {
  const [search, setSearch] = useState('');

  const handleChangeUpdate = (query) => {
    setSearch(query); 
  }

  const handleSubmit = () => {
    seachInput(search)
    Keyboard.dismiss();
  };
  

  const searchbarRef = React.createRef();

  return (
    <Searchbar
      placeholder="Type Here..."
      onChangeText={handleChangeUpdate}
      value={search}
      ref={searchbarRef}
      onSubmitEditing={handleSubmit}
      onIconPress={handleSubmit}
      style={{backgroundColor: 'white', borderRadius: 10, elevation: 10, marginEnd: 10, marginStart: 10}}
    />
  );
}