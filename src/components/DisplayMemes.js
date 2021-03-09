import React,{useState,useEffect} from 'react';
import * as htmlToImage from 'html-to-image';
import FileSaver from 'file-saver';
import axios from 'axios';


export default function DisplayMemes() {
    const [text, setText] = useState({ textAbove: '', textBelow: ''});
    const [image,setImage] = useState("https://i.imgflip.com/22bdq6.jpg")
    const [imageAlt,setImageAlt] = useState("")
    const [memeImage, setMemeImage] = useState([])
    const [{alt, src}, setImg] = useState({
      src: image,
      alt: 'Upload an Image'
  });    
  const [set,setSet ] = useState(false)
    const url = 'https://api.imgflip.com/get_memes';

    const imageData= async()=>{

        axios.get(url)
        .then((res)=> {
            const allImageData = res.data.data.memes
            console.log (allImageData)
            setMemeImage(allImageData)
        })
        .catch((error)=> {
            console.error(error);
        });
    }

    useEffect(() => {
        imageData();
    }, [])
    
    const HandleRandomMeme = (e)=> {
        e.preventDefault()
        console.log("Hey")
        const randomNum = Math.floor(Math.random()*memeImage.length);  
        const {url,name} = memeImage[randomNum]
        setImage(url)
        setImageAlt(name)
        setSet(false)


    }

  
    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setText({ ...text, [name]: value });
    };

    const downloadPreview = (e)=>{
      e.preventDefault();
      htmlToImage.toBlob(document.getElementById('meme-image-text'))
        .then(function (blob) {
            FileSaver.saveAs(blob, `${imageAlt}.png`);
        });

    }

    const handleFileChange = (e)=>{
      if(e.target.files[0]) {
        setImg({
            src: URL.createObjectURL(e.target.files[0]),
            alt: e.target.files[0].name
        });    
        setSet(true)
      }       
    } 
    return (
        <div className="container">
          <form>
            <div className='form-control'>
              <input
                type='text'
                id='textAbove'
                name='textAbove'
                value={text.textAbove}
                placeholder ='Input text above'
                onChange={handleChange}
              />
            </div>
            <div className='form-control'>
              <input
                type='text'
                id='textBelow'
                name='textBelow'
                placeholder ='Input text below'
                value={text.textBelow}
                onChange={handleChange}
              />
            </div>

            {/*  */}



          </form>
              <div className='canvas-container' key={text.id} id='meme-image-text'>
                {!set ? <img className="image" src={image} alt={imageAlt}/> 
                
                :
                <img className="image" src={src} alt={alt}/>
                }
                

                  <p className="topText text" id='meme-image-text'>{text.textAbove}</p>
                  <p className="bottomText text"id='meme-image-text'>{text.textBelow}</p> 
              </div>
              <button onClick={HandleRandomMeme}>Generate Meme Image</button>
              <button onClick = {downloadPreview}>Download Meme</button>

                <div className="image-upload-div">
                  <input  
                        type="file" 
                        accept=".png, .jpg, .jpeg" 
                        id="image-upload" 
                        className="visibility"
                      
                        onChange={handleFileChange}
                    />
                    <label class="image-upload-button center" for="image-upload">Upload Your Image</label>
                </div>


      </div>
    )
}

