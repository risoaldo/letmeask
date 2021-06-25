import { useParams } from 'react-router-dom';
import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';

import logoImg from '../../assets/images/logo.svg';

import './styles.scss';

type RoomParams = {
  id: string;
}
export function Room() {

  const params = useParams<RoomParams>();
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo letmeAsk" />
          <div>
            <RoomCode code={params.id} />
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-tittle">
          <h1>Sala React</h1>
          <span>5 perguntas</span>
        </div>

        <form>
          <textarea
            placeholder="Me pergunte algo!"
          />

          <div className="form-footer">
            <p>Para enviar uma pergunta, <button>Faça login</button>.</p>
            <Button type="submit" >Enviar Pergunta</Button>
          </div>
        </form>

      </main>
    </div>
  )
}