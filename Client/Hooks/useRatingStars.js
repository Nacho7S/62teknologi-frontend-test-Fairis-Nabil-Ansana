import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function UseRatingStars({ rating }) {
  const totalStars = 5;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i <= rating ? 'star' : 'star-o'}
          size={15}
          color="black"
        />
      );
    }
    return stars;
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ marginEnd: 5, marginStart: 5 }}>{rating}</Text>
      {renderStars()}
    </View>
  );
}
