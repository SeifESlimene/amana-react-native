import { StatusBar } from "expo-status-bar";
import React, { createContext, useReducer } from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import Home from "./screens/Home";
import CreateDeclaration from "./screens/CreateDeclaration";
import Profile from "./screens/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer, initState } from "./reducers/reducer";

const store = createStore(reducer);

// export const myContext = createContext();

const Stack = createStackNavigator();

const myOptions = {
  title: "Accueil",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#006aff",
  },
};

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={myOptions} />
        <Stack.Screen
          name="CreateDeclaration"
          component={CreateDeclaration}
          options={{ ...myOptions, title: "Déclarer une perte" }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ ...myOptions, title: "Profile" }}
        />
      </Stack.Navigator>
    </View>
  );
}

// const [state, dispatch] = useReducer(reducer, initState);

export default () => {
  return (
    <Provider store={store}>
    {/* <myContext.Provider value={{ state, dispatch }}> */}
      <NavigationContainer>
        <App />
      </NavigationContainer>
    {/* </myContext.Provider> */}
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    // marginTop: Constants.statusBarHeight,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
