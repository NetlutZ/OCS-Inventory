import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import './Settings.css'

function Settings() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/image/1')
      .then((res) => {
        console.log(res);
        setImageData(res.data.name);
      }).catch((err) => {
        console.log(err);
      });
  }, []);


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);
    axios.post('http://localhost:8080/image', formData)
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="file" name="image" onChange={handleFileChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        {imageData ? (
          <img src={`http://localhost:8080/image/display/${imageData}`} alt="" width={100} height={'auto'}/>) : (<p>No image</p>)}

      </div>
    </div>
  )
}

export default Settings
