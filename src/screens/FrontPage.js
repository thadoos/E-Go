import { StyleSheet, Text, View, ScrollView } from "react-native";
import { AppLogo, DetailsEntry, SignButton, SignupIcon } from "../components";


export const FrontPage = () => {
  return (
    // Scrolling for smaller devices or for when keyboard is up
    <ScrollView
      showsVerticalScrollIndicator={false}
      backgroundColor={"#DCE1DE"}>
  
      <View style={styles.container}>
        <AppLogo></AppLogo>

        <View style={styles.inputContainer}>
          <Text style={styles.loginText}>Login</Text>
          <DetailsEntry fieldName={"Email"} keyboardType={"email-address"} />
          <DetailsEntry fieldName={"Password"} secureTextEntry={true} />
        </View>

        <SignButton
          text={"Sign In"}
          borderStyle={"buttonContainer"}
          textStyle={"buttonText"}
          navigationTarget={"Log In"}
        />

        



        <View style={styles.signupOptionContainer}>
          <SignupIcon logoName="logo-google" color="black" />
          <SignupIcon logoName="logo-linkedin" color = 'black'/>
          <SignupIcon logoName="logo-facebook" color = 'black' />
        </View>


        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Don’t have an account?</Text>
          <SignButton
            text={"Sign Up"}
            textStyle={"signUpButton"}
            navigationTarget={"Sign Up"}
          />
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
    // paddingVertical: 15,
    flexDirection: "row",
    marginTop: 100,
  },
  signupText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginRight: 5,
  },

  signupOptionContainer:{
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 50,

  },


});
