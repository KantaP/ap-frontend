
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [images , setImages] = useState([]);

  useEffect(()=>{
    const fetchImages = async() => {
      try {
        const response = await fetch('https://picsum.photos/v2/list');
        const json = await response.json();
        // console.log(json);
        setImages(json);
      }catch(error) {
        // console.log(error);
        alert('ไม่สามารถดึงข้อมูลได้');
      }
    }

    fetchImages();
  },[])

  const Thumbnail = (props) => {
    return (
      <li>
        <img src={props.image.download_url} />
      </li>
    )
}

  return (
    <div className="container">
      <ul>
        {
          images.map((item , index)=>(
            <Thumbnail key={index} image={item} />
          ))
        }
      </ul>
    </div>
  );
}

export default App;
