import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <center>
                <h1>Selecione uma opção:</h1>

                <Link to="/estrutura"><button>Estrutura e Lógica</button></Link>
            </center>
        </div>
    );
}

export default Home;
