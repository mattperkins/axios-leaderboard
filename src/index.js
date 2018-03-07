import React from 'react'
import ReactDOM from 'react-dom'
import Axios from './Axios'

class App extends React.Component {

render() {
return (

<Axios />

)
}
}

const render = document.getElementById('app')
ReactDOM.render(<App />, render)