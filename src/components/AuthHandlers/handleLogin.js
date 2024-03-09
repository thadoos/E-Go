import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

// function to handle login
export const handleLogin = ({email, password, navigation}) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const loggeduser = userCredential.user;
      console.log("Logged in with:", loggeduser.email);
      navigation.navigate("Home Page");
    })
    .catch(error => alert(error.message));
};
