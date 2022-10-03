import "core-js/stable"; // Polyfilling everything
import "regenerator-runtime/runtime"; // Polyfilling async/await
import L from "leaflet";
import markerIcon from "../img/marker.svg";

// import Swiper bundle with all modules installed
import Swiper from "swiper/swiper-bundle";

// Lets take DOM element object.
const typingText = document.getElementById("typing-text");
const downBtn = document.querySelector(".down-btn");
const aboutMeContainer = document.querySelector(".about-me");
const contactForm = document.querySelector(".contact-form");

// This is App class to handle whole application.
class App {
  // Protected map object
  _map;

  constructor() {
    this._typingAnimation();
    this._renderMyAge();
    this._renderPosition();
    // this._renderMarker();
    this._revealAboutSection();
    this._revealSkillSection();
    this._revealExperienceSection();
    this._revealContactSection();
    this._renderProjectSlider();
    this._revealProjectSection();

    // Down moving button click listener
    downBtn.addEventListener("click", function () {
      aboutMeContainer.scrollIntoView({ behavior: "smooth" });
    });

    // Contact form submit listener
    contactForm.addEventListener("submit", this._sendEmail);
  }

  // Function to do header typing animation on intro screen.
  _typingAnimation() {
    const text = "Have Fun, Have Curiosity";
    const letterList = text.split("");

    // Rendering typing text
    letterList.forEach((letter, index) => {
      setTimeout(() => {
        typingText.firstElementChild.innerHTML += letter;
      }, 80 * (index + 1));
    });
  }

  // Function to render my current location in map
  _renderPosition() {
    // 1) create map object with my position with zoom level.
    this._map = L.map("map").setView([24.5854, 73.7125], 6);

    // 2) remove zoom control button from map
    this._map.zoomControl.remove();

    // 3) Linking map provider to map object. (Jawg map provider)
    L.tileLayer(
      "https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}",
      {
        maxZoom: 16,
        minZoom: 4,
        // accessToken: process.env.JAWG_ACCESS_KEY,
        accessToken:
          "elWohq7VscpEqssBM2AJencMUbOoJyjNPrkyJ5XgK5hOfx9mIkghvlj79hKLiZvd",
      }
    ).addTo(this._map);

    // 4) render marker on my position
    this._renderMarker();
  }

  // Function to render marker on map position
  _renderMarker() {
    const myIcon = L.icon({
      iconUrl: markerIcon,
      iconSize: [64, 64],
      className: "map-marker",
    });

    if (this._map) {
      L.marker([24.5854, 73.7125], { icon: myIcon }).addTo(this._map);
    }
  }

  // Function to get My age and render
  _renderMyAge() {
    const current = new Date().getTime();

    // DOB: 5 April 2022
    const birthTime = new Date(2000, 3, 5).getTime();

    const totalTimeSpan = current - birthTime + 864000000;

    document.getElementById("my-age").innerHTML =
      new Date(totalTimeSpan).getFullYear() - 1970;
  }

  // Function to set observer on "About me" section
  _revealAboutSection() {
    // 1) Get about section
    const aboutSection = document.querySelector(".about-me");

    // 2) setting observer options
    const options = {
      root: null,
      threshold: 0.1,
    };

    // 3) Callback function for intersection observer.
    function revealSectionHandler(entries, observer) {
      const [entry] = entries;

      if (entry.isIntersecting) {
        // Showing up about me section.
        entry.target.querySelector(".title").classList.add("title-showUp");
        entry.target.querySelectorAll(".text").forEach((el) => {
          el.classList.add("text-liftUp");
        });
        entry.target.querySelector(".map-marker").classList.add("bounce");

        // At last unobserve target
        observer.unobserve(entry.target);
      }
    }

    // 4) Initializing observer
    const sectionObserver = new IntersectionObserver(
      revealSectionHandler,
      options
    );

    // 5) Setting observer on section.
    sectionObserver.observe(aboutSection);
  }

  // Function to set observer on "Skills" section
  _revealSkillSection() {
    const skillSection = document.querySelector(".skills");

    const options = {
      root: null,
      threshold: 0.25,
    };

    function revealSectionHandler(entries, observer) {
      const [entry] = entries;

      if (entry.isIntersecting) {
        // Showing up skills section.
        entry.target.querySelector(".title").classList.add("title-showUp");
        entry.target.querySelectorAll(".text").forEach((el) => {
          el.classList.add("text-liftUp");
        });
        entry.target.querySelectorAll(".icon").forEach((icon) => {
          icon.classList.add("swall");
        });

        // At last unobserve target
        observer.unobserve(entry.target);
      }
    }

    const sectionObserver = new IntersectionObserver(
      revealSectionHandler,
      options
    );

    // Setting observer on section.
    sectionObserver.observe(skillSection);
  }

  // Function to set observer on "Experience" section
  _revealExperienceSection() {
    const experienceSection = document.querySelector(".experience");

    const options = {
      root: null,
      threshold: 0.25,
    };

    function revealSectionHandler(entries, observer) {
      const [entry] = entries;

      if (entry.isIntersecting) {
        // Showing up experience section.
        entry.target.querySelector(".title").classList.add("title-showUp");
        entry.target.querySelectorAll(".fade").forEach((card) => {
          card.classList.add("glow-card");
        });

        // At last unobserve target
        observer.unobserve(entry.target);
      }
    }

    const sectionObserver = new IntersectionObserver(
      revealSectionHandler,
      options
    );

    // Setting observer on section.
    sectionObserver.observe(experienceSection);
  }

  // Function to set observer on "Contact" section
  _revealContactSection() {
    const contactSection = document.querySelector(".contact");

    const options = {
      root: null,
      threshold: 0.25,
    };

    function revealSectionHandler(entries, observer) {
      const [entry] = entries;

      if (entry.isIntersecting) {
        // Showing up contact section.
        entry.target.querySelector(".title").classList.add("title-showUp");
        entry.target.querySelectorAll(".text").forEach((el) => {
          el.classList.add("text-liftUp");
        });
        entry.target.querySelectorAll(".form-item").forEach((item) => {
          item.classList.add("input-liftUp");
        });

        // At last unobserve target
        observer.unobserve(entry.target);
      }
    }

    const sectionObserver = new IntersectionObserver(
      revealSectionHandler,
      options
    );

    // Setting observer on section.
    sectionObserver.observe(contactSection);
  }

  // Function to send email
  _sendEmail(event) {
    // 1) prevent event action
    event.preventDefault();

    // 2) Getting information
    const senderName = contactForm
      .querySelector(".sender-name")
      .querySelector("input");
    const senderEmail = contactForm
      .querySelector(".email")
      .querySelector("input");
    const subject = contactForm
      .querySelector(".subject")
      .querySelector("input");
    const message = contactForm
      .querySelector(".message-box")
      .querySelector("textarea");

    // 3) Creating message body
    const messageBody = `<strong>Name</strong>: ${senderName.value} <br><br>
                        <strong>Email</strong>: ${senderEmail.value} <br><br>
                        <strong>Message</strong>: ${message.value}`;

    // 4) Sending mail to given email using "smtp.js".
    Email.send({
      SecureToken: "8254b02a-9c33-43e6-b047-0953f713a577",
      To: "sanskarm001@gmail.com",
      From: "sanskarm2000@gmail.com",
      Subject: subject.value,
      Body: messageBody,
    }).then((msg) => {
      alert("Thankyou, your message sent successfully 😀!");

      // 5)  Reset all input fields
      senderName.value = "";
      senderEmail.value = "";
      subject.value = "";
      message.value = "";
    });
  }

  // Function to render project slider using "swiper js"
  _renderProjectSlider() {
    const swiper = new Swiper(".swiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      spaceBetween: 15,
      coverflowEffect: {
        rotate: -8,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      loop: true,
    });
  }

  // Function to set observer on "Contact" section
  _revealProjectSection() {
    const projectSection = document.querySelector(".project");

    const options = {
      root: null,
      threshold: 0.25,
    };

    function revealSectionHandler(entries, observer) {
      const [entry] = entries;

      if (entry.isIntersecting) {
        // Showing up project section.
        entry.target.querySelector(".title").classList.add("title-showUp");
        entry.target.querySelectorAll(".fade").forEach((card) => {
          card.classList.add("project-card-glow");
        });

        // At last unobserve target
        observer.unobserve(entry.target);
      }
    }

    const sectionObserver = new IntersectionObserver(
      revealSectionHandler,
      options
    );

    // Setting observer on section.
    sectionObserver.observe(projectSection);
  }
}

const app = new App();

// Setting current year dynamically
document.querySelector(".current-year").innerHTML = new Date().getFullYear();
