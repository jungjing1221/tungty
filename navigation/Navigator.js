import React from "react";
// import library ที่จำเป็น
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import screen ที่เกี่ยวข้อง
import Login from "../frontend/LoginPage";
import Register from "../frontend/reg";
import Main_Page from "../frontend/MainPage";
// สร้าง navigator ตามโจทย์กำหนด
const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();
// สร้าง function สำหรับการกำหนด Navigator แต่ละตัว เช่น
function 	MainNavigator() {

  return (
    // กำหนดรายละเอียดของ navigator
    <Stack.Navigator initialRouteName="Categories"
      screenOptions={{ headerStyle: { backgroundColor: "#4542C1", borderBottomColor: "#4542C1" },headerTintColor: "white", headerShown:true}}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "",
            }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: "",
            }}
        />
      </Stack.Navigator>
  );
}


// สร้าง Navigator หลัก
export default function MyNavigator() {
  return (
    <NavigationContainer>
      {/* รายละเอียดของ Navigator หลัก (MainNavigator) */}
      {/* <MealsFavTabNavigator /> */}
      <MainNavigator />
    </NavigationContainer>
  );
}
