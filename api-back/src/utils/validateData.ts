import { IUpdateDataUser } from "src/interfaces/users/user.interface";
import { regex } from "./regularExp";

export const validateData = (validateData: IUpdateDataUser) => {
  const name = validateData.name || null;
  const email = validateData.email || null;
  const password = validateData.password || null;
  const age = validateData.age || null;
  const city = validateData.city || null;

  if (name && !regex.name.test(name)) {
    const error = new Error("El nombre de usuario no es valido");
    return { message: error.message, isValid: false };
  }
  if (email && !regex.email.test(email)) {
    const error = new Error("El correo electronico no es valido");
    return { message: error.message, isValid: false };
  }

  if (password && !regex.password.test(password)) {
    const error = new Error(
      "La contraseña debe tener 8 o 16 caracteres, incluir al menos un numero, una mayuscula y una minuscula"
    );
    return { message: error.message, isValid: false };
  }

  if (age  && typeof age != "number"){
    const error = new Error("La edad debe ser un numero");
    return { message: error.message, isValid: false };
  }
  
  if (city && !regex.name.test(city)){
    const error = new Error("Valor invalido");
    return { message: error.message, isValid: false };
  }

  return { isValid: true };
};