import React, { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import gsap from "gsap";
import "./styles.scss";

const Modal = (Component) => ({ toggle, ...otherProps }) => {
  const modalRef = useRef(null);
  unmtTransition = () => {
    const tl = gsap.timeline();
    tl.to(".modal", {
      duration: 0.35,
      transition: "ease",
      y: -80,
      opacity: 0,
      onComplete: () => toggle(false)
    });
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        unmtTransition();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);
  return (
    <div className="modal" ref={modalRef} {...otherProps}>
      <div className="close" onClick={unmtTransition}>
        &#10006;
      </div>
      <Component {...otherProps} />
    </div>
  );
};

const Content = () => (
  <div class="content">
    <h1>Modal Content</h1>
    <p>This is a modal! 🎉</p>
    <p>Try clicking outside of the modal.</p>
  </div>
);

const ModalExample = Modal(Content);

const Button = ({ children, toggle }) => {
  return <button onClick={() => toggle(true)}>{children}</button>;
};

export default App = () => {
  const [display, toggle] = useState(false);
  return display ? (
    <ModalExample toggle={toggle} />
  ) : (
    <Button toggle={toggle}>Show Modal</Button>
  );
};