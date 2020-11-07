import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Alert,
  ShadowPropTypesIOS,
  ActivityIndicator,
} from "react-native";
import { Card, FAB, Searchbar } from "react-native-paper";
const moment = require("moment");
import { useSelector, useDispatch } from "react-redux";
// import { myContext } from "../App";

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => {
    return state;
  });

  // const {state, dispatch} = useContext(myContext);
  // const {data, loading} = state

  const fetchData = () => {
    fetch("https://603943ba3842.ngrok.io/data")
      .then((res) => res.json())
      .then((data) => {
        // setData(data);
        // setLoading(false);
        console.log(data);
        dispatch({ type: "ADD_DATA", payload: data });
        dispatch({ type: "SET_LOADING", payload: false });
      })
      .catch((err) => {
        Alert.alert("Something Went Wrong!, See Nothing");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderList = (item) => {
    return (
      <Card
        style={styles.mycard}
        onPress={() => navigation.navigate("Profile", { item })}
      >
        <View style={styles.cardView}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 30 }}
            source={{ uri: item.photo }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.person}</Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ marginTop: 10, marginBottom: 15 }}
      /> */}
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return renderList(item);
        }}
        keyExtractor={(item) => `${item._id}`}
        refreshing={loading}
        onrefresh={() => fetchData()}
      />
      <FAB
        style={styles.fab}
        small={false}
        icon="plus"
        theme={{ colors: { accent: "#006aff" } }}
        onPress={() => navigation.navigate("CreateDeclaration")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  myCard: {
    margin: 5,
  },
  cardView: {
    flexDirection: "row",
    padding: 6,
    alignItems: "center",
  },
  dateHourcardView: {
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
    marginLeft: 15,
  },
  textSmall: {
    fontSize: 15,
    marginLeft: 15,
  },
  cardViewText: {
    justifyContent: "space-around",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 10,
    bottom: 10,
  },
});

export default Home;
