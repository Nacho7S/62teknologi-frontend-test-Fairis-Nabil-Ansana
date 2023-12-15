import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Styles } from '../Styles/styles'
import { useNavigation } from '@react-navigation/native'
import UseRatingStars from '../Hooks/useRatingStars'

export default function Card({ item }) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => {navigation.push("businessDetail", {itemId: item.id})}}>
      <View style={[Styles.cardContainer, { padding: 10 }]}>
      <Image style={Styles.cardImage} source={{ uri: item.image_url }} />
      <View style={[Styles.flexRow, {justifyContent: 'space-between', marginTop: 12}]}>
      <Text style={Styles.cardTitle}>{item.name}</Text>
      <Text>{ item.price }</Text>
      </View>
      <View>
          {/* <Text>{item.rating}</Text> */}
          <UseRatingStars rating={item.rating}/>
      <Text style={Styles.cardReviewCount}>{item.review_count} Reviews</Text>
      </View>
    </View>
    </TouchableOpacity>
  )
}