import React, {Component} from 'react';
import AppNavbar from './components/AppNavbar';
import List from './components/List';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authAction';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser());
  }

  toggle = () => {
    console.log('yes')
  }

  onSubmit = (e) => {
    e.preventDefault();
    let query = e.target.query.value;
    let context = e.target.context.value;
    axios
      .get('/search?', {
        params: {
          query: query,
          context: context
        }
      })
      .then(function (res) {

        document.getElementById('results').innerHTML = res.tracks.items.map(track => {
          return `<li><button id="tester">${track.name} by ${track.artists[0].name}</button> <a href="${track.external_urls.spotify}" target="_blank">Play</a></li>`;
        }).join('\n');
        
      })
      .catch(function (err){
        console.log(err)
      })


}

  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <AppNavbar/>
        <Container>
          <p>Song Search</p>
          <form onSubmit={this.onSubmit}>
            <input id="query" required type="text" placeholder="Search"/>
            <input required type="radio" name="context" value="artist"/><label>Artist name</label>
            <input required type="radio" name="context" value="track"/><label>Track name</label>
            <input required type="radio" name="context" value="all"/><label>All</label>       
            <button type="submit">Submit</button>
          </form>
          <section className="results">
            <h3>Results</h3>
            <ul id="results"></ul>
          </section>
          <ItemModal/>
          <List/>
        </Container>
      </div>
      </Provider>
    );
  }
}

export default App;
