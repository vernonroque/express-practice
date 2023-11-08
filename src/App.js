import React, {useState,useEffect} from 'react';
//import logo from './logo.svg';
//import { Counter } from './features/counter/Counter';
import './App.css';
import { Form } from 'react-router-dom';

function App() {

  const [name,setName] =useState('');
  const [nameResult,setNameResult] = useState('');
  const [loading,setLoading] = useState(true);
  const [message,setMessage] = useState('');
  const [loadingMessage,setLoadingMessage] = useState(true);

  useEffect(()=>{

    const fetchName = async() =>{
      const response = await fetch('http://localhost:4001/Marley');
      const textResponse = await response.json();

      console.log("The json response >>>", textResponse);

      setMessage(textResponse.message);
      console.log("The message is >>>", message);

      setLoadingMessage(false);

    }

    fetchName();


  },[message]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const parentElement = document.querySelector(".nameForm");
    const value = parentElement.querySelector('input').value;


    console.log('Im in the handleSubmit function. The value is >>>', value);

    const response = await fetch(`http://localhost:4001/newName?name=${value}`,{method: 'POST'});
    const textResponse = await response.text();

    setName(textResponse);
    setLoading(false);

  } 

  // const handleChange = (e) => {

  //   setName(e.target.value);
  //   // setLoading(true);

  // }


    return(
      <>
        <form className = "nameForm" onSubmit={handleSubmit}>
          <input type="text" className="name" placeholder="Please enter a name" />

        </form>

        {loading ? <h1>Still loading ....</h1> : <h1>The name is {name}</h1>}
        {loadingMessage ? <h1>Still loading message ...</h1> : <h1>The message is {message}</h1>}
      
      </>


    )


  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <Counter />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <span>
  //         <span>Learn </span>
  //         <a
  //           className="App-link"
  //           href="https://reactjs.org/"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           React
  //         </a>
  //         <span>, </span>
  //         <a
  //           className="App-link"
  //           href="https://redux.js.org/"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Redux
  //         </a>
  //         <span>, </span>
  //         <a
  //           className="App-link"
  //           href="https://redux-toolkit.js.org/"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Redux Toolkit
  //         </a>
  //         ,<span> and </span>
  //         <a
  //           className="App-link"
  //           href="https://react-redux.js.org/"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           React Redux
  //         </a>
  //       </span>
  //     </header>
  //   </div>
  // );
}

export default App;
