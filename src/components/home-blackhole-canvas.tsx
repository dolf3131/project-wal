"use client";

import { useEffect, useRef } from "react";

const vertexShaderSource = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_center;
uniform float u_scale;
uniform float u_tilt;

mat2 rotate2d(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;

  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p *= 2.02;
    amplitude *= 0.5;
  }

  return value;
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / u_resolution.y;
  vec2 p = (uv - u_center) / u_scale;
  // p = rotate2d(u_tilt) * p; // Remove universal tilt to keep exact control over angles

  float distanceToCenter = length(p);
  float angle = atan(p.y, p.x);
  
  vec3 color = vec3(0.0);

  // Angle-based doppler for red/blue theme
  // sin(angle - 2.35) gives -1 at top-right (pi/4) and 1 at bottom-left (-3pi/4)
  float doppler = 0.5 + 0.5 * sin(angle - 2.35); 
  vec3 blueGlow = vec3(0.05, 0.4, 1.0);
  vec3 redGlow = vec3(1.0, 0.05, 0.02);
  vec3 baseGlow = mix(redGlow, blueGlow, doppler);

  // Background nebula with flow
  float flowNoise = fbm(p * 2.5 + vec2(u_time * 0.05, -u_time * 0.05));
  float mist = smoothstep(3.0, 0.2, distanceToCenter);
  color += baseGlow * flowNoise * mist * 0.4;
  
  // Single unified circular ring peaking right around the black hole shadow
  float radial = distanceToCenter;
  
  float ringCore = exp(-pow((radial - 0.65) * 12.0, 2.0));
  float ringBody = exp(-pow((radial - 0.65) * 4.5, 2.0));
  float ringHalo = exp(-pow((radial - 0.65) * 2.0, 2.0));

  float swirlNoise = fbm(vec2(angle * 4.0, radial * 5.0 - u_time * 0.3));
  float swirl = 0.5 + 0.5 * sin(angle * 12.0 - u_time * 1.5 + swirlNoise * 5.0);
  
  vec3 coreColor = vec3(1.0, 1.0, 1.0);
  
  vec3 ringColor = vec3(0.0);
  ringColor += coreColor * ringCore * 1.2;
  ringColor += baseGlow * ringBody * (0.5 + swirl * 0.5);
  ringColor += baseGlow * ringHalo * 0.4;

  // The diagonal piercing ray (front band crossing the hole)
  float diagDist = abs(p.y - p.x * 0.7); 
  float rayMask = smoothstep(2.5, 0.3, distanceToCenter);
  float rayCore = exp(-pow(diagDist * 15.0, 2.0)) * rayMask;
  float rayHalo = exp(-pow(diagDist * 5.0, 2.0)) * rayMask;
  
  vec3 rayColor = vec3(0.0);
  rayColor += coreColor * rayCore * 1.5;
  rayColor += baseGlow * rayHalo * 0.6;

  // Black hole shadow (circular)
  float blackCoreLine = smoothstep(0.48, 0.65, distanceToCenter);
  
  color += ringColor * blackCoreLine;
  
  // Add the piercing ray on top, so it breaks the shadow!
  color += rayColor;

  float vignette = smoothstep(3.5, 0.3, length(uv));
  color *= vignette;

  float screenGrain = hash21(gl_FragCoord.xy + u_time * 47.0) - 0.5;
  color += screenGrain * 0.03;

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile failed:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

  if (!vertexShader || !fragmentShader) {
    return null;
  }

  const program = gl.createProgram();
  if (!program) {
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program failed to link:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export function HomeBlackholeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      return;
    }

    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!program) {
      return;
    }

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const centerLocation = gl.getUniformLocation(program, "u_center");
    const scaleLocation = gl.getUniformLocation(program, "u_scale");
    const tiltLocation = gl.getUniformLocation(program, "u_tilt");

    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();
    if (!buffer) {
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    let frameId = 0;
    let running = true;
    const dprCap = window.matchMedia("(max-width: 768px)").matches ? 1 : 1.25;
    let renderCenter = { x: 0.0, y: 0.0 };
    let renderScale = 1.0;
    let renderTilt = 0.0;

    const resize = () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const width = Math.max(1, Math.floor(window.innerWidth * dpr));
      const height = Math.max(1, Math.floor(window.innerHeight * dpr));
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      gl.viewport(0, 0, width, height);

      renderCenter = isMobile
        ? { x: 0.0, y: 0.0 }
        : { x: 0.0, y: 0.0 };
      renderScale = isMobile ? 1.0 : 1.4; // Moderately large scale
      renderTilt = 0.0;
    };

    const handleVisibility = () => {
      running = document.visibilityState !== "hidden";
      if (running) {
        frameId = window.requestAnimationFrame(render);
      } else {
        window.cancelAnimationFrame(frameId);
      }
    };

    const startTime = performance.now();

    const render = () => {
      if (!running) {
        return;
      }

      const elapsed = (performance.now() - startTime) / 1000;
      gl.useProgram(program);
      gl.uniform1f(timeLocation, elapsed);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(centerLocation, renderCenter.x, renderCenter.y);
      gl.uniform1f(scaleLocation, renderScale);
      gl.uniform1f(tiltLocation, renderTilt);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frameId = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);

    frameId = window.requestAnimationFrame(render);

    return () => {
      running = false;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-95" aria-hidden="true" />;
}
