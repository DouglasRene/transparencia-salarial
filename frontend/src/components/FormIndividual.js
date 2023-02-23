import styles from './FormIndividual.module.css'
import { useState, useEffect, useRef } from 'react'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { Impressao } from './PagePdf'
import { Link } from 'react-router-dom'
import { search } from '../hooks/useSearch'
import registraConsulta from '../hooks/insertUser'
import logo from '../assets/logo.jpg'

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Form = () => {
  const [dados, setDados] = useState(null)
  const [filter, setFilter] = useState(null)
  const [select, setSelect] = useState('')
  const [visible, setVisible] = useState(false)
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [dataNasc, setDataNasc] = useState('')
  const [ano, setAno] = useState(null)
  const [mes, setMes] = useState(null)
  const [colaborador, setColaborador] = useState(null)
  const [message] = useState({ anoErr: null, mesErr: null, dataErr: null, nomeErr: null, cpfErr: null})
  const [positivCPF, setPositiveCPF] = useState(true)
  const [sucess, setSucess] = useState(null)
  const inputRef = useRef()
  const cpfRef = useRef()

  const { searchChapa, searchName, validaCPF, getBase64ImageFromURL } = search()

  const meses = [{ id: "01" }, { id: "02" }, { id: "03" }, { id: "04" }, { id: "05" }, { id: "06" }, { id: "07" }, { id: "08" }, { id: "09" }, { id: "10" }, { id: "11" }, { id: "12" }]
  const anos = [{ id: "2021" }, { id: "2022" }]

  useEffect(() => {
    if (cpf.length > 1) {
      if (validaCPF(cpf)) {
        setPositiveCPF(true)
      } else {
        setPositiveCPF(false)
      }
    }
    async function setSearchDados() {
      if (filter !== null && filter !== undefined && filter !== '') {
        await searchName(filter, ano, mes).then((resp) => setDados(resp))
      }
    }
    setSearchDados()
  }, [filter, cpf])

  useEffect(() => {
    if (!message.nomeErr && !message.dataErr && !message.mesErr && !message.anoErr && select !== null && select !== undefined && select !== '') {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [message.nomeErr, message.dataErr, message.mesErr, message.anoErr, select])

  async function setSearchChapa(chapa) {
    if (chapa !== null && chapa !== undefined && chapa !== '') {
      await searchChapa(chapa, ano, mes).then((resp) => setDados(resp))
      setVisible(true)
    }
  }

  const checkCaractere = (e) => {
    if (validaCPF(cpfRef.current.value)) {
      setPositiveCPF(true)
      setCpf(cpfRef.current.value)
    } else {
      setPositiveCPF(false)
    }
    if (!mes && mes == null) {
      message.mesErr = true
    }
    if (ano === '' || ano === null || ano.length < 1) {
      message.anoErr = true
    }
    if (nome === '' || nome === null || nome.length < 1) {
      message.nomeErr = true
    }
    if (dataNasc === '' || dataNasc === null || dataNasc.length < 1) {
      message.dataErr = true
    }
    if (positivCPF || !message.mesErr || !message.anoErr || !message.nomeErr || !message.dataErr) {
      if (e.length >= 2) {
        setFilter(e)
      }
    }
  }

  const selected = (e) => {
    if (positivCPF && !message.mesErr && !message.anoErr && !message.nomeErr && !message.dataNasc) {
      setSelect(e.target.value)
      inputRef.current.value = e.target.options[e.target.selectedIndex].text
      setColaborador(e.target.value + ' - ' + e.target.options[e.target.selectedIndex].text)
      setSearchChapa(e.target.value)
    }
  }

  const registrarConsulta = {
    nome: nome,
    cpf: cpf,
    dataNasc: dataNasc,
    dataCons: new Date().toLocaleString("pt-br"),
    ano: ano,
    mes: mes,
    colaborador: colaborador
  }

  const visualizarImpressao = async () => {
    if (positivCPF && !message.mesErr && !message.anoErr && !message.nomeErr && !message.dataNasc) {
      const imgBse = await getBase64ImageFromURL(logo).then((res) => { return res })
      try {
        if (dados.length < 2) {
          const classeImpressao = new Impressao(dados, imgBse);
          const documento = classeImpressao.GerarDocumento();
          await pdfMake.createPdf(documento).open({}, window.open('', '_blank'));
          setSucess(true)
          setFilter('')
          setDados([])
          inputRef.current.value = ''
          setVisible(false)
          await registraConsulta(registrarConsulta)
          setTimeout(() => {setSucess(false)},10000)
          // document.location.reload(true);
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const maskCPF = (e) => {
    let number = e.target.value
    if (number.length === 3 || number.length === 7) {
      e.target.value = e.target.value + '.'
    } else if (number.length === 11) {
      e.target.value = e.target.value + '-'
    }
  }

  return (
    <div className={styles.form}>
      <h2>Transparência - Salário Colaboradores Individual</h2>
      <form>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name='name'
            required
            placeholder='Insira seu nome'
            onChange={(e) => {
              setNome(e.target.value)
              if (e.target.value.length > 5) {
                message.nomeErr = false
              } else {
                message.nomeErr = true
                setVisible(false)
              }
            }}
          />
          {message.nomeErr && <span className={styles.message}>Digite um nome válido</span>}
        </label>
        <label>
          <span>CPF:</span>
          <input
            // className={!positivCPF ? styles.obj : ''}
            type="text"
            name='cpf'
            ref={cpfRef}
            required
            placeholder='Insira seu CPF'
            onBlur={(e) => setCpf(e.target.value)}
            onKeyUp={(e) => maskCPF(e)}
            maxLength='14'
          />
          {!positivCPF && <span className={styles.message}>Digite um CPF válido</span>}
        </label>
        <label>
          <span>Data de nascimento:</span>
          <input
            type="date"
            name='data'
            required
            onChange={(e) => {
              setDataNasc(e.target.value)
              if (e.target.value.split('-')[0] < (new Date().getFullYear() - 16)) {
                message.dataErr = false
              } else {
                message.dataErr = true
              }
            }}
          />
          {message.dataErr && <span className={styles.message}>Digite uma data válida</span>}
        </label>
        <label>
          <span>Ano:</span>
          <select
            name="ano"
            onChange={(e) => {
              setAno(e.target.value)
              inputRef.current.value = ''
              setDados([])
              setFilter('')
              setVisible(false)
              if (e.target.value.length === 4) {
                message.anoErr = false
              } else {
                message.anoErr = true
              }
            }}>
            <option></option>
            {anos.map((ano) => (
              <option key={ano.id} value={ano.id}>{ano.id}</option>
            ))}
          </select>
          {message.anoErr && <span className={styles.message}>É preciso selecionar o ano</span>}
        </label>
        <label>
          <span>Mês:</span>
          <select name="mes"
            onChange={(e) => {
              setMes(e.target.value)
              inputRef.current.value = ''
              setFilter('')
              setDados([])
              setVisible(false)
              if (e.target.value.length === 2) {
                message.mesErr = false
              } else {
                message.mesErr = true
              }
            }}>
            <option></option>
            {meses.map((mes) => (
              <option key={mes.id} value={mes.id}>{mes.id}</option>
            ))}
          </select>
          {message.mesErr && <span className={styles.message}>É preciso selecionar o mês</span>}
        </label>
        <label>
          <span>Colaborador:</span>
          <input
            type="text"
            name="filter"
            required
            ref={inputRef}
            onChange={(e) => checkCaractere(e.target.value)} />
          <select name="serv" onClick={(e) => selected(e)}>
            {dados ? dados.map((dado) => (
              <option key={dado.CHAPA} value={dado.CHAPA} id={dado.CHAPA}>{dado.NOME}</option>
            )) : ''}
          </select>
        </label>
        {sucess && <p className={styles.sucess}>Consulta realizada com sucesso!</p>} 
      </form>
      <div className={styles.buttons}>
        <Link to='/index.html' className='btn btn-dark'>Voltar</Link>
        {visible && positivCPF ?
          <button className='btn' onClick={visualizarImpressao}>Visualizar<i className='bx bx-search-alt'></i></button>
          :
          <button className='btn' disabled>Visualizar<i className='bx bx-search-alt'></i></button>
        }
      </div>
    </div>
  )
}

export default Form