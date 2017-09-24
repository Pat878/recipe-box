import React, { Component } from 'react';
//import { Form, Text, Select, FormError } from 'react-form'
import logo from './logo.svg';
import './App.css';
import { Modal, Button } from 'react-bootstrap';

class TaskList extends React.Component{


  render(){

    const editValue = this.props.edit;

    return (
      <div>

        <div className="btn-group">
          {this.props.items.map((task, buttonIndex) =>
            <Button
              key={buttonIndex}
              bsStyle="primary"
              onClick={this.props.editTask}
              value={buttonIndex}>
              {task}
            </Button>
          )}
        </div>

        <Modal show={this.props.showModal} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title ><strong>{this.props.items[this.props.edit]}</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{this.props.ingredients[this.props.edit]}</h4>


            <input className="form-control" onChange={this.props.onUpdate} value={this.props.newingredient}
              type="text"/>
              <Button onClick={this.props.updateRecipe} bsStyle="success"> Update </Button>
              <Button onClick={this.props.deleteTask} value={this.props.edit} bsStyle="danger"> Delete </Button>



          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.close} bsStyle="primary">Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
};

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      items: ["pump","bump","dump"],
      task: '',
      ingredients: ['pumpkin, lumpkins', 'fruits and loops','chicken, pie'],
      ingredient: '',
      edit: null,
      newingredient: '',
      showModal: false
    }

    this.deleteTask = this.deleteTask.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChange2 = this.onChange2.bind(this);
    this.addTask = this.addTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.close = this.close.bind(this);

  }

  deleteTask(e) {
    var taskIndex = parseInt(e.target.value, 10);
    console.log('remove task: %d', taskIndex, this.state.items[taskIndex]);
    this.setState(state => {
      state.items.splice(taskIndex, 1);
      state.ingredients.splice(taskIndex, 1);
      return {items: state.items, ingredients: state.ingredients, edit: null,
        showModal: false};
      });
    }

    onChange (e) {
      this.setState({ task: e.target.value});
    }

    onChange2(e){
      this.setState({ingredient: e.target.value})
    }

    addTask (e){
      this.setState({
        items: this.state.items.concat([this.state.task]),
        task: '',
        ingredients: this.state.ingredients.concat([this.state.ingredient]),
        ingredient: ''
      })

      e.preventDefault();
    }

    editTask(e) {
      var taskIndex = parseInt(e.target.value, 10);
      console.log(taskIndex)
      this.setState({edit: e.target.value, newingredient: this.state.ingredients[taskIndex], showModal: true})

    }

    updateRecipe(){
      let recipeIndex = this.state.edit;
      let ingredientArray = this.state.ingredients;
      let updatedIngredients = [].concat(ingredientArray);
      if (this.state.newingredient != "") {
        updatedIngredients[recipeIndex] = this.state.newingredient; }
        this.setState({
          task: '',
          ingredients: updatedIngredients,
          ingredient: '',
          newingredient: ''
        })

      }

      onUpdate (e) {
        this.setState({ newingredient: e.target.value});
      }

      close() {
        this.setState({ showModal: false, edit: null });
      }

      //The following code for localStorage was taken from this answer:
      //https://stackoverflow.com/questions/43480207/how-should-i-implement-saving-state-to-localstorage

      componentDidUpdate() {
        window.localStorage.setItem('state', JSON.stringify(this.state));
      }

      componentDidMount() {
        // there is a chance the item does not exist
        // or the json fails to parse
        try {
          const state = window.localStorage.getItem('state');
          this.setState({ ...JSON.parse(state) });
        } catch (e) {}
      }

      render(){

        return(
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h1>My Recipes </h1>
              </div>
            </div>
            <div className="well">

              <div className="row">
                <div className="col-lg-8">
                  <TaskList items={this.state.items} ingredients={this.state.ingredients}
                    newingredient={this.state.newingredient}
                    deleteTask={this.deleteTask} editTask={this.editTask}
                    edit={this.state.edit} updateRecipe={this.updateRecipe}
                    addTask={this.addTask} ingredient={this.state.ingredient}
                    onUpdate={this.onUpdate} showModal={this.state.showModal}
                    close={this.close}/>


                  </div>
                </div>
              </div>


              <form onSubmit={this.addTask} className="form-horizontal">
                <div className="form-group row">
                  <div className="col-sm-6 col-sm-offset-3">
                  Recipe Name: <input className="form-control" onChange={this.onChange} type="text" value={this.state.task}/><br/>

                  Ingredients: <input className="form-control" onChange={this.onChange2} type="text" value={this.state.ingredient} /><br/>

                  <button className="btn btn-success"> Add New Recipe </button>
                </div>
                

                </div>
              </form>

        </div>
          );
        }
      };

      export default App;
