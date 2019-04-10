import React from 'react'
import axios from 'axios'
import Result from './result'

class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {query: '', results: []}
    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange(event) {
    this.setState({query: event.target.value})
    if (!event.target.value.length) {
      this.setState({results: []})
    } else {
      const response = await axios.get(`/api/search/${event.target.value}`)
      if (response.status === 204 || response.status === 404)
        this.setState({results: []})
      else this.setState({results: response.data})
    }
  }
  render() {
    let results = this.state.results
    console.log('results', results)
    return (
      <div>
        <form>
          <input
            placeholder="Search for drugs and mechanisms"
            id="search-input"
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
        {results.length ? (
          results.map(result => <Result result={result} />)
        ) : (
          <div />
        )}
      </div>
    )
  }
}

export default SearchPage
