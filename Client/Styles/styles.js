import { Dimensions, StyleSheet } from "react-native";


export const Styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    margin: 10,
    elevation: 5, // Android shadow
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  cardImage: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 3
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardReviewCount: {
    color: 'gray',
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  textInput:
    { backgroundColor: 'white', marginTop: 10, borderRadius: 10, elevation: 10, marginEnd: 10, marginStart: 10 },
  Categories:
  { backgroundColor: 'white', borderColor: 'black', borderWidth: 1, borderRadius: 5, padding: 2 },
})