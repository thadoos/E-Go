import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { AppLogo, DetailsEntry, SignButton } from "../../components";
import { useState } from "react";
import { handleLogin } from '../../components/AuthHandlers';
import { useNavigation } from "@react-navigation/native";

/*
sign out function:
const navigation = useNavigation();
const handleSignOut = () => {
    auth
        .signOut()
        .then(() => {
            console.log('User signed out!');
            navigation.navigate('Login');
        })
        .catch(error => alert(error.message));
}
*/

export const FrontPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  return (
    // Scrolling for smaller devices or for when keyboard is up
    <ScrollView
      showsVerticalScrollIndicator={false}
      backgroundColor={"#DCE1DE"}>

      <View style={styles.container}>
        <AppLogo></AppLogo>

        <View style={styles.inputContainer}>
          <Text style={styles.loginText}>Login</Text>
          <DetailsEntry
            fieldName={"Email"}
            keyboardType={"email-address"}
            value={email}
            onChangeText={setEmail}
          />
          <DetailsEntry
            fieldName={"Password"}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => handleLogin({email, password, navigation})}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Don’t have an account?</Text>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate("Sign Up")}>
            <Text style={styles.signUpButton}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCE1DE",
    alignItems: "center",
  },
  inputContainer: {
    width: "75%",
    alignItems: "stretch",
  },
  loginText: {
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "800",
    fontSize: 20,
  },
  signupTextCont: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 15,
    flexDirection: "row",
  },
  signupText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginRight: 5,
  },

  buttonContainer: {
    width: '75%',
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700',
  },
  signUpButton: {
    fontSize: 16,
    fontWeight: '800',
    color: '#088AE8',
  }
});