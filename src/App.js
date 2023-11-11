import React, {useState,useEffect} from 'react';
//import logo from './logo.svg';
//import { Counter } from './features/counter/Counter';
import './App.css';
//import { Form } from 'react-router-dom';

function App() {

  const [name,setName] =useState('');
  const [loading,setLoading] = useState(true);
  const [message,setMessage] = useState('');
  const [loadingMessage,setLoadingMessage] = useState(true);
  const [listOfNames, setListOfNames] = useState([]);
  //const [i,setI] = useState(0);

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

  useEffect(()=>{

    setListOfNames(prevList => [...prevList,name]);


  },[name])

  const handleSubmit = async(e) => {
    e.preventDefault();

    const parentElement = document.querySelector(".nameForm");
    const value = parentElement.querySelector('input').value;


    console.log('Im in the handleSubmit function. The value is >>>', value);

    const response = await fetch(`http://localhost:4001/newName?name=${value}`,{method: 'POST'});
    const jsonResponse = await response.json();

    console.log("jsonResponse>>>>", jsonResponse);
    console.log(jsonResponse.list.length);
    const arrayLength = jsonResponse.list.length;
    setName(jsonResponse.list[arrayLength - 1]);
    setLoading(false);
    // setI(prevI => 
    //   {
    //     console.log("The previous value is >>>", prevI);
    //     console.log("the i value after incrementing >>>>", prevI + 1);
    //     return prevI + 1;
    //   });
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

        <h2>The list of names: </h2>
        {listOfNames.map(element=> <h2>{element}</h2>)}
        

      
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
