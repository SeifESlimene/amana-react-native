import React from "react";
import { StyleSheet, Text, View, Image, Linking, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Title, Card, Button } from "react-native-paper";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const Profile = ({route}) => {
  const { photo, name, phone, email } = route.params.item;
  const openDial = () => {
    if (Platform.OS === "android") {
      Linking.openURL("tel:53891387");
    } else {
      Linking.openURL("telprompt:53891387");
    }
  };
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#0033ff", "#6bc1ff"]}
        style={{ height: "20%" }}
      />
      <View style={{ alignItems: "center" }}>
        <Image
          style={{
            width: 140,
            height: 140,
            borderRadius: 140 / 2,
            marginTop: -50,
          }}
          source={{
            uri: photo,
          }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Title>{name}</Title>
        <Text style={styles.myText}>CIN: 06922007</Text>
      </View>
      <View style={styles.cards}>
        <Card
          style={styles.myCard}
          onPress={() => {
            Linking.openURL("mailto:s.slimene19@gmail.com");
          }}
        >
          <View style={styles.cardContent}>
            <MaterialIcons name="email" size={30} color="#006aff" />
            <Text style={styles.myText}>s.slimene19@gmail.com</Text>
          </View>
        </Card>
        <Card style={styles.myCard} onPress={() => openDial()}>
          <View style={styles.cardContent}>
            <AntDesign name="phone" size={30} color="#006aff" />
            <Text style={styles.myText}>53 891 387</Text>
          </View>
        </Card>
        <View style={{ flexDirection: "column", padding: 10 }}>
          <Button
            theme={theme}
            icon="account-edit"
            mode="contained"
            onPress={() => console.log("Pressed")}
            style={{ marginTop: 10 }}
          >
            Edit Informations
          </Button>
          <Button
            icon="delete"
            mode="contained"
            onPress={() => console.log("Pressed")}
            style={{ marginTop: 10, backgroundColor: "#E10C1A" }}
          >
            Delete Account
          </Button>
        </View>
      </View>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#006aff",
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  myCard: {
    margin: 5,
  },
  cardContent: {
    flexDirection: "row",
    padding: 8,
  },
  myText: {
    fontSize: 16,
    marginTop: 3,
    marginLeft: 6,
  },
  cards: {
    marginTop: 10,
  },
});
export default Profile;
