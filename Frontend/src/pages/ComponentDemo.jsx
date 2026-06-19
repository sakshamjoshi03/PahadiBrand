import React, { useState } from "react";
import { Button, Input, Modal, Toast, Loader } from "../components/ui";
import "../components/ui/ui.css";
import "./Home.css";

function ComponentDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="ui-demo-page">
      <header className="ui-demo-header">
        <p>Component Library Showcase</p>
        <h1 className="ui-demo-title">PahadiBrand UI Component Library</h1>
      </header>

      <section className="ui-demo-grid">
        <div className="ui-demo-card">
          <h2>Entry Fields</h2>
          <div className="ui-demo-row">
            <Input label="Search Product" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} />
            <Input label="Email" placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Password" placeholder="Enter password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>

        <div className="ui-demo-card">
          <h2>Buttons</h2>
          <div className="ui-demo-row">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
          </div>
        </div>

        <div className="ui-demo-card">
          <h2>Toasts</h2>
          <div className="ui-demo-row">
            <Toast type="success" message="Product added successfully." />
            <Toast type="error" message="Unable to complete login." />
            <Toast type="info" message="New features are available." />
          </div>
        </div>

        <div className="ui-demo-card">
          <h2>Loader</h2>
          <Loader text="Loading your dashboard..." />
        </div>

        <div className="ui-demo-card">
          <h2>Modal Demo</h2>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>
          <Modal title="PahadiBrand Info" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <p>
              PahadiBrand is a modern e-commerce style product experience showcasing reusable UI components for brand presentation.
            </p>
            <p>
              Use this modal for confirmations, product details, or announcements in your application.
            </p>
          </Modal>
        </div>
      </section>
    </div>
  );
}

export default ComponentDemo;
