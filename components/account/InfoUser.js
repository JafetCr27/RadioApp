import React,{useState} from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Avatar } from "react-native-elements";

import { loadImageFromGallery } from "../../utils/helpers";
import { uploadImage, updateProfile } from "../../utils/actions";

export default function InfoUser({ user, setLoading, setLoadingText}) {
  
  const [photoUrl, setphotoUrl] = useState(user.photoURL)
  const changePhoto = async () => {
    const result = await loadImageFromGallery([1, 1]);
    if (!result.status) {
      return
    }
    setLoadingText("Actualizando imagen...")
    setLoading(true)
    const resultUploadImage = await uploadImage(result.image,"avatars",user.uid)
    if (!resultUploadImage.statusResponse) {
      setLoading(false)
      Alert.alert("Ha ocurrido un problema importando la imagen")
      return
    }
    const resultUpdateProfile = await updateProfile({photoURL:resultUploadImage.url})
    setLoading(false)
    if (resultUpdateProfile.statusResponse) {
      setphotoUrl(resultUploadImage.url)
    }else{
      Alert.alert("Ha ocurrido al actualizar la foto de perfil")
    }

  };
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="large"
        onPress={changePhoto}
        source={
          photoUrl ? { uri: photoUrl } : require("../../assets/avatar.jpg")
        }
      />
      <View style={styles.infoUser}>
        <Text style={styles.displayName}>
          {user.displayName ? user.displayName : "Anómino"}
        </Text>
        <Text>{user.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    paddingVertical: 30
  },
  infoUser: {
    marginLeft: 20
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5
  }
});
