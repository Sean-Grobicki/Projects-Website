import 'react-slideshow-image/dist/styles.css'
import Head from 'next/head'
import Image from 'next/image'
import global from '../styles/global.module.css'
import styles from '../styles/home.module.css'
import {Slide} from 'react-slideshow-image';

export default function Home() {

  const slideImages = [
    '/images/projectsImage.jpg',
    '/images/educationImage.jpg',
    '/images/cvImage.jpg'
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
        <a href = "" className={global.active + ' '+ global.navBarLink}>Home</a>
        <a href = "projects" className={global.navBarLink}>Projects</a>
        <a href = "education" className={global.navBarLink}>Education</a>
        <a href = "cv" className={global.navBarLink}>CV</a>
      </nav>
      <h2 className={global.h2}>My Portfolio</h2>
      <div className={styles.viewerDiv}>
        <Slide easing="ease">
            <div className={styles.eachSlide}>
              <a href="projects">
              <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
                <span>Projects</span>
              </div>
              </a>
            </div>
            <div className={styles.eachSlide}>
              <a href={"education"}>
              <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
                <span>Education</span>
              </div>
              </a>
            </div>
            <div className={styles.eachSlide}>
              <a href="cv">
              <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
                <span>CV</span>
              </div>
              </a>
            </div>
          </Slide>
        </div>
        <article className ={styles.about}>
                <h3 className={styles.h3}>About Me</h3>
                <p>Full Name: Sean Grobicki </p>
                <p>DOB: 18/02/2000 </p>
                <p>Nationality: British </p>
                <p>Place of Study: <a href = "https://www2.mmu.ac.uk/" title="Home Page of Manchester Metropolitan University" >Manchester Metropolitan University</a> </p>
                <p>Email: seangrobicki@gmail.com</p>
                <p> Tel: 07477823223 (mobile) </p>
                <p> My name is Sean and I'm a 20 year old who lives in Burnage, Manchester. Hobbies that i enjoy include playing video games and playing or watching football. I really enjoy problem solving and is one of the main reasons I enjoy studying this course so much. The feeling you get when a problem is solved and looking back at a project that’s took weeks or months to develop and see the final product is very satisfying and motivates me to develop my skills and study harder. Programming languages that I've studied include C#, Java, C++, Javascript and PHP.</p>
        </article>

        <footer>
          <h3>Contact Me</h3>
          <p>
            Email: seangrobicki@gmail.com
            Phone: 07477823223
          </p>  
        </footer>
    </div>
  )
}
