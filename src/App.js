import React, { Component } from 'react';
import { Form, Text, Select, FormError } from 'react-form'
import logo from './logo.svg';
import './App.css';

let count = 0;
var target = document.getElementById("answer")

function createDiv(){ var diver = document.createElement("div")
target.appendChild(diver)}

const MyForm = (


  <Form
    onSubmit={(values) => {
      count += 1
      createDiv()
      document.createElement("div").setAttribute("id", count)
      let reesh = values.friends.map(function(v){

        return //console.log(sheesh)// document.getElementById(sheesh).innerHTML = "<h1>" + v.name + "</h1>"

      })
      //  document.getElementById("remove").addEventListener("click", function(){alert("yes")});
    }}

    // Let's give the form some default values
    defaultValues={{
      friends: []
    }}

    // Validating your form is super easy, just use the `validate` life-cycle method
    /*    validate={values => {
    const { friends } = values
    return {

    friends: (!friends || !friends.length) ? 'You need at least one friend!' : friends.map(friend => {
    const { name, relationship } = friend
    return {
    name: !name ? 'A name is required' : undefined,
    relationship: !relationship ? 'A relationship is required' : undefined
  }
})
}
}} */

// `onValidationFail` is another handy form life-cycle method
onValidationFail={() => {
  window.alert('There is something wrong with your form!  Please check for any required values and try again :)')
}}
>
  {({ values, submitForm, addValue, removeValue, getError }) => {
    // A Form's direct child will usually be a function that returns a component
    // This way you have access to form methods and form values to use in your component. See the docs for a complete list.
    return (
      // When the form is submitted, call the `submitForm` callback prop
      <form onSubmit={submitForm}>


        {/* Arrays in forms are super easy to handle */}
        <h6>Recipe Name:</h6>
        {/* This is a custom form error for the root of the friends list (see validation function) */}
        <FormError field='friends' />
        <div className='nested'>
          {!values.friends.length ? (
            <em>No friends have been added yet</em>
          ) : values.friends.map((friends, i) => ( // Loop over the values however you'd like
          <div key={i}>

            <div>
              <h6>Ingredients</h6>
              <Text
                field={['friends', i, 'name']} // You can easily pass an array-style field path. Perfect for passing down as props or nested values
                placeholder='Friend Name'
              />
            </div>

            <div>
              <h6>Relationship</h6>
              <Select
                field={`friends.${i}.relationship`} // If you don't like arrays, you can also use a string template
                options={[{
                  label: 'Friend',
                  value: 'friend'
                }, {
                  label: 'Acquaintance',
                  value: 'acquaintance'
                }, {
                  label: 'Colleague',
                  value: 'colleague'
                }]}
              />
            </div>

            <button // This button will remove this friend from the `friends` field
            type='button'
            onClick={() => removeValue('friends', i)} // `removeValue` takes a field location for an array, and the index for the item to remove
            >
              Remove Friend
            </button>

          </div>
        ))}
      </div>

      <div>
        <button // This button will add a new blank friend item to the `friends` field
        type='button'
        onClick={() => addValue('friends', {})} // `addValue` takes an array-like field, and the value to add
        >
          Add Friend
        </button>
      </div>



      <br />
      <br />

      {/* // Since this is the parent form, let's put a submit button in there ;) */}
      {/* // You can submit your form however you want, as long as you call the `submitForm` callback */}
      <button>
        Submit
      </button>
    </form>
  )
}}
</Form>
)

class App extends Component {
  render (){
    return (

      <div>
        {MyForm}

        <div id="answer"></div>
        <div id="answer2"></div>
      </div>
    )
  }
}

export default App;
