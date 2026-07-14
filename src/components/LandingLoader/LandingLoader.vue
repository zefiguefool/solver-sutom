<template>
  <div class="landing-loader" ref="loader">
    <!-- Conteneur pour la bordure finale -->
    <div class="logo-border" ref="logoBorder"></div>
    
    <div
      v-for="(cube, i) in cubes"
      :key="i"
      ref="cubes"
      class="cube"
      :class="{ 'empty': !cube.letter }"
      :style="{
        width: `${cubeSize}px`,
        height: `${cubeSize}px`,
        backgroundColor: cube.color,
        zIndex: cube.zIndex
      }"
    >
      <span v-if="cube.letter" class="letter">{{ cube.letter }}</span>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";

/**
 * LandingLoader.vue - Composant de chargement animé pour SOLVAMI
 * VERSION PRODUCTION :
 * - Logo SOLVAMI avec cubes bleus pour les cases vides
 * - Animation fluide (3s) avec chute, rebonds, magnétisme
 * - Bordure finale gris-bleu autour du logo
 * - Disparition automatique à la fin
 */

// Grille du logo SOLVAMI 3x3 avec cubes bleus pour les cases vides
const LOGO_GRID = [
  // Ligne 0 (haut) : S, O, L
  [{ letter: 'S', color: '#c41e3a' }, { letter: 'O', color: '#2ecc71' }, { letter: 'L', color: '#c41e3a' }],
  // Ligne 1 (milieu) : bleu, V, A
  [{ letter: null, color: '#3498db' }, { letter: 'V', color: '#c41e3a' }, { letter: 'A', color: '#2ecc71' }],
  // Ligne 2 (bas) : M, I, bleu
  [{ letter: 'M', color: '#f1c40f' }, { letter: 'I', color: '#2ecc71' }, { letter: null, color: '#3498db' }]
];

export default {
  name: 'LandingLoader',

  data() {
    return {
      cubes: [],
      cubeSize: 0,
      containerWidth: 0,
      containerHeight: 0
    };
  },

  mounted() {
    this.init();
    window.addEventListener('resize', this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {

    // ==========================================
    // INIT : Initialisation du conteneur et des cubes
    // ==========================================
    init() {
      const loader = this.$refs.loader;
      this.containerWidth = loader.clientWidth;
      this.containerHeight = loader.clientHeight;
      
      // Taille des cubes : 1/7 de la plus petite dimension
      this.cubeSize = Math.min(this.containerWidth, this.containerHeight) / 7;

      this.cubes = [];
      const centerX = this.containerWidth / 2;
      const centerY = this.containerHeight / 2;
      // Espacement resserré : 1.05 = 5% d'espace entre les cubes
      const spacing = 1.05;

      // Créer les cubes à partir de la grille
      LOGO_GRID.forEach((row, y) => {
        row.forEach((cell, x) => {
          this.cubes.push(this.createCube(cell, x, y, centerX, centerY, spacing));
        });
      });

      this.$nextTick(() => {
        this.startAnimation();
      });
    },

    // ==========================================
    // CREATECUBE : Crée un cube avec ses propriétés
    // ==========================================
    createCube(cell, x, y, centerX, centerY, spacing) {
      // Calcul des positions finales CENTRÉES DANS LA BORDURE
      // Offset de -0.5*cubeSize pour aligner parfaitement avec le cadre
      const offset = 0.5 * this.cubeSize;
      const finalX = centerX + (x - 1) * this.cubeSize * spacing - offset;
      const finalY = centerY + (y - 1) * this.cubeSize * spacing - offset;
      
      return {
        letter: cell.letter,
        color: cell.color,
        finalX: finalX,
        finalY: finalY,
        el: null,
        zIndex: this.cubes.length + 1
      };
    },

    // ==========================================
    // STARTANIMATION : Démarre la timeline GSAP
    // ==========================================
    startAnimation() {
      const timeline = gsap.timeline();
      const floorY = this.containerHeight - this.cubeSize;

      // Associer les éléments DOM
      this.cubes.forEach((cube, i) => {
        cube.el = this.$refs.cubes[i];
      });

      // Animation pour chaque cube
      this.cubes.forEach((cube, i) => {
        // Position initiale aléatoire (en haut)
        gsap.set(cube.el, {
          left: Math.random() * this.containerWidth * 0.8 + this.containerWidth * 0.1,
          top: -Math.random() * this.containerHeight * 0.5 - this.cubeSize,
          opacity: 0,
          rotationX: 0,
          rotationY: 0,
          boxShadow: '0 0 0 rgba(0,0,0,0)'
        });

        // 1. SPAWN (0.9s)
        timeline.to(cube.el, {
          opacity: 1,
          duration: 0.3 * 3,
          delay: i * 0.1 * 3,
          ease: "power2.out"
        }, 0);

        // 2. CHUTE (3-4.5s)
        timeline.to(cube.el, {
          top: floorY,
          duration: (1 + Math.random() * 0.5) * 3,
          ease: "power2.in",
          onUpdate: () => {
            const heightAboveFloor = floorY - (parseFloat(cube.el.style.top) || 0);
            const shadowY = Math.max(0, heightAboveFloor / 4);
            const shadowBlur = shadowY * 2;
            cube.el.style.boxShadow = `0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,0.3)`;
          }
        }, 0.2 * 3 + i * 0.05 * 3);

        // 3. REBOND (1.5s)
        timeline.to(cube.el, {
          top: floorY,
          duration: 0.5 * 3,
          ease: "bounce.out",
          onStart: () => {
            gsap.to(cube.el, {
              rotationX: "+=360",
              rotationY: "+=360",
              duration: 0.5 * 3,
              ease: "power2.inOut"
            });
          },
          onUpdate: () => {
            const heightAboveFloor = floorY - (parseFloat(cube.el.style.top) || 0);
            const shadowY = Math.max(0, heightAboveFloor / 4);
            const shadowBlur = shadowY * 2;
            cube.el.style.boxShadow = `0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,0.3)`;
          }
        }, 0.8 * 3 + i * 0.1 * 3);

        // 4. MAGNÉTISME (2.4s)
        timeline.to(cube.el, {
          left: cube.finalX,
          top: cube.finalY,
          duration: 0.8 * 3,
          ease: "elastic.out(1, 0.5)",
          onUpdate: () => {
            cube.el.style.boxShadow = `0 2px 4px rgba(0,0,0,0.3)`;
          },
          onComplete: () => {
            cube.el.style.boxShadow = '0 1px 2px rgba(0,0,0,0.2)';
          }
        }, 1.2 * 3 + i * 0.1 * 3);
      });

      // 5. BORDURE FINALE
      const border = this.$refs.logoBorder;
      gsap.set(border, {
        opacity: 0,
        width: 0,
        height: 0
      });

      // Calculer les dimensions du logo (3x3 cubes)
      const logoWidth = 3.1 * this.cubeSize;
      const logoHeight = 3.1 * this.cubeSize;
      
      // Position pour centrer la bordure
      const borderLeft = this.containerWidth / 2 - logoWidth / 2;
      const borderTop = this.containerHeight / 2 - logoHeight / 2;

      timeline.to(border, {
        width: logoWidth + 8,
        height: logoHeight + 8,
        left: borderLeft - 4,
        top: borderTop - 4,
        borderRadius: '12px',
        border: '1px solid #bdc3c7',
        boxShadow: '0 0 20px rgba(189, 195, 199, 0.3)',
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, 2 * 3 + 0.5);

      // 6. FONDU FINAL DU LOADER (après bordure)
      timeline.to(this.$refs.loader, {
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        onComplete: () => {
          this.$emit('animation-complete');
        }
      }, 2 * 3 + 1.3);
    },

    // ==========================================
    // HANDLERESIZE : Gère le redimensionnement
    // ==========================================
    handleResize() {
      gsap.killTweensOf(this.$refs.loader);
      if (this.$refs.cubes) {
        this.$refs.cubes.forEach(el => {
          gsap.killTweensOf(el);
        });
      }
      gsap.killTweensOf(this.$refs.logoBorder);
      this.init();
    }
  }
};
</script>

<style scoped>
/**
 * STYLES - Version production
 */

.landing-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  display: block;
  z-index: 9999;
  overflow: visible;
}

.cube {
  position: absolute;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  will-change: transform, opacity, left, top, box-shadow;
}

/* Cubes vides (bleus) - pas de lettre */
.cube.empty {
  box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
}

.letter {
  color: white;
  font-size: 2.8rem;
  font-weight: bold;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  user-select: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Bordure finale autour du logo */
.logo-border {
  position: absolute;
  border-radius: 12px;
  pointer-events: none;
  z-index: 100;
}

@media (max-width: 768px) {
  .letter {
    font-size: 2rem;
  }
}
</style>