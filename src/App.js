import React, { useState } from "react";
import * as Components from "./Components";
import DetailsPage from "./DetailsPage";

function App() {
  let [jwtToken, setToken] = useState("");
  let [signedIn, setSignIn] = useState(false);
  let [signIn, toggle] = useState(true);
  let [name, setName] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");

  async function handleSingIn(e) {
    e.preventDefault();
    console.log(name,phone);
    try {
      let res = await fetch("http://localhost:8010/login-user", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          phone: phone,
          password: password,
        }),
      });
      if (res.status != 200) {
        return;
      }
      let resJson = await res.json();
      console.log(resJson);
      setSignIn(true);
      setToken(resJson.data.JwtToken);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();

    try {
      let res = await fetch("http://localhost:8010/add-user", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          name: name,
          phone: phone,
          password: password,
        }),
      });
      if (res.status != 200) {
        return;
      }
      toggle(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {signedIn && <DetailsPage jwtToken={jwtToken} setSignIn={setSignIn}/>}
      {!signedIn && 
        <Components.Container>
          <Components.SignUpContainer signinIn={signIn}>
            <Components.Form onSubmit={(e) => handleSignUp(e)}>
              <Components.Title>Create Account</Components.Title>
              <Components.Input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Components.Input
                type="number"
                placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <Components.Input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Components.Button type="submit">Sign Up</Components.Button>
            </Components.Form>
          </Components.SignUpContainer>

          <Components.SignInContainer signinIn={signIn}>
            <Components.Form onSubmit={(e) => handleSingIn(e)}>
              <Components.Title>Sign in</Components.Title>
              <Components.Input
                type="number"
                value={phone}
                placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
              />
              <Components.Input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <Components.Anchor href='#'>Forgot your password?</Components.Anchor> */}
              <Components.Button>Sigin In</Components.Button>
            </Components.Form>
          </Components.SignInContainer>

          <Components.OverlayContainer signinIn={signIn}>
            <Components.Overlay signinIn={signIn}>
              <Components.LeftOverlayPanel signinIn={signIn}>
                <Components.Title>Welcome Back!</Components.Title>
                {/* <Components.Paragraph>
                            To keep connected with us please login with your personal info
                        </Components.Paragraph> */}
                <Components.GhostButton onClick={() => toggle(true)}>
                  Sign In
                </Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel signinIn={signIn}>
                <Components.Title>Hello Friend!</Components.Title>
                {/* <Components.Paragraph>
                              Enter Your personal details and start journey with us
                          </Components.Paragraph> */}
                <Components.GhostButton onClick={() => toggle(false)}>
                  Sigin Up
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
      }
    </div>
  );
}

export default App;
