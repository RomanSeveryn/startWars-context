import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from '../screens/MainScreen';
import { AdditionalInformation } from '../screens/AdditionalInformation';
import { ADDITIONAL_INFO_SCREEN, MAIN_SCREEN } from '../constants/constant';

export const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name={MAIN_SCREEN}
          component={MainScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={ADDITIONAL_INFO_SCREEN}
          component={AdditionalInformation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
