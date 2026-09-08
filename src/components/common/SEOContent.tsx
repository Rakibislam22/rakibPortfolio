import React from "react";
import { portfolioData } from "@/data/portfolioData";

export function SEOContent() {
  return (
    <aside className="sr-only" aria-label="Portfolio Summary and Index">
      <h1>
        {portfolioData.name} - {portfolioData.title}
      </h1>
      <p>{portfolioData.tagline}</p>
      <p>
        Location: {portfolioData.location} | Status: {portfolioData.status} | Email: {portfolioData.email}
      </p>

      <section>
        <h2>About Md Rakib Ali</h2>
        {portfolioData.bio.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </section>

      <section>
        <h2>Featured Software Projects</h2>
        <ul>
          {portfolioData.projects.map((project) => (
            <li key={project.id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>Category: {project.category}</p>
              <p>Technologies: {project.tags.join(", ")}</p>
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  {project.title} Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  {project.title} GitHub Source Code
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Skills &amp; Technical Competencies</h2>
        {portfolioData.skillCategories.map((cat) => (
          <div key={cat.category}>
            <h3>{cat.category}</h3>
            <ul>
              {cat.skills.map((skill) => (
                <li key={skill.name}>
                  {skill.name} - {skill.level}% proficiency
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Academic Background &amp; Education</h2>
        {portfolioData.education.map((edu, i) => (
          <div key={i}>
            <h3>{edu.degree}</h3>
            <p>
              {edu.institution} ({edu.location}) • Duration: {edu.duration} • GPA: {edu.gpa}
            </p>
            <p>{edu.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Social Profiles &amp; Developer Channels</h2>
        <ul>
          <li>
            <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
          </li>
          <li>
            <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn Profile
            </a>
          </li>
          <li>
            <a href={portfolioData.socials.twitter} target="_blank" rel="noopener noreferrer">
              Twitter / X Profile
            </a>
          </li>
          <li>
            <a href={portfolioData.socials.facebook} target="_blank" rel="noopener noreferrer">
              Facebook Profile
            </a>
          </li>
          <li>
            <a href={portfolioData.socials.instagram} target="_blank" rel="noopener noreferrer">
              Instagram Profile
            </a>
          </li>
          {portfolioData.socials.leetcode && (
            <li>
              <a href={portfolioData.socials.leetcode} target="_blank" rel="noopener noreferrer">
                LeetCode Profile
              </a>
            </li>
          )}
        </ul>
      </section>
    </aside>
  );
}

