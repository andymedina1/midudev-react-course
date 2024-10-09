import { Link } from '../Link'

const i18n = {
  es: {
    title: 'Sobre nosotros',
    button: 'Ir a la Home',
    description:
      '¡Hola! Me llamo midudev y estoy creando un clon de React Router!'
  },
  en: {
    title: 'About us',
    button: 'Go to Home',
    description:
      "Hi! My name is midudev and I'm creating a clone of React Router!"
  }
}

const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}

export default function AboutPage ({ routerParams }) {
  const i18n = useI18n(routerParams?.lang ?? 'es')

  return (
    <>
      <h1>{i18n.title}</h1>
      <div>
        <img
          src='https://pbs.twimg.com/profile_images/1824773087323111424/-S3LUmjQ_400x400.jpg'
          alt='Foto de midudev'
        />
        <p>{i18n.description}</p>
      </div>
      <Link to='/'>{i18n.button}</Link>
    </>
  )
}
