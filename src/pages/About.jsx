import { Link, Outlet } from "react-router-dom"

const About = () => {
  return (
    <div>
      <h2>À propos</h2>
      <nav>
        <Link to='/about/course'>Mon parcours en programmation</Link>
        <Link to='/about/description'>Description</Link>
      </nav>
      <Outlet /> {/* This is the render of the navigation's content */}
    </div>
  )
}

export default About

