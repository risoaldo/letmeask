import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../App';

import { Button } from '../../components/Button';

import backgroundImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import logoGoogleImg from '../../assets/images/google-icon.svg';

import './styles.scss';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useContext(AuthContext);

  async function handleCreateRoom(){
    if(!user){
      await signInWithGoogle();
    }
    history.push('/rooms/new');
  }
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

          <button onClick={handleCreateRoom} className="create-room">
            <img src={logoGoogleImg} alt="logo do google" />
            Crie sua sala com o Google
          </button>
          <div id="separator">Ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}