import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../../appState/authProvider";
import { useMutation } from "@apollo/react-hooks";
import { ME } from "./userProducts";
import { QUERY_USER } from "../../pages/_app";
import styled from "styled-components";

const CardUser = styled.div`
  max-width: 100%;
  width: 70%;
  background: white;
  border-radius: 1rem;
  margin: 20px auto;
  padding: 20px;
  text-align: center;
  -webkit-box-shadow: 6px 3px 35px 1px rgba(0, 0, 0, 0.17);
  -moz-box-shadow: 6px 3px 35px 1px rgba(0, 0, 0, 0.17);
  box-shadow: 6px 3px 35px 1px rgba(0, 0, 0, 0.17);
  img {
    margin: 20px 0;
  }
  .jr_detail_user{
      border-bottom: 1px solid #A9CEC2;
      display: flex;
      flex-wrap: flex;
      justify-content: space-between;  
      padding: 15px 0;
      }
`;
const DivGrid = styled.div`
  display: grid;
  grid-template-columns: 20% auto;
`;

const EDIT_USER = gql`
  mutation EDIT_USER(
    $id: ID!
    $address: String
    $tel: String
    $line_id: String
    $image_profile: String
  ) {
    edit_account_user(
      id: $id
      address: $address
      tel: $tel
      line_id: $line_id
      image_profile: $image_profile
    ) {
      id
      address
      tel
      image_profile
      line_id
    }
  }
`;
const UserData = () => {
  // const { user } = useContext(AuthContext)
  // console.log(user)

  const [edit, setedit] = useState(false);
  const [file, setFile] = useState(null);
  const { user, setAuthUser } = useContext(AuthContext);
  const [dataUser, setdataUser] = useState(user);
  const { data } = useQuery(ME);

  useEffect(() => {
    if (data) {
      setAuthUser(data.user);
    }
  }, [data]);
  console.log(dataUser.image_profile);
  const [edit_account_user, { loading, error }] = useMutation(EDIT_USER, {
    onCompleted: (data) => {
      ClickEdit();
      console.log(data);
      setdataUser(data.edit_account_user);
    },
    refetchQueries: [{ query: ME }],
  });

  const ClickEdit = async () => {
    await setedit(!edit);
    console.log(edit);
  };

  const handleChange = (e) => {
    setdataUser({ ...dataUser, [e.target.name]: e.target.value });
    console.log(dataUser);
  };

  const selectFile = (e) => {
    const files = e.target.files;
    setFile(files[0]);
    console.log(files[0].name);
  };

  const uploadFile = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "the-guitar-next");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/the-guitar-next/image/upload",
      {
        method: "post",
        body: data,
      }
    );
    const result = await res.json();

    return result.secure_url;
  };

  const handleSubmit = async () => {
    if (!file && dataUser === user) {
      setdataUser(user);
      ClickEdit();
      return console.log("no change");
    }

    try {
      if (file) {
        const url = await uploadFile();
        console.log(url);

        if (url) {
          await edit_account_user({
            variables: {
              ...dataUser,
              image_profile: url,
            },
          });
        }
      } else {
        await edit_account_user({
          variables: {
            ...dataUser,
            image_profile: dataUser.image_profile,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ShowImageProfile = () => {
    if (user.image_profile !== null) {
      return (
        <div>
          <img
            className="circular--landscape"
            src={user.image_profile}
            width="100"
          />
        </div>
      );
    } else {
      return <div>no image</div>;
    }
  };
  return (
    <DivGrid>
      {user && (
        <div style={{ background: "#edfaff" }}>
          {!edit ? (
            <CardUser>
              {ShowImageProfile()}
              <h3> Name: {user.name} </h3>            
              <div className="jr_detail_user">
                <div style={{ color: "#338E90" }}>Email</div>
                <div> {user.email} </div>
              </div>
              <div className="jr_detail_user">
                <div style={{ color: "#338E90" }}>Line</div>
                <div> {user.tel} </div>
              </div>
              <div className="jr_detail_user">
                <div style={{ color: "#338E90" }}>Tel</div>
                <div> {user.line_id} </div>
              </div>
              <div className="jr_detail_user">
                <div style={{ color: "#338E90" }}>Tel</div>
                <div> {user.address} </div>
              </div>
              <button onClick={ClickEdit}>Edit</button>
            </CardUser>
          ) : (
            <div>
              <h1> Name: {user.name} </h1>
              <p> Email: {user.email} </p>
              {ShowImageProfile()}
              <p>
                {" "}
                Choose you image profile:{" "}
                <input
                  type="file"
                  placeholder="Image-URL"
                  name="file"
                  onChange={selectFile}
                />{" "}
              </p>
              <p>
                {" "}
                Tel:{" "}
                <input
                  type="text"
                  name="tel"
                  placeholder="Tel"
                  value={dataUser.tel}
                  onChange={handleChange}
                />
              </p>
              <p>
                {" "}
                Line:{" "}
                <input
                  type="text"
                  name="line_id"
                  value={dataUser.line_id}
                  onChange={handleChange}
                />{" "}
              </p>
              <p>
                {" "}
                Address:{" "}
                <input
                  type="text"
                  name="address"
                  value={dataUser.address}
                  onChange={handleChange}
                />{" "}
              </p>
              <button onClick={handleSubmit}>Save</button>
              <button onClick={ClickEdit}>Cancel</button>
            </div>
          )}
          {/* <div>
                 <div>
                   {user.products.map(items => (
                     <div>
                       <p> Name: {items.name} </p>
                       <p> Price: {items.price} </p>
                       <p> Description: {items.description} </p>
                       <hr/>
                     </div>
                   ))}
                 </div>
               </div> */}
        </div>
      )}
      <div>2</div>
    </DivGrid>
  );
};

export default UserData;
