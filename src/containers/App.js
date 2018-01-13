import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as LifeActionCreators from '../actions/life';
import '../App.css';
import BoardSquare from '../components/BoardSquare'

class App extends Component {
  
  static propTypes = {
    board: PropTypes.array.isRequired,
    runGame: PropTypes.func.isRequired,
    pauseGame: PropTypes.func.isRequired,
    toggleLife: PropTypes.func.isRequired,
    clearBoard: PropTypes.func.isRequired,
    nextGeneration: PropTypes.func.isRequired,
  };
  
  render() {
    return (
      <div className="App">
        <h1>Game of Life</h1>
        <div className="control-btns">
          <Button onClick={this.props.runGame}>Run</Button>
          <Button onClick={this.props.pauseGame}>Pause</Button>
          <Button onClick={this.props.clearBoard}>Clear</Button>
          <Button onClick={this.props.nextGeneration}>Next Generation</Button>
          Generation: {this.props.generation}
          Running: {this.props.isRunning.toString()}
        </div>
        <div className="board">
          {this.props.board.map((row, rowIndex) => {
            return(
              <div key={rowIndex}>
                {row.map((square, colIndex) => {
                  return(
                    <BoardSquare
                      square={square}
                      rowIndex={rowIndex}
                      colIndex={colIndex}
                      toggleLife={this.props.toggleLife}
                      key={colIndex}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    generation: state.generation,
    isRunning: state.isRunning,
    board: state.board,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    runGame: () => {
      dispatch(LifeActionCreators.runGame())
    },
    pauseGame: () => {
      dispatch(LifeActionCreators.pauseGame())
    },
    toggleLife: (rowIndex, colIndex) => {
      dispatch(LifeActionCreators.toggleLife(rowIndex, colIndex))
    },
    clearBoard: () => {
      dispatch(LifeActionCreators.clearBoard())
    },
    nextGeneration: () => {
      dispatch(LifeActionCreators.nextGeneration())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
