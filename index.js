let participantes = [
  {
    nome: "Tiago Pinheiro",
    email: "tiagopinheiro@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 00)
  },
  {
    nome: "Rogério Brito",
    email: "rogeriobrito@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 14, 50),
    dataCheckIn: null
  },
  {
    nome: "Maria Silva",
    email: "mariasilva@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 10, 30),
    dataCheckIn: new Date(2024, 3, 2, 9, 15)
  },
  {
    nome: "José Santos",
    email: "josesantos@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 8, 45),
    dataCheckIn: new Date(2024, 2, 27, 12, 30)
  },
  {
    nome: "Ana Souza",
    email: "anasouza@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 17, 20),
    dataCheckIn: new Date(2024, 2, 30, 10, 45)
  },
  {
    nome: "Carlos Oliveira",
    email: "carlosoliveira@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 9, 15),
    dataCheckIn: null
  },
  {
    nome: "Patrícia Costa",
    email: "patriciacosta@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 14, 40),
    dataCheckIn: new Date(2024, 3, 2, 19, 20)
  },
  {
    nome: "Fernando Mendes",
    email: "fernandomendes@gmail.com",
    dataInscricao: new Date(2024, 2, 29, 11, 55),
    dataCheckIn: new Date(2024, 3, 1, 9, 35)
  },
  {
    nome: "Aline Costa",
    email: "alinecosta@gmail.com",
    dataInscricao: new Date(2024, 2, 30, 16, 30),
    dataCheckIn: null
  },
  {
    nome: "Lucas Pereira",
    email: "lucaspereira@gmail.com",
    dataInscricao: new Date(2024, 3, 2, 13, 20),
    dataCheckIn: new Date(2024, 3, 2, 20, 45)
  }
]

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email = "${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button
    `
  }

  return `
    <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  document.querySelector('tbody').innerHTML = output
}

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
    )

  if (participanteExiste) {
    alert('E-mail já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""

}

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  
  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  
  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}

atualizarLista(participantes)