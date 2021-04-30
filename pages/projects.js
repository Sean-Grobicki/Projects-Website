import Head from 'next/head'
import global from '../styles/global.module.css'
import {useState} from 'react';

export default function Projects() {

  return (
    <div className={global.container}>
      <Head>
        <meta charSet = "utf-8"/>
	      <title> Sean Grobicki's Portfolio</title> 
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={global.h1}>Sean Grobicki Portfolio</h1>
      <nav className = {global.navBar}> 
        <a href = "../" className={ global.navBarLink}>Home</a>
        <a href = "projects" className={global.active + ' '+global.navBarLink}>Projects</a>
        <a href = "education" className={global.navBarLink}>Education</a>
        <a href = "cv" className={global.navBarLink}>CV</a>
      </nav>
      <h2 className={global.h2}> My Projects </h2>
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