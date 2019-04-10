import React, {Component} from 'react'
import axios from 'axios'

export default class DrugPage extends Component {
  constructor() {
    super()
    this.state = {data: {drugNames: [], developmentStatus: []}}
  }

  async componentDidMount() {
    let drugId = this.props.match.params.id
    const response = await axios.get(`/api/drugs/${drugId}`)
    this.setState({data: response.data})
    console.log(response.data)
  }

  render() {
    let data = this.state.data
    let genericNames = data.drugNames.filter(
      datum => datum.nameType === 'Generic'
    )
    let brandNames = data.drugNames.filter(datum => datum.nameType === 'Brand')
    let mainNames = data.drugNames.filter(datum => datum.nameType === 'Main')
    return (
      <div>
        <h2>Drug Names</h2>
        {mainNames.length ? <h4>Main</h4> : <div />}
        {mainNames.map(datum => <p>{datum.name}</p>)}
        {genericNames.length ? <h4>Generic</h4> : <div />}
        {data.drugNames
          .filter(datum => datum.nameType === 'Generic')
          .map(datum => <p>{datum.name}</p>)}
        {brandNames.length ? <h4>Brand</h4> : <div />}
        {data.drugNames
          .filter(datum => datum.nameType === 'Brand')
          .map(datum => <p>{datum.name}</p>)}
        <h2>Development Status</h2>
        {data.developmentStatus.map(datum => (
          <div>
            <h3>Condition: {datum.condition}</h3>
            <h5>
              In active Development:{' '}
              {datum.inActiveDevelopment ? 'True' : 'False'}
            </h5>
            <h5>Highest Phase: {datum.highestPhase}</h5>
            <h5>Year: {datum.year}</h5>
            <h5>Organization: {datum.organization.name}</h5>
            <h5>Administration Route: {datum.administrationRoutes[0].route}</h5>
          </div>
        ))}
      </div>
    )
  }
}
