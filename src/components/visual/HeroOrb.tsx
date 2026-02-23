import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext";

interface OrbDot {
  mesh: THREE.Mesh;
  ph: number;
}

export default function HeroOrb() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    let camera: THREE.PerspectiveCamera | null = null;

    const resize = () => {
      if (!camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    resize();

    const scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 5);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const accentColor = new THREE.Color(theme.acc);
    const mainLight = new THREE.PointLight(accentColor, 3, 12);
    mainLight.position.set(3, 3, 3);
    scene.add(mainLight);
    const fillLight = new THREE.PointLight(new THREE.Color(theme.am), 1.5, 10);
    fillLight.position.set(-3, -2, 2);
    scene.add(fillLight);

    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: accentColor,
      metalness: 0.85,
      roughness: 0.08,
      emissive: accentColor,
      emissiveIntensity: 0.25,
    });
    const sphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 4),
      sphereMaterial,
    );
    scene.add(sphere);

    const innerRingMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(theme.am),
      transparent: true,
      opacity: 0.55,
    });
    const innerRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.65, 0.012, 16, 120),
      innerRingMaterial,
    );
    innerRing.rotation.x = Math.PI / 2.5;
    scene.add(innerRing);

    const outerRingMaterial = new THREE.MeshBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.2,
    });
    const outerRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.15, 0.006, 12, 100),
      outerRingMaterial,
    );
    outerRing.rotation.set(Math.PI / 3.5, Math.PI / 6, 0);
    scene.add(outerRing);

    const dotMaterials = [
      new THREE.MeshBasicMaterial({ color: accentColor }),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(theme.am) }),
    ];
    const orbDots: OrbDot[] = Array.from({ length: 5 }, (_, index) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 8, 8),
        dotMaterials[index % 2],
      );
      scene.add(mesh);
      return { mesh, ph: (index / 5) * Math.PI * 2 };
    });

    const mousePosition = { x: 0, y: 0 };
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.x = (event.clientX / innerWidth - 0.5) * 2;
      mousePosition.y = -(event.clientY / innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const timeSeconds = Date.now() * 0.001;

      scene.position.x = mousePosition.x * 0.15;
      scene.position.y =
        mousePosition.y * 0.12 + Math.sin(timeSeconds * 0.7) * 0.12;

      sphere.rotation.x = timeSeconds * 0.18 + mousePosition.y * 0.28;
      sphere.rotation.y = timeSeconds * 0.28 + mousePosition.x * 0.28;
      innerRing.rotation.y = timeSeconds * 0.3;
      outerRing.rotation.z = timeSeconds * 0.12;
      sphereMaterial.emissiveIntensity =
        0.3 + Math.sin(timeSeconds * 1.2) * 0.15;
      orbDots.forEach((dot) => {
        const angle = timeSeconds * 0.65 + dot.ph;
        dot.mesh.position.set(
          Math.cos(angle) * 1.65,
          Math.sin(angle * 0.4) * 0.3,
          Math.sin(angle) * 1.65,
        );
      });
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, [theme.acc, theme.am]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
    />
  );
}
