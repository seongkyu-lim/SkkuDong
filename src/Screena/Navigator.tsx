import React, {useContext} from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from './node_modules/@react-navigation/native';
import {createStackNavigator} from './node_modules/@react-navigation/stack';
import {createDrawerNavigator} from './node_modules/@react-navigation/drawer';
import {createBottomTabNavigator} from './node_modules/@react-navigation/bottom-tabs';

import {UserContext} from './node_modules/~/Context/User';
import SearchBar from './node_modules/~/Components/SearchBar';
import Loading from './node_modules/~/Components/Loading';

import Login from './node_modules/~/Screens/Login';
import PasswordReset from './node_modules/~/Screens/PasswordReset';
import Signup from './node_modules/~/Screens/Signup';

import MyFeed from './node_modules/~/Screens/MyFeed';
import Feeds from './node_modules/~/Screens/Feeds';
import FeedListOnly from './node_modules/~/Screens/FeedListOnly';
import Upload from './node_modules/~/Screens/Upload';
import Notification from './node_modules/~/Screens/Notification';
import Profile from './node_modules/~/Screens/Profile';
import CustomDrawer from './node_modules/~/Screens/Drawer';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const LoginNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
    </Stack.Navigator>
  );
};

const MyFeedTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyFeed"
        component={MyFeed}
        options={{title: 'SNS App'}}
      />
    </Stack.Navigator>
  );
};

const FeedsTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feeds"
        component={Feeds}
        options={{
          header: () => <SearchBar />,
        }}
      />
      <Stack.Screen
        name="FeedListOnly"
        component={FeedListOnly}
        options={{
          headerBackTitleVisible: false,
          title: '둘러보기',
          headerTintColor: '#292929',
        }}
      />
    </Stack.Navigator>
  );
};

const UploadTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Upload"
        component={Upload}
        options={{title: '사진 업로드'}}
      />
    </Stack.Navigator>
  );
};

const ProfileTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{title: 'Profile'}}
      />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <BottomTab.Navigator tabBarOptions={{showLabel: false}}>
      <BottomTab.Screen
        name="MyFeed"
        component={MyFeedTab}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/Tabs/ic_home.png')
                  : require('~/Assets/Images/Tabs/ic_home_outline.png')
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Feeds"
        component={FeedsTab}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/Tabs/ic_search.png')
                  : require('~/Assets/Images/Tabs/ic_search_outline.png')
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Upload"
        component={UploadTab}
        options={{
          tabBarLabel: 'Third',
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/Tabs/ic_add.png')
                  : require('~/Assets/Images/Tabs/ic_add_outline.png')
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/Tabs/ic_favorite.png')
                  : require('~/Assets/Images/Tabs/ic_favorite_outline.png')
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/Tabs/ic_profile.png')
                  : require('~/Assets/Images/Tabs/ic_profile_outline.png')
              }
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerType="slide"
      drawerContent={(props) => <CustomDrawer props={props} />}>
      <Drawer.Screen name="MainTabs" component={MainTabs} />
    </Drawer.Navigator>
  );
};

export default () => {
  const {isLoading, userInfo} = useContext<IUserContext>(UserContext);

  if (isLoading === false) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {userInfo ? <MainNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};
