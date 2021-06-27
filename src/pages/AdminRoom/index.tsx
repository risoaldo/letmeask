import { useState } from 'react';
import { useRoom } from '../../hooks/useRoom';
import { useParams } from 'react-router-dom';


import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';

import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';

import './styles.scss';
import { database } from '../../services/firebase';




type RoomParams = {
  id: string;
}
export function AdminRoom() {

  //const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const { questions, title } = useRoom(params.id, newQuestion);

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Quer mesmo remover essa pergunta?')) {
      const questionRef = await database.ref(`rooms/${params.id}/questions/${questionId}`).remove()
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo letmeAsk" />
          <div>
            <RoomCode code={params.id} />
            <Button isOutlined >Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-tittle">
          <h1> {title} </h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="deletar" />
                </button>
              </Question>
            )
          })}
        </div>

      </main>
    </div>
  )
}