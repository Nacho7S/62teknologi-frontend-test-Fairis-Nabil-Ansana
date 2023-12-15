import { View, Text } from 'react-native'
import React from 'react'
import SearchBarComponents from './searchBar'
import { TextInput } from 'react-native-paper'
import TextInputComp from './textInput'
import Dropdown from './Dropdown'

export default function filterMenu({handleSearch, handlePrice, handleSortBy, valueSortBy}) {
  return (
    <View>
      <SearchBarComponents seachInput={handleSearch} />
      <TextInputComp label={"Price"} handleSubmitText={handlePrice } />
      <Dropdown select={handleSortBy} valueSortBy={valueSortBy } />
      </View>
  )
}