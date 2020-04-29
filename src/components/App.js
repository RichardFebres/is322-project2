import React from 'react';
import "bulma/css/bulma.css"
import axios from 'axios';

import PageTabs from './PageTabs.component';
import GridView from './GridView.component';
import ListView from './ListView.component';
import TaskBoard from './TaskBoard.component';

const DESKTOP =  1280;
const TABLET = 1024;
const PHONE = 640;

class App extends React.Component {
        state = {
            view: 'grid',
            allTasks: [],
            sortedTasks: {
                todo: [],
                inProgress: [],
                review: [],
                done: []
            },
            browserWidth: 0,
            breakpoint: 'desktop',
            errorText: '',
        }
    }


    componentDidMount() {
        this.getTasks();
    }

    getTasks() {
        axios.get('http://localhost:5000/tasks/')
            .then(response => {
                this.setState({allTasks: response.data, sortedTasks: this.sortTasks(response.data)});
            }).catch(error => {
                this.setState({ errorMessage: error.message });
        });
    }

    sortTasks(tasks) {
        return {
            todo: tasks.filter(post => post.column === 'todo'),
            inProgress: tasks.filter(post => post.column === 'in-progress'),
            review: tasks.filter(post => post.column === 'review'),
            done: tasks.filter(post => post.column === 'done'),
        }
    }

    onUpdateTask(_task) {
        let allTasks = this.state.allTasks;
        const index = allTasks.findIndex(task => task.id === _task.id);
        allTasks[index] = _task;

        const sortedTasks = this.sortTasks(allTasks);
        this.setState({allTasks, sortedTasks})
    }

    onViewChange(view) {
        this.setState({view})
    }

    onAddTaskSubmit(task) {
        let {allTasks} = this.state;

        task.column = 'todo';
        task.id = this.state.allTasks.length + 1;

        allTasks.push(task);
        let sortedTasks = this.sortTasks(allTasks);
        this.setState({allTasks, sortedTasks, view: 'grid'});
    }

    wrapPage(jsx) {
        const {view} = this.state;
        return (
            <div className="container">
                <PageTabs currentView={view}
                          onViewChange={this.onViewChange.bind(this)}/>
                {jsx}
            </div>
        );
    }

    render() {
        const {view} = this.state;

        switch (view) {
            case "grid":
                return (this.wrapPage(
                    <GridView tasks={this.state.sortedTasks} onUpdateTask={(task) => this.onUpdateTask(task)}/>
                ));
            case "list":
                return (this.wrapPage(
                    <ListView tasks={this.state.allTasks}/>
                ));
            case "add":
                return (this.wrapPage(
                    <AddTask onSubmit={this.onAddTaskSubmit.bind(this)}/>
                ));
            default:
                return (this.wrapPage(
                    <h2> Invalid Tab, choose another</h2>
                ));
        }
    }
}

export default App;

