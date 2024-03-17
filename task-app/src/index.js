import React from 'react';
import ReactDOM from 'react-dom/client';
import initialData from './initial-data';
import Column from './column'
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`

class App extends React.Component {
  state = initialData

  onDragEnd = result => {
    document.body.style.color = 'inherit'
    document.body.style.backgroundColor = 'inherit'
    const { destination, source, draggableId } = result;

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        }
      }
      this.setState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish]: newFinish,
      },
    };
    this.setState(newState);
  }
  render() {

    return (
    <DragDropContext
      onDragStart={this.onDragStart}
      onDragUpdate={this.onDragUpdate}
      onDragEnd={this.onDragEnd}
    >
      <Container>
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId]
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])
          return <Column key={columnId} column={column} tasks={tasks} />
          })
        }
      </Container>
    </DragDropContext>
  )}
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

