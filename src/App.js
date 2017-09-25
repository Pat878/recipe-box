import React, { Component } from 'react';
//import { Form, Text, Select, FormError } from 'react-form'
import logo from './logo.svg';
import './App.css';
import { Modal, Button } from 'react-bootstrap';

class RecipeList extends React.Component{


  render(){

    return (
      <div>

        <div className="btn-group">
          {this.props.recipes.map((recipe, buttonIndex) =>
            <Button
              key={buttonIndex}
              bsStyle="primary"
              onClick={this.props.editRecipe}
              value={buttonIndex}>
              {recipe}
            </Button>
          )}
        </div>

        <Modal show={this.props.showModal} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title ><strong>{this.props.recipes[this.props.edit]}</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{this.props.ingredients[this.props.edit]}</h4>


          Ingredients: <input className="form-control" onChange={this.props.onUpdate}
            value={this.props.newingredient}
            type="text"/>
            Recipe Name: <input className="form-control" onChange={this.props.onUpdateName}
              value={this.props.newRecipe}
              type="text"/>
              <Button onClick={this.props.updateRecipe} bsStyle="success"> Update </Button>
              <Button onClick={this.props.deleteRecipe} value={this.props.edit}
                bsStyle="danger"> Delete </Button>


                <div className={this.props.ingredientAlert ? "active" : "inactive"}>

                  <div className="alert alert-danger" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"
                      onClick={this.props.closeIngredientAlert}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="alert-heading">Whoa there!</h4>
                    <p>Where are your ingredients?!</p>
                  </div>
                </div>
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
          recipes: ["pump","bump","dump"],
          recipe: '',
          ingredients: ['pumpkin, lumpkins', 'fruits and loops','chicken, pie'],
          ingredient: '',
          edit: null,
          newingredient: '',
          showModal: false,
          newRecipe: '',
          alert: false,
          ingredientAlert: false
        }

        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChange2 = this.onChange2.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
        this.updateRecipe = this.updateRecipe.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.close = this.close.bind(this);
        this.onUpdateName = this.onUpdateName.bind(this);
        this.closeButton = this.closeButton.bind(this);
        this.closeIngredientAlert = this.closeIngredientAlert.bind(this);
      }

      deleteRecipe(e) {
        var taskIndex = parseInt(e.target.value, 10);
        this.setState(state => {
          state.recipes.splice(taskIndex, 1);
          state.ingredients.splice(taskIndex, 1);
          return {recipes: state.recipes, ingredients: state.ingredients, edit: null,
            showModal: false};
          });
        }

        onChange (e) {
          this.setState({ recipe: e.target.value});
        }

        onChange2(e){
          this.setState({ingredient: e.target.value})
        }

        addRecipe (e){

          if (this.state.recipe != "") {

            this.setState({
              recipes: this.state.recipes.concat([this.state.recipe]),
              recipe: '',
              ingredients: this.state.ingredients.concat([this.state.ingredient]),
              ingredient: ''
            }) }
            else { this.setState({alert:true})}

            e.preventDefault();
          }

          editRecipe(e) {
            var taskIndex = parseInt(e.target.value, 10);
            this.setState({edit: e.target.value,
              newingredient: this.state.ingredients[taskIndex],
              showModal: true, newRecipe: this.state.recipes[taskIndex]})

            }

            updateRecipe(){
              let recipeIndex = this.state.edit;
              let ingredientArray = this.state.ingredients;
              let recipeArray = this.state.recipes;
              let updatedIngredients = [].concat(ingredientArray);
              let updatedRecipes = [].concat(recipeArray);
              if (this.state.newingredient != "") {
                updatedIngredients[recipeIndex] = this.state.newingredient; }
                else {this.setState({ingredientAlert: true})}
                if (this.state.newRecipe != "") {
                  updatedRecipes[recipeIndex] = this.state.newRecipe; }
                  else {alert("Recipe must have a name!")}
                  this.setState({
                    recipe: '',
                    recipes: updatedRecipes,
                    ingredients: updatedIngredients,
                    ingredient: ''
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

                onUpdateName(e){
                  this.setState({newRecipe: e.target.value})
                }

                closeButton(){
                  this.setState({alert: false})
                }

                closeIngredientAlert(){
                  this.setState({ingredientAlert: false})
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
                            <RecipeList recipes={this.state.recipes}
                              ingredients={this.state.ingredients}
                              newingredient={this.state.newingredient}
                              deleteRecipe={this.deleteRecipe} editRecipe={this.editRecipe}
                              edit={this.state.edit} updateRecipe={this.updateRecipe}
                              addRecipe={this.addRecipe} ingredient={this.state.ingredient}
                              onUpdate={this.onUpdate} showModal={this.state.showModal}
                              close={this.close} newRecipe={this.state.newRecipe}
                              onUpdateName={this.onUpdateName}
                              ingredientAlert={this.state.ingredientAlert}
                              closeIngredientAlert={this.closeIngredientAlert}/>


                            </div>
                          </div>
                        </div>


                        <form onSubmit={this.addRecipe} className="form-horizontal">
                          <div className="form-group row">
                            <div className="col-sm-6 col-sm-offset-3">
                              Recipe Name: <input className="form-control" onChange={this.onChange}
                                type="text" value={this.state.recipe}/><br/>

                                Ingredients: <input className="form-control" onChange={this.onChange2}
                                  type="text" value={this.state.ingredient} /><br/>

                                  <button className="btn btn-success"> Add New Recipe </button>
                                </div>


                              </div>
                            </form>
                            <div className={this.state.alert ? "active" : "inactive"}>

                              <div className="alert alert-danger" role="alert">
                                <button type="button" className="close" data-dismiss="alert"
                                  aria-label="Close" onClick={this.closeButton}>
                                  <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="alert-heading">Whoa there!</h4>
                                <p>Enter a recipe name if you want to add a new recipe!</p>
                              </div>
                            </div>

                          </div>

                        );
                      }
                    };

                    export default App;
