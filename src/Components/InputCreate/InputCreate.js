import React from 'react'
import ap from './InputCreate.module.css'

export default function InputCreate({ editMode, setValue, setEditMode, value, KeyDown, Add, warning, setWarning }) {


    return (
        <div>
            {
                editMode ? <div>
                    {warning &&
                        <div className={ap.warning}>Characters must not exceed 20</div>
                    }
                    <input className={ap.input} type="text" value={value} autoFocus="autoFocus" onKeyDown={KeyDown} placeholder=" ..." onChange={(val) => {
                        val.preventDefault()
                        if (val.target.value.length < 20) {
                            setValue(val.target.value)
                            setWarning(false)
                        } else {
                            setWarning(true)
                        }

                    }} />
                    {
                        !warning &&
                        <button className={ap.add_btn} onClick={Add}>Add</button>
                    }
                </div>
                    :
                    <div className={ap.itemCheck_create}>
                        <div className={ap.itemCheck}>
                            <div className={ap.plus} onClick={() => {
                                setEditMode(true)
                            }}>
                                &times;
                            </div>
                        </div>
                            <p className={ap.creatItem} onClick={() => {
                                setEditMode(true)
                            }}>Create New Item</p>
                    </div>
            }
        </div>
    )
}
