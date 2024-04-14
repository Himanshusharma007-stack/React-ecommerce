import React from "react";
import './style/About.css'

export function About() {
  return (
    <section className="about-section px-2 py-10 md:px-0">
      <div className="mx-auto max-w-4xl">
        <div className="md:flex md:items-center md:justify-center md:space-x-14">
          <div className="relative h-48 w-48 flex-shrink-0">
            <img
              className="relative h-48 w-48 rounded-full object-cover profile-pic"
              src="https://avatars.githubusercontent.com/u/66436350?v=4"
              alt=""
            />
          </div>

          <div className="mt-10 md:mt-0 about-content">
            <blockquote>
              <p className="about-text">
                Embarking on my journey in React.js, this is my first project on Reactjs which served as a foundational exploration of key concepts such as <strong>Redux Toolkit</strong>, <strong>React Router</strong> and hooks like <strong>useState</strong> and <strong>useEffect</strong>. As I continue to delve deeper into React.js, I am eager to expand my knowledge and expertise, pushing the boundaries of what can be achieved with this powerful library. In the dynamic landscape of the tech industry, I firmly believe in the mantra of continuous learning and innovation. Adapting to evolving technologies is not just a necessity but a passion. <br/>
                Change is the only constant in the tech world. With every new development, I see an opportunity to grow, evolve, and contribute to shaping the future of technology. Blending the roles of developer and designer, I thrive at the intersection of creativity and functionality. Experimenting with new technologies and modern tools fuels my drive to make life easier through intuitive design and seamless user experiences.
              </p>
              <br/>
              <ul className="about-list">
                <li>
                  🛸 I am an enthusiast programmer and have the knowledge of
                  MEVN stack.
                </li>
                <li>
                  🌋 I’m always looking for challenging work opportunities
                  ahead.
                </li>
                <li>🧗🏾‍♀️ I try to: Go beyond and push the bounds.</li>
              </ul>
            </blockquote>
            <p className="mt-7 text-lg font-semibold text-black about-name">
              Himanshu Sharma
            </p>
            <p className="mt-1 text-base text-gray-600 about-role">
              Fullstack Developer at Gigforce
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
