import axios from "axios";
import Swal from "sweetalert2";
import { deleteUser } from "./User.js"

export const getUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3002/users", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    return response.data;
  } catch (error) {
    return console.log(error);
  }
};

export const getUserProfile = async (token, userId, type) => {
  try {
    const response = await axios.get(
      `http://localhost:3002/users/${userId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    if(type == "details") showUserAlert(response.data);
    else if (type == "update") return response.data;

  } catch (error) {
    return console.log(error);
  }
};

const showUserAlert = (profile) => {
  Swal.fire({
    title: "Perfil",
    width: '25%',
    height: '30%',
    html: `
    <div class="profile">
    <div class="card">
    <div class="card-body">
      <p class="card-title">${profile.name}</p>
      <p class="card-text"> ${profile.email}</p>
      <p class="card-text">Edad: ${profile.age ? profile.age : ""}</p>
      <p class="card-text">City: ${profile.city ? profile.city : ""}</p>

    </div>
  </div>
  </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Actualizar",
    cancelButtonText: "Eliminar",
    buttonsStyling: false,
    customClass: {
      confirmButton: "btn btn-outline-success btn-lg mx-2",
      cancelButton: "btn btn-outline-danger btn-lg mx-2",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.setItem('userIdUpdate', profile._id);
      window.location.href = `/profile`;
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      const token = localStorage.getItem('token');
      deleteUser(profile._id, profile.email, token);
    }
  });
};
