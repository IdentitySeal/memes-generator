import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function DisplayMemes() {
    const [person, setPerson] = useState({ textAbove: '', textBelow: ''});

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
      setPerson({ ...person, [name]: value });
    };

    return (
        <div className="container">
        <form>
          <div className='form-control'>
            {/* <label htmlFor='firstName'>Name : </label> */}
            <input
              type='text'
              id='textAbove'
              name='textAbove'
              value={person.textAbove}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            {/* <label htmlFor='email'>Email : </label> */}
            <input
              type='text'
              id='textBelow'
              name='textBelow'
              value={person.textBelow}
              onChange={handleChange}
            />
          </div>

        </form>
            <div key={person.id} className=''>
            <img src={image} alt={imageAlt}/>
            <div>
            <p className="topText">{person.textAbove}</p>
            <p className="bottomText">{person.textBelow}</p> 
            </div>


            </div>
            <button onClick={HandleRandomMeme}>Generate Meme Image</button>
            <button>Download Meme</button>



        </div>
    )
}

