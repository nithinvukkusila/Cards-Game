import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [images, setimages] = useState();
  const [target, setTarget] = useState(Math.floor(3));
  const [selectedCard, setSelectedCard] = useState(null);
  const [infoText, setInfoText] = useState("");
  const [gameStart, setGameStarts] = useState(false);

  const playGame = () => {
    setGameStarts(true);
    setSelectedCard(null);
    const updatedimages = images.map((image) => {
      return {
        ...image,
        reverse:
          "https://upload.wikimedia.org/wikipedia/commons/d/d4/Card_back_01.svg",
      };
    });
    shuffleArray(updatedimages);
  };

  useEffect(() => {
    let images = [
      {
        id: 1,
        img: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Ace_of_diamonds.svg",
      },
      {
        id: 2,
        img: "https://upload.wikimedia.org/wikipedia/commons/6/61/Ace_of_clubs.svg",
      },
      {
        id: 3,
        img: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Ace_of_spades.svg",
      },
      {
        id: 0,
        img: "https://upload.wikimedia.org/wikipedia/commons/0/07/Ace_of_hearts.svg",
      },
    ];
    setimages(images);
  }, []);

  const flipcard = (img) => {
    if (selectedCard) {
      return;
    }

    setSelectedCard(img.id);
    let updatedImages = images.map((image) => {
      if (img.id === image.id) {
        return { ...image, reverse: image.img };
      } else {
        return image;
      }
    });
    setimages([...updatedImages]);
  };

  useEffect(() => {
    target === selectedCard
      ? setInfoText("Correct Guess")
      : setInfoText("Wrong Guess");
  }, [selectedCard, target]);

  const shuffleArray = (arr) => {
    let randomNumber = Math.floor(Math.random() * 3);
    for (let i = 1; i < arr.length; i++) {
      let temp = arr[i];
      arr[i] = arr[randomNumber];
      arr[randomNumber] = temp;
    }
    setimages(arr);
  };

  return (
    <div className="App">
      <div className="header">Hunt the Ace</div>
      <div className="game-container">
        <h1> Guess the Spades </h1>
        <p className="sub-heading">Click Play Button to play the game</p>
        <p className="status"> {selectedCard ? infoText : ""} </p>
        <button className="btn" onClick={playGame}>
          {!selectedCard ? "Play Game" : "Reset Game"}
        </button>

        <div className="cards">
          {images &&
            images.map((img) => {
              return (
                <img
                  src={gameStart ? img.reverse : img.img}
                  key={img.id}
                  alt="card"
                  onClick={() => flipcard(img)}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
