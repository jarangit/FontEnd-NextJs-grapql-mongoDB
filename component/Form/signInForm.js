import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";
import Cookies from "js-cookie";
import Router from "next/router";
import { AuthContext } from "../../appState/authProvider";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Sty
const FormSty = styled.div`
  .jr_form_login {
    width: 500px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 1em;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    input {
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      height: 35px;
      width: 100%;
      padding: 10px;
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
  }
  .jr_banner_login {
    width: 100%;
    img {
      width: 100%;
    }
  }
`;
//END STY

//DATA

const LOG_IN = gql`
  mutation LOG_IN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwt
      user {
        id
        name
        email
        address
        tel
        line_id
        image_profile
        products {
          id
          name
          price
          description
        }
        carts {
          id
          quantity
          product {
            id
            name
            description
            price
            imageUrl
          }
        }
      }
    }
  }
`;

//END DATA

const SignInForm = () => {
  //HOOK
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  //useContext from  appState for change menu when user login
  const { setAuthUser } = useContext(AuthContext);

  //END HOOK

  //FUNC
  const [login, { loading, error }] = useMutation(LOG_IN, {
    variables: { ...userInfo },
    onCompleted: (data) => {
      if (data) {
        Cookies.set("jwt", data.login.jwt);
        console.log(data);
        setUserInfo({
          email: " ",
          password: " ",
        });
        setAuthUser(data.login.user);
        Router.push("/products");
      }
    },
  });

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await login();
    } catch (error) {
      console.log(error);
    }
  };

  //END FUNC

  //VIEW
  return (
    <div>
      <FormSty>
        <div>
          <form className="jr_form_login" onSubmit = {handleSubmit} >
            <h2>Sign up</h2>
            <label> Email </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <label> Password </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <div>
              <button type="submit"> Sign Up </button>
              <p>
                Forgot password ?
                <Link href="/register/requestPassword">
                  <a  style = {{ color: '#2BACBC' }} > Click here</a>
                </Link>
              </p>
            </div>
            <div>
              {error && (
                <p style={{ color: "red" }}>{error.graphQLErrors[0].message}</p>
              )}
            </div>
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
          </form>
        </div>
        {/* <div className="jr_banner_login">
          <img src="https://res.cloudinary.com/the-guitar-next/image/upload/v1597081618/the-guitar-next/pgvllapjmrh7emlmf8se.png" />
        </div> */}
      </FormSty>
    </div>
  );
};

export default SignInForm;
