import React from "react";
// import library ที่จำเป็น
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import screen ที่เกี่ยวข้อง
import Login from "../frontend/LoginPage";
import Register from "../frontend/Reg";
import Main_Page from "../frontend/MainPage";
import MyParty from "../frontend/MyParty";
import MyChat from "../frontend/MyChat";
import FindParty from "../frontend/FindParty"
import CreateNewParty from "../frontend/CreateParty"
import EditParty from "../frontend/EditParty";
import Notification from "../frontend/NotifyPage";
import EditProfile from "../frontend/EditProfile";
import Chat from "../frontend/Chat";
import PartyInfo from "../frontend/PartyInfo";
import ProfileInfo from "../frontend/ProfileInfo";
import BottomNavigtor from "./BottomNavigator";
// สร้าง navigator ตามโจทย์กำหนด
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();
// สร้าง function สำหรับการกำหนด Navigator แต่ละตัว เช่น


function MainNavigator() {
  return (
    // กำหนดรายละเอียดของ navigator
    <Stack.Navigator initialRouteName="Categories"
      screenOptions={{ headerStyle: { backgroundColor: "#4542C1", borderBottomColor: "#4542C1" }, headerTintColor: "white", headerShown: true }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "",
        }}
      />
      <Stack.Screen name="Register" component={Register} options={{
        title: "",
      }} />
      <Stack.Screen name="FindParty" component={FindParty} options={{
        title: "",
      }} />
      <Stack.Screen name="Main_Page" component={Main_Page} options={{
        title: "",
      }} />
      <Stack.Screen name="CreateNewParty" component={CreateNewParty} options={{
        title: "",
      }} />
      <Stack.Screen name="MyParty" component={MyParty} options={{
        title: "",
      }} />
      <Stack.Screen name="MyChat" component={MyChat} options={{
        title: "",
      }} />
      <Stack.Screen name="Chat" component={Chat} options={{
        title: "",
      }} />
      <Stack.Screen name="Notification" component={Notification} options={{
        title: "Notification",
        headerTitleAlign: 'center'
      }} />
      <Stack.Screen name="EditParty" component={EditParty} options={{
        title: "",
      }} />
      <Stack.Screen name="PartyInfo" component={PartyInfo} options={{
        title: "",
      }} />
      <Stack.Screen name="ProfileInfo" component={ProfileInfo} options={{
        title: "",
      }} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{
        title: "",
      }} />
    </Stack.Navigator>

  );
}

// สร้าง Navigator หลัก
export default function MyNavigator() {
  return (
    <NavigationContainer>
      {/* รายละเอียดของ Navigator หลัก (MainNavigator) */}
      {/* <MealsFavTabNavigator /> */}
      <MainNavigator/>
    </NavigationContainer>
  );
}
