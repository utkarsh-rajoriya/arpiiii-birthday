import { useState } from "react";
import manja from "../assets/manja.gif";
import mochi from "../assets/mochi.gif";
import doLoveme from "../assets/peach-goma-phone.gif";
import maanbhijaa from "../assets/peach-goma-rub-cheeks.gif";
import dustbin from "../assets/Dustbin.jpg";
import lovelyFlowers from "../assets/LovelyFlowers.jpeg";
import kissing from "../assets/milk-and-mocha-hug.gif";
import "./DoLove.css";

export default function DoLove() {
  const [Love, setlove] = useState(false);
  // Array of messages and images
  const writtenText = [
    {
      text: "Do you love me?",
      smalltext: "aaj tu bta de mujse pyar krti hai ki nhi krti? 🙂",
    },
    {
      text: "Soch le aache se!",
      smalltext: "itni jaldi mt bole 🙂",
    },
    {
      text: "Ek or baar soch le aache se 😫",
      smalltext: "kyu ese kr rhi hai😤",
    },
    {
      text: "Manjaa na! Kitna bhaw khayegi ab 😭",
      smalltext: "bht galat baat hai 😭",
    },
  ];

  const images = [manja, mochi, maanbhijaa, doLoveme];

  // State variables
  const [image, setImage] = useState(images[0]);
  const [msg, setMsg] = useState({
    text: writtenText[0].text,
    smalltext: writtenText[0].smalltext,
  });
  const [countNo, setCountNo] = useState(1);

  const handleYes = () => {
    setImage(kissing);
    setMsg({
      text: "I love you too so muchhhhhh!! Muuphaaa😽",
      smalltext: "",
    });
    setlove(true);
  };

  const handleNo = () => {
    setCountNo(countNo + 1);
    setImage(images[countNo]);
    setMsg({
      text: writtenText[countNo].text,
      smalltext: writtenText[countNo].smalltext,
    });
  };

  const moveRandomly = (elm) =>{
      elm.style.position = "absolute";
      elm.style.top = Math.floor(Math.random() * 90 + 5) + "%";
      elm.style.left = Math.floor(Math.random() * 90 + 5) + "%";
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#FFE6E1",
      }}
    >
      <div>
        <div className="text-center ">
          <img
            src={image}
            alt="Love"
            style={{ width: "300px", height: "300px" }}
          />
        </div>

        <div className="text-center mt-4">
          <h3>{msg.text}</h3>
          <p className="text-center">{msg.smalltext}</p>
        </div>

        {!Love && (
          <div className="row gap-3 my-4 mx-2 d-flex justify-content-center align-items-center">
            <button
              className="bg-image-btn"
              style={{ "--bg-url": `url(${lovelyFlowers})` }}
              onClick={handleYes}
            >
              <span>Yes</span>
            </button>

            {/* original no button */}
            {countNo < 4 && <button
              className="bg-image-btn"
              style={{ "--bg-url": `url(${dustbin})` }}
              onClick={handleNo}
            >
              <span>No</span>
            </button>}

            {/* constum random moving button */}
            {countNo === 4 && <button  
              className="bg-image-btn"
              style={{ "--bg-url": `url(${dustbin})` }}
              onClick={(e) =>{moveRandomly(e.target)}}
            >
              <span>No</span>
            </button>}

          </div>
        )}

        

      </div>
    </div>
  );
}
