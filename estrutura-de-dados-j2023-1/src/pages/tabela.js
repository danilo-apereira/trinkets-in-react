import React from 'react';

function Tabela({ alunos, alunosAprovados }) {
    const alunosNaIntersecao = alunos.filter((aluno) => alunosAprovados.includes(aluno));

    return (
        <div>
            <h2>Tabela de Alunos na Interseção</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Nota V1</th>
                    <th>Nota VT</th>
                    <th>Nota V2</th>
                    <th>Situação</th>
                </tr>
                </thead>
                <tbody>
                {alunosNaIntersecao.map((aluno) => (
                    <tr key={aluno.ID}>
                    <td>{aluno.ID}</td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.notaV1}</td>
                    <td>{aluno.notaVT}</td>
                    <td>{aluno.notaV2}</td>
                    <td>{aluno.situacao ? 'Aprovado' : 'Reprovado'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Tabela;
