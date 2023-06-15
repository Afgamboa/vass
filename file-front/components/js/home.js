import axios from "axios";

export async function sendToFile(file, stringWords) {
  const arrayWords = stringWords.split(/\s*,\s*/);
  const valid = validateData(file);
  const baseUrl = "http://localhost:3001";
  if (valid) {
    const formData = new FormData();
    formData.append("file", file);
    if (arrayWords.length > 0) {
      console.log(arrayWords);
      formData.append("words", arrayWords);
    }
    try {
      const response = await axios.post(`${baseUrl}/fileProcess`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response)
      if(response.status === 200) return response.data;
    } catch (error) {
      console.log(error)
    }
    
  }
}

function validateData(file) {
  if (!file) {
    throw new Error("Debe seleccionar un archivo");
  }
  if (file && file.type != "text/plain")
    throw new Error(
      "El archivo seleccionado debe ser un archivo de texto plano"
    );

  if (file && file.size > 1024) {
    throw new Error("El archivo seleccionado es demasiado grande");
  }

  return true;
}
