const registraConsulta = async (dados) => {
  const config ={
    method: 'POST', 
    body : JSON.stringify(dados),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
      const data = fetch(process.env.REACT_APP_REGISTRA_URL, config)
          .then((response) => {
              return response.data
          })
          .catch((err) => err)
      return data
  } catch (error) {
      console.log(error)
  }
}

export default registraConsulta