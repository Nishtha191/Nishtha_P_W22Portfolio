import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import homeeLogo from "../../Assets/homee.png";
import Button from "react-bootstrap/Button";
import resumePdf from "../../Assets/../Assets/Nishtha_Patel.pdf";
import coverPdf from "../../Assets/../Assets/NishthaPatel-CoverLetter.pdf";
import capstone from "../../Assets/../Assets/capstone_project.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


function ResumeNew() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
  
      
      <Container fluid className="resume-section">
      <Row>
        <br/>
        <br/>
      <Col style={{ paddingBottom: 100 }}>
              <img
                src={homeeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          
        </Row>
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={resumePdf}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download Resume
          </Button>
        </Row>

      <br/>
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={coverPdf}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download Cover Letter
          </Button>
        </Row>
        <br/>
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={capstone}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Capstone Project
          </Button>
        </Row>
      </Container>
 
  );
}

export default ResumeNew;
