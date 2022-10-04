import React, { useState } from 'react'
import './ChooseType.css'
import { NavLink } from 'react-router-dom'

export default function ChooseType({ setVisibleCalendar, setTodos, todos, Completed, InProgress}) {

    const [editMode, setEditMode] = useState(false)


    function Removed() {
        setTodos(todos.filter((todo) => todo.id === Number))
        setEditMode(false)
    }


    const showCompleted = () => {
        Completed()
        setEditMode(false)
    }
    const showInProgress = () => {
        InProgress()
        setEditMode(false)
    }



    return (
        <div>
            <div className='dots' onClick={() => setEditMode(!editMode)}>
                <div className={editMode ? "dots_box" : "dots_box1"}>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                </div>
            </div>
            {
                editMode &&
                <div>
                    <div className='comands'>
                        <div className='command_box'>
                            <NavLink to="" onClick={() => {
                                setEditMode(false)
                                setVisibleCalendar(false)
                            }}>All Todos</NavLink>
                            <span />
                            <NavLink to="completed" onClick={showCompleted}>Completed</NavLink>
                            <span />
                            <NavLink to="inProgress" onClick={showInProgress}>in Progress</NavLink>
                            <span />
                            <NavLink to="" onClick={Removed}>Remove</NavLink>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
