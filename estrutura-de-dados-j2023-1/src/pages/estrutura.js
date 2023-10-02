import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import Tabela from './tabela';

function Estrutura() {
    const [alunos, setAlunos] = useState([]);
    const [novoAluno, setNovoAluno] = useState({ ID: -1, nome: '', notaV1: 0, notaVT: 0, notaV2: 0, presenca: [false, false, false, false, false, false], situacao: false });
    const [editando, setEditando] = useState(-1);
    const [nextId, setNextId] = useState(1);
    const [mostrarListaJSON, setMostrarListaJSON] = useState(false);

    const alunoInputRef = useRef(null);
    const alunosAprovados = alunos.filter((aluno) => aluno.situacao);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name.startsWith("notaV") && parseFloat(value) < 0) {
            newValue = "0";
        }

        if (name.startsWith("notaV") && parseFloat(value) > 10) {
            newValue = "10";
        }

        setNovoAluno({
            ...novoAluno,
            [name]: newValue
        });
    };

    const handleAddAluno = () => {
        if (novoAluno.nome === '') {
            alert('Você deve informar o nome do novo aluno.');
            return;
        }

        const media = calcularMedia(novoAluno);
        alert(media);
        const faltas = novoAluno.presenca.filter((presenca) => !presenca).length;
        const situacao = media >= 6 && faltas < 4;
    
        if (editando === -1) {
            const newAluno = { ...novoAluno, ID: nextId, situacao };
            setAlunos([...alunos, newAluno]);
            setNextId(nextId + 1);
        } else {
            const alunosAtualizados = [...alunos];
            alunosAtualizados[editando] = { ...novoAluno, situacao };
            setAlunos(alunosAtualizados);
            setEditando(-1);
        }
    
        setNovoAluno({ ID: -1, nome: '', notaV1: 0, notaVT: 0, notaV2: 0, presenca: [false, false, false, false, false, false], situacao: false });
    };
    

    const handleEditAluno = (index) => {
        setNovoAluno({ ...alunos[index] });
        setEditando(index);
        window.scrollTo(0, 0);
        alunoInputRef.current.focus();
    };

    const handleCancelEdit = () => {
        setNovoAluno({ ID: -1, nome: '', notaV1: 0, notaVT: 0, notaV2: 0, presenca: [false, false, false, false, false, false], situacao: false });
        setEditando(-1);
    };

    const handleDeleteAluno = (index) => {
        const alunosAtualizados = [...alunos];
        alunosAtualizados.splice(index, 1);
        setAlunos(alunosAtualizados);
    };

    const calcularMedia = (aluno) => {
        const { notaV1, notaVT, notaV2 } = aluno;
        return (parseFloat(notaV1) + parseFloat(notaVT) + parseFloat(notaV2)) / 3;
    };

    const toggleListaJSON = () => {
        setMostrarListaJSON(!mostrarListaJSON);
    };

    return (
        <div>
            <center>
                <Link to="/"><button>Voltar</button></Link>

                <h1>Estrutura de Dados & Lógica Booleana</h1>

                <form onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleAddAluno();
                    }
                }}>

                    <label>
                        Nome do Aluno: <br />
                        <input type="text" name="nome" value={novoAluno.nome} onChange={handleChange} ref={alunoInputRef} />
                    </label>
                    <br />
                    <label>
                        V1:
                        <br />
                        <input type="number" name="notaV1" value={novoAluno.notaV1} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        VT:
                        <br />
                        <input type="number" name="notaVT" value={novoAluno.notaVT} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        V2:
                        <br />
                        <input type="number" name="notaV2" value={novoAluno.notaV2} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Presença:
                        <br />
                        {novoAluno.presenca.map((presenca, index) => (
                            <input
                                type="checkbox"
                                key={index}
                                checked={presenca}
                                onChange={(e) => {
                                    const newPresenca = [...novoAluno.presenca];
                                    newPresenca[index] = e.target.checked;
                                    setNovoAluno({ ...novoAluno, presenca: newPresenca });
                                }}
                            />
                        ))}
                    </label>
                    <br />
                    <button type="button" onClick={handleAddAluno}>
                        {editando === -1 ? 'Adicionar Aluno' : 'Salvar Edição'}
                    </button>
                    {editando !== -1 && (
                        <button type="button" onClick={handleCancelEdit}>
                            Cancelar Edição
                        </button>
                    )}
                </form>

                <ul>
                    {alunos.map((aluno, index) => (
                        <div style={{ marginLeft: '-50px' }} key={aluno.ID}>
                            <strong>
                                <span>(ID: {aluno.ID}) {aluno.nome}
                                    <div style={{ color: aluno.situacao ? '#009933' : '#CC0000' }}>
                                        {aluno.situacao ? 'Aprovado' : 'Reprovado'}
                                    </div>
                                </span>
                            </strong>
                            <span>V2: {aluno.notaV1}</span> <br />
                            <span>VT: {aluno.notaVT}</span> <br />
                            <span>V2: {aluno.notaV2}</span> <br />
                            <span>Faltas: {aluno.presenca.filter((presenca) => !presenca).length}</span> <br />
                            <button onClick={() => handleEditAluno(index)}>Editar</button>
                            <button onClick={() => handleDeleteAluno(index)}>Excluir</button>
                        </div>
                    ))}
                </ul>

                <Tabela alunos={alunos} alunosAprovados={alunosAprovados} />

                <button type="button" onClick={toggleListaJSON}>
                    {mostrarListaJSON ? 'Ocultar Lista JSON' : 'Mostrar Lista JSON'}
                </button>

                {mostrarListaJSON && (
                    <div>
                        <h2>Lista JSON:</h2>
                        <pre>{JSON.stringify(alunos, null, 2)}</pre>
                    </div>
                )}
            </center>
        </div>
    );
}

export default Estrutura;
