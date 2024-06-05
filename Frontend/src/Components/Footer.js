import { Github, Gmail, Linkedin } from "./Icons";
import style from './Footer.module.css';

const Footer = () => {
    const moveToGitHub = () => {
        window.location.href = 'https://github.com/anushka30aug';
    }
    const moveToLinkedIn = () => {
        window.location.href = 'https://www.linkedin.com/in/anushka-shukla-00a367280';
    }
    const sendEmail = () => {
        window.open('mailto:anushkashukla3003@gmail.com')
    }
    return (
        <div className={style.contact_panel} >
            <h4 className={style.heading_tag}>Contact Developer</h4>
            <div className={style.contact_list}>
                <li onClick={moveToLinkedIn}><Linkedin /></li>
                <li onClick={moveToGitHub}><Github /></li>
                <li onClick={sendEmail}><Gmail /></li>
            </div>


            <p>
                Thank you for choosing Thoughts as your go-to notes app!
                Your ideas and suggestions help us make Thoughts better for everyone.
            </p>

            <h4 className={style.heading_tag}>Created by Anushka Shukla</h4>
        </div>

    )
}

export default Footer;