import React, { useState, useEffect, useRef } from 'react';
import './MessagePage.css';
import BootstrapLoveCard from './BootstrapLoveCard';

const MessagePage = () => {
  const [bagOpened, setBagOpened] = useState(false);
  const [showButterflies, setShowButterflies] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [droppedImages, setDroppedImages] = useState([]);
  const [imagePositions, setImagePositions] = useState({});
  const [draggedImage, setDraggedImage] = useState(null);
  const [allImagesCollected, setAllImagesCollected] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const images = [
    'https://res.cloudinary.com/dtf1quyas/image/upload/v1750143336/Screenshot_2025_0617_120346_ljiijr.jpg',
    'https://res.cloudinary.com/dtf1quyas/image/upload/v1750143319/Snapchat-283737590_enawoj.jpg',
    'https://res.cloudinary.com/dtf1quyas/image/upload/v1750143319/Screenshot_20250617_115246_eeo3ur.jpg',
    'https://res.cloudinary.com/dtf1quyas/image/upload/v1750143317/Screenshot_20250617_111904_glbuup.jpg',
    'https://res.cloudinary.com/dtf1quyas/image/upload/v1750143317/Screenshot_20250617_111613_gkifvl.jpg',
    'https://res.cloudinary.com/dtf1quyas/image/upload/v1750143316/IMG_20250617_121039_ms8nin.jpg',
    'https://res.cloudinary.com/dtf1quyas/image/upload/v1750143316/IMG_20250617_121555_g9ijsh.jpg',
    'https://res.cloudinary.com/dtf1quyas/image/upload/v1750143315/Screenshot_2025_0617_120112_nzz4ru.jpg',
    'https://res.cloudinary.com/dtf1quyas/image/upload/v1750143315/Screenshot_2025_0617_114727_bwasfu.jpg',
    'https://res.cloudinary.com/dtf1quyas/image/upload/v1750143315/IMG_20250617_121313_d7whpu.jpg',
    'https://res.cloudinary.com/dtf1quyas/image/upload/v1750143315/IMG_20250617_115813_qqrqli.jpg',
    'https://res.cloudinary.com/dtf1quyas/image/upload/v1750143314/IMG_20250617_121216_wu2pfl.jpg',
    'https://res.cloudinary.com/dtf1quyas/image/upload/v1750143314/IMG_20250617_120854_lr5dda.jpg',
    'https://res.cloudinary.com/dtf1quyas/image/upload/v1750143314/IMG_20250617_120428_qyakpq.jpg',
    'https://res.cloudinary.com/dtf1quyas/image/upload/v1750143317/Snapchat-117044768_srcagi.jpg'
  ];

  const handleBagClick = () => {
    if (!bagOpened) {
      setBagOpened(true);
      setShowButterflies(true);

      setTimeout(() => {
        setBagOpened(false);
      }, 1000);

      setTimeout(() => {
        setShowButterflies(false);
        setShowImages(true);
        startImageDropping();
      }, 2000);
    }
  };

  const startImageDropping = () => {
    const isMobile = window.innerWidth <= 768;
    const screenWidth = window.innerWidth;

    images.forEach((_, index) => {
      setTimeout(() => {
        let zigzagX;
        if (isMobile) {
          zigzagX = 20 + (index % 3) * (screenWidth - 140) / 2 + (Math.random() * 30);
        } else {
          zigzagX = 150 + (index % 2) * 300 + (Math.random() * 50);
        }

        const finalY = window.innerHeight - (isMobile ? 120 : 150);

        setImagePositions(prev => ({
          ...prev,
          [index]: { x: zigzagX, y: -120 }
        }));

        setDroppedImages(prev => [...prev, index]);

        setTimeout(() => {
          setImagePositions(prev => ({
            ...prev,
            [index]: { x: zigzagX, y: finalY }
          }));
        }, 100);

      }, index * 300);
    });

    setTimeout(() => {
      setAllImagesCollected(true);
    }, images.length * 300 + 25000);
  };

  const handleMouseDown = (e, imageIndex) => {
    e.preventDefault();
    setDraggedImage(imageIndex);
    const rect = e.currentTarget.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleTouchStart = (e, imageIndex) => {
    // e.preventDefault();
    setDraggedImage(imageIndex);
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    dragOffset.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  };

  const handleMouseMove = (e) => {
    if (draggedImage !== null) {
      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;

      setImagePositions(prev => ({
        ...prev,
        [draggedImage]: { x: newX, y: newY }
      }));
    }
  };

  const handleTouchMove = (e) => {
    if (draggedImage !== null) {
      const touch = e.touches[0];
      const newX = touch.clientX - dragOffset.current.x;
      const newY = touch.clientY - dragOffset.current.y;

      setImagePositions(prev => ({
        ...prev,
        [draggedImage]: { x: newX, y: newY }
      }));
    }
  };

  const handleMouseUp = () => {
    setDraggedImage(null);
  };

  const handleTouchEnd = () => {
    setDraggedImage(null);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (draggedImage !== null) {
        const newX = e.clientX - dragOffset.current.x;
        const newY = e.clientY - dragOffset.current.y;

        setImagePositions(prev => ({
          ...prev,
          [draggedImage]: { x: newX, y: newY }
        }));
      }
    };

    const handleGlobalTouchMove = (e) => {
      if (draggedImage !== null) {
        // e.preventDefault();
        const touch = e.touches[0];
        const newX = touch.clientX - dragOffset.current.x;
        const newY = touch.clientY - dragOffset.current.y;

        setImagePositions(prev => ({
          ...prev,
          [draggedImage]: { x: newX, y: newY }
        }));
      }
    };

    if (draggedImage !== null) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [draggedImage]);

  return (
    <div
      className="message-page"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <div className="stars">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {!bagOpened && !showImages && (
        <div className="gift-container" onClick={handleBagClick}>
          <div className="gift-glow"></div>
          <div className="gift-bag">🎁</div>
          <div className="gift-text">
            <h4 className="gift-title">🎁 Tap to Open Your Surprise! 🎁</h4>
            <p className="gift-subtitle">Something magical awaits...</p>
          </div>
        </div>
      )}

      {showButterflies && (
        <>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="butterfly"
              style={{
                left: '50%',
                top: '50%',
                '--mid-x': `${(Math.random() - 0.5) * 50}vw`,
                '--mid-y': `${-30 - Math.random() * 20}vh`,
                '--end-x': `${(Math.random() - 0.5) * 100}vw`,
                '--end-y': `${30 + Math.random() * 50}vh`,
                animationDelay: `${i * 0.1}s`
              }}
            >
              🦋
            </div>
          ))}
        </>
      )}

      {showImages && droppedImages.map((imageIndex) => {
        const isAtBottom = imagePositions[imageIndex]?.y >= (window.innerHeight - 200);
        return (
          <img
            key={imageIndex}
            src={images[imageIndex]}
            alt={`Memory ${imageIndex + 1}`}
            className={`dropped-image ${!isAtBottom && !allImagesCollected ? 'glowing' : 'collected'}`}
            style={{
              left: `${imagePositions[imageIndex]?.x || 0}px`,
              top: `${imagePositions[imageIndex]?.y || 0}px`,
              objectFit: 'cover',
              transition: 'all 2s ease-in-out'
            }}
            onMouseDown={(e) => handleMouseDown(e, imageIndex)}
            onTouchStart={(e) => handleTouchStart(e, imageIndex)}
            draggable={false}
          />
        );
      })}

      {allImagesCollected && (
        <div className="birthday-card">        
          <BootstrapLoveCard/>
        </div>
      )}

      {allImagesCollected && (
        <div className="floating-hearts">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="floating-heart"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              💕
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagePage;