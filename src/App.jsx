import { useEffect } from "react";
import { useState } from "react";
import { Container, Typography, Alert } from "@mui/material";
import CryptoJS from "crypto-js";
import EncryptButton from "./components/encrypt";
import DecryptButton from "./components/decrypt";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [alert, setAlert] = useState(null);

  //Aqui é para os números binários caírem na tela
  useEffect(() => {
    const createBinaryRow = () => {
      const binary = document.createElement("div");
      binary.className = "binary-number";
      binary.style.left = `${Math.random() * 100}vw`; // Variando a posição de início
      binary.style.animationDuration = `${Math.random() * 3 + 2}s`; // Tempo aleatório para queda
      binary.innerText = Math.random() > 0.5 ? "010101010" : "101010101";
      document.body.append(binary);

      setTimeout(() => {
        binary.remove(); // Remove após 5 segundos (tempo de animação)
      }, 5000);
    };

    const interval = setInterval(createBinaryRow, 700);

    return () => clearInterval(interval);
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setAlert(null);
  };

  const handleEncrypt = async () => {
    if (!file) {
      setAlert(<Alert severity="warning">Nenhum arquivo selecionado.</Alert>);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const fileData = reader.result;
      const ciphertext = CryptoJS.AES.encrypt(
        fileData,
        "secret-key",
      ).toString();
      const blob = new Blob([ciphertext], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      setResult({ url, name: `${file.name}.enc` });

      setAlert(
        <Alert severity="success">Arquivo criptografado com sucesso.</Alert>,
      );
    };
    reader.readAsText(file);
  };

  const handleDecrypt = async () => {
    if (!file) {
      setAlert(<Alert severity="warning">Nenhum arquivo selecionado.</Alert>);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const ciphertext = reader.result;
      try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, "secret-key");
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        const blob = new Blob([originalText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        setResult({ url, name: file.name.replace(".enc", "") });

        setAlert(
          <Alert severity="success">Arquivo decriptado com sucesso.</Alert>,
        );
      } catch {
        setAlert(
          <Alert severity="error">
            Falha para decriptar o arquivo. Verifique o arquivo e a chave.
          </Alert>,
        );
      }
    };
    reader.readAsText(file);
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#0f0",
          fontFamily: "monospace",
          position: "relative",
          textShadow: "0 0 10px #0f0, 0 0 20px #0f0, 0 0 30px #0f0",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            animation: "glitch 2s infinite",
            clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
            transform: "translate(-2px, -2px)",
            color: "#0f0",
            textShadow: "0 0 5px #0f0, 0 0 15px #0f0",
          },
        }}
      >
        Encriptador de Arquivos
      </Typography>
      <input
        type="file"
        onChange={handleFileChange}
        style={{
          margin: "20px 0",
          fontFamily: "monospace",
          color: "white",
        }}
      />
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <div onClick={handleEncrypt}>
          <EncryptButton />
        </div>
        <div onClick={handleDecrypt}>
          <DecryptButton />
        </div>
      </div>
      {result && (
        <Typography variant="h6" marginTop="20px">
          <a
            href={result.url}
            download={result.name}
            style={{ textDecoration: "monoscape", color: "white" }}
          >
            Download {result.name}
          </a>
        </Typography>
      )}
      {alert && <div style={{ marginTop: "20px" }}>{alert}</div>}
    </Container>
  );
}

export default App;
