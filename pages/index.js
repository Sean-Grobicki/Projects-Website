import 'react-slideshow-image/dist/styles.css'
import Head from 'next/head'
import Image from 'next/image'
import global from '../styles/global.module.css'
import {Slide} from 'react-slideshow-image';

export default function Home() {

  const slideImages = [
    '../images/projectsImage.jpg',
    'images/educationImage.jpg',
    'images/cvImage.jpg'
  ] ;

  return (
    <div className={global.container}>
      <Head>
        <meta charSet = "utf-8"/>
	      <title> Sean Grobicki's Portfolio</title> 
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={global.h1}>Sean Grobicki Portfolio</h1>
      <nav className = {global.navBar}> 
        <a href = "index" className={global.active + ' '+ global.navBarLink}>Home</a>
        <a href = "projects" className={global.navBarLink}>Projects</a>
        <a href = "education" className={global.navBarLink}>Education</a>
        <a href = "cv" className={global.navBarLink}>CV</a>
      </nav>
      <Slide easing="ease">
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
              <span>Slide 1</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
              <span>Slide 2</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
              <span>Slide 3</span>
            </div>
          </div>
        </Slide>
    </div>
  )
}
