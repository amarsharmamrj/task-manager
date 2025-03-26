import React from "react";
import axios from "axios";

export default function Upload() {
  const [uploadFile, setUploadFile] = React.useState();
  const [superHero, setSuperHero] = React.useState();
  
  const submitForm = (event) => {
    event.preventDefault(); 

    const data = new FormData()
   data.append('file',uploadFile)
    // console.log(dataArray)
    // let dataArray = {
    //     "file": uploadFile
    // }"C%3A%
    // dataArray.file = uploadFile
    console.log(data)

    axios
      .post("https://task-manger-api-new.herokuapp.com/users/me/avatar", data, {
        headers: {
          'Content-type': 'multipart/form-data',  
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        }
      })
      .then((response) => {
          console.log("File uploaded")
        // successfully uploaded response
      })
      .catch((error) => {
        console.log("file upload failed")
      });
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <input
          type="text"
          onChange={(e) => setSuperHero(e.target.value)}
          placeholder={"Superhero Name"}
        />
        <br />
        <input type="file" onChange={(e) => setUploadFile(e.target.files[0])} />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}
