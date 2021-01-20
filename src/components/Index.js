import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function DisplayMemes() {

    const [image,setImage] = useState("https://i.imgflip.com/22bdq6.jpg")
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
        const randomImg = memeImage[randomNum].url
        setImage(randomImg)
    }


    return (
        <div>
            <button onClick={HandleRandomMeme}>Generate Meme</button>
            <img src={image} alt="kskks"/>

``
        </div>
    )
}

