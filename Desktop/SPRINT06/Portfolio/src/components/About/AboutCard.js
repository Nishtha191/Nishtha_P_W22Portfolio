import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="black">Nishtha Patel </span>
            from <span className="black"> Toronto, Canada.</span>
            <br />  I’m a graduate of 2022 from George Brown College at Toronto with a degree in Advanced Diploma as a <b className="black"> Computer programming and analyst.</b> 
            <br />  I'm most passionate about giving back to the community, and my goal is to pursue <b className="black">this passion within the field of software program engineering and development. </b>
            <br />  In my free time, I like operating on  <b className="black"> open-source projects.</b> 
            <br />
            <br />
          </p>
          

          <p style={{ color: "rgb(155 126 172)" }}>
            "Code the probelm for better solution."{" "}
          </p>
          <footer className="blockquote-footer">Nishtha</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
