import Head from 'next/head'
import global from '../styles/global.module.css'
import styles from '../styles/education.module.css'
import {useState} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function Education() {

  const [choice,setChoice] = useState("University");

  const options = ["University Year 3", "University Year 2","University Year 1","College","School"];
  const defaultOption = options[0];
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
        <a href = "projects" className={global.navBarLink}>Projects</a>
        <a href = "education" className={global.active + ' '+global.navBarLink}>Education</a>
        <a href = "cv" className={global.navBarLink}>CV</a>
      </nav>
      <h2 className={global.h2}> Education </h2>
      <div className ={styles.filterDiv}>
        <p className={styles.filterText}>Education Level: </p><Dropdown options={options} onChange={(eve) => setChoice(eve.value)} value={defaultOption}/>
      </div>
      <EducationChoices choice={choice}/>
      <footer className={global.footer}>
          <h3 className={global.footerTitle}>Contact Me</h3>
            <p className={global.footerEmail}>Email: seangrobicki@gmail.com </p>
            <p className={global.footerMobile}>Mobile: 07477823223 </p>
        </footer>
    </div>
  )
}


function EducationChoices(props)
{
    if(props.choice === "College")
    {
        return <College />;
    }
    else if(props.choice === "School")
    {
        return <School />;
    }
    else if(props.choice === "University Year 1")
    {
        return <University1 />;
    }
    else if(props.choice === "University Year 2")
    {
        return <University2 />;
    }
    else
    {
        return <University3 />
    }
}



function University1()
{
    return(
        <div className={styles.educationDiv}>
            <h2 className={styles.educationTitle}> University Year 1 </h2>
            <div className={styles.splitDiv}>
                <article className = {styles.overviewDiv}>
                    <h3> Computer Systems Fundamentals </h3>
                    <p>For the first part of this unit it was split between learning logic circuits and the mathematics behind computing such as graphs and matrices. In the second half of this unit we learnt about Assembly language making some simple programs and learning the basics.</p>
                    <h3> Information Systems </h3>
                    <p>During this unit we undertook a project that would implement a relational database using a case study. Through this we learnt normalisation, use case diagrams and ERD’s which helped us to design the database and then used oracle to implement it and then SQL to query the system.</p>
                    <h3> Introduction to Web Design and Development </h3>
                    <p>The first half of this unit consisted of HTML, CSS and JavaScript to help us develop an interactive website with customised video controls. The second half of this unit we learnt how to use php to do data processing through websites.</p>
                    <h3> Programming </h3>
                    <p>During this unit we learnt the fundamentals of programming mainly using Java. We first used the more graphical IDE processing to see the learn the basics then moved on to using Eclipse to learn object orientated programming in more detail.</p>
                </article>
                
                <article className = {styles.tableDiv}>
                    <h3 className={styles.educationTitle}> Units </h3>
                        <table>
                            <tr>
                                <th className={styles.tableCells}>Subject</th>
                                <th className={styles.tableCells}>Grade</th>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>Computer System Fundamentals</td>
                                <td className={styles.tableCells}>92%</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>Information Systems</td>
                                <td className={styles.tableCells}>84%</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>Introduction to Web Design and Development</td>
                                <td className={styles.tableCells}>88%</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>Programming</td>
                                <td className={styles.tableCells}>95%</td>
                            </tr>
                        </table>
                </article>
            </div>
        </div>
    );
}

function University2()
{
    return (
    <div className={styles.educationDiv}> 
        <h2 className={styles.educationTitle}> University Year 2 </h2>
        <div className={styles.splitDiv}>
            <article className={styles.overviewDiv}>
                <h3> Advanced Programming </h3>
                <p>In Advanced Programming we expanded from programming last year while still using Java. One of our assignments was to create a scheduler which is shown in the projects. Another assignment was to create an android app within a day which would map the locations of train stations. </p>
                <h3> Algorithms and Data Structures </h3>
                <p>Algorithms and Data Structures consisted of implementing different data structures and algorithms using C#. We implemented Graphs, Trees and methods which would manipulate these data structures. The final assignment was to create a desktop application which was a word processing application which stored the text in a tree structure to be able to give information about each word.</p>
                <h3> Computer Networks and Operating Systems </h3>
                <p>In this unit the first half consisted of learning how to configure the different components in a network such a routers, switches, and machines. The second half of this unit was studying operating systems learning how to do bash scripting in Linux and understanding the file systems.</p>
                <h3> Professional Development </h3>
                <p>This unit’s main component was a group project where we had the brief of creating a POS system, which we did in C#, which was compatible with a barcode scanner. Another part of the unit was to attend extracurricular activities related to the computing industry which I mainly chose to attend talks on topics I was interested in such as researching the games industry.</p>
            </article>
            
            <article className ={styles.tableDiv}>
                <h3 className={styles.educationTitle}> Units </h3>
                    <table>
                        <tr>
                            <th className={styles.tableCells}>Subject</th>
                            <th className={styles.tableCells}>Grade</th>
                        </tr>
                        <tr>
                            <td className={styles.tableCells}>Advanced Programming</td>
                            <td className={styles.tableCells}>96%</td>
                        </tr>
                        <tr>
                            <td className={styles.tableCells}>Algorithms and Data Structures</td>
                            <td className={styles.tableCells}>94%</td>
                        </tr>
                        <tr>
                            <td className={styles.tableCells}>Computer Networks and Operating Systems</td>
                            <td className={styles.tableCells}>88%</td>
                        </tr>
                        <tr>
                            <td className={styles.tableCells}>Professional Development</td>
                            <td className={styles.tableCells}>95%</td>
                        </tr>
                    </table>
            </article>
        </div>
    </div>);
}

function University3()
{
    return(
    <div className={styles.educationDiv}>
        <h2 className={styles.educationTitle}>University Year 3</h2>
        <div className={styles.splitDiv}>
                <article className={styles.overviewDiv}>
                    <h3> Artificial Intelligence </h3>
                    <p>In this unit we studied the basics of MatLab to help us manipulate data and find trends in topics. An example we looked a throughout the unit was a biopsies data set to help determine if a tumor was malignant or benign. We studied k-nearest neighbours, naive bayes and decision trees to help interpret the data.</p>
                    <h3> Mobile Applications Development</h3>
                    <p>Throughout this unit we studied React-Native to help us build a mobile app which wuld interact with a backend API that was already created. We also learnt industry practices such as version control, testing and lintrs and were encouraged to use these throughout the project.</p>
                    <h3> Programming Languages Principles and Design </h3>
                    <p>During this unit, we studied the different types of programming languages and paradigms. Languages studied include Python, C, C++, Haskell and Prolog to give us an idea of the different types of languages. In the second half of the unit we studied compilers and went through the steps to create our own compiler for a simple C like language.</p>
                    <h3> Project </h3>
                    <p>My project was to design a program which would automatically generate test programming questions for students learning to program which would be able to automatically generate feedback and the answer for the user. This included creating a backend server to generate the questions and a front end for the user to interact with which were created with express and Next.js respectively. </p>
                </article>
            
                <article className={styles.tableDiv}>
                    <h3 className={styles.educationTitle}> Units </h3>
                        <table>
                            <tr>
                                <th className={styles.tableCells}>Subject</th>
                                <th className={styles.tableCells}>Grade</th>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>Artificial Intelligence</td>
                                <td className={styles.tableCells}>94%</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>Mobile Applications Development</td>
                                <td className={styles.tableCells}>79%</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>Programming Languages Principles and Design</td>
                                <td className={styles.tableCells}>80%</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>Project</td>
                                <td className={styles.tableCells}>TBD</td>
                            </tr>
                        </table>
                </article>
            </div>
    </div>);
}

function College()
{
    return (
        <div className={styles.educationDiv}>
            <h2 className={styles.educationTitle}> College </h2>
            <div className={styles.splitDiv}>
                <article className={styles.overviewDiv}>
                    <h3> Overview</h3>
                    <p>I studied for my A-Level’s at Aquinas College Stockport for a period of 2 years. The A-Level’s I chose were History, Computer Science and Maths. This was due to them being my favourite subjects at high school. I had the option to choose a fourth subject but opted against this due to not having enough interest in another subject.</p>
                    <h3> Maths </h3>
                    <p>During the first year we were preparing for AS level where we studied the core Units C1 and C2 as well as Decision maths which was heavily based on topics I had covered in Computer Science. The Second year we had the core units of C3 and C4 as well as Mechanics which was interesting as I hadn’t studied this before. In thecore units we studied subjects such as integration, differentiation and graphs </p>
                    <h3> Computer Science </h3>
                    <p>During the first year we focused on procedural programming and covered many more theory based topics such as Graphs, the fetch execute cycle and assembly language. The second year we learnt object orientated programming as well as some functional programming. We also had to make an end of year project which was for me a Connect 4 Game which can be seen in the projects section.</p>
                    <h3> History </h3>
                    <p>The history I chose was the modern history option in which the 3 main topics we covered were Tsarist and Communist Russia 1864-1964, The causes of the French Revolution 1689-1789 and Modern Britain 1952 – 2007. I found the most interesting of these was the Russia topic seeing how much a country changed in only 100 years. </p>
                </article>
            
                <article className={styles.tableDiv}>
                    <h3 className={styles.educationTitle}> Qualifications </h3>
                        <table>
                            <tr>
                                <th className={styles.tableCells}>Subject</th>
                                <th className={styles.tableCells}>Level</th>
                                <th className={styles.tableCells}>Grade</th>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>Mathematics</td>
                                <td className={styles.tableCells}>AS</td>
                                <td className={styles.tableCells}>A</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>Computer Science</td>
                                <td className={styles.tableCells}>A-Level</td>
                                <td className={styles.tableCells}>A</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>Mathematics</td>
                                <td className={styles.tableCells}>A-Level</td>
                                <td className={styles.tableCells}>A</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>History</td>
                                <td className={styles.tableCells}>A-Level</td>
                                <td className={styles.tableCells}>A</td>
                            </tr>
                        </table>
                </article>
            </div>
        </div>
    );
}

function School()
{
    return (
        <div className={styles.educationDiv}>
            <h2 className={styles.educationTitle}>High School</h2>
            <div className={styles.splitDiv}>
                <article className ={styles.overviewDiv}>
                    <h3 className={styles.educationTitle}> Overview</h3>
                    <p>I studied for my GCSE's at The Barlow RC High School in Didsbury. The mandatory subjects that we had to take were Maths, English, Science and Religion. English was split up into literature and language and you had the choice between core and additional science or choosing to do triple science which was Biology, Chemistry and Physics which was what I chose. My 3 options subjects were Business Studies, Computer Science and History. Computer Science was chosen as when we had the talk on it and tried some examples it seemed interesting. History was chosen as I am really interested in History and enjoyed reading up on it in my own time anyway. Business Studies was chosen as we had limited option blocks and that was what I thought the best of my options. My favourite subjects during this time were History, Computer Science and Maths as I enjoyed the problem-solving elements of the last two and enjoyed the different topics we learnt in History.</p>
                </article>

                <article className={styles.tableDiv}>
                        <h3 className={styles.educationTitle}> Qualifications </h3>
                        <table className={styles.table}>
                            <tr>
                                <th className={styles.tableCells}>Subject</th>
                                <th className={styles.tableCells}>Level</th>
                                <th className={styles.tableCells}>Grade</th>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>Biology</td>
                                <td className={styles.tableCells}>GCSE</td>
                                <td className={styles.tableCells}>A</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>Business Studies</td>
                                <td className={styles.tableCells}>GCSE</td>
                                <td className={styles.tableCells}>A</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>Chemistry</td>
                                <td className={styles.tableCells}>GCSE</td>
                                <td className={styles.tableCells}>A</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}> Computer Science</td>
                                <td className={styles.tableCells}>GCSE</td>
                                <td className={styles.tableCells}>A</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>English Language</td>
                                <td className={styles.tableCells}>GCSE</td>
                                <td className={styles.tableCells}>A</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>English Literature</td>
                                <td className={styles.tableCells}>GCSE</td>
                                <td className={styles.tableCells}>A</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>History</td>
                                <td className={styles.tableCells}>GCSE</td>
                                <td className={styles.tableCells}>A</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>Mathematics</td>
                                <td className={styles.tableCells}>GCSE</td>
                                <td className={styles.tableCells}>A*</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>Physics</td>
                                <td className={styles.tableCells}>GCSE</td>
                                <td className={styles.tableCells}>A</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCells}>Religion</td>
                                <td className={styles.tableCells}>GCSE</td>
                                <td className={styles.tableCells}>B</td>
                            </tr>
                    </table>
                </article>
            </div>

        </div>
    );
}