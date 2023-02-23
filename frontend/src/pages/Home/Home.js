import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import logo from '../../assets/logo.jpg'

const Home = () => {
  return (

    <div className={styles.home}>
      <h1>Transparencia Colaboradores Candido Ferreira</h1>
      <Link to='/salarioColaboradorIndividual' className={styles.opcao}>
        <h3>Salário Colaboradores Individual</h3>
        <p>
        <i className='bx bxs-file-doc'></i>
        </p>
      </Link>
      <img src={logo} className={styles.logo} />
    </div>
  )
}

export default Home