import { auth } from "../../firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

function validateInput(user){
    return user.firstName !== "" && user.lastName !== "" && user.address !== "" && user.gender !== "" && user.role !== "";
}

export function handleSignUp({user, navigation}){
    if (!validateInput(user)) {
        alert("All fields must be filled");
        return;
    }

    createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(userCredential => {
      // Signed up
      const user = userCredential.user;
      console.log("Signed up with:", user.email);
      // navigate to Home Screen
      navigation.navigate('Home Page');
    })
    .catch(error => alert(error.message));
}