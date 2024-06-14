import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function TaskSolution() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [task, setTask] = useState({
    id: null,
    theme: '',
    task: '',
    level: '',
    flag: '',
  });
  const [answer, setAnswer] = useState('');
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setNotification } = useStateContext();

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/gymTasks/${id}`)
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
    ev.preventDefault();
    axiosClient.post(`/gymTasks/${id}/solution`, { answer })
      .then(({ data }) => {
        if (data.correct) {
          setNotification('Правильный ответ!');
          axiosClient.put('/user/updateRating', { level: task.level })
            .then(() => {
              setTimeout(() => {
                navigate('/gym');
              }, 500);
            });
        } else {
          setNotification('Неправильный ответ, попробуйте еще раз.');
        }
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="task-solution-container">
      <div className="users-header">
        <h1>Решение задачи: <span className="task-theme-solution">{task.theme}</span></h1>
      </div>
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Загрузка...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <p>{task.task}</p>
						&nbsp;
            <input
              value={answer}
              onChange={(ev) => setAnswer(ev.target.value)}
              placeholder="Введите ваш ответ"
            />
            <button type="submit" className="btn btn-save">
              Готово
            </button>
          </form>
        )}
      </div>
    </div>
  );
}