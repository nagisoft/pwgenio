import logo from './logo.svg';
import './Styles.scss'
import {useState, useEffect, useRef} from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaClipboard } from "react-icons/fa";
import {number , upperCaseLetters, lowerCaseLetters, specialCharacters} from './Characters'

import { COPY_SUCCESS, ALERT } from "./Message";
toast.configure();
function App() {
  const [password,setPassword] = useState('');
  const [passwordLength,setPasswordLength] = useState(20);
  const [uppercase,setUpperCase] = useState(true);
  const [lowercase,setLowerCase] = useState(true);
  const [numbers,setNumbers] = useState(true);
  const [symbols,setSymbols] = useState(true);

  const copyBtn = useRef();
  const handleGeneratePassword = () =>{
    // 
    if(!uppercase && !lowercase && !numbers && !symbols){
      notifs(ALERT,true);
    }

    let characterList = "";
    if(uppercase){
      characterList += upperCaseLetters;
    }
    if(lowercase){
      characterList += lowerCaseLetters;
    }
    if(numbers){
      characterList += number;
    }
    if(symbols){
      characterList += specialCharacters;
    }

    setPassword(passwordCreator(characterList))
  }

  const passwordCreator = (characterList) =>{
    let password ="";
    const characterListLength = characterList.length;

    for(let i =0; i<passwordLength;i++){
      const characterIndex = getRandomIndex(characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  }

  const getRandomIndex = (limit) =>{
    return Math.round(Math.random()*limit);
  }

  const copyFromClipboard = () =>{
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();

    copyBtn.current.disabled = true;
    
    setTimeout(()=>{
      copyBtn.current.disabled = false;
    },3000)
  }
  
  const notifs = (message, error=false) =>{
    if(error){
      toast.error(message,{
        position:toast.POSITION.TOP_CENTER,
        autoClose:5000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        progress:undefined
      });
    }
    else{
      toast(message,{
        position:toast.POSITION.TOP_CENTER,
        autoClose:5000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        progress:undefined
      })
    }
  }

  const handleCopy = () =>{
    copyFromClipboard();
    notifs(COPY_SUCCESS);
  }

  useEffect(()=>{
    handleGeneratePassword();
  },[]);


  return (
    <div className="m-container">
      <div className="m-generator box red">
        <h2 className="m-generator__header">Password Generator</h2>

        <div className="m-generator__password">
          {password}
          <button
            className="m-generator__passwordGenerateBtn"
            ref={copyBtn}
            onClick={handleCopy}
          >
            <FaClipboard />
            {/* {copyBtnText} */} 
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="password-length">Password length</label>
          <input
            name="password-length"
            id="password-length"
            type="number"
            max="20"
            min="10"
            defaultValue={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="uppercase-letters">Include uppercase letters</label>
          <input
            id="uppercase-letters"
            name="uppercase-letters"
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUpperCase(e.target.checked)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lowercase-letters">Include lowercase letters</label>
          <input
            id="lowercase-letters"
            name="lowercase-letters"
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowerCase(e.target.checked)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="include-numbers">Include Numbers</label>
          <input
            id="include-numbers"
            name="include-numbers"
            type="checkbox"
            checked={numbers}
            onChange={(e) => setNumbers(e.target.checked)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="include-symbols">Include Symbols</label>
          <input
            id="include-symbols"
            name="include-symbols"
            type="checkbox"
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)}
          />
        </div>

        <button className="m-generator__btn" onClick={handleGeneratePassword}>
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
