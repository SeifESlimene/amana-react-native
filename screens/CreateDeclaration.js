import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button, Headline } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const CreateDeclaration = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [person, setPerson] = useState("");
  const [place, setPlace] = useState("");
  const [photo, setPhoto] = useState("");
  const [cin, setCin] = useState("");
  const [modal, setModal] = useState(false);
  const [enableShift, setEnableShift] = useState(false);

  const submitData = () => {
    fetch("https://603943ba3842.ngrok.io/send-data", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, person, cin, place, photo }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("Declaration Added Successfully");
        navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("Error");
      });
  };

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `image/${data.uri.split(".")[data.uri.length]}`,
          name: `Test.${data.uri.split(".")[data.uri.length]}`,
        };
        handleUpload(newFile);
      }
    } else {
      Alert.alert("You Need To Give Us Permission To Work!");
    }
  };

  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `image/${data.uri.split(".")[data.uri.length]}`,
          name: `Test.${data.uri.split(".")[data.uri.length]}`,
        };
        handleUpload(newFile);
      }
    } else {
      Alert.alert("You Need To Give Us Permission To Work!");
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "employeeApp");
    data.append("cloud_name", "seifeslimene");
    fetch("https://api.cloudinary.com/v1_1/seifeslimene/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPhoto(data.secure_url);
        setModal(false);
      })
      .catch((err) => {
        Alert.alert("Error While Uploading!");
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior="position"
      enabled={enableShift}
    >
      <View>
        <Headline style={{ padding: 10 }}>Déclarer un objet perdu</Headline>
        <TextInput
          mode="outlined"
          label="Nom & Prénom"
          value={person}
          theme={theme}
          placeholder="Entrer Votre Nom Et Prénom"
          onFocus={() => setEnableShift(false)}
          style={styles.inputStyle}
          onChangeText={(text) => setPerson(text)}
        />
        <TextInput
          mode="outlined"
          label="Phone"
          value={phone}
          theme={theme}
          placeholder="Entrer Votre Numéro Du Téléphone"
          style={styles.inputStyle}
          onFocus={() => setEnableShift(false)}
          keyboardType="number-pad"
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          mode="outlined"
          label="Objet"
          value={name}
          theme={theme}
          placeholder="Entrer L'Objet Perdu (1 Seul Mot)"
          onFocus={() => setEnableShift(false)}
          style={styles.inputStyle}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          mode="outlined"
          label="Carte d'identité National"
          onFocus={() => setEnableShift(true)}
          value={cin}
          theme={theme}
          placeholder="Entrer Votre Numéro Du Carte D'identité Nationale"
          style={styles.inputStyle}
          keyboardType="number-pad"
          onChangeText={(text) => setCin(text)}
        />
        <TextInput
          mode="outlined"
          label="Lieu de perte"
          value={place}
          onFocus={() => setEnableShift(true)}
          theme={theme}
          placeholder="Où trouvez vous l'objet perdu?"
          style={styles.inputStyle}
          onChangeText={(text) => setPlace(text)}
        />
        <Button
          style={styles.inputStyle}
          icon={photo === "" ? "upload" : "check"}
          mode="contained"
          theme={theme}
          onPress={() => setModal(true)}
        >
          Ajouter Une Photo
        </Button>
        <Button
          style={styles.inputStyle}
          icon="content-save"
          mode="contained"
          theme={theme}
          onPress={() => submitData()}
        >
          Save
        </Button>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(false);
          }}
        >
          <View style={styles.modalView}>
            <View style={styles.modalButtonView}>
              <Button
                theme={theme}
                icon="camera"
                mode="contained"
                onPress={() => pickFromCamera()}
              >
                Caméra
              </Button>
              <Button
                theme={theme}
                icon="image-area"
                mode="contained"
                onPress={() => pickFromGallery()}
              >
                Gallerie
              </Button>
            </View>
            <Button theme={theme} onPress={() => setModal(false)}>
              Cancel
            </Button>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
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
  inputStyle: {
    margin: 8,
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "#fff",
  },
});

export default CreateDeclaration;
