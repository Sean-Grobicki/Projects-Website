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
      <div className={global.headerDiv}>
        <h1 className={global.h1}>Sean Grobicki Portfolio</h1>
      </div>
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
                <p className={styles.aboutText}>Full Name: Sean Grobicki </p>
                <p className={styles.aboutText}>Nationality: British </p>
                <p className={styles.aboutText}>Place of Study: <a href = "https://www2.mmu.ac.uk/" title="Home Page of Manchester Metropolitan University" >Manchester Metropolitan University</a> </p>
                <p className={styles.aboutText}>Email: seangrobicki@gmail.com</p>
                <p className={styles.aboutText}>Mobile: 07477823223 </p>
                <p> My name is Sean and I am a graduate Computer Science student from Manchester Metropolitan University. I am very enthusiastic  about  programming  and  enjoy thinking logically, working  through problems, and finding effective solutions. I consider myself to have excellent technical abilities for this stage of my career in languages such as C#, Java, and JavaScript. During my studies I’ve advanced my project development skills using techniques like Agile SCRUM and Kanban. I also have experience using version control software like GitHub and have worked on projects using technologies such as React, Android Studio and Express. I am looking for a career opportunity as a software developer in a forward thinking, industry leading organisation.  I would  like  to  have  a  high  level  of  responsibility  whilst  also  working  in  a  team environment on a variety of projects in different programming languages. </p>
        </article>

        <footer className={global.footer}>
          <h3 className={global.footerTitle}>Contact Me</h3>
            <p className={global.footerEmail}>Email: seangrobicki@gmail.com </p>
            <p className={global.footerMobile}>Mobile: 07477823223 </p>
        </footer>
    </div>
  )
}