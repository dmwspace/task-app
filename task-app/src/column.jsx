import React from 'react'
import styled from 'styled-components'
import Task from './task'
import { Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 220px;
    display: flex;
    flex-direction: column;
`   
const Title = styled.h3`
    padding: 8px
`
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: 'skyblue';
    flex-grow: 1;
    min-height: 100px
`

export default class Column extends React.Component {
    
    render() {
        
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id}>
                    {(provided, snapshot) => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            //isdraggingover={snapshot.isDraggingOver} 
                        >
                            {this.props.tasks.map((task, index) => {
                                return <Task 
                                    key={task.id} 
                                    task={task} 
                                    index={index}
                                />})
                            }
                            {provided.placeholder}
                            {console.log('snapshot: ', snapshot)}
                            {console.log('provided: ', provided)}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        )

    }
}