import { useState, useEffect } from "react";
import "./index.css";

function Card() {
  const [emailError, setEmailError] = useState(""); 
  const [nameError, setNameError] = useState(""); 
  const [passwordError, setPasswordError] = useState(""); 

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    bio: "",
  });

  const [cards, setCards] = useState([]);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
    setCards(savedCards);
  }, []);

  function handleName(event) {
    const nameValue = event.target.value;
    setForm({ ...form, name: nameValue });

    if (nameValue.length < 3) {
      setNameError("Ism kamida 3 ta belgidan iborat bo'lishi kerak");
    } else {
      setNameError("");
    }
  }

  function handleEmail(event) {
    const emailValue = event.target.value;
    setForm({ ...form, email: emailValue });

    if (!validateEmail(emailValue)) {
      setEmailError("Email manzilini to'g'ri kiriting");
    } else {
      setEmailError("");
    }
  }

  function handleUser(event) {
    setForm({ ...form, username: event.target.value });
  }

  function handlePassword(event) {
    const passwordValue = event.target.value;
    setForm({ ...form, password: passwordValue });

    if (!validatePassword(passwordValue)) {
      setPasswordError("Parol kamida 8 ta belgi, bitta harf va raqamdan iborat bo'lishi kerak");
    } else {
      setPasswordError("");
    }
  }

  function handleBio(event) {
    setForm({ ...form, bio: event.target.value });
  }

  function handlebtn(event) {
    event.preventDefault();

    if (!validateEmail(form.email)) {
      setEmailError("Email manzili noto'g'ri");
    }

    if (form.name.length < 3) {
      setNameError("Ism kamida 3 ta belgidan iborat bo'lishi kerak");
    }

    if (!validatePassword(form.password)) {
      setPasswordError("Parol  8 ta belgi, bitta harf va raqamdan iborat bo'lishi kerak");
    }

    if (emailError || nameError || passwordError) {
      return;
    }

    const newCard = {
      name: form.name,
      email: form.email,
      username: form.username,
      password: form.password,
      bio: form.bio,
    };

    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    localStorage.setItem('cards', JSON.stringify(updatedCards));

    console.log(newCard);

    // Clear form fields
    setForm({
      name: "",
      email: "",
      username: "",
      password: "",
      bio: "",
    });
  }

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }

  return (
    <>
      <div className="card_container">
        <h1 className="card_create">Create An Account</h1>
        <h3 className="kindly">
          kindly fill the following details to create your account
        </h3>
        <div className="card_input">
          <form>
            <span className="error">{nameError}</span>
            <input
              onChange={handleName}
              value={form.name}
              className="input"
              type="text"
              id="ism"
              name="ism"
              placeholder="Enter your full name"
              required
            />
        
            <span className="error">{emailError}</span>
            <input
              onChange={handleEmail}
              value={form.email}
              className="input"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              required
            />

            <input
              onChange={handleUser}
              value={form.username}
              className="input"
              type="text"
              id="faydalonuvchi nomi"
              placeholder="Enter your username"
            />

            <span className="error">{passwordError}</span>  
            <input
              onChange={handlePassword}
              value={form.password}
              className="input"
              type="password"
              id="parol"
              name="parol"
              placeholder="Enter password"
              required
            />
            <input
              onChange={handleBio}
              value={form.bio}
              className="input_bio"
              type="text"
              id="tahalus"
              placeholder="Your Biography"
            />
          </form>
        </div>
        <button onClick={handlebtn} className="button">
          CREATE ACCOUNT
        </button>
        <h4 className="will">
          You will receive an email after setting up your account
        </h4>
      </div>
    </>
  );
}

export default Card;
