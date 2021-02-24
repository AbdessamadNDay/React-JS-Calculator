import React from 'react';
import './App.css';

const numbersId = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
class Calculator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      formula: '',
      result: 0
    };
    this.handleACClick = this.handleACClick.bind(this);
    this.handleNumClick = this.handleNumClick.bind(this);
    this.handleOperationClick = this.handleOperationClick.bind(this);
    this.handleEqualClick = this.handleEqualClick.bind(this);
    this.handleDotClick = this.handleDotClick.bind(this);
  }
  handleACClick(){
    this.setState({
      formula:'',
      result:0
    });
  }

  handleNumClick(e){
    function formu(formula, ee){
      if(formula === '0' && ee.target.value === '0'){
        return formula;
      }
      if( (/[\+\-\*\/]0$/g).test(formula) && ee.target.value === '0'){
        return formula;
      }
      if( formula === '0' && ee.target.value !== '0'){
        return ee.target.value;
      }
      if((/[\+\-\*\/]0$/g).test(formula) && ee.target.value !== '0'){
        return formula.slice(0, formula.length-1)+ee.target.value;
      }
      if((/[\=]$/g).test(formula)){
        return ee.target.value;
      }else{
        return formula+ee.target.value;
      }
    }
    this.setState( prevState => ({
      //when typing a number check if there is already a cacluted result, if so clear it and start composing formula else continue comaking the formula
      formula: formu(prevState.formula, e), //(/[\=]$/g).test(prevState.formula) ? e.target.value :prevState.formula+e.target.value,
      result: (/[\=]$/g).test(prevState.formula)? 0 :prevState.result
    }));
  }
  handleOperationClick(e){
    function formu(formula, result, ee){
      if((/[\=]$/g).test(formula)){
        return result + ee.target.value ;
      }else{
        return formula+ee.target.value;
      }
    }
    this.setState((prevState) => ({
        //check if there is already a result if the formula, if so add it to the formula else 
        //if the formula has already an operator don't add another operator.
        formula: formu(prevState.formula, prevState.result, e),//(/[\=]$/g).test(prevState.formula) ? prevState.result + e.target.value :prevState.formula+e.target.value,
                                              //    :((/[\+\-\*\/]$/g).test(prevState.formula) ? (prevState.formula) : (prevState.formula+e.target.value)),
        result : (/[\=]$/g).test(prevState.formula) ? 0
                                                  :prevState.result//(Number(prevState.result) + Number(this.state.display))
    }));
  }
  handleDotClick(e){
    this.setState((prevState) => ({
      formula: (/[.]$/g).test(prevState.formula) || (/\d+[.]\d+$/g).test(prevState.formula) ? (prevState.formula) : (prevState.formula+e.target.value),
      result : prevState.result
    }));
  }

  handleEqualClick(){
    function equa(formu, resu){
      // if( ((/[\+\*\/]+/g)).test(formu) ){
      //   return eval(formu.repla(/([\+\*\/]+)([\+\*\+])/g, "$2"));
      // }
      if((/[\=]$/g).test(formu)){
        return resu;
      }else{
        //  56*+-*---5 or 56*-5 
        if((/([\+\*\/\-]+)([\+\*\/])([\-])/g).test(formu)){
          return eval(formu.replace(/([\+\*\/\-]+)([\+\*\/])([\-])/g, '$2-'));
        }
        return eval(formu.replace(/([\+\*\/]+)([\+\*\+])/g, "$2"));//eval(formu);
      }
    }
    this.setState( (prevState) => ({
      formula: (/[\=]$/g).test(prevState.formula)? prevState.formula : prevState.formula+'=' ,
      result: equa(prevState.formula, prevState.result)//(/[\=]$/g).test(prevState.formula)? prevState.result : eval(prevState.formula)
    }));
  }
  render(){
    let numbers = [];
  for(let i = 0 ; i < 10 ; i++){
    numbers.push(<button key={i} id={numbersId[i]} value={i} onClick={this.handleNumClick}>{i}</button>);
  }
    return(

      <React.Fragment >
        <div id="inner" style={{display:'grid', gridTemplateColumns: '100px 100px 100px 100px',gridTemplateRows:'50px 50px 100px 100px 100px 100px 100px'}}>
          <div id="formulaScreen" >{this.state.formula}</div>    
          <div id="display">{this.state.result} </div>
          <button id="clear" value="AC" onClick={this.handleACClick}>AC</button>
          <button id="divide" value="/" onClick={this.handleOperationClick}>/</button>
          <button id="multiply" value="*" onClick={this.handleOperationClick}>x</button>
          <button id="subtract" value="-" onClick={this.handleOperationClick}>-</button>
          <button id="add" value="+" onClick={this.handleOperationClick}>+</button>
          {numbers}
          <button id="equals" value="=" onClick={this.handleEqualClick}>=</button>
          <button id="decimal" value="." onClick={this.handleDotClick}>.</button>
        </div>
        
      </React.Fragment>
    );
  }
}
export default Calculator;
