import Head from 'next/head'
import Image from 'next/image'

import global from '../styles/global.module.css'
import styles from '../styles/projects.module.css'
import {useState,useEffect} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Projects() 
{
    const [projects, setProjects] = useState([]);
    const [type,setType] = useState("All");
    const [language,setLanguage] = useState("All");
    const [loaded,setLoaded] = useState(false);
    
    const typeText = ["All", "Education", "Personal"];
    const languagesText = ["All","C#", "Java", "JavaScript", "Other"];
    const defaultType = typeText[0];
    const defaultLanguage = languagesText[0];

    useEffect( ()=>{
      updateProjects(type,language);
      },[])
    
    const updateType = (value) =>
    {
      setType(value);
      updateProjects(value,language);
    }

    const updateLanguage = (value) =>
    {
      setLanguage(value);
      updateProjects(type,value);
    } 

    const updateProjects = async (typ,lan) =>
    {
      setLoaded(false);
      var route = '/api/projects';
      var seperator = "?";
      if(typ !== "All")
      {
        route += seperator+"type="+typ;
        seperator = "&";
      }
      if(lan !== "All")
      {
        route += seperator+"language="+lan;
      }
      console.log(route);
      const response = await fetcher(route);
      setProjects(response);
      setLoaded(true);
    }
    if(!loaded)
    {
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
          <a href = "../" className={ global.navBarLink}>Home</a>
          <a href = "projects" className={global.active + ' '+global.navBarLink}>Projects</a>
          <a href = "education" className={global.navBarLink}>Education</a>
          <a href = "cv" className={global.navBarLink}>CV</a>
        </nav>
        <h2 className={global.h2}> My Projects </h2>
        <div className={styles.filterDiv}>
          <h3 className={styles.filterTitle}>Filter Projects</h3>
          <div>
            <h4 className={styles.filterText}>Type</h4> <Dropdown options={typeText} value={defaultType} onChange={(eve) => updateType(eve.value)} className={styles.typeDropdown} />
          </div>
          <div>
            <h4 className={styles.filterText}>Language</h4> <Dropdown options={languagesText} value={defaultLanguage} onChange={(eve) => updateLanguage(eve.value)} className={styles.eduDropdown}/>
          </div>
        </div>
        <div className={styles.projectsBody}>
          <h2 className={styles.loadingTitle}>Loading Projects...</h2>
        </div>
        <footer className={global.footer}>
            <h3 className={global.footerTitle}>Contact Me</h3>
              <p className={global.footerEmail}>Email: seangrobicki@gmail.com </p>
              <p className={global.footerMobile}>Mobile: 07477823223 </p>
          </footer>
      </div>
      )
    }

    if(projects.length === 0)
    {
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
          <a href = "../" className={ global.navBarLink}>Home</a>
          <a href = "projects" className={global.active + ' '+global.navBarLink}>Projects</a>
          <a href = "education" className={global.navBarLink}>Education</a>
          <a href = "cv" className={global.navBarLink}>CV</a>
        </nav>
        <h2 className={global.h2}> My Projects </h2>
        <div className={styles.filterDiv}>
          <h3 className={styles.filterTitle}>Filter Projects</h3>
          <div>
            <h4 className={styles.filterText}>Type</h4> <Dropdown options={typeText} value={defaultType} onChange={(eve) => updateType(eve.value)} className={styles.typeDropdown} />
          </div>
          <div>
            <h4 className={styles.filterText}>Language</h4> <Dropdown options={languagesText} value={defaultLanguage} onChange={(eve) => updateLanguage(eve.value)} className={styles.eduDropdown}/>
          </div>
        </div>
        <div className={styles.projectsBody}>
          <h2 className={styles.loadingTitle}>No Projects Matching that Criteria</h2>
        </div>
        <footer className={global.footer}>
            <h3 className={global.footerTitle}>Contact Me</h3>
              <p className={global.footerEmail}>Email: seangrobicki@gmail.com </p>
              <p className={global.footerMobile}>Mobile: 07477823223 </p>
          </footer>
      </div>
      )
    }

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
        <a href = "../" className={ global.navBarLink}>Home</a>
        <a href = "projects" className={global.active + ' '+global.navBarLink}>Projects</a>
        <a href = "education" className={global.navBarLink}>Education</a>
        <a href = "cv" className={global.navBarLink}>CV</a>
      </nav>
      <h2 className={global.h2}> My Projects </h2>
      <div className={styles.filterDiv}>
        <h3 className={styles.filterTitle}>Filter Projects</h3>
        <div>
          <h4 className={styles.filterText}>Type</h4> <Dropdown options={typeText} value={defaultType} onChange={(eve) => updateType(eve.value)} className={styles.typeDropdown} />
        </div>
        <div>
          <h4 className={styles.filterText}>Language</h4> <Dropdown options={languagesText} value={defaultLanguage} onChange={(eve) => updateLanguage(eve.value)} className={styles.eduDropdown}/>
        </div>
      </div>
      <div className={styles.projectsBody}>
        {projects.map((pr) => <Project project={pr}/>)}
      </div>
      <footer className={global.footer}>
          <h3 className={global.footerTitle}>Contact Me</h3>
            <p className={global.footerEmail}>Email: seangrobicki@gmail.com </p>
            <p className={global.footerMobile}>Mobile: 07477823223 </p>
        </footer>
    </div>
  )
}

function Project(props)
{
   return(
   <div className={styles.projectDiv}> 
     <h3> {props.project.title}</h3>
     <p className={styles.projectText}>Type: {props.project.type}</p>
     <p className={styles.projectText}>Language: {props.project.language}</p> 
     <p className={styles.projectText}>Description: {props.project.description}</p>
     {props.project.links.map((link) => <Link link={link}/>)}
   </div>);
}

function Link(props)
{
  var imageLink =  "";
  if(props.link.type === "YouTube")
  {
    imageLink = '/images/youtube.png';
  }
  else if(props.link.type === "GitHub")
  {
    imageLink = '/images/github.png';
  }
  else
  {
    imageLink = '/images/cloud.png';
  }
  return (
    <div className={styles.linkDiv}>
      <a className={styles.linkText} href={props.link.url}> <Image className={styles.logo} src={imageLink} width={'30px'} height={'30px'}/>{props.link.name} </a>
    </div>
  )
}