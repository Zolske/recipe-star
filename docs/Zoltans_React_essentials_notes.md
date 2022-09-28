# React essentials

## create a react app with a toolchain

1. sets up your development environment and its toolchain in your project folder with npm (*n*ode)

2. creates a react app with the name "my-app" in the current directory

   ```bash
   npx create-react-app . my-app
   ```

3. start the local server with your react app

   ```bash
   npm start
   ```

------

## Components

> There are two types of components, **stateless functional** components, and stateful **class components**.

### stateless functional components

> Can not dynamically change their content, but they are easier to write and sufficient for simple components.
>
> - do not track any internal properties
> - always render the same thing
> - can not change unless given new props

#### how to implement and connect stateless functional components

- they are stored under `src/components` as `.jsx` (`.js`) named in "PascalCase"

- "React" needs to be imported (*in older React versions but it is good practice to keep importing it*)

  ```jsx
  // ... src/components
  import React from "react";
  ```

- write function names a "PascalCase" (*they are capitalized in the code sniped because they are pseudo code*)

- functions need to be exported with the keyword `export`

  *in front of the function keyword*

  ```jsx
  // ... src/components
  export function FUNCTION(){
  ....
  }
  ```

  *or at the bottom of the file*

  ```jsx
  // ... src/components
  function FUNCTION(){
  ....
  }
  
  export FUNCTION;
  ```

- functions need to be imported to `App.js`

  ```jsx
  // ... App.js
  import {FUNCTION FUNCTION2} from "./src/components";
  ```

- the function `App()` in `App.js` can only return one parent element, all other elements need to be a child of the parent

  ```jsx
  // ... App.js
  function App() {
    return (
      <div className="App">
        <Functional />
        <Functional2 />
      </div>
    );
  }
  ```

  #### passing properties to stateless functions components

- the functional component can have a property when they are used in `App.js`

- properties should be named in lower case (*Function=MikeTalk Property=greeting*)

  ```jsx
  // ... App.js
  function App() {
    return (
      <div className="App">
        <MikeTalk greeting="Hello" anotherprop=":)"/>
      </div>
    );
  }
  ```

- add a parameter to the function definition (*convention is to call it "props"*) which will exist as an object in the function

- the object can be accessed through JavaScript which needs to be contained within `{ }`

  ```jsx
  // ... src/components
  export function MikeTalk(props){
      return <p>Mike says {props.greeting} and {props.anotherprop}</p>;
  }
  ```

  (*output in the browser: "Mike says Hello and :)"*)

------

### use CSS in components

- css for components is stored in the folder `css` under `src/components`

- every component has its own css file

- the naming convention is `COMPONENT.module.css`
  (*e.g. for the component 'example' it would be Example.module.css*)

- the css needs to be imported into the component `.jsx` (`.js`) file

  ```jsx
  import css from "./css/Example.module.css"
  ```

- the css style can be applied to the jsx element through `className={css.CSS_CLASS}`
  (*`CSS_CLASS` is the name of the css class in the imported css file*)

  ```jsx
  <p className={css.color}>Mike</p>
  ```

  ​		(*applies the style of the class color to the jsx paragraph element*)

***

### stateful class components

> Can dynamically change to the user input but is more complex to write.
>
> - maintain an internal set of properties
> - properties are maintained in the **state**
> - can change with user interactivity
> - can take props, but only **state** can be updated

#### how to implement and connect stateful class components

- they are stored under `src/components` as `.jsx` (`.js`) named in "PascalCase"

- "React" and "Component" needs to be imported

  ```jsx
  // ... src/components
  import React from "react";
  ```

- write class names in "PascalCase" (*they are capitalized in the code sniped because they are pseudo code*)

- classes need to be exported with the keyword `export` and extended with `extends React.Component`

  *in front of the class keyword*

  ```jsx
  // ... src/components
  export class CLASS_NAME extends React.Component {
  ....
  }
  ```

  *or at the bottom of the file*

  ```jsx
  // ... src/components
  class CLASS_NAME extends React.Component{
  ....
  }
  
  export CLASS_NAME;
  ```

- classes need to be imported to `App.js`

  ```jsx
  // ... App.js
  import {CLASS_NAME CLASS_NAME2} from "./src/components";
  ```

- the function `App()` in `App.js` can only return one parent element, all other elements need to be a child of the parent

  ```jsx
  // ... App.js
  function App() {
    return (
      <div className="App">
        <CLASS_NAME />
        <CLASS_NAME2 />
      </div>
    );
  }
  ```


#### passing properties to stateful class components

- the class component can have a property when they are used in `App.js`

- properties should be named in lower case (*Class=MikeTalk Property=greeting*)

  ```jsx
  // ... App.js
  function App() {
    return (
      <div className="App">
        <MikeTalk greeting="Hello" anotherprop=":)"/>
      </div>
    );
  }
  ```

- class components need a `render()` method to be able to return `jsx`

- the content of the return statement needs to be put in `( )` if more than one item is returned

- the object "props" need to be referenced with `this.props.`

- the object can be accessed through JavaScript which needs to be contained within `{ }`

  ```jsx
  // ... src/components
  export class MikeTalk extends React.Component {
      render(){
      	return (<p>Mike says {this.props.greeting} and {this.props.anotherprop}</p>);
      }
  }
  ```

  (*output in the browser: "Mike says Hello and :)"*)

#### changing the state

**Three important rules to remember!**

1. Never update the "state object" directly (*because the component does not get updated*) use `setState()`!
2. `setState()` functions are asynchronous, to execute statements after, `setState` second argument, arrow function!
3. use a callback function (arrow function) in `setState` with `prevState` if you need to update `state` based on previous state values

##### setting the state

> The state of a stateful class component can be changed by the user.

- the state is initially defined in the constructor of the class

  ```jsx
  // ... src/components
  import React from "react";
  
  export class MikeTalk extends React.Component {
  	constructor(props) {
  		super(props);
  		this.state = {
              introduction: "Hello!",
              buttonText: "Exit",
          };
  	}
      render(){
        return (
          <div>
            <p>{this.state.introduction} {this.props.greeting}</p>
            <button>{this.state.buttonText}</button>
          </div>
        );
      }
  }
  ```

  *line 3*:

  - the `constructor` method is always called first when the class is instantiated

  - pass the `props` parameter to the `constructor`, so that any `props` passed to the component are passed through

  *line 4*:

  - the `super()` function must be called first to make sure the constructor for the parent class (React.Component) is also called
  - pass the `props` parameter to the `super` function, so that any `props` passed to the component are passed through 

  *line 5*:

  - the state is defined with the help of the `this` keyword and set to an object

  *line 6-7*:

  - the two properties of the state object and their value

  *line 13-14*:

  - the property values are called in `<p>` and `<button>`

- whenever the state is updated the component renders accordantly 

##### updating the state

1. add the `onClick` attribute to the button

   ```jsx
   <button onClick={()=>this.handleClick()}>{this.state.buttonText}</button>
   ```

   - the `onClick` event calls the `handleClick()` method through an arrow function

2. write an event handler to listen for the click event

   ```jsx
   handleClick() {
     ...
   }
   ```

   - **never update the state directly ...**

     ```jsx
     this.state.introduction = "Goodbye";
     ```

     *... because the component does not get re-rendered*

3. use `setState()` function in the event handler to update the state property (*introduction*)

   ```jsx
   handleClick() {
     this.setState({
       introduction: "Goodbye!"
     });
   }
   ```

   - the component gets re-rendered after the update
   - access the state object and allows for setting new values, not set values remain the same (*e.g. 'textButton' remains the same after the update*)
   - sets the property (*introduction*) of the state object to a new value

```jsx
// ... src/components
import React from "react";

export class FunctionalGreeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      introduction: "Hello",
      buttonText: "Exit",
    };
  }

  handleClick() {
    this.setState({
      introduction: "Goodbye!",
    });
    console.log(`executed before ${this.state.introduction} was updated`); 
  }

  render() {
    return (
      <div>
        <p>
          {this.state.introduction} {this.props.greeting}.
        </p>
        <button onClick={() => this.handleClick()}>
          {this.state.buttonText}
        </button>
      </div>
    );
  }
}
```

##### IMPORTANT!

> `setState()` functions are a asynchronous!  The `console.log()` from line 17 is executed before the `setState()` function from line 14-16.
>
> This problem can be solved with an 'call-back function' which is passed as a (arrow function) second parameter to the setState() function.
>
> ```jsx
>   handleClick() {
>     this.setState({
>       introduction: "Goodbye!",
>     },()=>console.log(`executed after ${this.state.introduction} was updated`)
>     );              
>   }
> ```

#### update the state based on a previous state

> Updating the state object **based on its previous value** can lead to hidden bugs, which are not obvious. 
>
> To update the state based on its previous value use the following syntax:

```jsx
  handleClick() {
    this.setState((prevState, prevProps)=>{
      return {
        introduction: prevState.introduction === "Hello!" ? "Goodbye!" : "Hello!"
      }
    });
  }
```

1. pass an arrow function as an argument to the `setState` function, `this.setState(ARROW_FUCTION)`

2. the arrow function takes two parameters, `prevState` and `prevProps`, `(prevState, prevProps)=>{ }`

3. return the updated state object as a return statement, `return { STATE_OBJECT}`

4. reference the previous state (*current state*) with `prevState`, `prevState.introduction`

   ```
    this.setState((prevState, prevProps)=>{
         return { STATE_OBJECT_PROPERTY: NEW_VALUE, }
       });
   ```

##### IMPORTANT!

> React is grouping multiple function calls to the same setState function into one call! 

***

## Event Handler

1. events are camelCased in React

   | HTML            | React       |
   | --------------- | ----------- |
   | onclick         | onClick     |
   | onmouseover     | onMouseOver |
   | *and so on ...* |             |

### Event Handler in Stateless Functional Components

```jsx
// ... src/components/
import React from "react";

export function EventsFunctional() {
  function clickHandler() {
    console.log("Clicked the functional button");
  }

  return (
    <div>
      <button onClick={clickHandler}>Click me!</button>
    </div>
  );
}
```

- *line 5*:
  - define the "event handler - function" **with** the **function** keyword
  - there is no limit to how many event handlers a jsx element can have
- *line 11*:
  - pass the **onClick** event as an attribute to the jsx element
  - specify the value of the **onClick** event in `{ }` which is the function that handles the event

### Event Handler in Stateful Class Components

```jsx
// ... src/components/
import React, { Component } from "react";

export class EventsClass extends Component {
  handleClick() {
    console.log("Clicked the class button");
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click me - class Component</button>
      </div>
    );
  }
}
```

- *line 5*:
  - define the "event handler - function" **without** the **function** keyword
  - there is no limit to how many event handlers a jsx element can have
- *line 11*:
  - pass the **onClick** event as an attribute to the jsx element
  - specify the value of the **onClick** event in `{ }` which is the function that handles the event
  - use the `this.` keyword to point to the *event handler - function"

### Binding Events for State Updates

> Event handlers need to be bound if they update the state of the class. There are four ways to bind them.

##### Ways to bind event handlers

1. Define the handler as an arrow function - *Primary recommendation*
2. Use an arrow function in the render method - *Secondary recommendation*
3. Call bind on the handler with ‘this’
4. Bind the event handler in the constructor

#### **Option 1: Define the handler as an arrow function** (Primary Choice)

- when defining the "event handler - function", use a  Arrow Function in method

```jsx
import React from "react";

export class EventBinding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      introduction: "Hello!",
      buttonText: "Exit",
    };
  }

  handleClick = () => {
    this.setState({
      introduction: "Goodbye!",
    });
    console.log(this);
  };

  render() {
    return (
      <div>
        <h1>
          {this.state.introduction} {this.props.greeting}
        </h1>
        <button onClick={this.handleClick}>{this.state.buttonText}</button>
      </div>
    );
  }
}
```

- *line 12*:
  - method which is called by "onClick" is defined as arrow function, and therefor bound with "this." to the class 

#### **Option 2: Use an arrow function in the render method**  (Secondary Choice)

- use a Arrow Function on the event handler attribute

```jsx
import React from "react";

export class EventBinding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      introduction: "Hello!",
      buttonText: "Exit",
    };
  }

  handleClick() {
    this.setState({
      introduction: "Goodbye!",
    });
    console.log(this);
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.introduction} {this.props.greeting}
        </h1>
        <button onClick={() => this.handleClick()}>{this.state.buttonText}</button>
      </div>
    );
  }
}
```

- *line 25*:
  - the "onClick" event calls the "handleClick" method which is bound as "arrow function" and "this."
- Arrow functions operate within the scope within which they are created e.g. Our React Component

- Use this option if your event handler requires parameters

#### **Option 3: Call bind on the handler with ‘this’**

- use "bind method"  on the event handler attribute

```jsx
        <button onClick={this.handleClick.bind(this)}>{this.state.buttonText}</button>
```

- *line 25*:
  - the same as **Option 2** only that on *line 25* the method which handles the "onClick" event is not bound through an "arrow function", but through "bind(this)"

#### **Option 4: Bind the event handler in the constructor**

- use the "bind method" within the constructor

```jsx
import React from "react";

export class EventBinding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      introduction: "Hello!",
      buttonText: "Exit",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      introduction: "Goodbye!",
    });
    console.log(this);
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.introduction} {this.props.greeting}
        </h1>
        <button onClick={this.handleClick}>{this.state.buttonText}</button>
      </div>
    );
  }
}
```

- *line 10*:
  - As binding occurs within the constructor, we only have to bind ‘this’ once instead of every time it occurs.
- Good for performance in large applications.

***

## Conditional Rendering

### Functional Conditional Rendering

1. pass a property with a Boolean value in the functional component in "App.js"

   ```jsx
   // ... App.js
   ...
   <ConditionalRenderingFunctional connected={false} />
   ```

2. in the react component file, render content based on the value of the **props**

   ```jsx
   // ... src/components/ConditionalRenderingFunctional
   import React from "react";
   
   export function ConditionalRenderingFunctional(props) {
     return (
       <div>
         <h1>{props.connected ? "Connected" : "Not Connected"}</h1>
       </div>
     );
   }
   ```

   - *line 7*:
     - if the value of "props.connected" is "true" then "Connected" is rendered
     - if the value of "props.connected" is "false" then "Not Connected" is rendered

### Functional Conditional Rendering

1. connect the component to "App.js", but without props

   ```jsx
   // ... App.js
   ...
   <ConditionalRenderingClass />
   ```

2. in the react component file, render content based on the value of the **state**

   ```jsx
   // ... src/components/ConditionalRenderingClass
   import React, { Component } from "react";
   
   export class ConditionalRenderingClass extends Component {
     constructor(props) {
       super(props);
   
       this.state = {
         connected: true,
       };
     }
     render() {
       return (
         <div>
           <h1>{this.state.connected ? "Connected" : "Not Connected"}</h1>
         </div>
       );
     }
   }
   ```

   - *line 15*:
     - if the value of "this.state.connected" is "true" then "Connected" is rendered
     - if the value of "this.state.connected" is "false" then "Not Connected" is rendered

### Conditional Rendering with multiple react elements

- this works for "functional" and "class" elements

- use JaveScript within { } to use a ternary operator to check the Boolean value in the state

- `TERNARY CONDITION ? (TRUE) : (FALSE)` 

- within ( ) jsx components can be used

  - `( )` only necessary if more than one jsx component, which can have only on parent component (*e.g.<div>*)

  ```jsx
  import React, { Component } from "react";
  
  export class ConditionalRenderingClass extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isLoggedIn: true,
      };
    }
    render() {
      return (
        <div>
          {this.state.isLoggedIn ? (
            <div>
              <p>Welcome!</p>
              <ol>
                <li>Confirm your email.</li>
              </ol>
            </div>
          ) : (
            <p>Please sign in</p>
          )}
        </div>
      );
    }
  }
  ```

  - *line 14*:
    - ternary operator checks the "state" for its Boolean value

## Nesting Components

- React components should be ...
  1. small
  2. simple
  3. isolated
  4. reusable
  5. focused
- Passing props from the parent to children, props can be ...
  Strings, Numbers, Functions, Methods, React components
- parents can be updated from their children by passing an event handler which would be called from its children, which then updates the parent state

1. parent component (*which needs to be imported and used as a component in App.js*)

   ```jsx
   import React, { Component } from "react";
   import { UserMessage } from "./UserMessage";
   
   export class NestingComponents extends Component {
     constructor(props) {
       super(props);
   
       this.state = {
         isLoggedIn: false,
       };
     }
     render() {
       return (
         <div>
           <UserMessage isLoggedIn={this.state.isLoggedIn} />
         </div>
       );
     }
   }
   ```

   - *line 2*:
     - import the child component
   - *line 9*:
     - the state property is set to a Boolean value which can be passed to the child
   - *line 15*:
     - the child component "UserMessage" is used and has a property with the value from the state which gets passed down to the child

2. child component

   ```jsx
   import React from "react";
   
   export function UserMessage(props) {
     return (
       <div>
         {props.isLoggedIn ? (
           <div>
             <p>Welcome to the site! Please complete the steps below:</p>
             <ol>
               <li>Confirm your email</li>
               <li>Complete your profile</li>
               <li>Subscribe to the newsletter</li>
             </ol>
           </div>
         ) : (
           <p>Please sign in</p>
         )}
       </div>
     );
   }
   ```

   - *line 6*:
     - the property caries the value from the parent component
     - if the value is "true", then the first set of ( ) is rendered
     - if the value is "false", then the second set of ( ) is rendered

### Methods as Props

1. define the event hander in the parent component

```jsx
import React, { Component } from "react";
import { UserMessage } from "./UserMessage";

export class NestingComponents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: true,
      isLoggedIn: false,
    };
  }

  handleSignIn = () => {
    this.setState({
      isLoggedIn: true,
    });
  };

  render() {
    return (
      <div>
        <UserMessage
          isLoggedIn={this.state.isLoggedIn}
          handleSignIn={this.handleSignIn}
        />
      </div>
    );
  }
}
```

- *line 14 - 18*:
  - define the event handler method as arrow function which will change the state of the class property "isLoggedIn" to "true"
- *line 25*:
  - set a property with the event handler method "handleSignIn" to the "UserMessage" component

2. set the "onClick" event in the child component with the method from the parent

```jsx
import React from "react";

export function UserMessage(props) {
  return (
    <div>
      {props.isLoggedIn ? (
        <div>
          <p>Welcome to the site! Please complete the steps below:</p>
          <ol>
            <li>Confirm your email</li>
            <li>Complete your profile</li>
            <li>Subscribe to the newsletter</li>
          </ol>
        </div>
      ) : (
        <div>
          <p>Please sign in</p>
          <button onClick={props.handleSignIn}>Sign in</button>
        </div>
      )}
    </div>
  );
}
```

- *line 18*:
  - the "onClick" event triggers the event handler method from the parent which was passed down as property
  - the event handler in the parent updates the state of the parent

### React Component Life Cycle

BUILD -> EXTRACT -> REFACTOR

### Rendering Lists

- the react component returns a list of title/author/pages for each book

  ```jsx
  import React from "react";
  
  export function RenderingLists() {
    const books = [
      {
        title: "to kill  a mockingbird",
        author: "harper lee",
        pages: 281,
      },
      {
        title: "the great gatsby",
        author: "f.scott fitzgerald",
        pages: 218,
      },
      {
        title: "the catcher in the rye",
        author: "j. d. salinger",
        pages: 231,
      },
    ];
      
    return (
      <div>
        {books.map((book) => {
          return (
            <div>
              <h5>{book.title}</h5>
              <p>{book.author}</p>
              <p>{book.pages}</p>
            </div>
          );
        })}
      </div>
    );
  }
  ```

  **NOTE!** There would be a warning in the console log, because there are no unique keys for the list items of the child.

  - to fix the issue the code needs to be changed in the parent component on line 26 to `<div key={book.title}>`

  #### render list from a component

  - parent component

  ```jsx
  import React from "react";
  import {Book} from "./Book"
  
  export function RenderingLists() {
    const books = [
      {
        title: "to kill  a mockingbird",
        author: "harper lee",
        pages: 281,
      },
      {
        title: "the great gatsby",
        author: "f.scott fitzgerald",
        pages: 218,
      },
      {
        title: "the catcher in the rye",
        author: "j. d. salinger",
        pages: 231,
      },
    ];
    
    return (
      <div>
        {books.map((book) => {
          return <Book bookProp={book}/>
        })}
      </div>
    );
  }
  ```

  - *line 2*:

    - the child component Book is imported

  - *line 25*:

    - `books.map((book)` map takes every element of the books array, and executes a function on every single element (`book`)

  - *line 26*:

    - the child component is rendered for every element in the books array
    - for every render there is on element passed as "prop" to the child component (`<Book bookProp={book}/>`)

    

  - child component

  ```jsx
  import React from "react"
  
  export function Book(props){
  	const book = props.bookProp
  	return (
            <div>
              <h5>{book.title}</h5>
              <p>{book.author}</p>
              <p>{book.pages}</p>
            </div>
  	)
  }
  ```

  - *line 4*:
    - the element from the books array is received as props and saved to a new book constant

  **NOTE!** There would be a warning in the console log, because there are no unique keys for the list items of the child.

  - to fix the issue the code needs to be changed in the parent component on line 26 to `return <Book key={book.title} bookProp={book} />;`

### Keys and Indexes

> Each child in a list should have a unique key-prop so react can keep track of its changes. 
> Always put the key on the most outer element that would be repeated!!!
> The key-prop is reserved for react and should never be used as a name for a regular prop.
> Avoid using index as key!!

***

## The Component Lifecycle

| mount                                                        | update                                                       | UnMount                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| a component is about to enter the Dom                        | setState is called, a state change triggers a re-render, can run multiple times | Component is leaving the DOM                                 |
| `consrtructor()`<br />`render()`                             | `render()`<br />another `setState()` call (optional)         |                                                              |
| `componentDidMount(){   ...}`                                | `componentDidUpdate(){  ...}`                                | `componentWillUnmount(){   ...}`                             |
| *first `constructor` then `render` and then `componentDidMount` is called* | *if a re-rendering takes place, the `componentDidUpdate` is called after, could lead to a loop* | *is called just before the component is removed from the DOM* |

***

## Forms in React

> There are two types of forms in React, "**uncontrolled forms**" where the browser has control, which can also course the page to refresh when the user submits the form. This should be avoided because the React application would start from the beginning. The second type is the "**controlled form**" in which React is controlling it.

### take control of the input from field

- this can be achieved by connecting the "value" of the "input field" to the "state"

1. create an input element with the onChange event
2. write a handler for the input's onChange event
3. add a matching property in the state

```jsx
import React from "react";

export class ControlledForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: "",
    };
  }

  handleNameChange = (event) => {
    this.setState({
      userInput: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <form>
          <label htmlFor="id-name">Your Name:</label>
          <input
            value={this.state.name}
            onChange={this.handleNameChange}
            id="id-name"
            name="name"
            type="text"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
```

- *line 24*:
  - the value of the html input field is coming from the state object with the property of "userInput" from line 8, **this gives the "control" to React**
- *line 12 - 16*:
  - the `onChange` event is triggered every time the user updates the input text field
  - the `onChange` calls the `handleNameChange` method from line 12
- *line 12*:
  - the `handleNameChange` method is defined as arrow function
  - the `event` parameter contains the event object
  - its value is accessed through `event.target.value` and passed through `setState` to userInput in the state-object 
- The value of the text input field (what the user sees and what would be submitted) is coming from the state object. The state object itself is updated through the handleNameChange method which passes the content of the user input from the input text field through the `event.target.value` .

### prevent the submit button to refresh the page

- add a `onSubmit` event to the form element in line 21

```jsx
<form onSubmit={this.handleSubmit}>
```

- write a `handleSubmit` method as arrow function

```jsx
  handleSubmit = (event) => {
    event.preventDefault();
  };
```

### Forms with Uncontrolled Inputs

- 

```jsx
import React from "react";

export class UncontrolledForm extends React.Component {
  constructor(props) {
    super(props);
    this.InputName = React.createRef();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.InputName.current.value);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="id-name">Your Name:</label>
            <input id="id-name" name="name" type="text" ref={this.InputName} />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
```

- *line 6*:
  - `this.InputName = React.createRef();` the reference is linked to React
  - `this.InputName ` InputName can be any name as long it matches the reference in the html element
- *line 20*:
  - `ref={this.InputName}` the reference is linked to the Html element
- *line 11*:
  - `this.InputName.current.value` the value can be accessed any where in the code
  - `this.InputName.current` the html element can be accessed `<input id="id-name" name="name" type="text" />`
- *line 17*:
  - `<form onSubmit={this.handleSubmit}>` is still needed to prevent the side from refreshing if user clicks the submit button

#### Uncontrolled vs Controlled

| Uncontrolled                                                 | controlled                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| - less featureful due to lack of control over input fields<br />- easy to implement | - feature-rich due to more control<br />- real-time validation<br />- full control over onChange event<br />- recommended by the React docs |

***

## Hooks

> Give functional components the same abilities as stateful class components. But with less code.

### useState() Hook

```jsx
import React, {useState} from 'react'

export function ControlledFormHooks() {
    const [name, setName] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
    }

    return (
        <div>
            <h2>Please fill out the form below:</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id-name">Your Name:</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="id-name"
                        name="name"
                        type="text"
                    />
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
```

- *line 1*:
  - import `{useState} from "react"`
- *line 4*:
  - `const [name, setName] = useState('');` destructoring is used to assign the values to the properties 
  - the first property `name` is the name of the property
  - it is set to an empty string defined as a parameter in `useState('')`, but it could have any other value
  - the second property `setName` is the method that can be used to update the value of the first property
  - the convention is to name the update method according to the property name `set` + `PROPERTYNAME`
- *line 17*:
  - the value which was passed to `name` in line 4 is passed to `value=` with `{name}`
- *line 18*:
  - the value (`e.target.value`) of the `onChange` event is passed through `setName` to `name`
- *line 13*:
  - `onSubmit` event calls the `handleSubmit` method
- *line 5-6*:
  - prevents the site from refreshing when the user clicks the submit button

### useState() Hook with Arrays

1. an array passed to the setter function (`set` + `PROPERTYNAME`) overwrites the old one
2. never update the state directly or use functions like push or pop, as that leads to bugs, use **filter**, **map**, **reduce** or the **spread operator**
3. use the spread operator to copy an array when adding an item and the filter method to remove it

```jsx
import React, {useState} from 'react'

export function UseStateWithArrays() {
    const [nums, setNums] = useState([1,2,3]);
    const addNums = () => {
        setNums([...nums, nums.length + 1]);
    }
    const removeNum = () => {
        setNums(
            nums.filter((item, idx) => {
                return idx !== nums.length - 1;
            })
        )
    }
    return (
        <div>
            <button onClick={addNums}>
                Add Item
            </button>
            <button onClick={removeNum}>
                Remove Item
            </button>
            <ul>
                {nums.map(num => <li key={num}>{num}</li>)}
            </ul>
        </div>
    )
}
```

- *line 5-7*:
  - `setNums` updates the value of `nums`
  - `...nums` the spread operator copies the original numbers before `nums.length + 1` is added

- *line 8-12*:
  - removes the last number

### useState() Hook with Objects

1. an object passed to the setter function overwrites the old one, so always spread old values before setting new ones
2. pass a arrow function with previous state to the setter function if new state depends on the previous

```jsx
import React, { useState } from 'react'

export function UseStateWithObjects() {
    const [name, setName] = useState({ firstName: "", lastName: "" });

    return (
        <div>
            <form>
                <input
                    type="text"
                    value={name.firstName}
                    onChange={e => setName({
                        ...name,
                        firstName: e.target.value
                    })}
                />
                <input
                    type="text"
                    value={name.lastName}
                    ...name,
                    onChange={e => setName({
                        lastName: e.target.value
                    })}
                />
                <h2>{JSON.stringify(name)}</h2>
            </form>
        </div>
    )
}
```

- *line 4*:
  - the object is defined similar to the array from before
- *line 13, 20*:
  - use the spread operator to avoid overwriting other parts of the object

#### use arrow function when updating a value based on its previous value

```jsx
...
const [count, setCount] = useState(0);
...
<button onClick={()=> setCount(count => count + 1)}</button>
```

- *line 2*:
  - `count` is defined with an initial value of 0
- *line 4*:
  - the `onClick` event calls the `setCount` method to update `count`
  - the previous value of `count` is incremented by 1 with an arrow function

### The useEffect() Hook

> Does the same for functional components as didMound() didUpdate() willUnmount() did for class base components.
> It executes a function after every re-render.

```jsx
import React, {useState, useEffect} from 'react'

export function UseEffectCounter() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        document.title = count;
    });
    return (
        <div>
            <button onClick={
                () => setCount(count => count + 1)
            }>
                Increment Count ({count})
            </button>
        </div>
    )
}
```

- *line 5*:
  - after **every** re-render (**not just** through the button onClick event) the useEffect() method is executed, it updates the title of the website (in the taskbar)

### Conditional Effects

> To avoid the execution of the useEffect function by every re-render, a second parameter (dependency array) can be added which limits the function to only re-render when there is a change in that value.

```jsx
    useEffect(() => {
        document.title = count;
    }, [count]);
```

- the useEffect function is now only executed when the count value has changed

### run useEffect() only once

```jsx
    useEffect(() => {
        document.title = count;
    }, []);
```

- passing an empty array as second parameter courses the function to run only once even if there is re-rendering is happening

### Effect Cleanup functions

> Some functions still run in the background even its original function has been stopped. To stop those functions we have clean-up functions.

```jsx
    useEffect(()=>{
        const interval = setInterval(() => {
            setTime(time => time + 1)
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);
```

- *line 5-5*:
  - the clean up function is implemented as return statement

***

# Network Requests

## Fetching Data with GET

1. install the axios (http library to make requests)

   ```bash
   npm install axios
   ```

2. write the code

```jsx
import React, { Component } from "react";
import axios from "axios";

export class HTTPRequests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
      axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      this.setState({
        posts: response.data,
      });
    });
  }
  render() {
    return (
      <div>
        <h2>Posts</h2>
        {JSON.stringify(this.state.posts)}
      </div>
    );
  }
}
```

*line 2*:

- import axios from "axios"

*line 13*:

- make a fetch request to the api url using the axios library `axios.get("https://jsonplaceholder.typicode.com/posts")`
- define what should happen whit the data once it has arrived `.then((response) => {}`

*line 14*:

- update the `posts` array with `setState`, the object which has been returned is stored in `response`, `data` is a part of the returned object in, this example, in which we are interested in

*line 24*:

- transforms the data into a string

### catching errors

- fff

```jsx
// ...
    this.state = {
      posts: [],
      error: null,
    };
  }
  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/")
      .then((response) => {
        this.setState({
          posts: Array.isArray(response.data) ? response.data : [response.data],
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }
  render() {
    const posts = this.state.posts;
    return (
      <div>
        <h2>Posts:</h2>
        {posts.length ? (
          posts.map((post) => (
            <div key={post.id}>
              <h2>
                {post.id}. {post.title}
              </h2>
              <h4>By User ID {post.userId}</h4>
              <p>{post.body}</p>
              <hr />
            </div>
          ))
        ) : this.state.error ? (
          <p>{this.state.error}</p>
        ) : (
          <h4>Loading posts ...</h4>
        )}
      </div>
    );
  }
}
```

*line 4*:

- define a state property with the name "error" and the value "null"

*line 15-19*:

- the catch method catches the error object and saves the error-message to the error property

*line 38*:

- the error message is displayed to the user

### Sending Data with POST

- sends a post request to `jsonplaceholder.typicode.com/posts` with `axios`

```jsx
import React, { Component } from "react";
import axios from "axios";

export class HTTPPost extends Component {
  postToApi = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        title: "Hello world!",
        body: "It works!",
        userId: 123,
      })
      .then((response) => console.log(response));
  };

  render() {
    return (
      <div>
        <button onClick={this.postToApi}>Create Post</button>
      </div>
    );
  }
}
```

*line 12*:

- the confirmation that the post was received from the api end point is stored in the `response` object

### Duplicating GET/POST Functionality with Hooks

```jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export function HTTPHooks() {
  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        console.log(response);
        setPost(Array.isArray(response.data) ? response.data : [response.data]);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h2>Posts:</h2>
      {post.length ? (
        post.map((post) => (
          <div key={post.id}>
            <h2>
              {post.id}. {post.title}
            </h2>
            <h4>By User ID {post.userId}</h4>
            <p>{post.body}</p>
            <hr />
          </div>
        ))
      ) : error ? (
        <p>{error}</p>
      ) : (
        <h4>Loading posts ...</h4>
      )}
    </div>
  );
}
```

