import React from 'react';
import axios from 'axios';

import TaskList from './TaskList';
import AddTask from './AddTask';

class App extends React.Component {
  state = {
    tasks: [],
    errorMessage: ''
  }

  componentDidMount() {
    this.getData();
  }

  getData() {

  }
}

