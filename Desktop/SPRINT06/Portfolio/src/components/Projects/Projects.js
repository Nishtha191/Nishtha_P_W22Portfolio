import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import carPooling from "../../Assets/Projects/carPooling.jpeg";
import functionn from "../../Assets/Projects/function.jpeg";
import airBNB from "../../Assets/Projects/airBNB.jpeg";
import portfolio from "../../Assets/Projects/portfolio.jpeg";
import weather from "../../Assets/Projects/weather.jpeg";
import chat from "../../Assets/Projects/chat.jpeg";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="black">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={portfolio}
              isBlog={false}
              title="Portfolio"
              description="Portfolio-Wedsite designed and develope using React, react-bootstrap"
              link="https://github.com/Nishtha191/Nishtha_P_W22Portfolio.git"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={carPooling}
              isBlog={false}
              title="Car Pooling"
              description="Car-pooling application is
              to provide reliable and convenient services to our client
              through the advanced technology which makes to user
              experience smoother."
              link="https://github.com/Nishtha191/capstone-project.git"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={airBNB}
              isBlog={false}
              title="AirBnB GraphQL API"
              description="The main objective of this assignment is to demonstrate knowledge about
              GraphQL API development. It is NodeJS application. "
              link="https://github.com/Nishtha191/101241116_comp3133_assig1.git"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chat}
              isBlog={false}
              title="Chat app"
              description="A basic chat application using socet.io and mongoDb to connect data and store data into database."
              link="https://github.com/Nishtha191/101241116_lab_test1_chat_app.git"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={weather}
              isBlog={false}
              title="Weather Web-App"
              description="A basic Web-App to show current weather condition using react. Show current date and time, location, Temperature etc."
              link="https://github.com/Nishtha191/101241116_comp3123_-labtest2.git"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={functionn}
              isBlog={false}
              title="Basic File Funcation"
              description="Add file and delete file function. Print operation in terminal using Console."
              link="https://github.com/Nishtha191/101241116_comp3123_test1.git"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
