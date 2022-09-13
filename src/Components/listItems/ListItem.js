import it from './ListItem.module.css'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable, Droppable } from 'react-beautiful-dnd';


function Listitem({ todos, onChange, Removed }) {
    return (
        <Droppable droppableId="droppable-1" >
            {(provided, _) => (
                <div className={it.mapValue}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {todos.map((todo, i) => {
                        return (
                            <div key={todo.id} >
                                <Draggable draggableId={"draggable-" + todo.id} index={i}>
                                    {(provided, snapshot) => (
                                        <div {...provided.dragHandleProps} {...provided.draggableProps} className={it.todo_item}
                                            ref={provided.innerRef}
                                            style={{
                                                ...provided.draggableProps.style,
                                                boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none",
                                                background: snapshot.isDragging ? "#409C156E" : "none"
                                            }}
                                            key={todo.id} >
                                            <div className={it.leftItem} onClick={() => {
                                                onChange({
                                                    ...todo,
                                                    isCompleted: !todo.isCompleted,
                                                })
                                            }}  >
                                                <div className={`${it.check_Btn} ${todo.isCompleted && it.checked_Btn}`}  >
                                                    <FontAwesomeIcon className={it.check_Icon} icon={faCheck}
                                                        {...provided.draggableProps}
                                                    />
                                                </div>
                                                <div className={`${it.status} ${todo.isCompleted && it.completed}`} >
                                                    {todo.text}
                                                </div>
                                                <div className={it.data} >
                                                    {todo.currentTime}
                                                </div>
                                            </div>
                                            <div className={it.removeBut} onClick={() => {
                                                Removed(todo.id)
                                            }
                                            }>
                                                <p className={it.remove} >x</p>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>

                            </div>
                        )
                    })}
                    {provided.placeholder}
                </div>
            )}

        </Droppable>
    )
}
export default Listitem

