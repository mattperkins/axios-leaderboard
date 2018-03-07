import React, {Component} from 'react'
import styled, {injectGlobal} from 'styled-components'
import 'font-awesome/css/font-awesome.css'
import axios from 'axios'
import Table from 'react-bootstrap/lib/Table'
import Image from 'react-bootstrap/lib/Image'

//eslint-disable-next-line
injectGlobal`
body {
font-family: sans-serif;
background: #f7f7f7;
}
`

// styled components
const Wrapper = styled.div`
margin: 1px;
`

// main ("ROOT") component 
export default class Axios extends Component {

state={
    top100: [],
    allTime: [],
    current: true
}

getData(url, lemon){
    axios.get(url)
        .then(({data}) => {
            this.setState({ [lemon]: data })
        })
}

pointChange(value){
    if(this.state.current !== value){
        this.setState({
            current: value
        })
    }
}

componentDidMount(){
    this.getData('http://api.dormshed.com/leaderboard-axios/leaderboard-top100.json', 'top100')

    this.getData('http://api.dormshed.com/leaderboard-axios/leaderboard-allTime.json', 'allTime')
}

// MAIN COMPONENT RENDER
render() {
const {top100, allTime, current} = this.state
// MAIN COMPONENT RETURN
return (

<Wrapper>

    <Table striped bordered condensed>
        <thead>
            <tr className="centerRow">
                <th>#</th>
                <th>Profile</th>
                <th 
                    className="pointer"
                    onClick={(event) => {this.pointChange(true)}}>Points in 30 days { current && (<i className="fa fa-caret-down"></i>) }</th>
                <th 
                    className="pointer"
                    onClick={(event) => {this.pointChange(false)}}>All Time Points { current === false && (<i className="fa fa-caret-down"></i>) }</th>
            </tr>
        </thead>
        <tbody>
            {current && (top100.map((row, i) =>
                (
                    <tr key={row.username}>
                        <td className="centerRow">{i +1}</td>
                        <td className="centerRow">
                            <a href={`#/${row.username}`}><Image src = {row.img} style={{height: 50}}/></a>
                        </td>
                        <td className="centerRow">{row.recent}</td>
                        <td className="centerRow">{row.alltime}</td>
                    </tr>
                )
            ))
            }

            {current === false && (allTime.map((row, i) =>
                (
                    <tr key={row.username}>
                        <td className="centerRow">{i +1}</td>
                        <td className="centerRow">
                            <a href={`https://www.freecodecamp.org/${row.username}`}><Image src = {row.img} style={{height: 50}}/></a>
                        </td>
                        <td className="centerRow">{row.recent}</td>
                        <td className="centerRow">{row.alltime}</td>
                    </tr>
                )
            ))
            }
        </tbody>
    </Table>

</Wrapper>

)// end return
}// end render
}// end component

