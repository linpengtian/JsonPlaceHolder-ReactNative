import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  StackInTabInMain,
  StackInPostDetail,
} from '../screens';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainStack">
        <Stack.Screen
          name="MainStack"
          component={StackInTabInMain}
          options={{
            headerShown: false,
            title: 'Back',
          }}
        />
        <Stack.Screen
          name="PostDetailStack"
          component={StackInPostDetail}
          options={{title: 'Post Detail'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
