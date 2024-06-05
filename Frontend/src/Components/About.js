import React from 'react'
import style from './About.module.css'
import Footer from './Footer'

export default function About() {
  return (
    <div className={style.About_component}>
      <p className={style.content}>
        <h4>Thoughts</h4>
        is a user-friendly notes application designed to help you effortlessly capture, update, and manage your ideas, tasks, and reminders.
        Developed by <b>Anushka Shukla</b>,Thoughts combines simplicity with powerful features to ensure your important information is always at your fingertips.
        Whether you need a reliable place to store your brainstorming sessions, grocery lists, or daily reminders, Thoughts is the perfect companion for organizing your life. With a focus on simplicity and functionality, Thoughts makes note-taking a breeze, allowing you to focus on what truly matters.
      </p>
      {/* <Footer/> */}
    </div>
  )
}
