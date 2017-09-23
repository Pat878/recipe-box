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
          {this.props.items.map((task, taskIndex) =>
            <Button
              bsStyle="primary"
              onClick={this.props.editTask}
              value={taskIndex}>
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

              { //    <button onClick={this.props.noUpdate}> X </button> }
            }

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
      items: ['PumpkinPie', 'FruityLoops', 'ChickenMarang'],
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
    this.noUpdate = this.noUpdate.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.open = this.open.bind(this);
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

    noUpdate(){
      this.setState({edit: null, newingredient: ""})
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
        }) }

        onUpdate (e) {
          this.setState({ newingredient: e.target.value});
        }

        open() {
          this.setState({ showModal: true });
        }

        close() {
          this.setState({ showModal: false });
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
                  <div className="col-lg-8 col-lg-offset-4">
                    <TaskList items={this.state.items} ingredients={this.state.ingredients}
                      newingredient={this.state.newingredient}
                      deleteTask={this.deleteTask} editTask={this.editTask}
                      edit={this.state.edit} noUpdate={this.noUpdate}
                      updateRecipe={this.updateRecipe} addTask={this.addTask}
                      ingredient={this.state.ingredient}
                      onUpdate={this.onUpdate} showModal={this.state.showModal}
                      open={this.open} close={this.close}/>



                    </div>
                  </div>
                </div>



                <form onSubmit={this.addTask} className="form-horizontal">
                  <div className="form-group">
                    Recipe Name: <input className="form-control" onChange={this.onChange} type="text" value={this.state.task}/><br/>

                    Ingredients: <input className="form-control" onChange={this.onChange2} type="text" value={this.state.ingredient} /><br/>

                    <button className="btn btn-success"> Add New Recipe </button>


                  </div>
                </form>
              </div>

            );
          }
        };


        export default App;
