import React from "react";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        Alert.alert(user.email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorCode, errorMessage);
        // ..
      });
    setEmail("");
    setPassword("");
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        Alert.alert(user.email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorCode, errorMessage);
        // ...
      });
  };

  const signWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="login" style={styles.button} onPress={signWithGoogle} />
        <Button title="register" style={styles.button} onPress={handleSignUp} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  inputContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    width: 350,
  },
  buttonContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    width: 250,
  },
  button: {
    padding: 15,
    margin: 12,
  },
});
