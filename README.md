
# Encriptador e Decriptador de Arquivos

## Descrição do Projeto

Este projeto é uma aplicação web desenvolvida em **React**, que permite ao usuário encriptar e decriptar arquivos de texto de forma simples e intuitiva. Além das funcionalidades de encriptação e decriptação, o site exibe uma animação visual de números binários caindo, criando uma atmosfera interativa inspirada no famoso "Matrix".

A ideia principal deste projeto é fornecer uma ferramenta útil para quem precisa proteger o conteúdo de arquivos de texto, com uma interface atraente e moderna, enquanto experimenta um efeito visual imersivo.

### Funcionalidades

1. **Criptografia de Arquivos**: O usuário pode selecionar um arquivo de texto que será encriptado com uma chave secreta (pré-definida no código). O arquivo encriptado pode ser baixado como um arquivo `.enc`.
   
2. **Descriptografia de Arquivos**: O usuário pode selecionar um arquivo encriptado `.enc` e, com a chave secreta correta, decriptá-lo de volta ao seu formato original.

3. **Animação de Números Binários**: Durante o uso do site, números binários (0s e 1s) caem na tela de forma aleatória, criando o efeito visual de "Matrix". Essa animação é criada com **CSS3** e **JavaScript**.

### Objetivo

O objetivo deste projeto é não apenas fornecer uma ferramenta prática de criptografia, mas também adicionar uma camada de interatividade e experiência visual, combinando funcionalidade com entretenimento.

---

## Tecnologias Utilizadas

Este projeto faz uso das seguintes tecnologias:

### **React**

- **React** foi utilizado para construir a interface dinâmica da aplicação. O React facilita a criação de componentes reutilizáveis e o gerenciamento do estado da aplicação.
  
  Exemplo de uso do React no componente `App.js`:
  ```js
  import { useState, useEffect } from "react";

  function App() {
    const [file, setFile] = useState(null);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
      // Código para a animação de números binários
    }, []);
    
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };

    // Mais código...
  }
  ```

### **CSS3 e Animações**

- **CSS3** é usado para criar a animação dos números binários e o design geral da interface. O efeito de queda dos números binários é implementado com a propriedade `@keyframes`.

  Exemplo de animação de queda de números binários:
  ```css
  @keyframes fall {
    from {
      top: -10%;
    }
    to {
      transform: translateY(100vh);
    }
  }

  .binary-number {
    position: absolute;
    top: -10%;
    animation: fall 15s linear infinite;
    color: #0f0;
    font-size: 16px;
    font-weight: bold;
    vertical-align: middle;
    writing-mode: vertical-rl;
    text-orientation: upright;
  }
  ```

### **CryptoJS (Criptografia e Decriptação)**

- **CryptoJS** é uma biblioteca JavaScript que fornece algoritmos de criptografia, como **AES** (Advanced Encryption Standard). No nosso projeto, utilizamos a biblioteca para criptografar e decriptar arquivos de texto.

  Exemplo de encriptação usando **CryptoJS**:
  ```js
  const ciphertext = CryptoJS.AES.encrypt(fileData, "secret-key").toString();
  ```

  E para decriptar o arquivo:
  ```js
  const bytes = CryptoJS.AES.decrypt(ciphertext, "secret-key");
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  ```

### **Material-UI (MUI)**

- **Material-UI** é utilizado para fornecer componentes de interface de usuário, como botões e alertas, de forma simples e estilizada.

  Exemplo de alerta com **Material-UI**:
  ```js
  <Alert severity="success">Arquivo criptografado com sucesso.</Alert>
  ```

---

## Como Funciona o Projeto

### 1. **Seleção do Arquivo**

O usuário pode selecionar um arquivo de texto usando o input de tipo `file`. A partir daí, o arquivo é lido e armazenado no estado `file`.

### 2. **Criptografia do Arquivo**

Ao clicar no botão de encriptação, o arquivo é lido e sua informação é transformada em um texto criptografado usando a biblioteca **CryptoJS**. O arquivo criptografado é então disponibilizado para download com a extensão `.enc`.

### 3. **Descriptografia do Arquivo**

Da mesma forma, o usuário pode selecionar um arquivo `.enc` e, ao clicar no botão de decriptação, o arquivo será decriptado de volta ao formato original. O conteúdo original do arquivo é recuperado utilizando a chave secreta e exibido para o usuário.

### 4. **Animação de Números Binários**

A animação de números binários caindo é criada dinamicamente com **JavaScript** e **CSS**. A cada intervalo de tempo, um número binário (gerado aleatoriamente) é inserido na tela e começa a "cair" até o fundo da página.

---

## Estrutura do Projeto

O projeto é estruturado da seguinte forma:

```
/src
  /components
    /encrypt.js          // Componente para encriptação de arquivos
    /decrypt.js          // Componente para decriptação de arquivos
  App.js                 // Arquivo principal que contém a lógica e a interface
  App.css                // Arquivo de estilo principal
/public
  index.html             // Arquivo HTML principal que carrega o React
```

### **App.js**

O `App.js` é o arquivo principal que contém a lógica central do aplicativo, incluindo a gestão dos estados (como o arquivo selecionado), a lógica de criptografia e decriptação, além da animação dos números binários.

#### Exemplo de código:

```js
import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { Alert } from "@mui/material";
import EncryptButton from "./components/encrypt";
import DecryptButton from "./components/decrypt";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    // Criação da animação dos números binários
    const createBinaryRow = () => {
      const binary = document.createElement("div");
      binary.className = "binary-number";
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
  };

  const handleEncrypt = async () => {
    if (!file) {
      setAlert(<Alert severity="warning">Nenhum arquivo selecionado.</Alert>);
      return;
    }
    // Lógica de encriptação
  };

  const handleDecrypt = async () => {
    if (!file) {
      setAlert(<Alert severity="warning">Nenhum arquivo selecionado.</Alert>);
      return;
    }
    // Lógica de decriptação
  };

  return (
    <div>
      {/* Interface de usuário e lógica */}
    </div>
  );
}

export default App;
```

### **App.css**

O `App.css` é responsável pela parte visual do projeto, incluindo o estilo e animações.

Exemplo de código CSS para a animação de números binários:

```css
@keyframes fall {
  from {
    top: -10%;
  }
  to {
    transform: translateY(100vh);
  }
}

.binary-number {
  position: absolute;
  top: -10%;
  animation: fall 15s linear infinite;
  color: #0f0;
  font-size: 16px;
  font-weight: bold;
  writing-mode: vertical-rl;
  text-orientation: upright;
}
```

---

## Como Rodar o Projeto

Para rodar o projeto localmente, siga os passos abaixo:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/encriptador-de-arquivos.git
   cd encriptador-de-arquivos
   ```

2. **Instale as dependências**:
   Se você ainda não instalou as dependências, execute:
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm start
   ```

Isso abrirá o projeto no seu navegador padrão em `http://localhost:3000`.

---

## Contribuindo

Se você deseja contribuir para este projeto, siga as etapas abaixo:

1. **Fork o repositório**.
2. **Crie uma nova branch** para suas alterações:
   ```bash
   git checkout -b minha-alteracao
   ```
3. **Faça suas alterações** e **commit**:
   ```bash
   git commit -am 'Adicionei uma nova funcionalidade'
   ```
4. **Push para sua branch**:
   ```bash
   git push origin minha-alteracao
   ```
5. **Abra um Pull Request** para a branch principal.

---

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Com este README, o projeto é explicado de forma detalhada, abrangendo desde a ideia e funcionalidade até as tecnologias utilizadas e o código envolvido. Isso proporcionará uma compreensão clara do funcionamento do projeto para outros desenvolvedores ou interessados.
