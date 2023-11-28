import React from 'react'

function Item({text, deleteTask}) {
  return (
    <article className="todo-item">
        <input type="checkbox" name="done" className="done" />
        <h3>{text}</h3>
        <button className='deletebutton' onClick={deleteTask}>Delete task</button>
    </article>
  )
}

export default Item