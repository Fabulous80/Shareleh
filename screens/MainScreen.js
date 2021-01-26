import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  FlatList,
} from "react-native";
import firebase from "../database/firebaseDB";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const db = firebase.firestore();
const auth = firebase.auth();

export default function MainScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [userid, setUserid] = useState("9oMw4Iwsa6TDVh43i1fvaWMb4Sp1");

  useEffect(() => {
    // This is the listener for authentication
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserid(user.uid);
        console.log(
          "user found, navigatin to main screen! -----------------------------"
        );
        navigation.navigate("Main");
      } else {
        console.log(
          "user not found, navigatin to login screen! -----------------------------"
        );
        navigation.navigate("Login");
      }
      //console.log("unsubauth");
      // console.log(auth);
      // console.log("user");

      //console.log(user.recipes);
    });

    // This loads data from firebase
    const unsubscribe = db
      .collection("users")
      .doc(userid)
      .collection("recipes")
      //.orderBy("created", "desc")
      .onSnapshot((collection) => {
        const updatedNotes = collection.docs.map((doc) => {
          console.log(typeof doc);
          const noteObject = {
            ...doc.data(),
            id: doc.id,
          };
          console.log("Break1");
          console.log(noteObject);
          return noteObject;
        });
        console.log("Break2");
        console.log(updatedNotes);
        setNotes(updatedNotes);
      });

    // This sets up the top right button
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logout}>
          <MaterialCommunityIcons
            name="logout"
            size={20}
            color="black"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });

    // console.log("================== attempt 1 ================");
    // const recipeuser1 = db
    //   .collection("users")
    //   .doc("9oMw4Iwsa6TDVh43i1fvaWMb4Sp1")
    //   .collection("recipes")
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.id, " => ", doc.data());
    //     });
    //   });
    // console.log(recipeuser1);

    // console.log("=========== attempt 2 ==========");
    // console.log(db.collection("users"));

    // console.log("=========================");

    return () => {
      unsubscribe();
      unsubscribeAuth();
      console.log("End");
    };
  }, []);

  function logout() {
    auth.signOut();
  }

  function addRecipe() {
    navigation.navigate("Add Recipe");
  }

  function deleteRecipe(id) {
    console.log("Deleting Recipe" + id);

    db.doc(id).delete();
  }

  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>{item.title}</Text>
        {/* <TouchableOpacity onPress={() => deleteRecipe(item.id)}>
          <Ionicons name="trash" size={16} color="#944" />
        </TouchableOpacity> */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
});
