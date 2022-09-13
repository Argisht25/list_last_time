import React, { useEffect, useState } from 'react';
import './App.css'
import 'react-calendar/dist/Calendar.css';
import ChooseType from './Components/chooseType/Choosetype';
import Lists from './Components/lists/Lists';
import { DragDropContext } from 'react-beautiful-dnd';


function App() {

    const todoItem = JSON.parse(localStorage.getItem("todo")) ||
        [
            {
                id: 1,
                text: "Write code for list",
                isCompleted: false,
                currentTime: todoDate()
            },
            {
                id: 2,
                text: "Read about REDUX",
                isCompleted: false,
                currentTime: todoDate()

            },
            {
                id: 3,
                text: "Repeat all the old",
                isCompleted: false,
                currentTime: todoDate()
            }
        ]



    const [editMode, setEditMode] = useState(false)

    const [value, setValue] = useState("")

    const [todos, setTodos] = useState(todoItem);

    const [completed, setCompleted] = useState([])

    const [inProgress, setInProgress] = useState([])

    const [visibleCalendar, setVisibleCalendar] = useState(false)

    const [dateValue, setDateValue] = useState()




    useEffect(() => {
        window.localStorage.setItem("todo", JSON.stringify(todos))
    }, [todos])

    function itemTransfer() {
        window.localStorage.setItem("todo", JSON.stringify(todos))
    }


    function Add() {
        if (value === '') {
            return
        }
        return (

            setTodos([
                ...todos,
                {
                    id: Math.floor(Math.random() * 1000),
                    text: value,
                    isCompleted: false,
                    currentTime: todoDate()

                }
            ]),
            setValue(""),
            setEditMode(false)
        )

    }

    function todoDate() {
        const today = new Date()
        let year = today.getFullYear() // 2022
        let Month = today.getMonth() + 1 // 9
        let day = today.getDate() // 13
        if (Month < 10) {
            Month = "-0" + Month
        } else {
             Month = "-"  + Month
        } if(day < 10){
             day = "-0" + day
        }else{
              day =  "-" + day
        }
       return  year + Month + day
    }


    function Removed(id) {

        return (

            setTodos(todos.filter((todo) =>

                todo.id !== id
            ))
        )
    }


    function KeyDown(evt) {
        if (evt.key === "Enter") {
            setEditMode(true)
        }
    }



    function Completed() {

        setCompleted(todos.filter((todo) =>

            todo.isCompleted,

        ))
        return setTodos

    }


    function InProgress() {

        setInProgress(todos.filter((todo) =>
            !todo.isCompleted,
        ))
    }
    useEffect(() => {
        Completed()
        InProgress()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todos])



    let today = new Date()
    let day = today.getDate()

    return (
        <div className='todo' tabIndex={0} onKeyDown={KeyDown} >
            <div className='container'>
                <div className='wrapper'>
                    <DragDropContext onDragEnd={(param) => {
                        const srcI = param.source.index;
                        const desI = param.destination?.index;
                        todos.splice(desI, 0, todos.splice(srcI, 1)[0])
                        itemTransfer()
                    }} >
                        <React.Fragment>
                            <div className='header'>
                                <div className='day'>
                                    <div className='iconBox' >
                                        {visibleCalendar &&
                                            <div className='data_range'>
                                                <input type="date" onChange={(event) => {
                                                    const data = event.target.value
                                                    setDateValue(data)
                                                    todos.filter((todo) => {
                                                        return todo.currentTime
                                                    })
                                                }} />
                                            </div>
                                        }

                                        {!visibleCalendar && <div onClick={() => {
                                            setVisibleCalendar(!visibleCalendar)
                                        }}>
                                            <div className='dayCalendar'>Day</div>
                                            <div className='today_Icon' >{day}</div>
                                        </div>}

                                    </div>

                                    <div className='title'>today</div>

                                </div>
                                <ChooseType
                                    Completed={Completed}
                                    InProgress={InProgress}
                                    setTodos={setTodos}
                                    todos={todos}
                                    setCompleted={setCompleted}
                                    setInProgress={setInProgress}
                                    setDateValue={setDateValue}
                                    setVisibleCalendar={setVisibleCalendar}
                                />
                            </div>

                            <Lists
                                dateValue={dateValue}
                                inProgress={inProgress}
                                completed={completed}
                                todos={todos}
                                Removed={Removed}
                                setTodos={setTodos}
                                editMode={editMode}
                                value={value}
                                setValue={setValue}
                                Add={Add}
                                setEditMode={setEditMode}
                            />
                        </React.Fragment>
                    </DragDropContext>
                </div>
            </div>
        </div>


    )
}

export default App;
