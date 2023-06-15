import React, { useEffect, useState } from "react";
import "./css/Profile.css";
import { getUserProfile } from "./js/Api";
import { updateProfile, validateData } from "./js/User";

const Profile = () => {
  const id = localStorage.getItem("userIdUpdate");
  const token = localStorage.getItem("token");

  const [userData, setUserData] = useState(null);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [age, setAge] = useState(null);
  const [city, setCity] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchData = async () => {
    const profileData = await getUserProfile(token, id, "update");
    setUserData(profileData);
    setName(profileData.name);
    setEmail(profileData.email);
    setAge(profileData.age);
    setCity(profileData.city);
  };
  const handleUpdateProfile = async () => {
    //const validationResult = validateData({ name, email, age });
    try {
      const response = await updateProfile(
        { name, email, age, city },
        id,
        token
      );
      if (response && response.status === 200) {
        setSuccessMessage(response.data.message);
        fetchData();

        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
      }else{
        setErrorMessage(response);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }

    } catch (error) {
      setErrorMessage(error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      
    }
       
        
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-pricipal">
      <div className="title">

      </div>
      {userData && (
        <div className="container-profile">
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="from-group">
            <label htmlFor="staticEmail" className="col-md-3 col-form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={(e) => setName(e.target.value)}
              defaultValue={name}
              required
            />
          </div>
          <div className="from-group">
            <label htmlFor="inputEmail">Email</label>
            <input
              type="text"
              className="form-control"
              id="inputEmail"
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={email}
            />
          </div>
          <div className="from-group">
            <label htmlFor="inputAge">Edad</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setAge(e.target.value)}
              defaultValue={age}
            />
          </div>
          <div className="from-group">
            <label htmlFor="inputAge">City</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setCity(e.target.value)}
              defaultValue={city}
            />
          </div>
          <div className="row justify-content-evenly mt-3">
            <button
              onClick={() => handleUpdateProfile()}
              className="btn btn-outline-primary col-4"
              type="submit"
            >
              Actualizar
            </button>

            <a href="/home" type="button" className="col-4">
              <button className="btn btn-outline-danger btn-back">Atras</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
