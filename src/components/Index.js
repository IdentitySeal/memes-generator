import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function DisplayMemes() {
    const url = 'https://api.imgflip.com/get_memes';

    const [image,setImage] = useState("https://i.imgflip.com/22bdq6.jpg")
    const [memeImage, setMemeImage] = useState([])
    const [text,setText] = useState({textAbove:'',textBelow:''})


    const imageData= async()=>{
        axios.get(url)
        .then((res)=> {
            const {allImageData} = res.data
            console.log (allImageData)
            setMemeImage(allImageData)
        }).catch((error)=> {
            console.error(error);
        });
    }

    useEffect(() => {
        imageData();
    }, [])
    
    const HandleRandomMeme = (e)=> {
        // e.preventDefault()
        // console.log("Hey")
        // const randomNum = Math.floor(Math.random()*images.length);  
        // const randomImg = images[randomNum].url
        // setImages(randomImg)
    }
    // const handleTextChange = (e) =>{
    //     const {name,value} = e.target
    //     setText({...text,[name]:value}) 
    //     const newText = { ...text, id: new Date().getTime().toString() };
    //     setMemeImage([...memeImage, newText]);


    // }
    return (
        <div>
            <button onClick={(()=> HandleRandomMeme)}>Generate Meme</button>
            <img src={image} alt="kskks"/>

``
        </div>
    )
}

{/* {images.map((image)=>{
    const {id,name,url} = image; */}
    {/* return( */}
        {/* <div>
        <input 
            type="text" 
            name ="textAbove"     
            id="textAbove"
            value={text.textAbove}
            onChange = {(() => handleTextChange)}
        />

        <input 
            type="text" 
            name ="textBelow" 
            id="textBelow"
            value={text.textBelow}
            onChange = {(() => handleTextChange)}
        />


        {memeImage.map((tex)=>{
            const {id,textAbove,textBelow} = tex
            return(
                <>
                <div key={id}>
                <h1>{textAbove}</h1>
                    <h2>{textBelow}</h2>
                </div>
                   
                </>
            )
        })}
        
        </div> */}

    {/* ) */}
{/* })} */}