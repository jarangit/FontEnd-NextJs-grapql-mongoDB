import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../../appState/authProvider";
import { useMutation } from "@apollo/react-hooks";
import { ME } from "./userProducts";
import { QUERY_USER } from "../../pages/_app";
import styled from "styled-components";
import AccountPro from "./accountPro";

const DivGrid = styled.div`
  margin: 50px 0;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  
 
  .account_box_name{
    align-self: center;

  }
  .account_box_img {
    align-self: center;
    justify-self: center;
    /* background: red; */
  }
  div {
    justify-self: left;
    
  }
  input,
  label {
    width: 80%;
    display: inline-block;
  }
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
  console.log(user);
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
    <>
      <DivGrid>
        {user && (
          <div className  ="account_box_img">
            {!edit ? (
              <div>
                  {ShowImageProfile()}
              </div>
            ) : (
              <div>
                {ShowImageProfile()}
                <p>
                  โปรเลือกรูปของคุณ:
                  <input
                    type="file"
                    placeholder="Image-URL"
                    name="file"
                    onChange={selectFile}
                  />
                </p>
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
        <div className="account_box_name">
          <h1>{user.name}</h1>
          <p> {user.email} </p>
        </div>
        <div>
          {!edit ? (
            <div>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Tel:</strong> {user.tel}
              </p>
              <p>
                <strong>Line:</strong> {user.line_id}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>
            </div>
          ) : (
            <form onChange={handleChange}>
              <label>เบอร์โทรศัพท์</label>
              <input
                type="text"
                name="tel"
                placeholder="เบอร์โทรศัพท์"
                value={dataUser.tel}
              />
              <label>Line</label>
              <input
                type="text"
                name="line_id"
                placeholder="ไลน์ไอดี"
                value={dataUser.line_id}
              />
              <label>ที่อยู่</label>
              <input
                type="text"
                name="address"
                placeholder="ที่อยู่"
                value={dataUser.address}
              />
            </form>
          )}
        </div>
        <div>
          <p>สินค้าของคุณ</p>
          <p>รายการที่ชื่นชอบ</p>
          {!edit ? (
            <div>
              <button onClick={ClickEdit}>Edit</button>
            </div>
          ) : (
            <div>
              <button onClick={handleSubmit}>บันทึก</button>
              <button onClick={ClickEdit}>ยกเลิก</button>
            </div>
          )}
        </div>
      </DivGrid>
      <AccountPro dataPro={user.products} dataFav={user.carts} />
    </>
  );
};

export default UserData;
