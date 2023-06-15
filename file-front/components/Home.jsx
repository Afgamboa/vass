"use client";

import React, { useState, useEffect } from "react";
import { Input } from "../styled-components/Input";
import "../css/page.css";
import { sendToFile } from "./js/home";

export default function Page() {
  const [searchWord, setSearchWord] = useState("");
  const [file, setFile] = useState("");
  const [errors, setErrors] = useState("");
  const [dataFile, setDataFile] = useState(null);

  const handleSearchWord = async () => {
    try {
      const res = await sendToFile(file, searchWord);
      setDataFile(res);
    } catch (error) {
      setErrors(error.message);
      setTimeout(() => {
        setErrors("");
      }, 3000);
    } finally {
      setSearchWord("");
    }
  };

  return (
    <div className="d-flex">
      <div className="app-container mt-5">
        <section className="container">
          <section className="mb-5">
            <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
            {errors && <p className="text-danger">{errors}</p>}
          </section>
          <section>
            <p>
              Tambien puedes buscar palabras en tu documento. Separadas por una
              coma.
            </p>
            <Input
              type="text"
              placeholder="Hola, bienvenido, a vass"
              className="mb-4"
              onChange={(e) => {
                setSearchWord(e.target.value);
              }}
            />
          </section>
          <button className="btn btn-outline-light" onClick={handleSearchWord}>
            Enviar
          </button>
        </section>
      </div>
      <div className="container">
        {dataFile && (
          <div className="mt-5">
            <h5 style={{ color: "greenyellow" }}>{dataFile.message}</h5>
            {dataFile.result && (
              <ul>
                <p style={{ color: "white", fontSize: "20px" }}>
                  El archivo cargado tiene: {dataFile.result.totalWords}{" "}
                  palabras
                </p>
                {dataFile.result.wordCounts && (
                  <div>
                    <p style={{ color: "white", fontSize: "20px" }}>
                      Palabras encontradas:
                    </p>
                    <ul>
                      {Object.keys(dataFile.result.wordCounts).map((word) => (
                        <li style={{ color: "white"}} key={word}>
                          {word}: {dataFile.result.wordCounts[word]}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
