'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className={styles.header}>
              <h1 className={styles.title}>
                 Travel Destination
              </h1>
              <p className={styles.subtitle}>
                Explore the World with Us
              </p>
            </div>

            {/* Main Card */}
            <Card className={styles.mainCard}>
              <Card.Body className="p-5">
                <Row className="align-items-center">
                  <Col md={4} className="text-center mb-4 mb-md-0">
                    <div className={styles.iconCircle}>
                      🌍
                    </div>
                  </Col>
                  
                  <Col md={8}>
                    <h2 className={styles.cardTitle}>
                      Project Information
                    </h2>
                    
                    <div className={styles.infoItem}>
                      <div className="d-flex align-items-center mb-2">
                        <span className={styles.emoji}>👤</span>
                        <div>
                          <small className="text-muted d-block">Nama</small>
                          <h5 className="mb-0 fw-bold">Davin Pratama</h5>
                        </div>
                      </div>
                    </div>

                    <div className={styles.infoItem}>
                      <div className="d-flex align-items-center mb-2">
                        <span className={styles.emoji}>🎓</span>
                        <div>
                          <small className="text-muted d-block">NPM</small>
                          <h5 className="mb-0 fw-bold">535240027</h5>
                        </div>
                      </div>
                    </div>

                    <div className={styles.infoItem}>
                      <div className="d-flex align-items-center mb-2">
                        <span className={styles.emoji}>🗺️</span>
                        <div>
                          <small className="text-muted d-block">Topik</small>
                          <h5 className="mb-0 fw-bold">Travel Destination</h5>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              
              {/* Footer Card */}
              <div className={styles.cardFooter}>
                <p className="mb-0">
                  <strong>🚀 Discover Amazing Destinations Around The Globe</strong>
                </p>
              </div>
            </Card>

            {/* Feature Cards */}
            <Row className="mt-5 g-4">
              <Col md={4}>
                <Card className={styles.featureCard}>
                  <Card.Body className="text-center p-4">
                    <div className={styles.featureIcon}>🏖️</div>
                    <h5 className="fw-bold">Beach Paradise</h5>
                    <p className="text-muted mb-0">Explore tropical beaches</p>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={4}>
                <Card className={styles.featureCard}>
                  <Card.Body className="text-center p-4">
                    <div className={styles.featureIcon}>🏔️</div>
                    <h5 className="fw-bold">Mountain Adventures</h5>
                    <p className="text-muted mb-0">Conquer the peaks</p>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={4}>
                <Card className={styles.featureCard}>
                  <Card.Body className="text-center p-4">
                    <div className={styles.featureIcon}>🏙️</div>
                    <h5 className="fw-bold">City Tours</h5>
                    <p className="text-muted mb-0">Urban exploration</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}