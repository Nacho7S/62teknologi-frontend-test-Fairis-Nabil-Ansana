import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Styles } from '../Styles/styles';

export default function DropdownComps({ select, valueSortBy }) {
  const data = [
    { label: 'Best Match', value: 'best_match' },
    { label: 'Rating', value: 'rating' },
    { label: 'Review Count', value: 'review_count' },
    { label: 'Distance', value: 'distance' }
  ];

  const [value, setValue] = useState(valueSortBy || null);

  return (
    <Dropdown
      style={[Styles.textInput, Styles.dropdown]}
      placeholderStyle={Styles.placeholderStyle}
      selectedTextStyle={Styles.selectedTextStyle}
      inputSearchStyle={Styles.inputSearchStyle}
      iconStyle={Styles.iconStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Sort By"
      searchPlaceholder="Search..."
      value={value}
      onChange={(item) => {
        setValue(item.value);
        select(item.value);
      }}
      renderLeftIcon={() => (
        // <AntDesign style={Styles.icon} color="black" name="Safety" size={20} />
        <Text style={{fontSize: 16, marginStart: 10, fontWeight: 'bold'}}>Sort By: </Text>
      )}
    />
  );
}
