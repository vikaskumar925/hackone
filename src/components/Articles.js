import React from 'react';

class Articles extends React.Component {
  state = {
    articles:[],
    input:'',
    click: false
  }
  onChangeHandler = (event) => {
    const value = event.target.value;
    this.setState({input: value});
  }
  onFetchHandler =  (event) => {
    if(!this.state.input) {
      return;
    }
    
    const input = this.state.input;
    let url = 'https://jsonmock.hackerrank.com/api/articles?author='+input+'&page=1';
    fetch(url)
      .then(res => res.json())
      .then(response => {
        if(response.total) {
          let articles = response.data.slice(0, 4);
          this.setState({ articles : articles, click:true});
        }
      })
      .catch(err=> {
        this.setState({click: true, articles:[]});
        console.log(err.message)
      })

  }

  render() {
    let results;
    if (this.state.articles.length) {
      let articles = this.state.articles.map((article, index) => {
        return <li key={index} data-testid="result-row">{article.title}</li>
      })
      results = <div className="results">{articles}</div>;
    } else {
      results = <div data-testid="no-results">No results</div>;
    }
    if(!this.state.click) {
      results ='';
    }
    return (
      <React.Fragment>
        <div className="controls">
          <div className="input-container">
            <span>author:</span>
            <input type="text" className="text-input" onChange = {this.onChangeHandler} data-testid="text-input" />
            <button className="fetch-button" onClick={this.onFetchHandler} data-testid="fetch-button">Fetch</button>
          </div>
        </div>
        {results}
      </React.Fragment>
    );
  }
}

export default Articles;
