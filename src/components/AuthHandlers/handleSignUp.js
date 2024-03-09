import { auth } from "../../firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, set } from "firebase/database";

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
        const firebaseUser = userCredential.user;
        console.log("Signed up with:", firebaseUser.email);
        const db = getDatabase();
        set(ref(db, 'users/' + firebaseUser.uid), {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            address: user.address,
            role: user.role,
            gender: user.gender
        });

        // navigate to Home Screen
        navigation.navigate('Home Page');
    })
    .catch(error => alert(error.message));
}