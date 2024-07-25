import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';

const OCRTest = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [canvasRef, setCanvasRef] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = () => {
    if (image) {
      setLoading(true);
      // Process the image to detect rotation
      const img = new Image();
      img.src = image;
      img.onload = () => {
        // Create a canvas element to process the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const width = img.width;
        const height = img.height;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0);

        // Rotate the canvas context if needed
        // Example rotation logic: Rotate by 90 degrees if needed
        ctx.rotate(90 * Math.PI / 180);
        ctx.translate(0, -height);
        ctx.drawImage(img, 0, 0);

        // Convert canvas to data URL
        const rotatedImage = canvas.toDataURL('image/jpeg');

        // Perform OCR on the processed image
        Tesseract.recognize(
          rotatedImage,
          'eng', // Specify language code
          {
            logger: info => console.log(info),
            oem: 1,
            psm: 6
          }
        ).then(({ data: { text } }) => {
          setText(text);
          setLoading(false);
        }).catch(err => {
          console.error(err);
          setLoading(false);
        });
      };
    }
  };

  return (
    <div>
      <h2>OCR Test</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Process Image</button>
      <div>
        {loading && <p>Processing...</p>}
        {image && <img src={image} alt="Selected" style={{ maxWidth: '100%', marginTop: '20px' }} />}
        <pre>{text}</pre>
      </div>
    </div>
  );
};

export default OCRTest;
