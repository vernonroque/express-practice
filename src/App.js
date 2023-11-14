import React, {useState,useEffect} from 'react';
//import logo from './logo.svg';
//import { Counter } from './features/counter/Counter';
import styles from './App.module.css';
//import { Form } from 'react-router-dom';

function App() {

  const [inputName,setInputName] = useState('');
  const [name,setName] =useState('');
  const [loading,setLoading] = useState(true);
  const [message,setMessage] = useState('');
  const [loadingMessage,setLoadingMessage] = useState(true);
  const [listOfNames, setListOfNames] = useState([]);
  //const [i,setI] = useState(0);
  const [loadingList,setLoadingList] = useState(true);
  const [newNameData,setNewNameData] = useState(
    {targetName:'',
      newName:'' }
    );
  const [deleteName,setDeleteName] = useState('');
  const [deleteOfficial,setDeleteOfficial] = useState('');
  const [deleteSuccess,setDeleteSuccess] = useState(false);
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

  const fetchNames = async() => {
    const response = await fetch('http://localhost:4001/totalList');
    const jsonResponse = await response.json();
    console.log("jsonResponse of list >>>", jsonResponse.list);

    setListOfNames([...jsonResponse.list]);

  }

  useEffect(()=>{

    
    // setListOfNames(prevList => [...prevList,name]);
    fetchNames();
    setLoadingList(false);

  },[name])

  const handleSubmit = async(e) => {
    e.preventDefault();

    // const parentElement = document.querySelector(".nameForm");
    // const value = parentElement.querySelector('input').value;


    // console.log('Im in the handleSubmit function. The value is >>>', value);

    const response = await fetch(`http://localhost:4001/newName?name=${inputName}`,{method: 'POST'});
    const jsonResponse = await response.json();

    console.log("jsonResponse>>>>", jsonResponse);
    console.log(jsonResponse.list.length);
    const arrayLength = jsonResponse.list.length;
    setName(jsonResponse.list[arrayLength - 1]);
    setLoading(false);
    setInputName('');
    // setI(prevI => 
    //   {
    //     console.log("The previous value is >>>", prevI);
    //     console.log("the i value after incrementing >>>>", prevI + 1);
    //     return prevI + 1;
    //   });
  } 

  const handleUpdateForm = (e) =>{
    e.preventDefault();

    const updateName = () => {
      fetch(`http://localhost:4001/updateName?targetName=${newNameData.targetName}&newName=${newNameData.newName}`,{
        method:'PUT'
      })
      .then(response=> {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(jsonResponse => {
        //jsonResponse.list.map(element => setListOfNames([...listOfNames,element]))
        setListOfNames([...jsonResponse.list]);

      })
    }

    updateName();

    setNewNameData({
      targetName:'',
      newName:''
    })

  }
  const handleDeleteForm = (e) => {
    e.preventDefault();

    setDeleteOfficial(deleteName);

    fetch(`http://localhost:4001/deleteName?deleteName=${deleteName}`,{
      method:'DELETE'
    })
    .then(response =>{
      if(response.ok)
        return response.json();
      else
        throw new Error(`HTTP error! Status: ${response.status}`);
    })
    .then(jsonResponse => {
      setListOfNames([...jsonResponse.list])
    })

    setDeleteSuccess(true);

    setDeleteName('');
    
    setTimeout(()=>{
      setDeleteSuccess(false);
    },3000)

  }
  const handleDeleteInput = e => {

    const {value} = e.target;
    setDeleteName(value);

  }
  const handleName = e => {
    //console.log("The e value >>>", e.target);
    const {value} = e.target;
    setInputName(value);
  }
  const handleChange = (e) => {

    const {name,value} = e.target;

    setNewNameData({
      ...newNameData,
      [name]:value
    })
  }

    return(
      <>
        <form className = "nameForm" onSubmit={handleSubmit}>
          <input type="text" 
                 className="name" 
                 placeholder="Please enter a name" 
                 name="nameInput"
                 value={inputName}
                 onChange = {handleName}
                 />

        </form>

        {loading ? <h1>Still loading ....</h1> : <h1>The name is {name}</h1>}
        {loadingMessage ? <h1>Still loading message ...</h1> : <h1>The message is {message}</h1>}


        {loadingList ? <h1>Currently loading list</h1>:
          <>
             <h2>The list of names: </h2>
                <ol className = {styles.unorderedList}>
                   {listOfNames.map((element,i)=> <li key = {i} >{element}</li>)}
               </ol>
          </>
        }

        <h1>Update a name here: </h1>
        <form className={styles.updateForm} onSubmit={handleUpdateForm}>
          <label for="targetName">What name do you want to replace?</label>
          <input type="text" 
                name="targetName" 
                value={newNameData.targetName} 
                onChange = {handleChange}
                />

          <label for="newName">Replace with what name?</label>
          <input type="text" name="newName" value={newNameData.newName} onChange = {handleChange} />

          <button className = {styles.updateButton} type="submit">Update now</button>
        </form>

        <h1>Delete a name here: </h1>
        <form className = {styles.deleteForm} onSubmit = {handleDeleteForm}>
          <label for = "deleteName">What name do you wanna delete?</label>
          <input type="text" 
                 name = "deleteName" 
                 value={deleteName} 
                 onChange={handleDeleteInput}
                 />
          <button className = {styles.deleteButton} type = "submit">Delete name</button>

       </form>
       {deleteSuccess?<h1>You deleted {deleteOfficial}</h1>: ''}
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
