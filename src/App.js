import React, { Component } from 'react';
//import { Form, Text, Select, FormError } from 'react-form'
import logo from './logo.svg';
import './App.css';

class TaskList extends React.Component{


  render(){

    const editValue = this.props.edit;

    return (
      <div>

        <ul>
          {this.props.items.map((task, taskIndex) =>

            <li key={taskIndex}>
              <b>{task}</b><br/>
              <ul>
                <li>{this.props.ingredients[taskIndex]}</li>
              </ul>

              <div className={editValue == taskIndex ? "active" : "inactive"}>

                <input onChange={this.props.onUpdate} value={this.props.newingredient}
                  type="text"/>
                  <button onClick={this.props.deleteTask} value={taskIndex}> Delete </button>
                  <button onClick={this.props.updateRecipe}> Update </button>
                  <button onClick={this.props.noUpdate}> X </button>

                </div>

                <button className={editValue == taskIndex || null ? "inactive" : "active"}
                  onClick={this.props.editTask} value={taskIndex} > Edit </button>

                </li>
              )}
            </ul>

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
          newingredient: ''
        }

        this.deleteTask = this.deleteTask.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChange2 = this.onChange2.bind(this);
        this.addTask = this.addTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.noUpdate = this.noUpdate.bind(this);
        this.updateRecipe = this.updateRecipe.bind(this);
        this.onUpdate = this.onUpdate.bind(this);

      }

      deleteTask(e) {
        var taskIndex = parseInt(e.target.value, 10);
        console.log('remove task: %d', taskIndex, this.state.items[taskIndex]);
        this.setState(state => {
          state.items.splice(taskIndex, 1);
          state.ingredients.splice(taskIndex, 1);
          return {items: state.items, ingredients: state.ingredients, edit: null};
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
        this.setState({edit: e.target.value, newingredient: this.state.ingredients[taskIndex]})

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


          render(){

            return(
              <div>
                <h1>My Task </h1>
                <TaskList items={this.state.items} ingredients={this.state.ingredients}
                  newingredient={this.state.newingredient}
                  deleteTask={this.deleteTask} editTask={this.editTask}
                  edit={this.state.edit} noUpdate={this.noUpdate}
                  updateRecipe={this.updateRecipe} addTask={this.addTask}
                  ingredient={this.state.ingredient}
                  onUpdate={this.onUpdate}/>

                  <form onSubmit={this.addTask}>
                    Recipe Name: <input onChange={this.onChange} type="text" value={this.state.task}/><br/>
                    Ingredients: <input onChange={this.onChange2} type="text" value={this.state.ingredient} /><br/>
                    <button> Add Recipe </button>
                  </form>
                </div>
              );
            }
          };


          export default App;
