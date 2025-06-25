import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Star,
  Gift,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Music,
} from "lucide-react";

const MinecraftBirthday = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showParticles, setShowParticles] = useState(true);
  const [blocksAnimation, setBlocksAnimation] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showAudioControls, setShowAudioControls] = useState(false);
  const [autoplayAttempted, setAutoplayAttempted] = useState(false);
  const [showPlayPrompt, setShowPlayPrompt] = useState(true);
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });

  // Referencias de audio
  const backgroundAudioRef = useRef(null);
  const effectsRef = useRef({});

  // Canción favorita de HACKERWOMAN25
  const backgroundTrack = {
    name: "Otras Vidas - Carlos Rivera",
    src: "/audio/Carlos Rivera - Otras Vidas (Video Oficial).mp3",
    duration: "4:15",
  };

  // Efectos de sonido por sección
  const soundEffects = {
    navigation: "/audio/effects/button-click.wav",
    blockPlace: "/audio/effects/block-place.wav",
    blockBreak: "/audio/effects/block-break.wav",
    experience: "/audio/effects/experience-pickup.wav",
    birthday: "/audio/effects/birthday-jingle.mp3",
  };

  // Colores Minecraft auténticos con variaciones
  const minecraftPalette = {
    grass: {
      primary: "#7CB342",
      light: "#8BC34A",
      dark: "#689F38",
      accent: "#AED581",
    },
    dirt: {
      primary: "#6D4C41",
      light: "#795548",
      dark: "#5D4037",
      accent: "#8D6E63",
    },
    stone: {
      primary: "#757575",
      light: "#9E9E9E",
      dark: "#616161",
      accent: "#BDBDBD",
    },
    water: {
      primary: "#1976D2",
      light: "#2196F3",
      dark: "#1565C0",
      accent: "#64B5F6",
    },
    wood: {
      primary: "#5D4037",
      light: "#8D6E63",
      dark: "#4E342E",
      accent: "#A1887F",
    },
    emerald: {
      primary: "#388E3C",
      light: "#4CAF50",
      dark: "#2E7D32",
      accent: "#66BB6A",
    },
    diamond: {
      primary: "#0097A7",
      light: "#00BCD4",
      dark: "#00838F",
      accent: "#4DD0E1",
    },
    gold: {
      primary: "#F57C00",
      light: "#FF9800",
      dark: "#EF6C00",
      accent: "#FFB74D",
    },
    redstone: {
      primary: "#D32F2F",
      light: "#F44336",
      dark: "#C62828",
      accent: "#EF5350",
    },
    lapis: {
      primary: "#303F9F",
      light: "#3F51B5",
      dark: "#283593",
      accent: "#7986CB",
    },
    sky: {
      primary: "#01579B",
      light: "#0288D1",
      dark: "#0277BD",
      accent: "#4FC3F7",
    },
    sunset: {
      primary: "#E65100",
      light: "#FF5722",
      dark: "#D84315",
      accent: "#FF8A65",
    },
  };

  // Responsive breakpoints
  const getResponsiveValue = (mobile, tablet, desktop) => {
    if (screenSize.width < 768) return mobile;
    if (screenSize.width < 1024) return tablet;
    return desktop;
  };

  // Timeline mejorada
  const timeline = [
    {
      year: "2019",
      title: "Nuestro Primer Mundo Juntos",
      description:
        "Todo comenzó cuando te enseñé a jugar Minecraft. Tu primera casa de dirt fue la construcción más hermosa que había visto. Esos primeros pasos juntos en el mundo pixelado marcaron el inicio de nuestra aventura.",
      icon: "🏠",
      palette: minecraftPalette.dirt,
      blocks: ["dirt", "grass", "wood"],
      ambient: "cave",
    },
    {
      year: "2020",
      title: "Construyendo Nuestra Primera Casa",
      description:
        "Juntos aprendimos que las mejores construcciones se hacen en equipo. Cada bloque colocado era un paso más en nuestra aventura. Madera, piedra, cristal... cada material tenía su lugar en nuestro hogar.",
      icon: "🔨",
      palette: minecraftPalette.wood,
      blocks: ["wood", "stone", "glass"],
      ambient: "building",
    },
    {
      year: "2021",
      title: "Explorando Juntos",
      description:
        "Cuevas oscuras, biomas nuevos, mobs peligrosos... pero siempre juntos. Nuestras aventuras minecraft eran épicas. Diamonds, emeralds, y tesoros esperaban ser descubiertos por nuestro equipo perfecto.",
      icon: "⛏️",
      palette: minecraftPalette.stone,
      blocks: ["stone", "diamond", "emerald"],
      ambient: "adventure",
    },
    {
      year: "2022",
      title: "Nuestro Imperio Minecraft",
      description:
        "Castillos, ciudades, redstone complejo... Construimos un mundo que reflejaba lo que estábamos construyendo en la vida real. Cada estructura era un monumento a nuestro amor y creatividad compartida.",
      icon: "🏰",
      palette: minecraftPalette.emerald,
      blocks: ["emerald", "gold", "redstone"],
      ambient: "empire",
    },
    {
      year: "2023",
      title: "La Granja de los Sueños",
      description:
        "Proyectos ambiciosos, granjas automáticas, construcciones que parecían imposibles... pero lo logramos juntos. Tu mente brillante y mi persistencia crearon maravillas que ni siquiera soñábamos al principio.",
      icon: "🌾",
      palette: minecraftPalette.grass,
      blocks: ["grass", "water", "gold"],
      ambient: "nature",
    },
    {
      year: "2024",
      title: "¡Feliz Cumpleaños HACKERWOMAN25!",
      description:
        "Hoy celebramos no solo tu cumpleaños, sino 5 años construyendo juntos el mundo más hermoso que existe. Eres mi compañera de aventuras, mi co-builder favorita, y mi amor eterno.",
      icon: "🎂",
      palette: {
        primary: "#E91E63",
        light: "#EC407A",
        dark: "#C2185B",
        accent: "#F48FB1",
      },
      blocks: ["diamond", "emerald", "gold"],
      ambient: "celebration",
    },
  ];

  // Funciones de audio
  const initializeAudio = () => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.volume = volume;
      backgroundAudioRef.current.loop = true;
    }
  };

  const playBackgroundMusic = async () => {
    try {
      if (backgroundAudioRef.current) {
        await backgroundAudioRef.current.play();
        setIsPlaying(true);
        setShowPlayPrompt(false);
      }
    } catch (error) {
      console.log("Autoplay prevented:", error);
      setShowPlayPrompt(true);
    }
  };

  const pauseBackgroundMusic = () => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pauseBackgroundMusic();
    } else {
      playBackgroundMusic();
    }
  };

  // Intento automático de reproducir música al cargar
  const attemptAutoplay = async () => {
    if (!autoplayAttempted) {
      setAutoplayAttempted(true);
      await playBackgroundMusic();
    }
  };

  // Función para iniciar música con interacción del usuario
  const startMusicWithInteraction = () => {
    playBackgroundMusic();
    setShowPlayPrompt(false);
  };

  const toggleMute = () => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.volume = newVolume;
    }
  };

  const playEffect = (effectName) => {
    if (effectsRef.current[effectName] && !isMuted) {
      effectsRef.current[effectName].currentTime = 0;
      effectsRef.current[effectName].volume = volume * 0.5;
      effectsRef.current[effectName]
        .play()
        .catch((e) => console.log("Effect play failed:", e));
    }
  };

  const changeTrack = () => {
    // Solo una canción, reinicia si termina
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.currentTime = 0;
      if (isPlaying) {
        playBackgroundMusic();
      }
    }
  };

  // Handle responsive
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize audio with single track and attempt autoplay
  useEffect(() => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.src = backgroundTrack.src;
      backgroundAudioRef.current.volume = volume;

      // Intentar autoplay después de un pequeño delay
      const timer = setTimeout(() => {
        attemptAutoplay();
      }, 1000);

      return () => clearTimeout(timer);
    }
    initializeAudio();
  }, []);

  // Intentar autoplay en cualquier interacción del usuario
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isPlaying && showPlayPrompt) {
        startMusicWithInteraction();
      }
    };

    // Agregar listeners para la primera interacción
    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [isPlaying, showPlayPrompt]);

  // Navigation with sound effect
  const navigateToSection = (newSection) => {
    if (newSection !== currentSection) {
      // Auto-start music on first navigation if not playing
      if (!isPlaying && showPlayPrompt) {
        startMusicWithInteraction();
      }
      setCurrentSection(newSection);
    }
  };

  // Generar bloques flotantes mejorados
  useEffect(() => {
    const generateBlocks = () => {
      const blocks = [];
      const blockTypes = [
        {
          color: minecraftPalette.grass.light,
          name: "grass",
          shadow: minecraftPalette.grass.dark,
        },
        {
          color: minecraftPalette.dirt.light,
          name: "dirt",
          shadow: minecraftPalette.dirt.dark,
        },
        {
          color: minecraftPalette.stone.light,
          name: "stone",
          shadow: minecraftPalette.stone.dark,
        },
        {
          color: minecraftPalette.wood.light,
          name: "wood",
          shadow: minecraftPalette.wood.dark,
        },
        {
          color: minecraftPalette.diamond.light,
          name: "diamond",
          shadow: minecraftPalette.diamond.dark,
        },
        {
          color: minecraftPalette.emerald.light,
          name: "emerald",
          shadow: minecraftPalette.emerald.dark,
        },
      ];

      const numBlocks = getResponsiveValue(8, 12, 20);

      for (let i = 0; i < numBlocks; i++) {
        const blockType =
          blockTypes[Math.floor(Math.random() * blockTypes.length)];
        blocks.push({
          id: `block-${Date.now()}-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 4 + Math.random() * 3,
          size: getResponsiveValue(12, 16, 20),
          ...blockType,
        });
      }
      setBlocksAnimation(blocks);

      // Play block effect occasionally
      if (Math.random() < 0.3) {
        playEffect("blockPlace");
      }
    };

    generateBlocks();
    const interval = setInterval(generateBlocks, 12000);
    return () => clearInterval(interval);
  }, [screenSize.width]);

  // Section change effects
  useEffect(() => {
    if (currentSection === timeline.length - 1) {
      setTimeout(() => playEffect("birthday"), 1000);
    }
  }, [currentSection]);

  // Estilos base mejorados
  const getMinecraftBlockStyle = (color, shadowColor, size = 16) => ({
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color,
    border: `2px solid ${shadowColor}`,
    borderRadius: "3px",
    boxShadow: `
      inset -2px -2px 0px ${shadowColor},
      inset 2px 2px 0px rgba(255,255,255,0.4),
      0 4px 8px rgba(0,0,0,0.2)
    `,
    imageRendering: "pixelated",
  });

  const getTextStyle = (size, weight = "bold", shadow = true) => ({
    fontFamily: "'Courier New', 'Monaco', 'Lucida Console', monospace",
    fontSize: getResponsiveValue(size * 0.7, size * 0.85, size),
    fontWeight: weight,
    textShadow: shadow ? "2px 2px 0px rgba(0,0,0,0.6)" : "none",
    letterSpacing: "0.5px",
  });

  // Componente de bloque flotante mejorado
  const FloatingBlock = ({ block }) => (
    <motion.div
      key={block.id}
      style={{
        position: "absolute",
        left: `${block.x}%`,
        top: `${block.y}%`,
        opacity: 0.4,
        ...getMinecraftBlockStyle(block.color, block.shadow, block.size),
      }}
      animate={{
        y: [-30, -80],
        rotate: [0, 360],
        opacity: [0.4, 0.8, 0],
        scale: [1, 1.2, 0.8],
      }}
      transition={{
        duration: block.duration,
        delay: block.delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );

  // Partículas mejoradas
  const Particles = () => {
    if (!showParticles) return null;

    const numParticles = getResponsiveValue(15, 25, 35);

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Partículas de experiencia */}
        {Array.from({ length: numParticles }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: getResponsiveValue("3px", "4px", "5px"),
              height: getResponsiveValue("3px", "4px", "5px"),
              backgroundColor: minecraftPalette.emerald.light,
              borderRadius: "50%",
              boxShadow: `0 0 8px ${minecraftPalette.emerald.accent}`,
            }}
            animate={{
              y: [-15, -45],
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
              rotate: [0, 180],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Bloques flotantes */}
        {blocksAnimation.map((block) => (
          <FloatingBlock key={block.id} block={block} />
        ))}
      </div>
    );
  };

  // Controles de audio
  const AudioControls = () => (
    <motion.div
      style={{
        position: "fixed",
        top: getResponsiveValue("60px", "70px", "80px"),
        right: getResponsiveValue("12px", "16px", "20px"),
        backgroundColor: "rgba(0,0,0,0.8)",
        borderRadius: "12px",
        padding: "16px",
        minWidth: "200px",
        border: "2px solid rgba(255,255,255,0.2)",
        backdropFilter: "blur(10px)",
        zIndex: 30,
      }}
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{
        opacity: showAudioControls ? 1 : 0,
        scale: showAudioControls ? 1 : 0.8,
        y: showAudioControls ? 0 : -20,
      }}
      transition={{ duration: 0.3 }}
      style={{ display: showAudioControls ? "block" : "none" }}
    >
      {/* Track info */}
      <div
        style={{
          color: "white",
          marginBottom: "12px",
          textAlign: "center",
          ...getTextStyle(12, "normal", false),
        }}
      >
        <div style={{ marginBottom: "4px" }}>🎵 {backgroundTrack.name}</div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "10px" }}>
          Su canción favorita ❤️ {backgroundTrack.duration}
        </div>
      </div>

      {/* Simple controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "12px",
        }}
      >
        <button
          onClick={changeTrack}
          style={{
            backgroundColor: "transparent",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "6px",
            padding: "4px 8px",
            color: "white",
            cursor: "pointer",
            ...getTextStyle(10, "normal", false),
          }}
        >
          🔄 Reiniciar
        </button>
        <button
          onClick={toggleMusic}
          style={{
            backgroundColor: isPlaying
              ? minecraftPalette.emerald.primary
              : "transparent",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "6px",
            padding: "4px 8px",
            color: "white",
            cursor: "pointer",
          }}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>

      {/* Volume control */}
      <div style={{ marginBottom: "8px" }}>
        <label
          style={{
            color: "white",
            display: "block",
            marginBottom: "4px",
            ...getTextStyle(10, "normal", false),
          }}
        >
          Volumen: {Math.round(volume * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => changeVolume(parseFloat(e.target.value))}
          style={{
            width: "100%",
            accentColor: minecraftPalette.emerald.primary,
          }}
        />
      </div>

      <button
        onClick={toggleMute}
        style={{
          backgroundColor: isMuted
            ? minecraftPalette.redstone.primary
            : minecraftPalette.emerald.primary,
          border: "none",
          borderRadius: "6px",
          padding: "6px 12px",
          color: "white",
          cursor: "pointer",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          ...getTextStyle(12, "bold", false),
        }}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        {isMuted ? "Activar Audio" : "Silenciar"}
      </button>
    </motion.div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, 
        ${minecraftPalette.sky.primary} 0%, 
        ${minecraftPalette.sky.light} 30%, 
        ${minecraftPalette.sky.accent} 70%,
        ${minecraftPalette.sunset.light} 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Audio elements */}
      <audio
        ref={backgroundAudioRef}
        src={backgroundTrack.src}
        preload="auto"
        loop
      />

      {/* Load sound effects */}
      {Object.entries(soundEffects).map(([key, src]) => (
        <audio
          key={key}
          ref={(el) => (effectsRef.current[key] = el)}
          src={src}
          preload="auto"
        />
      ))}

      <Particles />

      {/* Patrón de fondo pixelado mejorado */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.08,
          backgroundImage: `
          linear-gradient(45deg, transparent 35%, rgba(255,255,255,0.1) 35%, rgba(255,255,255,0.1) 65%, transparent 65%),
          linear-gradient(-45deg, transparent 35%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.1) 65%, transparent 65%)
        `,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Header mejorado */}
      <motion.header
        style={{
          textAlign: "center",
          padding: getResponsiveValue("24px 16px", "32px 24px", "48px 32px"),
          position: "relative",
          zIndex: 10,
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <motion.div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: getResponsiveValue("12px", "16px", "20px"),
            marginBottom: getResponsiveValue("16px", "20px", "24px"),
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div
            style={getMinecraftBlockStyle(
              minecraftPalette.grass.light,
              minecraftPalette.grass.dark,
              getResponsiveValue(28, 32, 40)
            )}
          />
          <Heart
            style={{
              color: minecraftPalette.redstone.light,
              width: getResponsiveValue("28px", "32px", "40px"),
              height: getResponsiveValue("28px", "32px", "40px"),
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
            }}
            fill="currentColor"
          />
          <div
            style={getMinecraftBlockStyle(
              minecraftPalette.emerald.light,
              minecraftPalette.emerald.dark,
              getResponsiveValue(28, 32, 40)
            )}
          />
        </motion.div>

        <motion.h1
          style={{
            color: "white",
            marginBottom: getResponsiveValue("12px", "16px", "20px"),
            ...getTextStyle(getResponsiveValue(28, 36, 48)),
            textShadow:
              "3px 3px 0px rgba(0,0,0,0.7), 0 0 20px rgba(255,255,255,0.5)",
          }}
          animate={{
            textShadow: [
              "3px 3px 0px rgba(0,0,0,0.7), 0 0 20px rgba(255,255,255,0.5)",
              "3px 3px 0px rgba(0,0,0,0.7), 0 0 30px rgba(255,255,255,0.8)",
              "3px 3px 0px rgba(0,0,0,0.7), 0 0 20px rgba(255,255,255,0.5)",
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          ¡Feliz Cumpleaños HACKERWOMAN25!
        </motion.h1>

        <motion.p
          style={{
            color: "rgba(255,255,255,0.95)",
            maxWidth: getResponsiveValue("300px", "500px", "700px"),
            margin: "0 auto",
            ...getTextStyle(getResponsiveValue(16, 18, 22), "normal"),
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }}
        >
          5 años construyendo juntos el mundo más hermoso 💎✨
        </motion.p>
      </motion.header>

      {/* Timeline Navigation mejorada */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: getResponsiveValue("24px", "32px", "40px"),
          padding: "0 16px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: getResponsiveValue("6px", "8px", "12px"),
            maxWidth: "900px",
            justifyContent: "center",
          }}
        >
          {timeline.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => navigateToSection(index)}
              style={{
                padding: getResponsiveValue(
                  "8px 12px",
                  "10px 16px",
                  "12px 20px"
                ),
                backgroundColor:
                  currentSection === index ? "white" : "rgba(0,0,0,0.25)",
                color:
                  currentSection === index ? item.palette.primary : "white",
                border: `3px solid ${
                  currentSection === index
                    ? item.palette.primary
                    : "rgba(255,255,255,0.4)"
                }`,
                borderRadius: "8px",
                cursor: "pointer",
                transform:
                  currentSection === index ? "scale(1.05)" : "scale(1)",
                boxShadow:
                  currentSection === index
                    ? `0 6px 16px rgba(0,0,0,0.3), 0 0 0 2px ${item.palette.accent}`
                    : "0 2px 8px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
                ...getTextStyle(getResponsiveValue(12, 14, 16), "bold", false),
              }}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.year}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Timeline Content */}
      <motion.main
        style={{
          padding: `0 ${getResponsiveValue(
            "16px",
            "24px",
            "32px"
          )} ${getResponsiveValue("100px", "120px", "140px")}`,
          position: "relative",
          zIndex: 10,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            style={{
              maxWidth: getResponsiveValue("100%", "600px", "900px"),
              margin: "0 auto",
            }}
            initial={{ opacity: 0, x: 50, rotateY: 15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -50, rotateY: -15 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.div
              style={{
                background: `linear-gradient(135deg, 
                  ${timeline[currentSection].palette.primary}, 
                  ${timeline[currentSection].palette.light})`,
                borderRadius: getResponsiveValue("16px", "20px", "24px"),
                padding: getResponsiveValue("24px", "32px", "48px"),
                boxShadow: `
                  0 20px 60px rgba(0, 0, 0, 0.4),
                  inset 0 1px 0 rgba(255,255,255,0.3),
                  0 0 0 4px ${timeline[currentSection].palette.accent}20
                `,
                border: `4px solid ${timeline[currentSection].palette.dark}`,
                position: "relative",
                overflow: "hidden",
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Brillo sutil en el fondo */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  textAlign: "center",
                  marginBottom: "24px",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <motion.div
                  style={{
                    fontSize: getResponsiveValue("48px", "64px", "80px"),
                    marginBottom: getResponsiveValue("16px", "20px", "24px"),
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                  }}
                  animate={{
                    rotate: [0, 12, -12, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {timeline[currentSection].icon}
                </motion.div>

                <h2
                  style={{
                    color: "white",
                    marginBottom: getResponsiveValue("16px", "20px", "24px"),
                    ...getTextStyle(getResponsiveValue(22, 28, 36)),
                    textShadow: "3px 3px 0px rgba(0,0,0,0.8)",
                  }}
                >
                  {timeline[currentSection].title}
                </h2>

                <p
                  style={{
                    color: "rgba(255,255,255,0.95)",
                    lineHeight: "1.7",
                    maxWidth: getResponsiveValue("100%", "500px", "650px"),
                    margin: "0 auto",
                    ...getTextStyle(getResponsiveValue(14, 16, 18), "normal"),
                    textShadow: "1px 1px 0px rgba(0,0,0,0.6)",
                  }}
                >
                  {timeline[currentSection].description}
                </p>
              </div>

              {/* Bloques decorativos específicos */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: getResponsiveValue("12px", "16px", "20px"),
                  marginTop: getResponsiveValue("24px", "32px", "40px"),
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {Array.from({ length: getResponsiveValue(3, 5, 7) }).map(
                  (_, i) => (
                    <motion.div
                      key={i}
                      style={getMinecraftBlockStyle(
                        "rgba(255,255,255,0.2)",
                        "rgba(255,255,255,0.4)",
                        getResponsiveValue(20, 24, 28)
                      )}
                      animate={{
                        y: [0, -15, 0],
                        opacity: [0.6, 1, 0.6],
                        rotateX: [0, 360],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Infinity,
                      }}
                    />
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.main>

      {/* Prompt para reproducir música */}
      <AnimatePresence>
        {showPlayPrompt && (
          <motion.div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              zIndex: 100,
              backdropFilter: "blur(5px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={{
                background: `linear-gradient(135deg, 
                  ${minecraftPalette.emerald.primary}, 
                  ${minecraftPalette.emerald.light})`,
                borderRadius: "20px",
                padding: getResponsiveValue("24px", "32px", "40px"),
                maxWidth: getResponsiveValue("90%", "400px", "500px"),
                textAlign: "center",
                boxShadow: `
                  0 30px 80px rgba(0, 0, 0, 0.6),
                  inset 0 1px 0 rgba(255,255,255,0.3),
                  0 0 0 6px ${minecraftPalette.emerald.accent}40
                `,
                border: `4px solid ${minecraftPalette.emerald.dark}`,
                position: "relative",
                overflow: "hidden",
              }}
              initial={{ scale: 0, rotate: -10, y: 100 }}
              animate={{ scale: 1, rotate: 0, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              {/* Efectos de brillo */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(circle at 50% 20%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
                  pointerEvents: "none",
                }}
              />

              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{
                  width: getResponsiveValue("48px", "64px", "80px"),
                  height: getResponsiveValue("48px", "64px", "80px"),
                  margin: "0 auto 20px",
                  filter: "drop-shadow(0 0 20px rgba(255,255,255,0.5))",
                }}
              >
                <Music
                  style={{ width: "100%", height: "100%", color: "white" }}
                />
              </motion.div>

              <h3
                style={{
                  color: "white",
                  marginBottom: "16px",
                  ...getTextStyle(getResponsiveValue(18, 22, 26)),
                  textShadow: "2px 2px 0px rgba(0,0,0,0.7)",
                }}
              >
                🎵 ¡Feliz Cumpleaños! 🎵
              </h3>

              <p
                style={{
                  color: "rgba(255,255,255,0.95)",
                  marginBottom: "24px",
                  lineHeight: "1.6",
                  ...getTextStyle(getResponsiveValue(14, 16, 18), "normal"),
                  textShadow: "1px 1px 0px rgba(0,0,0,0.6)",
                }}
              >
                ¿Quieres escuchar tu canción favorita mientras navegas por
                nuestros recuerdos? 💕
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <motion.button
                  onClick={startMusicWithInteraction}
                  style={{
                    backgroundColor: "white",
                    color: minecraftPalette.emerald.primary,
                    padding: getResponsiveValue(
                      "10px 20px",
                      "12px 24px",
                      "14px 28px"
                    ),
                    borderRadius: "10px",
                    border: `3px solid ${minecraftPalette.emerald.light}`,
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    ...getTextStyle(
                      getResponsiveValue(13, 14, 16),
                      "bold",
                      false
                    ),
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={16} />
                  ¡Sí, reproducir! 🎶
                </motion.button>

                <motion.button
                  onClick={() => setShowPlayPrompt(false)}
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                    padding: getResponsiveValue(
                      "10px 20px",
                      "12px 24px",
                      "14px 28px"
                    ),
                    borderRadius: "10px",
                    border: "3px solid rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    ...getTextStyle(
                      getResponsiveValue(13, 14, 16),
                      "bold",
                      false
                    ),
                  }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Tal vez después
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {currentSection === timeline.length - 1 && (
          <motion.div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              zIndex: 50,
              backdropFilter: "blur(5px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              style={{
                background: `linear-gradient(135deg, 
                  ${minecraftPalette.redstone.primary}, 
                  #E91E63, 
                  #9C27B0)`,
                borderRadius: "20px",
                padding: getResponsiveValue("24px", "32px", "40px"),
                maxWidth: getResponsiveValue("90%", "400px", "500px"),
                textAlign: "center",
                boxShadow: `
                  0 30px 80px rgba(0, 0, 0, 0.6),
                  inset 0 1px 0 rgba(255,255,255,0.3),
                  0 0 0 6px rgba(236, 64, 122, 0.3)
                `,
                border: "4px solid #F8BBD9",
                position: "relative",
                overflow: "hidden",
              }}
              initial={{ scale: 0, rotate: -15, y: 100 }}
              animate={{ scale: 1, rotate: 0, y: 0 }}
              transition={{
                delay: 1.8,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              {/* Efectos de brillo */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(circle at 50% 20%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
                  pointerEvents: "none",
                }}
              />

              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{
                  width: getResponsiveValue("48px", "64px", "80px"),
                  height: getResponsiveValue("48px", "64px", "80px"),
                  margin: "0 auto 20px",
                  filter: "drop-shadow(0 0 20px rgba(255,255,255,0.5))",
                }}
              >
                <Gift
                  style={{ width: "100%", height: "100%", color: "white" }}
                />
              </motion.div>

              <h3
                style={{
                  color: "white",
                  marginBottom: "20px",
                  ...getTextStyle(getResponsiveValue(18, 22, 26)),
                  textShadow: "2px 2px 0px rgba(0,0,0,0.7)",
                }}
              >
                Para mi HACKERWOMAN25 💕
              </h3>

              <div
                style={{
                  color: "white",
                  marginBottom: "28px",
                  lineHeight: "1.8",
                  ...getTextStyle(getResponsiveValue(13, 14, 16), "normal"),
                  textShadow: "1px 1px 0px rgba(0,0,0,0.6)",
                }}
              >
                <motion.p
                  style={{ margin: "10px 0" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.2 }}
                >
                  💎 Eres mi diamante más preciado
                </motion.p>
                <motion.p
                  style={{ margin: "10px 0" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.4 }}
                >
                  🏗️ Juntos hemos construido algo hermoso
                </motion.p>
                <motion.p
                  style={{ margin: "10px 0" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.6 }}
                >
                  🌱 Nuestro mundo sigue creciendo cada día
                </motion.p>
                <motion.p
                  style={{ margin: "10px 0" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.8 }}
                >
                  ❤️ ¡Te amo más que todos los bloques de Minecraft!
                </motion.p>
                <motion.p
                  style={{ margin: "10px 0" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.0 }}
                >
                  🎂 ¡Feliz cumpleaños, mi amor eterno!
                </motion.p>
              </div>

              <motion.button
                onClick={() => navigateToSection(0)}
                style={{
                  backgroundColor: "white",
                  color: "#9C27B0",
                  padding: getResponsiveValue(
                    "10px 20px",
                    "12px 24px",
                    "14px 28px"
                  ),
                  borderRadius: "10px",
                  border: "3px solid #CE93D8",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  ...getTextStyle(
                    getResponsiveValue(13, 14, 16),
                    "bold",
                    false
                  ),
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.2 }}
              >
                🔄 Volver al inicio
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controles de navegación súper mejorados */}
      <div
        style={{
          position: "fixed",
          bottom: getResponsiveValue("12px", "16px", "20px"),
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: getResponsiveValue("12px", "16px", "20px"),
          zIndex: 20,
          padding: "8px",
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
          border: "2px solid rgba(255,255,255,0.2)",
        }}
      >
        <motion.button
          onClick={() => navigateToSection(Math.max(0, currentSection - 1))}
          disabled={currentSection === 0}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor:
              currentSection === 0
                ? "rgba(117,117,117,0.8)"
                : minecraftPalette.grass.primary,
            color: "white",
            padding: getResponsiveValue("10px 16px", "12px 20px", "14px 24px"),
            borderRadius: "12px",
            border: `3px solid ${
              currentSection === 0
                ? minecraftPalette.stone.dark
                : minecraftPalette.grass.dark
            }`,
            cursor: currentSection === 0 ? "not-allowed" : "pointer",
            opacity: currentSection === 0 ? 0.6 : 1,
            boxShadow:
              currentSection === 0
                ? "none"
                : `0 4px 12px ${minecraftPalette.grass.primary}40`,
            transition: "all 0.3s ease",
            ...getTextStyle(getResponsiveValue(12, 14, 16), "bold", false),
          }}
          whileHover={{
            scale: currentSection === 0 ? 1 : 1.05,
            boxShadow:
              currentSection === 0
                ? "none"
                : `0 6px 20px ${minecraftPalette.grass.primary}60`,
          }}
          whileTap={{ scale: currentSection === 0 ? 1 : 0.95 }}
        >
          <ChevronLeft size={getResponsiveValue(16, 18, 20)} />
          {screenSize.width > 480 && "Anterior"}
        </motion.button>

        {/* Indicador de progreso */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "0 8px",
          }}
        >
          {timeline.map((_, index) => (
            <div
              key={index}
              style={{
                width: getResponsiveValue("6px", "8px", "10px"),
                height: getResponsiveValue("6px", "8px", "10px"),
                borderRadius: "50%",
                backgroundColor:
                  index === currentSection ? "white" : "rgba(255,255,255,0.4)",
                boxShadow:
                  index === currentSection
                    ? "0 0 10px rgba(255,255,255,0.8)"
                    : "none",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        <motion.button
          onClick={() =>
            navigateToSection(Math.min(timeline.length - 1, currentSection + 1))
          }
          disabled={currentSection === timeline.length - 1}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor:
              currentSection === timeline.length - 1
                ? "rgba(117,117,117,0.8)"
                : minecraftPalette.grass.primary,
            color: "white",
            padding: getResponsiveValue("10px 16px", "12px 20px", "14px 24px"),
            borderRadius: "12px",
            border: `3px solid ${
              currentSection === timeline.length - 1
                ? minecraftPalette.stone.dark
                : minecraftPalette.grass.dark
            }`,
            cursor:
              currentSection === timeline.length - 1
                ? "not-allowed"
                : "pointer",
            opacity: currentSection === timeline.length - 1 ? 0.6 : 1,
            boxShadow:
              currentSection === timeline.length - 1
                ? "none"
                : `0 4px 12px ${minecraftPalette.grass.primary}40`,
            transition: "all 0.3s ease",
            ...getTextStyle(getResponsiveValue(12, 14, 16), "bold", false),
          }}
          whileHover={{
            scale: currentSection === timeline.length - 1 ? 1 : 1.05,
            boxShadow:
              currentSection === timeline.length - 1
                ? "none"
                : `0 6px 20px ${minecraftPalette.grass.primary}60`,
          }}
          whileTap={{
            scale: currentSection === timeline.length - 1 ? 1 : 0.95,
          }}
        >
          {screenSize.width > 480 && "Siguiente"}
          <ChevronRight size={getResponsiveValue(16, 18, 20)} />
        </motion.button>
      </div>

      {/* Controles de audio principales */}
      <div
        style={{
          position: "fixed",
          top: getResponsiveValue("12px", "16px", "20px"),
          right: getResponsiveValue("12px", "16px", "20px"),
          display: "flex",
          gap: "8px",
          zIndex: 20,
        }}
      >
        {/* Toggle de música */}
        <motion.button
          onClick={toggleMusic}
          style={{
            backgroundColor: isPlaying
              ? minecraftPalette.emerald.primary
              : "rgba(0,0,0,0.4)",
            color: "white",
            padding: getResponsiveValue("10px", "12px", "14px"),
            borderRadius: "12px",
            border: `3px solid ${
              isPlaying
                ? minecraftPalette.emerald.dark
                : "rgba(255,255,255,0.3)"
            }`,
            cursor: "pointer",
            boxShadow: isPlaying
              ? `0 4px 12px ${minecraftPalette.emerald.primary}40`
              : "0 2px 8px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          <Music
            style={{
              width: getResponsiveValue("18px", "20px", "24px"),
              height: getResponsiveValue("18px", "20px", "24px"),
              color: isPlaying ? "#FFF176" : "#9CA3AF",
            }}
          />
        </motion.button>

        {/* Toggle de controles avanzados */}
        <motion.button
          onClick={() => setShowAudioControls(!showAudioControls)}
          style={{
            backgroundColor: showAudioControls
              ? minecraftPalette.lapis.primary
              : "rgba(0,0,0,0.4)",
            color: "white",
            padding: getResponsiveValue("10px", "12px", "14px"),
            borderRadius: "12px",
            border: `3px solid ${
              showAudioControls
                ? minecraftPalette.lapis.dark
                : "rgba(255,255,255,0.3)"
            }`,
            cursor: "pointer",
            boxShadow: showAudioControls
              ? `0 4px 12px ${minecraftPalette.lapis.primary}40`
              : "0 2px 8px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Configurar audio"
        >
          {isMuted ? (
            <VolumeX
              style={{
                width: getResponsiveValue("18px", "20px", "24px"),
                height: getResponsiveValue("18px", "20px", "24px"),
              }}
            />
          ) : (
            <Volume2
              style={{
                width: getResponsiveValue("18px", "20px", "24px"),
                height: getResponsiveValue("18px", "20px", "24px"),
              }}
            />
          )}
        </motion.button>

        {/* Toggle de partículas */}
        <motion.button
          onClick={() => {
            setShowParticles(!showParticles);
            playEffect("experience");
          }}
          style={{
            backgroundColor: showParticles
              ? minecraftPalette.emerald.primary
              : "rgba(0,0,0,0.4)",
            color: "white",
            padding: getResponsiveValue("10px", "12px", "14px"),
            borderRadius: "12px",
            border: `3px solid ${
              showParticles
                ? minecraftPalette.emerald.dark
                : "rgba(255,255,255,0.3)"
            }`,
            cursor: "pointer",
            boxShadow: showParticles
              ? `0 4px 12px ${minecraftPalette.emerald.primary}40`
              : "0 2px 8px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={
            showParticles
              ? "Desactivar efectos mágicos"
              : "Activar efectos mágicos"
          }
        >
          <Sparkles
            style={{
              width: getResponsiveValue("18px", "20px", "24px"),
              height: getResponsiveValue("18px", "20px", "24px"),
              color: showParticles ? "#FFF176" : "#9CA3AF",
            }}
          />
        </motion.button>
      </div>

      {/* Panel de controles de audio */}
      <AudioControls />

      {/* Efectos de brillo en las esquinas */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`corner-${i}`}
          style={{
            position: "fixed",
            width: getResponsiveValue("40px", "60px", "80px"),
            height: getResponsiveValue("40px", "60px", "80px"),
            background: `radial-gradient(circle, ${minecraftPalette.diamond.light}40 0%, transparent 70%)`,
            borderRadius: "50%",
            ...(i === 0 && { top: "20px", left: "20px" }),
            ...(i === 1 && { top: "20px", right: "20px" }),
            ...(i === 2 && { bottom: "20px", left: "20px" }),
            ...(i === 3 && { bottom: "20px", right: "20px" }),
            zIndex: 1,
            pointerEvents: "none",
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Indicador de carga de audio */}
      {isPlaying && (
        <motion.div
          style={{
            position: "fixed",
            bottom: getResponsiveValue("80px", "100px", "120px"),
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "8px 16px",
            borderRadius: "20px",
            border: "2px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            zIndex: 15,
            ...getTextStyle(12, "normal", false),
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          🎵 {backgroundTrack.name} ❤️
        </motion.div>
      )}
    </div>
  );
};

export default MinecraftBirthday;
