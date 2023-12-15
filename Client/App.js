import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabNavigators from './Navigators/tabNavigators';
import { Provider } from 'react-redux';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
    <View style={{flex: 1}}>
      <StatusBar style="auto" />
    <SafeAreaView style={{flex:1}}>
        {/* <Text>app js opened</Text> */}
        <NavigationContainer>
          <TabNavigators/>
        </NavigationContainer>
    </SafeAreaView>
    </View>
    </Provider>
  );
}

