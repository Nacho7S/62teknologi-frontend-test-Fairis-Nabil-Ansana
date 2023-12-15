import { View, Text, FlatList, ScrollView, ActivityIndicator, RefreshControl, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBusiness } from '../store/Actions/actionCreator'
import Card from '../Components/card'
import { Styles } from '../Styles/styles'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import filterMenu from '../Components/filterMenu'



export default function HomeScreen() {
  const dispatch = useDispatch();
  const [businessArr, setBusinessArr] = useState([]);
  const { businesses, businessLoading } = useSelector((state) => state.businesses);
  const [loadMore, setLoadMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showMenu, setShowMenu] = useState(false)

  const [params, setParams] = useState({
    location: 'ID',
    sortBy: 'best_match',
    limit: 12,
    offset: 0,
    price: 0,
    filter: {
      search: ''
    }
  });

  const resetData = () => {
    setBusinessArr([])
    setParams((prevParams) => ({ ...prevParams, offset: 0 }));
    dispatch(fetchBusiness(params))
  }

  const handlePrice = (int) => {
    console.log(params);
    setParams((prevParams) => ({ ...prevParams, price: int }));
    resetData()
  }

  const handleSortBy = (text) => {
    setParams((prevParams) => ({ ...prevParams, sortBy: text }));
    resetData()
  }

  const handleSearch = (text) => {
    setParams((prevParams) => ({ ...prevParams, filter: { ...prevParams.filter, search: text }, offset: 0 }));
    resetData()
    if (!text) {
      setBusinessArr([])
      dispatch(fetchBusiness(params))
    }
  };

  const fetchDataScroll = () => {
    const { filter, offset, limit } = params;
    try {
      dispatch(fetchBusiness(params));
      if (businesses?.data?.businesses?.length === 0) {
        setLoadMore(false);
      }
      const newBusinesses = businesses?.data?.businesses || [];
      setBusinessArr((prevBusinessArr) => [...prevBusinessArr, ...newBusinesses]);
      setParams((prevParams) => ({ ...prevParams, offset: offset + limit }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataScroll();
  }, []);

  const handleEndReached = () => {
    if (loadMore) {
      fetchDataScroll();
    }
  };

  const handleRefresh = () => {
    try {
      setRefreshing(true);
      resetData()
      setRefreshing(false)
    } catch (err) {
      console.log(err);
    }
  };

  const header = () => (
    <>
      <View style={[Styles.flexRow, { justifyContent: 'space-between', padding: 15 }]}>
        <Text style={Styles.cardTitle}>Based On Your Location</Text>
        {!showMenu ? (<View><MaterialCommunityIcons name="filter-outline" size={25} color="black" onPress={() => { setShowMenu(true) }} /></View>) : (<MaterialCommunityIcons name="filter-minus-outline" size={25} color="black" onPress={() => { setShowMenu(false) }} />)}

      </View>
      {showMenu && filterMenu({handleSearch, handlePrice, handleSortBy, valueSortBy: params.sortBy})}
    </>
  )

  return (
    <>
      {businessLoading && params.offset === 0 ? (
        <View style={Styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={businessArr.length > 0 ? businessArr : businesses?.data?.businesses}
            renderItem={({ item, index }) => <Card item={item} />}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.1}
            ListFooterComponent={() => (businessLoading ? <ActivityIndicator size="small" color="#0000ff" /> : null)}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            ListHeaderComponent={header}
          />
        </>
      )}
    </>
  );
}