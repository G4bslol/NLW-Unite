let participantes = [
  {
    nome: "Gabriel",
    email: "gabs123lucas@gmail.com",
    dataInsc: new Date(2024, 2, 22, 19, 20),
    dataCheck: null
  },
  {
    nome: "Roberto",
    email: "roberto@email.com",
    dataInsc: new Date(2022, 8, 21, 18, 33),
    dataCheck: new Date(2024, 3, 2, 12, 11)
  },
  {
    nome: "Maria",
    email: "maria@email.com",
    dataInsc: new Date(2023, 11, 15, 10, 5),
    dataCheck: new Date(2024, 2, 12, 8, 30)
  },
  {
    nome: "João",
    email: "joao@email.com",
    dataInsc: new Date(2024, 0, 9, 14, 27),
    dataCheck: new Date(2024, 4, 5, 17, 45)
  },
  {
    nome: "Ana",
    email: "ana@email.com",
    dataInsc: new Date(2024, 1, 18, 20, 10),
    dataCheck: new Date(2024, 6, 1, 11, 20)
  },
  {
    nome: "Carlos",
    email: "carlos@email.com",
    dataInsc: new Date(2023, 6, 3, 9, 45),
    dataCheck: null
  },
  {
    nome: "Mariana",
    email: "mariana@email.com",
    dataInsc: new Date(2024, 3, 1, 17, 30),
    dataCheck: new Date(2024, 7, 8, 9, 15)
  },
  {
    nome: "Pedro",
    email: "pedro@email.com",
    dataInsc: new Date(2023, 9, 20, 22, 0),
    dataCheck: new Date(2024, 1, 10, 13, 40)
  },
  {
    nome: "Camila",
    email: "camila@email.com",
    dataInsc: new Date(2024, 4, 5, 8, 15),
    dataCheck: new Date(2024, 8, 17, 10, 25)
  },
  {
    nome: "Lucas",
    email: "lucas@email.com",
    dataInsc: new Date(2022, 11, 10, 12, 50),
    dataCheck: new Date(2024, 6, 22, 15, 0)
  }
];

const NewPart = (Part) => {
  const dataInsc = dayjs(Date.now()).to(Part.dataInsc)
  let dataCheck = dayjs(Date.now()).to(Part.dataCheck)

  if(Part.dataCheck == null){
    dataCheck = `
      <button
        data-email="${Part.email}"
        onclick="mkCheckIn(event)"
      >
        Confirmar Check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${Part.nome}
      </strong>
      <br>
      <small>
        ${Part.email}
      </small>
      </td>
      <td>${dataInsc}</td>
    <td>${dataCheck}</td>
  </tr>
  `
}

const AttList = (participantes) => {
  
  let output = ""

  for(let Part of participantes) {
    output = output + NewPart(Part)
  
  }  
  
  document
  .querySelector('tbody')
  .innerHTML = output
}

AttList(participantes)

const addPart = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const Part = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInsc: new Date(),
    dataCheck: null
  }

  const partExist = participantes.find(
    (p) => p.email == Part.email
  )

  if(partExist) {
    alert('Email já cadastrado')
    return
  }

  participantes = [participante, ...participantes]
  AttList(participantes)

  event.targe.querySelector('[name="nome"]').value = ""
  event.targe.querySelector('[email="email"]').value = ""
}

const mkCheckIn = (event) => {

  const confirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(confirmacao) == false) {
    return 
  }

  const participante = participantes.find((p) => p.email == event.target.dataset.email)

  participante.dataCheck = new Date()

  AttList(participantes)
}