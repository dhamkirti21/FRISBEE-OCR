import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const [image, setImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleUpload = async () => {
    try {
      if (!image) {
        alert('Please select an image before uploading.');
        return;
      }

      const formData = new FormData();
      formData.append('files', image);

      const response = await axios.post(`${JSON.stringify(import.meta.env.BACKEND_URL)}`, formData);

      // Handle the OCR response, set recognized text to state
      setRecognizedText(response.data.recognizedText);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div style={{
      display: 'flex',
      margin:'30px'
    }}>
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button style={{
          display: "block",
          marginTop:"40px"
        }} onClick={handleUpload}>Upload and OCR</button>
      </div>
      <div>
        {recognizedText && (
          <div>
            <div>
              <img src={(URL.createObjectURL(image)) || imageUrl } alt="uploadedImage" />
            </div>

            <div>
              <h3>Recognized Text:</h3>
              <p>{recognizedText}</p>
            </div>
          </div>
        )}
      </div>
    </div>

  );
}

export default App;
