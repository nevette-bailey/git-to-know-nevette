"use client";

import { useEffect, useRef } from "react";

// Source image dimensions — canvas height derived from this aspect ratio
const IMG_ASPECT = 433 / 650;

export default function PortraitSketch() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let p5Instance: import("p5") | null = null;
    // cancelled flag: if React StrictMode unmounts before the async import
    // resolves, this prevents the first (stale) instance from ever being created
    let cancelled = false;

    let roTimeout: ReturnType<typeof setTimeout> | null = null;
    let lastWidth = containerRef.current.clientWidth;

    function createInstance() {
      import("p5").then((mod) => {
        if (cancelled || !containerRef.current) return;

        const p5 = mod.default;

        const sketch = (p: import("p5")) => {
          let img: import("p5").Image;
          let offscreen: import("p5").Image;
          let brush: PaintBrush;
          let noiseZ = 0;
          let isDone = false;

          // ─── helpers ──────────────────────────────────────────────────────────

          function getCanvasDims(): { w: number; h: number } {
            const el = containerRef.current;
            if (!el) return {w: 480, h: 524};
            const w = el.clientWidth;
            return {w, h: Math.round(w / IMG_ASPECT)};
          }

          function fget(x: number, y: number): import("p5").Color {
            const idx = (
                y * offscreen.width + x
            ) * 4;
            return p.color(
                offscreen.pixels[idx],
                offscreen.pixels[idx + 1],
                offscreen.pixels[idx + 2],
                offscreen.pixels[idx + 3]
            );
          }

          function fburn(x: number, y: number) {
            const idx = (
                y * offscreen.width + x
            ) * 4;
            // Lighten by 60 per visit instead of jumping to 255
            // strong edges take multiple passes to exhaust, spreading brush around
            offscreen.pixels[idx] = Math.min(255, offscreen.pixels[idx] + 60);
            offscreen.pixels[idx + 1] = Math.min(255, offscreen.pixels[idx + 1] + 60);
            offscreen.pixels[idx + 2] = Math.min(255, offscreen.pixels[idx + 2] + 60);
          }

          function coverCopy(src: import("p5").Image, dst: import("p5").Image) {
            const srcAspect = src.width / src.height;
            const dstAspect = dst.width / dst.height;
            let sx = 0, sy = 0, sw = src.width, sh = src.height;
            if (srcAspect > dstAspect) {
              sw = Math.floor(src.height * dstAspect);
              sx = Math.floor((
                  src.width - sw
              ) / 2);
            } else {
              sh = Math.floor(src.width / dstAspect);
            }
            dst.copy(src, sx, sy, sw, sh, 0, 0, dst.width, dst.height);
          }

          // ─── brush ────────────────────────────────────────────────────────────

          class PaintBrush {
            private pos: import("p5").Vector;
            private ppos: import("p5").Vector;
            private vel: import("p5").Vector;
            private count = 0;
            private isPink = false;

            private readonly MAX_COUNT = 100;
            private readonly MAX_SPEED = 5;
            private readonly PERCEPTION = 5;
            private readonly BOUND = 10;
            private readonly NOISE_SCALE = 120;
            private readonly WEIGHT = 0.25;

            constructor(startPos: import("p5").Vector) {
              this.pos = startPos.copy();
              this.ppos = startPos.copy();
              this.vel = p.createVector(0, 0);
              this.isPink = Math.random() < 0.2;
            }

            update(z: number) {
              this.ppos = this.pos.copy();

              // gradient: steer toward nearby dark pixels
              const force = p.createVector(0, 0);
              const half = Math.floor(this.PERCEPTION / 2);
              let hits = 0;
              for (let i = -half; i <= half; i++) {
                for (let j = -half; j <= half; j++) {
                  if (i === 0 && j === 0) continue;
                  const px = Math.floor(this.pos.x + i);
                  const py = Math.floor(this.pos.y + j);
                  if (px < 0 || px >= offscreen.width || py < 0 || py >= offscreen.height) continue;
                  const darkness = 1 - p.brightness(fget(px, py)) / 100;
                  const pv = p.createVector(i, j).normalize().mult(darkness);
                  force.add(pv);
                  hits++;
                }
              }
              if (hits > 0) force.div(hits);

              // perlin noise adds organic flow
              const angle = p.map(
                  p.noise(this.pos.x / this.NOISE_SCALE, this.pos.y / this.NOISE_SCALE, z),
                  0, 1, 0, p.TWO_PI * 4
              );
              const nf = p5.Vector.fromAngle(angle);
              force.add(nf.mult(force.mag() < 0.01 ? 0.12 : 0.02));

              // soft boundary repulsion
              if (this.pos.x < this.BOUND) force.x += (
                  this.BOUND - this.pos.x
              ) / this.BOUND * 0.2;
              if (this.pos.x > p.width - this.BOUND) force.x -= (
                  this.pos.x - (
                      p.width - this.BOUND
                  )
              ) / this.BOUND * 0.2;
              if (this.pos.y < this.BOUND) force.y += (
                  this.BOUND - this.pos.y
              ) / this.BOUND * 0.2;
              if (this.pos.y > p.height - this.BOUND) force.y -= (
                  this.pos.y - (
                      p.height - this.BOUND
                  )
              ) / this.BOUND * 0.2;

              this.vel.add(force).mult(0.9);
              if (this.vel.mag() > this.MAX_SPEED) this.vel.setMag(this.MAX_SPEED);
              this.pos.add(this.vel);

              if (this.pos.x < 0 || this.pos.x > p.width || this.pos.y < 0 || this.pos.y > p.height) {
                this.reset();
              }
            }

            reset() {
              offscreen.updatePixels();
              offscreen.loadPixels();
              this.count = 0;
              this.isPink = Math.random() < 0.2;

              let found = false;
              for (let attempts = 0; attempts < 2000 && !found; attempts++) {
                const x = Math.floor(Math.random() * offscreen.width);
                const y = Math.floor(Math.random() * offscreen.height);
                if (p.brightness(fget(x, y)) < 40) {
                  this.pos.set(x, y);
                  this.ppos.set(x, y);
                  this.vel.set(0, 0);
                  found = true;
                }
              }
              if (!found) isDone = true;
            }

            draw() {
              this.count++;
              if (this.count > this.MAX_COUNT) {
                this.reset();
                return;
              }

              if (this.isPink) {
                p.stroke(166, 77, 120, 22);
              } else {
                p.stroke(28, 25, 23, 26);
              }
              p.strokeWeight(this.WEIGHT);
              p.line(this.ppos.x, this.ppos.y, this.pos.x, this.pos.y);

              // burn visited pixels so brush moves on to fresh edges
              const dx = this.pos.x - this.ppos.x;
              const dy = this.pos.y - this.ppos.y;
              const steps = Math.max(Math.abs(Math.floor(dx)), Math.abs(Math.floor(dy)));
              for (let s = 0; s <= steps; s++) {
                const t = steps === 0 ? 0 : s / steps;
                const bx = Math.floor(this.ppos.x + dx * t);
                const by = Math.floor(this.ppos.y + dy * t);
                if (bx >= 0 && bx < offscreen.width && by >= 0 && by < offscreen.height) {
                  fburn(bx, by);
                }
              }
            }
          }

          // ─── p5 lifecycle ─────────────────────────────────────────────────────

          p.preload = () => {
            img = p.loadImage("/headshot-sketch-full.jpg");
          };

          p.setup = () => {
            const {w, h} = getCanvasDims();
            const cnv = p.createCanvas(w, h);
            cnv.parent(containerRef.current!);
            p.colorMode(p.RGB, 255, 255, 255, 255);
            p.noFill();

            offscreen = p.createImage(w, h);
            coverCopy(img, offscreen);
            offscreen.loadPixels();

            p.background(242, 238, 233);
            brush = new PaintBrush(p.createVector(w / 2, h / 2));
          };

          // Animated draw loop — user sees the sketch being drawn
          // 100 steps/frame keeps it visible without being too slow or too fast
          p.draw = () => {
            if (isDone) {
              p.noLoop();
              return;
            }
            for (let i = 0; i < 1000; i++) {
              if (isDone) break;
              brush.update(noiseZ);
              brush.draw();
              noiseZ += 0.003;
            }
          };

          // No p.windowResized — static on mount, no window API
        };

        p5Instance = new p5(sketch);
      });
    }

    createInstance();

    const ro = new ResizeObserver((entries) => {
      const newWidth = Math.round(entries[0].contentRect.width);
      if (Math.abs(newWidth - lastWidth) < 20) return; // ignore trivial shifts
      lastWidth = newWidth;

      if (roTimeout) clearTimeout(roTimeout);
      roTimeout = setTimeout(() => {
        if (cancelled) return;
        // destroy old instance, create fresh one at new dimensions
        p5Instance?.remove();
        p5Instance = null;
        createInstance();
      }, 400);
    });

    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      cancelled = true;
      if (roTimeout) clearTimeout(roTimeout);
      ro.disconnect();
      p5Instance?.remove();
    };
  }, []);

  return (
      <div ref={containerRef} className="w-full" aria-hidden="true" />
  );
}
