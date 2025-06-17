import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BootstrapLoveCard.css";
import dancingTeddy from "../assets/whiteDancer.gif";

const BootstrapLoveCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [showFullLetter, setShowFullLetter] = useState(false);
  const [showTeddy, setShowTeddy] = useState(false);
  const fullLetterRef = useRef(null);

  useEffect(() => {
    if (!showFullLetter) return;

    const handleScroll = () => {
      const el = fullLetterRef.current;
      if (!el) return;

      const { scrollTop, scrollHeight, clientHeight } = el;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

      if (isAtBottom && !showTeddy) {
        setTimeout(() => {
          setShowTeddy(true);
        }, 2000);
      }
    };

    const el = fullLetterRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (el) {
        el.removeEventListener("scroll", handleScroll);
      }
    };
  }, [showFullLetter, showTeddy]);

  return (
    <div
      className="envelope-body"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => !isOpened && setIsHovered(false)}
      onClick={() => {
        if (isHovered || isOpened) {
          setIsOpened(true);
          setIsHovered(true);
        }
      }}
    >
      {/* Wax Seal */}
      <div className={`wax-seal ${isHovered ? "hidden" : ""}`}>
        <span>💕</span>
      </div>

      {/* Envelope Flap */}
      {!isOpened && (
        <div className="envelope-flap">
          <div className="decorative-hearts">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="heart-float"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                💖
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Letter Container */}
      <div className={`letter-container ${isOpened ? "revealed" : ""}`}>
        {/* Preview Letter */}
        <div
          className={`letter-preview ${showFullLetter ? "shrunk" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setShowFullLetter(true);
          }}
        >
          <div className="text-center mb-4">
            <div className="heart-row mb-3">
              <span className="heart-pulse">💌</span>
              <span className="heart-pulse" style={{ animationDelay: "0.5s" }}>
                💖
              </span>
              <span className="heart-pulse" style={{ animationDelay: "1s" }}>
                💌
              </span>
            </div>
            <h2 className="letter-title">My Dearest Love</h2>
          </div>

          <div className="letter-content">
            <p className="letter-greeting">My Beloved,</p>
            <p className="small-text bold">
              तू अगर बोल दे "पिज्जा लाओ"...<br/>
               बिना सवाल किए चल पड़ूंगा! 🍕<br/>
              स तू बोल "आई लव यू",<br/>
               दिल ही दे दूँगा — डिलीवरी फ्री है! 😂💘
            </p>
            <hr/>
            <p className="small-text">
              They say heaven is above—⛅<br/>
              but I found it in your silky hair,<br/>
              your midnight voice,😘<br/>
              and that beautiful brown eyes.😍
            </p>
            

            {!showFullLetter && (
              <div className="text-center mt-4">
                <button
                  disabled={!isOpened}
                  className={`unfold-hint ${!isOpened ? "disabled" : ""}`}
                  onClick={(e) => {
                    if (!isOpened) return; // Disable click if not opened
                    e.stopPropagation();
                    setShowFullLetter(true);
                  }}
                >
                  Click to unfold my heart ✨
                </button>
              </div>
            )}
          </div>

          <div className="text-end mt-4">
            <p className="small text-muted fst-italic">Forever yours,</p>
            <div className="d-flex justify-content-end align-items-center">
              <span className="text-danger fs-5">💕</span>
              <span className="signature mx-2">Your Secret Admirer</span>
              <span className="text-danger fs-5">💕</span>
            </div>
          </div>
        </div>

        {/* Full Letter */}
        {showFullLetter && (
          <div
            className="full-letter"
            ref={fullLetterRef}
            style={{
              height: "100%",
              maxHeight: "calc(100vh - 40px)",
              overflowY: "auto",
              paddingBottom: "2rem",
            }}
          >
            <div className="p-4">
              <div className="text-center mb-4">
                <div className="full-hearts mb-3">
                  <span className="bounce-heart">💕</span>
                  <span
                    className="bounce-heart"
                    style={{ animationDelay: "0.2s" }}
                  >
                    💖
                  </span>
                  <span
                    className="bounce-heart"
                    style={{ animationDelay: "0.4s" }}
                  >
                    💝
                  </span>
                  <span
                    className="bounce-heart"
                    style={{ animationDelay: "0.6s" }}
                  >
                    💗
                  </span>
                  <span
                    className="bounce-heart"
                    style={{ animationDelay: "0.8s" }}
                  >
                    💕
                  </span>
                </div>
                <h1 className="full-letter-title">Loving letter</h1>
                <div className="title-underline"></div>
              </div>

              <div className="full-letter-content">
                <p className="full-greeting">Dearest Aerika💖,</p>
                <p>
                  In the garden of my soul, you are the most beautiful flower
                  that has ever bloomed. Every petal of your being brings color
                  to my world, and every breath you take makes my heart dance
                  with joy.
                </p>
                <p>
                  Your laughter is the melody that plays in my dreams, and your
                  smile is the sunrise that brightens my darkest days. With you,
                  I have discovered what it means to love truly, deeply, and
                  completely.
                </p>
                <p>
                  I dream of morning coffees where we share our sleepy thoughts,
                  of evening walks under starlit skies, and of quiet Sunday
                  afternoons where time stands still just for us. You are my
                  adventure, my peace, and my home.
                </p>

                <div className="text-center my-4">
                  <div className="proposal-button">
                    <span className="fw-bold text-white">💖 Stay mine 💖</span>
                  </div>
                </div>

                <p className="text-center fst-italic text-primary">
                  Say yes, and let's write the most beautiful love story ever
                  told...
                </p>
              </div>

              <div className="full-signature">
                <p className="text-muted fst-italic mb-3">
                  With every beat of my heart,
                </p>
                <div className="d-flex justify-content-end align-items-center">
                  <span className="text-danger fs-4">💕</span>
                  <span className="full-signature-text mx-3">
                    Your Forever Lover
                  </span>
                  <span className="text-danger fs-4">💕</span>
                </div>
                <p className="full-signature-text mt-3 fst-italic">
                  Utkarsh Rajoriya
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Dancing Teddy */}
        {showTeddy && (
          <div className="text-center mt-4">
            <Link to="/doLove">
              <img
                src={dancingTeddy}
                alt="Dancing Teddy"
                className="teddy-gif"
                style={{ cursor: "pointer" }}
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BootstrapLoveCard;
