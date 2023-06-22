import React from "react";
import { useState } from 'react';
import player_data from "../src/resources/player_hand.json"
import enemy_data from "../src/resources/enemy_hand.json"

var count = 0;
//var endPoint = 4;
var jogadas = 0;

//Componente Square -> Forma o tabuleiro, renderiza uma carta ou um espaço vazio
function Square({value, onSquareClick, cardColor}) {
  return (
      <button className="square" onClick={onSquareClick}><Card carta={value} cardColor={cardColor}/></button>
  );
}

//Componente Card -> Carta do jogo
function Card({carta, onCardClick, cardColor = "tt-card", enemyCard = false}){

  if (carta!=null){
    if (enemyCard){
      return(
        <div className={cardColor}>
          <img src="https://i.imgur.com/7Scmweb.png"></img>  
        </div>
      )
    }else{
      return(
        <div className={cardColor} onClick={onCardClick}>
          <img src={carta.file_link}></img>
          <div className="up_value">{carta.values[0]}</div>
          <div className="right-value">{carta.values[1]}</div>
          <div className="bottom-value">{carta.values[2]}</div>
          <div className="left-value">{carta.values[3]}</div>
        </div>
      )
    }
    
  }
}

export default function Board() {
  //Define que o componente pai (board) vai guardar os valores dos squares em um array, inicializando com NULL
  const [squares, setSquares] = useState(Array(9).fill(null));

  const [playerHand, setPlayerHand] = useState([player_data[0], player_data[1], player_data[2], player_data[3], player_data[4]]);
  
  const [enemyHand, setEnemyHand] = useState([enemy_data[0], enemy_data[1], enemy_data[2], enemy_data[3], enemy_data[4]]);
  const [cardColor, setCardColor] = useState(Array(9).fill("tt-card"));
  
  let carta_selecionada = null;
  let indice_carta_selecionada = 0;
  // if bot começar -> setTimeout(botPlays, 500, squares, cardColor); 

  // Responsável por determinar a carta a ser jogada pelo jogador
  function handleCardClick(j, card){
    carta_selecionada = card;
    indice_carta_selecionada = j;
  }

  //Seta uma carta em um quadrado
  function handleClick(i, j, new_value) {
    // Verifica se a carta selecionada não é null
    if (new_value != null){
      // Cria cópia dos arrays tabuleiro, mão do player e cores das cartas
      const nextSquares = squares.slice();
      const nextPlayerHand = playerHand.slice();
      const nextCardColor = cardColor.slice()

      // Caso o espaço desejado esteja vazio, faz a jogada
      if (nextSquares[i] == null){
        // Atribui a carta para o espaço, remove da mão do player e seta a cor.
        nextSquares[i] = new_value;
        nextPlayerHand[j] = null;
        nextCardColor[i] = "card-red"

        // Faz os setStates e re-renderiza
        setSquares(nextSquares);
        setPlayerHand(nextPlayerHand);
        setCardColor(nextCardColor);
        jogadas++;

        console.log(jogadas);
        // Verifica as posições do tabuleiro pra executar as capturas:
        verify_board(i, nextSquares, nextCardColor, "card-red");
        if (jogadas >= 9){
          console.log(nextCardColor);
        }
        //Gatilha o bot para ele fazer sua jogada
        setTimeout(botPlays, 500, nextSquares, nextCardColor);

      }

    }
  }

  function botPlays(next_squares, next_color){

    // Variável count responsável por impedir o bot de fazer jogadas além do limite.
    // count < 4 se o player começar, count < 5 se o bot começar
    if (count < 4 ){
      // Randomiza um número entre 0 e 8
      let randNum = Math.floor(Math.random() * (8 - 0 + 0)) + 0;

      // Cria cópia do array mão do oponente, e atribui os arrays tabuleiro e cores.
      const nextSquares = next_squares.slice();
      const nextEnemyHand = enemyHand.slice();
      const nextCardColor = next_color.slice();

      // Caso a posição randomizada não esteja vazia, gera o numero novamente
      while (nextSquares[randNum] != null){
        randNum = Math.floor(Math.random() * (8 - 0 + 0)) + 0;
      }
      // Atribui a carta para o espaço randomizado, remove da mão do oponente e seta a cor (azul).
      nextSquares[randNum] = nextEnemyHand[count];
      nextEnemyHand[count] = null;
      nextCardColor[randNum] = "card-blue"
      count++;
      
      // Seta os estados
      setSquares(nextSquares);
      setEnemyHand(nextEnemyHand);
      setCardColor(nextCardColor);
      jogadas++;
      console.log(jogadas);
      if (jogadas >= 9){
        console.log(nextCardColor);
      }
      // Verifica as posições do tabuleiro pra executar as capturas:
      verify_board(randNum, nextSquares, nextCardColor, "card-blue");

    }
  }

  function verify_board(indice_ultima_jogada, current_squares, current_colors, cardColor){
    switch (indice_ultima_jogada){
      case 0:
        //Grid:
        // X * -
        // * - -
        // - - -
        //Direita
        check_sides(current_squares, current_colors, cardColor, 0, 1, 1, 3);
        //Abaixo
        check_sides(current_squares, current_colors, cardColor, 0, 2, 3, 0);
        break;
      case 1:
        // GRID:
        // * X *
        // - * -
        // - - -
        // Esquerda
        check_sides(current_squares, current_colors, cardColor, 1, 3, 0, 1);
        // Abaixo
        check_sides(current_squares, current_colors, cardColor, 1, 2, 4, 0);
        // Direita
        check_sides(current_squares, current_colors, cardColor, 1, 1, 2, 3);
        break;
      case 2:
        // - * X
        // - - *
        // - - -
        // Esquerda
        check_sides(current_squares, current_colors, cardColor, 2, 3, 1, 1);
        // Abaixo
        check_sides(current_squares, current_colors, cardColor, 2, 2, 5, 0);
        break;
      case 3:
        // * - -
        // X * -
        // * - -
        // Acima
        check_sides(current_squares, current_colors, cardColor, 3, 0, 0, 2);
        // Direita
        check_sides(current_squares, current_colors, cardColor, 3, 1, 4, 3);
        // Abaixo
        check_sides(current_squares, current_colors, cardColor, 3, 2, 6, 0);
        break;
      case 4:
        // - * -
        // * X *
        // - * -
        // Acima
        check_sides(current_squares, current_colors, cardColor, 4, 0, 1, 2);
        // Direita
        check_sides(current_squares, current_colors, cardColor, 4, 1, 5, 3);
        // Abaixo
        check_sides(current_squares, current_colors, cardColor, 4, 2, 7, 0);
        // Esquerda
        check_sides(current_squares, current_colors, cardColor, 4, 3, 3, 1);
        break;
      case 5:
        // - - *
        // - * X
        // - - *
        // Acima
        check_sides(current_squares, current_colors, cardColor, 5, 0, 2, 2);
        // Abaixo
        check_sides(current_squares, current_colors, cardColor, 5, 2, 8, 0);
        // Esquerda
        check_sides(current_squares, current_colors, cardColor, 5, 3, 4, 1);
        break;
      case 6:
        // - - -
        // * - -
        // X * -
        // Acima
        check_sides(current_squares, current_colors, cardColor, 6, 0, 3, 2);
        // Direita
        check_sides(current_squares, current_colors, cardColor, 6, 1, 7, 3);
        break;
      case 7:
        // - - -
        // - * -
        // * X *
        // Acima
        check_sides(current_squares, current_colors, cardColor, 7, 0, 4, 2);
        // Direita
        check_sides(current_squares, current_colors, cardColor, 7, 1, 8, 3);
        // Esquerda
        check_sides(current_squares, current_colors, cardColor, 7, 3, 6, 1);
        break;
      case 8:
        // - - -
        // - - *
        // - * X
        // Acima
        check_sides(current_squares, current_colors, cardColor, 8, 0, 5, 2);
        // Esquerda
        check_sides(current_squares, current_colors, cardColor, 8, 3, 7, 1);
        break;
    }
  }
  
  //Função que generaliza a checagem e alteração de cor: self, value, target, value
  function check_sides(arraySquares, arrayColor, cardColor, pos1, val1 , pos2, val2){
    // Verifica se a posição a ser checada não está vazia
    // Em seguida, compara os números que estão encostando
    // Se a carta da posição jogada tiver numero maior, roda o código de trocar a cor
    if (arraySquares[pos2] != null && arraySquares[pos1].values[val1] > arraySquares[pos2].values[val2]){
      arrayColor[pos2] = cardColor;
      setCardColor(arrayColor);
    }

  }


  return (
    <React.Fragment>
      <div className="game">
        <div className="player-hand">
          <Card carta={playerHand[0]}  onCardClick={() => handleCardClick(0, playerHand[0])}/>
          <Card carta={playerHand[1]}  onCardClick={() => handleCardClick(1, playerHand[1])}/>
          <Card carta={playerHand[2]}  onCardClick={() => handleCardClick(2, playerHand[2])}/>
          <Card carta={playerHand[3]}  onCardClick={() => handleCardClick(3, playerHand[3])}/>
          <Card carta={playerHand[4]}  onCardClick={() => handleCardClick(4, playerHand[4])}/>
        </div>

        <div className="board">
          <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0, indice_carta_selecionada, carta_selecionada)} cardColor={cardColor[0]}/>
            <Square value={squares[1]} onSquareClick={() => handleClick(1, indice_carta_selecionada, carta_selecionada)} cardColor={cardColor[1]}/>
            <Square value={squares[2]} onSquareClick={() => handleClick(2, indice_carta_selecionada, carta_selecionada)} cardColor={cardColor[2]}/>
          </div>
          <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3, indice_carta_selecionada, carta_selecionada)} cardColor={cardColor[3]}/>
            <Square value={squares[4]} onSquareClick={() => handleClick(4, indice_carta_selecionada, carta_selecionada)} cardColor={cardColor[4]}/>
            <Square value={squares[5]} onSquareClick={() => handleClick(5, indice_carta_selecionada, carta_selecionada)} cardColor={cardColor[5]}/>
          </div>
          <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6, indice_carta_selecionada, carta_selecionada)} cardColor={cardColor[6]}/>
            <Square value={squares[7]} onSquareClick={() => handleClick(7, indice_carta_selecionada, carta_selecionada)} cardColor={cardColor[7]}/>
            <Square value={squares[8]} onSquareClick={() => handleClick(8, indice_carta_selecionada, carta_selecionada)} cardColor={cardColor[8]}/>
          </div>
        </div>
        <div className="enemy-hand">
          <Card carta={enemyHand[0]} enemyCard={true}/>
          <Card carta={enemyHand[1]} enemyCard={true}/>
          <Card carta={enemyHand[2]} enemyCard={true}/>
          <Card carta={enemyHand[3]} enemyCard={true}/>
          <Card carta={enemyHand[4]} enemyCard={true}/>
        </div>
      </div>
    </React.Fragment>
  );
};
