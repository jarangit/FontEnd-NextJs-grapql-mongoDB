import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const LoginSty = styled.div`
  display: flex;
  width: 100%;
  #jr-from-login {
    margin: 50px auto;
    form {
      padding: 20px;
      width: 500px;
      border-radius: 1em;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
      h2 {
        text-align: center;
      }
      input {
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        height: 35px;
        width: 100%;
      }
      button {
        color: white;
        background: #566068;
        border: none;
        padding: 10px;
        margin: 10px 0;
        width: 50%;
        :hover {
          background: #738089;
        }
      }
    }
  }
  #jr-banner-login {
    width: 50%;
    img {
      width: 100%;
    }
  }
  .jr_social_login {
    text-align: center;

    ul {
      padding: 0;
      display: flex;
      justify-content: center;
      li {
        display: flex;
        list-style: none;
        margin: 5px;
      }
    }
    .jr_fb {
      background: #3b5998;
      padding: 10px 50px;
      text-decoration: none;
      color: white;
      :hover {
        background: #95aedf;
      }
      .jr_icon_fb {
        background: red;
        padding: 10px;
      }
    }
    .jr_gg {
      background: #c95a49;
      padding: 10px 50px;
      text-decoration: none;
      color: white;
      :hover {
        background: #d98d81;
      }
    }
  }
`;
//END STY

//DATA

const SIGN_UP = gql`
  mutation SIGN_UP(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    signup(
      username: $username
      name: $name
      email: $email
      password: $password
    ) {
      id
      name
      email
      username
    }
  }
`;

//END DATA

const SignUpForm = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);

  const [signup, { loading, error }] = useMutation(SIGN_UP, {
    variables: { ...userInfo },
    onCompleted: (data) => {
      if (data) {
        console.log(data);
        setSuccess(true);
        setUserInfo({
          username: "",
          name: "",
          email: "",
          password: " ",
        });
      }
    },
  });

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  let failPass;
  const handleSubmit = async (e) => {
    try {
      if (e.target.confirmPassword.value === e.target.password.value) {
        e.preventDefault();
        await signup();
      } else {
        alert("รหัสไม่ตรงกัน");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(success);

  //VIEW
  return (
    <LoginSty>
      <div id="jr-from-login">
        <form onSubmit={handleSubmit}>
          <h2>Sign up</h2>
          <label> Username </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={userInfo.username}
          />

          <label> name </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={handleChange}
            value={userInfo.name}
          />

          <label> Email </label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={userInfo.email}
          />

          <label> Password </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={userInfo.password}
          />

          <label>Confirm Password </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Password"
            onChange={handleChange}
          />
          <div className="btn_signup">
            <button type="submit"> Sign Up </button>
          </div>
          {failPass}
          <div className="jr_social_login">
            <h3>or</h3>
            <ul>
              <li>
                <div style={{ background: "#273d68", padding: "10px" }}>
                  <FontAwesomeIcon icon={faFacebookF} color="white" />
                </div>
                <a className="jr_fb" href="http://localhost:4444/auth/facebook">
                  FACEBOOK
                </a>
              </li>
              <li>
                <div style={{ background: "#aa4b3f", padding: "10px" }}>
                  <FontAwesomeIcon icon={faFacebookF} color="white" />
                </div>
                <a className="jr_gg" href="/">
                  GOOGLE
                </a>
              </li>
            </ul>
          </div>
          <div style={{ color: "green" }}>
            {success && (
              <p>
                You successfully signed up, please{" "}
                <Link href="/register/signIn">
                  <a>sign in</a>
                </Link>
                .
              </p>
            )}
            {error && (
              <p style={{ color: "red" }}>{error.graphQLErrors[0].message}</p>
            )}
          </div>
        </form>
      </div>
      {/* <div id="jr-banner-login">
        <img src="https://res.cloudinary.com/the-guitar-next/image/upload/v1597081618/the-guitar-next/pgvllapjmrh7emlmf8se.png" />
      </div> */}
    </LoginSty>
  );
};

export default SignUpForm;
