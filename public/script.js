
        let alunoEmEdicao = null;

        async function getAlunos() {
            const response = await fetch('http://localhost:3000/alunos');
            return response.json();
        }

        async function getCursos() {
            const response = await fetch('http://localhost:3000/cursos');
            return response.json();
        }

        async function carregarCursos() {
            const cursos = await getCursos();
            const selectCurso = document.getElementById('idCurso');

            selectCurso.innerHTML = '';

            const opcaoInicial = document.createElement('option');
            opcaoInicial.value = '';
            opcaoInicial.textContent = 'Seleciona um curso';
            selectCurso.appendChild(opcaoInicial);

            cursos.forEach(curso => {
                const option = document.createElement('option');
                option.value = curso.id;
                option.textContent = curso.nomeDoCurso;
                selectCurso.appendChild(option);
            });
        }

        async function addAluno() {
            const alunos = await getAlunos();
            const idsNumericos = alunos
                .map(aluno => Number(aluno.id))
                .filter(id => Number.isInteger(id));
            const proximoId = idsNumericos.length > 0 ? Math.max(...idsNumericos) + 1 : 1;

            const aluno = {
                id: proximoId,
                nome: document.getElementById('nome').value,
                apelido: document.getElementById('apelido').value,
                idCurso: Number(document.getElementById('idCurso').value),
                anoCurricular: Number(document.getElementById('anoCurricular').value)
            };

            await fetch('http://localhost:3000/alunos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aluno)
            });

            document.getElementById('formCriar').reset();
            mostraAlunos();
        }

        async function updateAluno(id) {
            const aluno = {
                nome: document.getElementById('nome').value,
                apelido: document.getElementById('apelido').value,
                idCurso: Number(document.getElementById('idCurso').value),
                anoCurricular: Number(document.getElementById('anoCurricular').value)
            };

            await fetch(`http://localhost:3000/alunos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aluno)
            });

            alunoEmEdicao = null;
            document.getElementById('formCriar').reset();
            document.getElementById('btcriar').textContent = 'Criar Aluno';
            document.getElementById('btCancelarEdicao').style.display = 'none';

            mostraAlunos();
        }

        async function deleteAluno(id) {
            await fetch(`http://localhost:3000/alunos/${id}`, {
                method: 'DELETE'
            });
            mostraAlunos();
        }

        function editarAluno(aluno) {
            alunoEmEdicao = aluno.id;

            document.getElementById('nome').value = aluno.nome;
            document.getElementById('apelido').value = aluno.apelido;
            document.getElementById('idCurso').value = aluno.idCurso;
            document.getElementById('anoCurricular').value = aluno.anoCurricular;

            document.getElementById('btcriar').textContent = 'Atualizar Aluno';
            document.getElementById('btCancelarEdicao').style.display = 'inline';

        }

        function cancelarEdicao() {
            alunoEmEdicao = null;
            document.getElementById('formCriar').reset();
            document.getElementById('btcriar').textContent = 'Criar Aluno';
            document.getElementById('btCancelarEdicao').style.display = 'none';
        }

        async function mostraAlunos() {
            const alunos = await getAlunos();
            const cursos = await getCursos();

            const divAlunos = document.getElementById('alunos');
            divAlunos.innerHTML = '';

            alunos.forEach(aluno => {
                const trAluno = document.createElement('tr');

                const tdNome = document.createElement('td');
                tdNome.textContent = aluno.nome;

                const tdApelido = document.createElement('td');
                tdApelido.textContent = aluno.apelido;

                const tdCurso = document.createElement('td');
                const curso = cursos.find(c => String(c.id) === String(aluno.idCurso));
                tdCurso.textContent = curso ? curso.nomeDoCurso : 'Curso desconhecido';

                const tdAno = document.createElement('td');
                tdAno.textContent = aluno.anoCurricular;

                const tdAcoes = document.createElement('td');

                const btnEditar = document.createElement('button');
                btnEditar.textContent = 'Editar';
                btnEditar.addEventListener('click', () => editarAluno(aluno));

                const btnDelete = document.createElement('button');
                btnDelete.textContent = 'Apagar';
                btnDelete.addEventListener('click', () => deleteAluno(aluno.id));

                tdAcoes.appendChild(btnEditar);
                tdAcoes.appendChild(btnDelete);

                trAluno.appendChild(tdNome);
                trAluno.appendChild(tdApelido);
                trAluno.appendChild(tdCurso);
                trAluno.appendChild(tdAno);
                trAluno.appendChild(tdAcoes);

                divAlunos.appendChild(trAluno);
            });
        }

        document.getElementById('btcriar').addEventListener('click', () => {
            if (alunoEmEdicao === null) {
                addAluno();
            } else {
                updateAluno(alunoEmEdicao);
            }
        });

        document.getElementById('btCancelarEdicao').addEventListener('click', cancelarEdicao);

        carregarCursos();
        mostraAlunos();