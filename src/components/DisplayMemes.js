import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function DisplayMemes() {
    const [text, setText] = useState({ textAbove: '', textBelow: ''});
    const [image,setImage] = useState("https://i.imgflip.com/22bdq6.jpg")
    const [imageAlt,setImageAlt] = useState("")
    const [memeImage, setMemeImage] = useState([])
    
    // const [text,setText] = useState({textAbove:'',textBelow:''})

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

    }

  
    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setText({ ...text, [name]: value });
    };

    return (
        <div className="container">
          <form>
            <div className='form-control'>
              <input
                type='text'
                id='textAbove'
                name='textAbove'
                value={text.textAbove}
                onChange={handleChange}
              />
            </div>
            <div className='form-control'>
              <input
                type='text'
                id='textBelow'
                name='textBelow'
                value={text.textBelow}
                onChange={handleChange}
              />
            </div>

          </form>
              <div key={text.id} className=''>
                <img className="image" src={image} alt={imageAlt}/>
                <div>
                  <p className="topText text">{text.textAbove}</p>
                  <p className="bottomText text">{text.textBelow}</p> 
                </div>
              </div>
              <button onClick={HandleRandomMeme}>Generate Meme Image</button>
              <button>Download Meme</button>
      </div>
    )
}

