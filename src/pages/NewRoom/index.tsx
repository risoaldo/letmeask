import backgroundImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';

import './styles.scss';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../App';


export function NewRoom() {

  const { user } = useContext(AuthContext);

  return (
    <div id="page-auth">
      <aside>
        <img src={backgroundImg} alt="letmeAsks" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real.</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeAsks" />
          <h2>Criar uma nova sala!</h2>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}