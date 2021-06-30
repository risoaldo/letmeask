import { useState } from 'react';
import { useRoom } from '../../hooks/useRoom';
import { useHistory, useParams } from 'react-router-dom';


import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';

import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';

import './styles.scss';
import { database } from '../../services/firebase';




type RoomParams = {
  id: string;
}
export function AdminRoom() {

  //const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const { questions, title } = useRoom(params.id, newQuestion);

  async function handleEndRoom() {
    await database.ref(`rooms/${params.id}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Quer mesmo remover essa pergunta?')) {
      await database.ref(`rooms/${params.id}/questions/${questionId}`).remove()
    }
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
      isHighlighted: true
    });

  }

  async function handleAnswerQuestion(questionId: string) {
    await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
      isAnswered: true
    });

  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo letmeAsk" />
          <div>
            <RoomCode code={params.id} />
            <Button
              isOutlined
              onClick={handleEndRoom}
            >
              Encerrar Sala
            </Button>
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
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                  className="drop"
                >
                  <img src={deleteImg} alt="deletar" />
                </button>

                {
                  !question.isAnswered &&
                  <>

                    <button
                      type="button"
                      onClick={() => handleAnswerQuestion(question.id)}
                      className="higlight"
                    >
                      <img src={checkImg} alt="destacar pergunta" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                      className="answered"
                    >
                      <img src={answerImg} alt="marcar como respondida" />
                    </button>
                  </>
                }

              </Question>
            )
          })}
        </div>

      </main>
    </div>
  )
}