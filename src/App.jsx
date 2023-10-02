import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import GameOver from '/src/img/undraw_winners_ao2o 2.svg'
import ImagenAdventure from '/src/img/undraw_adventure_4hum 1.svg'

const ImgAdventure = styled.img`
    width: 120px;
    position: absolute;
    right: 0;
    top: -70px;
`

const Content = styled.div`
  display: grid;
  place-content: center;
  height: 100vh;

  h1 {
    color: #fff;
    font-weight: 700;
    font-size: 25px;
  }
`;

const Card = styled.div`
  /* width: 310px; */
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 15px;
  color: #2f527b;
  position: relative;


  img {
    width: 7rem;
  }

  h2 {
    font-weight: 700;
    font-size: 20px;
  }
`;

const Option = styled.div`
  width: 300px;
  background-color: #fff;
  border-radius: 5px;
  padding: 2px;
  border: 1px solid #2f2f2f;
  margin-top: 10px;
  font-weight: 500;
  color: #2f527b;
  transition:  background-color .3s ease;

  &:hover {
    background-color: #f9a826;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  &.correct{
          color: #fff;
          background-color: green;
          border: none;
    }
  p {
    padding: 0 5px;
    margin: 0;
    font-size: 20px;
  }
  span {
    font-size: 15px;
    margin-left: 15px;
  }
`;

const ContentOptions = styled.div `
  margin-bottom: 4rem;
`
const Next = styled.button`
  position: absolute;
  right: 1rem;
  bottom: 1.2rem;
  border: none;
  background-color: #f9a826;
  width: 116px;
  height: 40px;
  color: white;
  margin-top: 2rem;
  font-weight: 700;
  font-size: 1.2rem;
  border-radius: 0.5rem;

  &:hover {
    cursor: pointer;
  }
`;

const TryAgain = styled.button`
  border: 1px solid #1D355D;
    color: #1D355D;
    width: 150px;
    height: 40px;
    background-color: white;
    font-weight: 600;
    font-size: 18px;
    border-radius: 12px;

  &:hover {
    cursor: pointer;
  }
`;

const ContentGameOver = styled.div `
  text-align: center;
  span{
    color: #6FCF97;
    font-weight: 600;
    font-size: 1.5rem;
  }
`

const ImageGameOver = styled.img `
  width: 10rem;
`

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function App() {
  const [showMenu, setShowMenu] = useState(true);
  const [played, setPlayed] = useState(false);
  const [typeGame, setTypeGame] = useState("");
  const [querys, setQuerys] = useState([]);
  const [randomQuery, setRandomQuery] = useState({});
  const [clicked, setClicked] = useState(false);
  const [count, setCount] = useState(0)
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [nextQuestion, setNextQuestion] = useState(false)

  useEffect(() => {
      const getAPI = async () => {
        const url = "https://restcountries.com/v3.1/all";
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        // setData(resultado);
        const randomCountries = [];
        while (randomCountries.length < 4) {
          const randomIndex = getRandom(0, 256);
          if (!randomCountries.includes(resultado[randomIndex])) {
            randomCountries.push(resultado[randomIndex]);
          }
        }
        // UPDATE STATE QUERY WITH 4 OBJECTS FOR API
        const arrayContries = randomCountries.map((contry) => {
          const objeto = {
            id: contry.ccn3,
            name: contry.name.official,
            capital: contry.capital,
            flag: contry.flags.png,
          };
          return objeto;
        });
        setQuerys(arrayContries);
  
        // SELECT RANDOM QUERY FOR STATE QUERY
        const selectRandomQuery = getRandom(0, 3);
        setRandomQuery(randomCountries[selectRandomQuery]);

      };
      getAPI();
  }, []);

  useEffect(() => {
      const getAPI = async () => {
        const url = "https://restcountries.com/v3.1/all";
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        // setData(resultado);
        const randomCountries = [];
        while (randomCountries.length < 4) {
          const randomIndex = getRandom(0, 256);
          if (!randomCountries.includes(resultado[randomIndex])) {
            randomCountries.push(resultado[randomIndex]);
          }
        }
        // UPDATE STATE QUERY WITH 4 OBJECTS FOR API
        const arrayContries = randomCountries.map((contry) => {
          const objeto = {
            id: contry.ccn3,
            name: contry.name.official,
            capital: contry.capital,
            flag: contry.flags.png,
          };
          return objeto;
        });
        setQuerys(arrayContries);
  
        // SELECT RANDOM QUERY FOR STATE QUERY
        const selectRandomQuery = getRandom(0, 3);
        setRandomQuery(randomCountries[selectRandomQuery]);
        
  
      };
    getAPI();
   
}, [count]);

  const handleOptionGame = (e) => {
    if (e === "a") {
      setTypeGame("capitals");
    } else if (e === "b") {
      setTypeGame("flags");
    }
    setShowMenu(false);
    setPlayed(true);
    setShowResults(false)

  };

  const handleOption = (e) => {
    if(e === randomQuery.ccn3){
      setCorrectAnswer('correct')
      setClicked(true)
    }else{
      setCorrectAnswer('')
      setPlayed(false)
      setClicked(false)
      setTypeGame('')
      setShowResults(true)
    }
    
  };

  const nextAnswers = () => {
    if(correctAnswer === "correct"){
      let initCount = count
      setCount(initCount += 1)
      setClicked(false)
    }
    setCorrectAnswer('')
  }

  const tryAgain = ()=> {
    setShowMenu(true)
    setShowResults(false)
    setCount(0)
    
  }

  const letters = {
    0: "A",
    1: "B",
    2: "C",
    3: "D"
  }

  return (
    <Content>
      <h1>COUNTRY QUIZ</h1>
      <Card>
      

        {!showResults && (<ImgAdventure src={ImagenAdventure} alt="adventure" />)}
        {typeGame === "flags" && (
          <>
            <img src={randomQuery.flags.png} alt={randomQuery.name.official} />
            <h2>{"Which contry does this flag belong to?"}</h2>

          </>
          
        )}
        {typeGame === "capitals" && (<h2>{randomQuery.capital} is the capital of</h2>)}
        {showMenu && (
          <>
            <h2>How do you want play?</h2>
            <Option onClick={() => handleOptionGame("a")}>
              <p>
                A <span>a city is the capital of...</span>
              </p>
            </Option>
            <Option onClick={() => handleOptionGame("b")}>
              <p>
                B <span>a lag belong to country...</span>
              </p>
            </Option>
          </>
        )}
        {played ? (
          <ContentOptions>
            {querys.map((query, id) => (
                <Option className={query.id === randomQuery.ccn3 ? correctAnswer : ''} key={query.id} onClick={() => handleOption(query.id)}>
                <p>
                  {letters[id]}
                  <span>{query.name}</span>
                </p>
              </Option>
            ))}
          </ContentOptions>
        ) : (
          <>
            {showResults && (
              <ContentGameOver>
                <ImageGameOver src={GameOver} alt="gameOver"/>
                <h2>Results</h2>
                <p>You got <span>{count}</span> correct answers</p>
                <TryAgain onClick={()=> tryAgain()}>Try again</TryAgain>
              </ContentGameOver>
            )}
          </>
        )}
        {clicked && (<Next onClick={()=> nextAnswers()}>Next</Next>)}
      </Card>
    </Content>
  );
}

export default App;
