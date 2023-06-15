export  const regex = {
  name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
  city: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  password: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
}