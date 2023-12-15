import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	View,
	Dimensions,
	LogBox,
	TouchableOpacity,
	Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler'

const CarouselImage = ({ imgArray }) => {
	const flatlistRef = useRef();
	// Get Dimesnions
	const screenWidth = Dimensions.get("window").width;
	const [activeIndex, setActiveIndex] = useState(0);
	const [scale, setScale] = useState(1);
	const [savedScale, setSavedScale] = useState(1);


	const singleTap = Gesture.Tap().onStart(() => {
    // Alert.alert("Single Tap nih");
		setScale(scale * 2)
  });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
			// Alert.alert("Double Tap nih");
			setScale(scale / 2)
      // hit endpoint bookmarks => simpan / hapus bookmarks
    });

  const pinchImage = Gesture.Pinch()
    .onUpdate((event) => {

      setScale(event.scale * savedScale);

    })
    .onEnd(() => {
      setSavedScale(scale);
    });

  const gestureComposed = Gesture.Exclusive(pinchImage, doubleTap, singleTap);

	// Auto Scroll

  let roundedActiveIndex = Math.round(activeIndex)
	useEffect(() => {
    let interval = setInterval(() => {
			if (roundedActiveIndex === imgArray.length - 1) {
				flatlistRef.current.scrollToIndex({
					index: 0,
					animation: true,
				});
			} else {
				flatlistRef.current.scrollToIndex({
					index: activeIndex + 1,
					animation: true,
				});
      } 
		}, 10000);

		return () => clearInterval(interval);
	});

	const getItemLayout = (data, index) => ({
		length: screenWidth,
		offset: screenWidth * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
		index: index,
	});
	// Data for carousel
	// const carouselData = imgArray

	//  Display Images // UI
	const renderItem = ({ item, index }) => {
		return (
				<GestureHandlerRootView style={{flex: 1}}>
					<GestureDetector gesture={gestureComposed}>
				<Image
					source={{ uri: item.image }}
					style={{ height: 250, width: screenWidth,  resizeMode: 'contain', transform: [{ scale }] }}
					/>
					</GestureDetector>
					</GestureHandlerRootView>
		);
	};

	// Handle Scroll
	const handleScroll = (event) => {
		// Get the scroll position
		const scrollPosition = event.nativeEvent.contentOffset.x;
		// console.log({ scrollPosition });
		// Get the index of current active item

		const index = scrollPosition / screenWidth;

		// console.log({ index });
		// Update the index

		setActiveIndex(index);
	};
	const handleDotPress = (index) => {
    // Scroll to the selected index
    flatlistRef.current.scrollToIndex({
      index: index,
      animation: true,
    });
  };

	// Render Dot Indicators
	const renderDotIndicators = () => {
		return imgArray.map((dot, index) => {
			// if the active index === index
			
			if (roundedActiveIndex === index) {
				return (

          <View
					key={index}
						// style={{
						// 	backgroundColor: "black",
						// 	height: 10,
						// 	width: 10,
						// 	borderRadius: 5,
						// 	marginHorizontal: 6,
						// }}
					><Image key={index}
					source={{ uri: dot.image }}
					style={[
						{
							height: 60,
							width: 60,
							borderRadius: 5,
							marginHorizontal: 6,
						},
						roundedActiveIndex === index
							? { opacity: 0.7, backgroundColor: "black" }
							: null,
					]}
					/></View>
				);
			} else {
				return (
					<TouchableOpacity
					key={index}
					onPress={() => handleDotPress(index)} // Handle dot press
					>
					<View
					key={index}
					// style={{
					// 	backgroundColor: "gray",
						// 	height: 10,
						// 	width: 10,
						// 	borderRadius: 5,
						// 	marginHorizontal: 6,
						// }}
						><Image key={index}
						source={{ uri: dot.image }}
						style={{ height: 250, width: screenWidth,  resizeMode: 'contain',
						height: 60,
						width: 60,
						borderRadius: 5,
						marginHorizontal: 6,}}
						/>
				</View>
						</TouchableOpacity>
				);
			}
		});
	};

	return (
		<View>
			<FlatList
				data={imgArray}
				ref={flatlistRef}
				getItemLayout={getItemLayout}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				horizontal={true}
				pagingEnabled={true}
				onScroll={handleScroll}
				showsHorizontalScrollIndicator={false}
			/>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					marginTop: 10,
				}}
			>
				{renderDotIndicators()}
			</View>
			{/* <Text>{ JSON.stringify(imgArray) }</Text> */}
		</View>
	);
};

export default CarouselImage;