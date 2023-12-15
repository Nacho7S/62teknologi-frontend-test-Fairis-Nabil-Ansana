import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusiness, fetchDetailBusiness } from '../store/Actions/actionCreator';
import { Styles } from '../Styles/styles';
import UseRatingStars from '../Hooks/useRatingStars';
import CarouselImage from '../Components/carouselImage';
import { formatTime, getDayName } from '../Hooks/useFormatDatesTimes';

export default function BusinessDetails({ route }) {
  const dispatch = useDispatch();
  const { itemId } = route.params;
  const { business, loadingDetail } = useSelector((state) => state.businessDetail);
  const params = {
    offset: 0
  }

  useEffect(() => {
    dispatch(fetchDetailBusiness(itemId, params));
  }, [itemId]);

  const mapImage = business ? business?.details?.photos.map((el, index) => {
    return {
      id: `0${index + 1}`,
      image: el
    }
  }) : []

  // console.log(itemId);
  return (
    <>
    { loadingDetail ? <ActivityIndicator/>  : (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, flexDirection: 'column', padding: 16 }}>
        {/* <Image style={Styles.cardImage} source={{ uri: business.details?.image_url }} /> */}
        <CarouselImage imgArray={mapImage} />
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
          {business.details?.categories?.map((c, index) => (
            <View key={index} style={Styles.Categories}>
              <Text >{c.title}</Text>
            </View>
          ))}
          {business?.details?.transactions.map((el, index) => (
            <Text style={Styles.Categories} key={index}>{el}</Text>
          ))}
        </View>
        <Text style={{ fontSize: 25, fontWeight: '800', marginTop: 16 }}>{business.details?.name}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ marginTop: 8, backgroundColor: 'green', width: 220, height: 260, borderRadius: 6 }}>
              <Text>Maps</Text>
            </View>
            <ScrollView>
              {/* <Text>{ JSON.stringify(business.reviews.reviews)}</Text> */}
              <View style={{ marginTop: 10, maxWidth: 200 }}>
                <Text>Reviews:</Text>
                {business?.reviews?.reviews.map((el, index) => (
                  <View key={index} style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                      <Image style={{ borderRadius: 30, width: 30, height: 30, resizeMode: 'cover' }} source={{ uri: el.user.image_url }} />
                      <View style={{ borderWidth: 1, padding: 5, borderRadius: 10 , width: 180, height: 'auto'}}>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{el.user.name}</Text>
                        <UseRatingStars rating={el.rating} />
                        <Text style={{ fontSize: 10 }}>{el.text}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
          <View style={{ marginTop: 8, flexDirection: 'column', justifyContent: 'space-between', gap: 15, backgroundColor: 'white', borderWidth: 1, padding: 8, borderRadius: 10, maxHeight: 780, height: 590 }}>
            <View style={{ marginTop: 14 }}>
              <Text style={[Styles.cardTitle]}>{business.details?.price}</Text>
              <UseRatingStars rating={business.details?.rating} />

            </View>
            <View style={{ gap: 4 }}>
              <Text>Open Hours:</Text>
              {business?.details?.hours.map((el, index) => (
                el?.open.map((o, index) => (
                  <View key={index} style={{ borderWidth: 1, borderRadius: 9, padding: 5 }}>
                    <Text>{getDayName(o?.day)}</Text>
                    <Text >{formatTime(o?.start)} - {formatTime(o?.end)}</Text>
                  </View>
                ))
                ))}
            </View>
            <View>
              <Text>{business.details?.location.address1}</Text>
              <Text>{`${business.details?.location.city}, ${business.details?.location.state} ${business.details?.location.zip_code}`}</Text>
              <Text>Phone:
                {business.details?.display_phone}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
    )}
    </>
  );
}
