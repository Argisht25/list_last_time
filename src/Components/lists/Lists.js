
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import InputCreate from '../InputCreate/InputCreate'
import Listitem from '../listItems/ListItem'
import ap from './lists.module.css'


export default function Lists({  todos, Removed, setTodos, editMode, value, setValue, Add, setEditMode, inProgress, completed, startDate, endDate }) {


    const [warning, setWarning] = React.useState(false)

    function KeyDown(evt) {

        if (evt.key === "Enter" && !warning) {
            Add()
            setWarning(false)
        }
    }




    const dataRange = todos
        ?
        todos.filter((todo) => {
            // console.log(todos)
       
            // return todo.currentTime >= startDate && todo.currentTime <= endDate
            return todo.currentTime
        })
        : todos


console.log(startDate)


    return (
        <div className={ap.box}>
            <div className={ap.todo_App}>
                {
                    !todos.length ?
                        <>
                            <div className={ap.createItem_box}>
                                <p className={ap.createItem}>Please Create Item</p>
                            </div>
                            <InputCreate
                                editMode={editMode}
                                setValue={setValue}
                                setEditMode={setEditMode}
                                value={value}
                                KeyDown={KeyDown}
                                Add={Add}
                                warning={warning}
                                setWarning={setWarning}
                            />
                        </>
                        :
                        <Routes>
                            <Route path='' element={
                                <>
                                    <Listitem
                                        dataRange={dataRange}
                                        startDate={startDate}
                                        Removed={Removed}
                                        onChange={(newTodo) => {
                                            setTodos(todos.map((todo) => {
                                                if (todo.id === newTodo.id) {
                                                    return newTodo
                                                } else {

                                                    return todo
                                                }
                                            }))
                                        }} />
                                    <InputCreate editMode={editMode}
                                        setValue={setValue}
                                        setEditMode={setEditMode}
                                        value={value}
                                        KeyDown={KeyDown}
                                        Add={Add}
                                        warning={warning}
                                        setWarning={setWarning}
                                    />
                                </>} />

                            <Route path='/completed' element={<Listitem todos={completed} Removed={Removed} onChange={(newTodo) => {
                                setTodos(todos.map((todo) => {
                                    if (todo.id === newTodo.id) {
                                        return newTodo
                                    } else {
                                        return todo
                                    }
                                }))
                            }} />} />

                            <Route path='/inProgress' element={<Listitem todos={inProgress} Removed={Removed} onChange={(newTodo) => {
                                setTodos(todos.map((todo) => {
                                    if (todo.id === newTodo.id) {
                                        return newTodo
                                    } else {
                                        return todo
                                    }
                                }))
                            }} />} />

                        </Routes>
                }
            </div>
        </div>
    )
}
