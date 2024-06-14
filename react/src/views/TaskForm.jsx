import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function TaskForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [task, setTask] = useState({
    id: null,
    theme: '',
    task: '',
    level: '',
    flag: ''
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/tasks/${id}`)
        .then(({data}) => {
          setLoading(false)
          setTask(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (task.id) {
      axiosClient.put(`/tasks/${task.id}`, task)
        .then(() => {
          setNotification('Задание было успешно изменено')
          navigate('/dashboard/tasks')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/tasks', task)
        .then(() => {
          setNotification('Задание было успешно добавлено')
          navigate('/dashboard/tasks')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {task.id && <h1>Изменить задание: {task.theme}</h1>}
      {!task.id && <h1>Добавить новое задание</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Загрузка...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
					<input value={task.theme} onChange={(ev) => setTask({ ...task, theme: ev.target.value })} placeholder="Тема задания"/>
					<input value={task.task} onChange={(ev) => setTask({ ...task, task: ev.target.value })} placeholder="Само задание"/>
					<input value={task.level} onChange={(ev) => setTask({ ...task, level: ev.target.value })} placeholder="Сложность задания"/>
					<input value={task.flag} onChange={(ev) => setTask({ ...task, flag: ev.target.value })} placeholder="Ответ на задание"/>
					<button className="btn btn-save">Готово</button>
				</form>
        )}
      </div>
    </>
  )
}
