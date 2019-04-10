import React, {Component} from 'react'
import axios from 'axios'

export default class MechanismPage extends Component {
  constructor() {
    super()
    this.state = {drugs: []}
  }

  async componentDidMount() {
    let mechanismId = this.props.match.params.id
    const response = await axios.get(`/api/mechanisms/${mechanismId}`)
    this.setState({drugs: response.data})
    console.log(response.data)
  }

  render() {
    let drugs = this.state.drugs
    return (
      <div>
        <h2>Associated Drugs</h2>
        <ul>
          {drugs.map(drug => (
            <li>
              {drug.name} ({drug.nameType})
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
