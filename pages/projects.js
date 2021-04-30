import Head from 'next/head'
import global from '../styles/global.module.css'
import {useState,useEffect} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function Projects() {
    const [type,setType] = useState("All");
    const [language,setLanguage] = useState("All");
    const types = ["All","Education","Personal"];
    const languages = ["All","C#", "Java", "JavaScript", "Other"];
    const defaultType = types[0];
    const defaultLanguage = languages[0];

    const getProjects = () =>
    {
        // Make API call to /api/projects
    }

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
      <Dropdown options={types} value={defaultType} onChange={(eve) => setType(eve.value)} />
      <Dropdown options={languages} value={defaultLanguage} onChange={(eve) => setLanguage(eve.value)}/>
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