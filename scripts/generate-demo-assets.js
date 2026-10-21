const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 table
let crcTable = new Int32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[i] = c;
}

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  const crc = crc32(Buffer.concat([typeBuf, data]));
  crcBuf.writeUInt32BE(crc, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

// 5x7 Bitmap font dictionary (columns as 7-bit binary rows)
const FONT = {
  ' ': [0,0,0,0,0],
  'A': [0x7E, 0x11, 0x11, 0x11, 0x7E],
  'B': [0x7F, 0x49, 0x49, 0x49, 0x36],
  'C': [0x3E, 0x41, 0x41, 0x41, 0x22],
  'D': [0x7F, 0x41, 0x41, 0x22, 0x1C],
  'E': [0x7F, 0x49, 0x49, 0x49, 0x41],
  'F': [0x7F, 0x09, 0x09, 0x09, 0x01],
  'G': [0x3E, 0x41, 0x49, 0x49, 0x7A],
  'H': [0x7F, 0x08, 0x08, 0x08, 0x7F],
  'I': [0x00, 0x41, 0x7F, 0x41, 0x00],
  'J': [0x20, 0x40, 0x41, 0x3F, 0x01],
  'K': [0x7F, 0x08, 0x14, 0x22, 0x41],
  'L': [0x7F, 0x40, 0x40, 0x40, 0x40],
  'M': [0x7F, 0x02, 0x0C, 0x02, 0x7F],
  'N': [0x7F, 0x04, 0x08, 0x10, 0x7F],
  'O': [0x3E, 0x41, 0x41, 0x41, 0x3E],
  'P': [0x7F, 0x09, 0x09, 0x09, 0x06],
  'Q': [0x3E, 0x41, 0x51, 0x21, 0x5E],
  'R': [0x7F, 0x09, 0x19, 0x29, 0x46],
  'S': [0x46, 0x49, 0x49, 0x49, 0x31],
  'T': [0x01, 0x01, 0x7F, 0x01, 0x01],
  'U': [0x3F, 0x40, 0x40, 0x40, 0x3F],
  'V': [0x1F, 0x20, 0x40, 0x20, 0x1F],
  'W': [0x7F, 0x20, 0x18, 0x20, 0x7F],
  'X': [0x63, 0x14, 0x08, 0x14, 0x63],
  'Y': [0x07, 0x08, 0x70, 0x08, 0x07],
  'Z': [0x61, 0x51, 0x49, 0x45, 0x43],
  '0': [0x3E, 0x51, 0x49, 0x45, 0x3E],
  '1': [0x00, 0x42, 0x7F, 0x40, 0x00],
  '2': [0x42, 0x61, 0x51, 0x49, 0x46],
  '3': [0x21, 0x41, 0x45, 0x4B, 0x31],
  '4': [0x18, 0x14, 0x12, 0x7F, 0x10],
  '5': [0x27, 0x45, 0x45, 0x45, 0x39],
  '6': [0x3C, 0x4A, 0x49, 0x49, 0x30],
  '7': [0x01, 0x71, 0x09, 0x05, 0x03],
  '8': [0x36, 0x49, 0x49, 0x49, 0x36],
  '9': [0x06, 0x49, 0x49, 0x29, 0x1E],
  '-': [0x08, 0x08, 0x08, 0x08, 0x08],
  '+': [0x08, 0x08, 0x3E, 0x08, 0x08],
  '.': [0x00, 0x60, 0x60, 0x00, 0x00],
  ':': [0x00, 0x36, 0x36, 0x00, 0x00],
  '/': [0x20, 0x10, 0x08, 0x04, 0x02],
  '(': [0x00, 0x3E, 0x41, 0x00, 0x00],
  ')': [0x00, 0x41, 0x3E, 0x00, 0x00],
};

class Canvas {
  constructor(w, h, bg = [247, 244, 238]) {
    this.w = w;
    this.h = h;
    this.data = Buffer.alloc(w * h * 3);
    for (let i = 0; i < w * h; i++) {
      this.data[i * 3] = bg[0];
      this.data[i * 3 + 1] = bg[1];
      this.data[i * 3 + 2] = bg[2];
    }
  }

  setPixel(x, y, color) {
    if (x < 0 || x >= this.w || y < 0 || y >= this.h) return;
    const idx = (y * this.w + x) * 3;
    this.data[idx] = color[0];
    this.data[idx + 1] = color[1];
    this.data[idx + 2] = color[2];
  }

  fillRect(x, y, w, h, color) {
    const x0 = Math.max(0, Math.floor(x));
    const y0 = Math.max(0, Math.floor(y));
    const x1 = Math.min(this.w, Math.floor(x + w));
    const y1 = Math.min(this.h, Math.floor(y + h));
    for (let py = y0; py < y1; py++) {
      for (let px = x0; px < x1; px++) {
        this.setPixel(px, py, color);
      }
    }
  }

  drawRect(x, y, w, h, border, color) {
    this.fillRect(x, y, w, border, color);
    this.fillRect(x, y + h - border, w, border, color);
    this.fillRect(x, y, border, h, color);
    this.fillRect(x + w - border, y, border, h, color);
  }

  fillCircle(cx, cy, r, color) {
    const x0 = Math.max(0, Math.floor(cx - r));
    const y0 = Math.max(0, Math.floor(cy - r));
    const x1 = Math.min(this.w, Math.ceil(cx + r));
    const y1 = Math.min(this.h, Math.ceil(cy + r));
    const r2 = r * r;
    for (let py = y0; py <= y1; py++) {
      for (let px = x0; px <= x1; px++) {
        const dx = px - cx;
        const dy = py - cy;
        if (dx * dx + dy * dy <= r2) {
          this.setPixel(px, py, color);
        }
      }
    }
  }

  drawCircle(cx, cy, r, border, color) {
    const rOuter = r * r;
    const rInner = (r - border) * (r - border);
    const x0 = Math.max(0, Math.floor(cx - r));
    const y0 = Math.max(0, Math.floor(cy - r));
    const x1 = Math.min(this.w, Math.ceil(cx + r));
    const y1 = Math.min(this.h, Math.ceil(cy + r));
    for (let py = y0; py <= y1; py++) {
      for (let px = x0; px <= x1; px++) {
        const d2 = (px - cx) * (px - cx) + (py - cy) * (py - cy);
        if (d2 <= rOuter && d2 >= rInner) {
          this.setPixel(px, py, color);
        }
      }
    }
  }

  fillGradientV(x, y, w, h, c1, c2) {
    for (let py = 0; py < h; py++) {
      const t = py / h;
      const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
      const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
      const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);
      this.fillRect(x, y + py, w, 1, [r, g, b]);
    }
  }

  drawChar(ch, x, y, scale, color) {
    const upper = ch.toUpperCase();
    const cols = FONT[upper] || FONT[' '];
    for (let col = 0; col < 5; col++) {
      const bitCol = cols[col];
      for (let row = 0; row < 7; row++) {
        if ((bitCol >> row) & 1) {
          this.fillRect(x + col * scale, y + row * scale, scale, scale, color);
        }
      }
    }
  }

  measureText(str, scale) {
    return str.length * 6 * scale;
  }

  drawText(str, x, y, scale, color) {
    let curX = x;
    for (let i = 0; i < str.length; i++) {
      this.drawChar(str[i], curX, y, scale, color);
      curX += 6 * scale;
    }
  }

  drawTextCentered(str, cx, y, scale, color) {
    const w = this.measureText(str, scale);
    this.drawText(str, Math.round(cx - w / 2), y, scale, color);
  }

  drawBadge(str, cx, cy, scale, bgColor, fgColor) {
    const textW = this.measureText(str, scale);
    const textH = 7 * scale;
    const padX = scale * 4;
    const padY = scale * 3;
    const bx = Math.round(cx - textW / 2 - padX);
    const by = Math.round(cy - textH / 2 - padY);
    const bw = textW + padX * 2;
    const bh = textH + padY * 2;
    this.fillRect(bx, by, bw, bh, bgColor);
    this.drawRect(bx, by, bw, bh, Math.max(1, Math.floor(scale / 2)), [bgColor[0]*0.8, bgColor[1]*0.8, bgColor[2]*0.8]);
    this.drawText(str, bx + padX, by + padY, scale, fgColor);
  }

  toPng() {
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(this.w, 0);
    ihdr.writeUInt32BE(this.h, 4);
    ihdr[8] = 8;
    ihdr[9] = 2; // RGB
    ihdr[10] = 0;
    ihdr[11] = 0;
    ihdr[12] = 0;

    const rowSize = 1 + this.w * 3;
    const raw = Buffer.alloc(this.h * rowSize);
    for (let py = 0; py < this.h; py++) {
      const rowOffset = py * rowSize;
      raw[rowOffset] = 0; // Filter 0
      const srcOffset = py * this.w * 3;
      this.data.copy(raw, rowOffset + 1, srcOffset, srcOffset + this.w * 3);
    }

    const idat = zlib.deflateSync(raw, { level: 9 });
    return Buffer.concat([
      signature,
      chunk('IHDR', ihdr),
      chunk('IDAT', idat),
      chunk('IEND', Buffer.alloc(0))
    ]);
  }
}

// Palette
const INK = [26, 25, 24];
const PAPER = [247, 244, 238];
const SAND = [235, 229, 216];
const WARM_GRAY = [215, 208, 195];
const BRAND_RED = [217, 56, 41];
const WHITE = [255, 255, 255];
const MUTED = [120, 115, 105];

const outDir = path.join(__dirname, 'public', 'images');
fs.mkdirSync(outDir, { recursive: true });

function save(name, canvas) {
  const p = path.join(outDir, name);
  fs.writeFileSync(p, canvas.toPng());
  console.log(`Saved ${name} (${canvas.w}x${canvas.h})`);
}

// 1. HERO MAIN (800x600)
{
  const c = new Canvas(800, 600, PAPER);
  c.drawRect(24, 24, 752, 552, 2, WARM_GRAY);
  c.drawRect(32, 32, 736, 536, 1, SAND);

  // Top header bar
  c.fillRect(34, 34, 732, 48, SAND);
  c.drawText('DEMO ACADEMY  //  EDITORIAL ARCHIVE № 2026', 56, 52, 2, INK);

  // Center display area
  c.fillGradientV(56, 104, 688, 380, [242, 238, 228], [230, 223, 208]);
  c.drawRect(56, 104, 688, 380, 2, WARM_GRAY);

  // Geometric illustrations (book, desk, chalkboard elements)
  c.fillRect(100, 160, 280, 260, [220, 212, 196]);
  c.drawRect(100, 160, 280, 260, 2, INK);
  c.fillRect(120, 180, 240, 16, BRAND_RED);
  c.drawText('IELTS PREPARATION', 130, 184, 2, WHITE);
  c.fillRect(120, 216, 200, 8, INK);
  c.fillRect(120, 236, 220, 8, MUTED);
  c.fillRect(120, 256, 180, 8, MUTED);
  c.fillRect(120, 276, 210, 8, MUTED);

  // Score badge card
  c.fillRect(120, 316, 100, 80, INK);
  c.drawText('BAND', 145, 332, 2, PAPER);
  c.drawText('8.5', 142, 356, 4, BRAND_RED);

  c.fillRect(240, 316, 120, 80, WHITE);
  c.drawRect(240, 316, 120, 80, 1, INK);
  c.drawText('DEMO SCORE', 252, 332, 1, INK);
  c.drawText('VERIFIED', 252, 350, 2, INK);
  c.drawText('OCT 2026', 252, 374, 1, MUTED);

  // Big right card
  c.fillRect(420, 140, 280, 300, INK);
  c.drawBadge('DEMO PREVIEW', 560, 180, 2, BRAND_RED, WHITE);
  c.drawTextCentered('DEMO CLASSROOM', 560, 230, 3, WHITE);
  c.drawTextCentered('STUDENT STUDY SUITE', 560, 265, 2, SAND);

  // Decorative grid lines inside card
  for (let y = 310; y <= 400; y += 22) {
    c.fillRect(450, y, 220, 2, [60, 58, 55]);
  }
  c.drawTextCentered('AUTHENTIC DEMO CONTENT', 560, 350, 2, BRAND_RED);

  // Bottom footer label
  c.drawBadge('SAMPLE IMAGE - FOR DEMONSTRATION ONLY', 400, 524, 2, INK, PAPER);

  save('hero-main.png', c);
}

// 2. ABOUT STORY (800x600)
{
  const c = new Canvas(800, 600, PAPER);
  c.drawRect(20, 20, 760, 560, 2, INK);
  c.fillRect(36, 36, 728, 528, [240, 235, 224]);
  c.drawRect(36, 36, 728, 528, 1, WARM_GRAY);

  c.drawText('SECTION 01 // ORIGIN & METHOD', 60, 60, 2, INK);
  c.fillRect(60, 80, 680, 2, INK);

  // Left board illustration
  c.fillRect(60, 110, 340, 420, INK);
  c.drawRect(70, 120, 320, 400, 1, [70, 68, 65]);
  c.drawBadge('DEMO FACULTY DESK', 230, 160, 2, BRAND_RED, WHITE);
  c.drawTextCentered('TEACHING IN BANGLA', 230, 220, 2, WHITE);
  c.drawTextCentered('TESTING IN ENGLISH', 230, 245, 2, SAND);

  // Blueprint diagram
  c.drawCircle(230, 340, 60, 2, BRAND_RED);
  c.drawCircle(230, 340, 40, 1, SAND);
  c.drawTextCentered('CORE METHOD', 230, 335, 1, WHITE);
  c.drawTextCentered('DEMO PROTOCOL', 230, 440, 2, [180, 175, 165]);

  // Right card: manifesto
  c.fillRect(430, 110, 310, 420, WHITE);
  c.drawRect(430, 110, 310, 420, 2, INK);
  c.drawBadge('THE DEMO MANIFESTO', 585, 150, 2, SAND, INK);

  const rules = [
    '01. DEMO CURRICULUM',
    '02. STRUCTURED SESSIONS',
    '03. PRACTICE FEEDBACK',
    '04. TIMED EVALUATIONS',
    '05. PROGRESS AUDITS'
  ];
  rules.forEach((r, idx) => {
    const ry = 200 + idx * 55;
    c.fillRect(455, ry, 260, 38, [248, 245, 240]);
    c.drawRect(455, ry, 260, 38, 1, WARM_GRAY);
    c.drawText(r, 470, ry + 13, 2, INK);
  });

  save('about-story.png', c);
}

// 3. SUCCESS WALL (800x600)
{
  const c = new Canvas(800, 600, [22, 21, 20]);
  c.drawRect(20, 20, 760, 560, 2, [55, 52, 48]);

  c.drawBadge('VERIFIED RESULTS', 400, 65, 2, BRAND_RED, WHITE);
  c.drawTextCentered('DEMO CANDIDATE WALL OF PROOF', 400, 105, 3, PAPER);
  c.drawTextCentered('SAMPLE STUDENT BAND SCORE REVIEWS', 400, 138, 2, [160, 155, 145]);

  const cards = [
    { name: 'DEMO CANDIDATE 01', from: 'BAND 5.5', to: '8.0', track: 'IELTS FULL' },
    { name: 'DEMO CANDIDATE 02', from: 'BAND 6.0', to: '8.5', track: 'CRASH BATCH' },
    { name: 'DEMO CANDIDATE 03', from: 'BAND 5.0', to: '7.5', track: 'SPOKEN LAB' },
    { name: 'DEMO CANDIDATE 04', from: 'BAND 6.5', to: '8.0', track: 'FOUNDATION' },
  ];

  cards.forEach((cd, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 50 + col * 360;
    const y = 180 + row * 185;

    c.fillRect(x, y, 340, 165, [35, 33, 31]);
    c.drawRect(x, y, 340, 165, 1, [70, 66, 60]);

    c.drawText(cd.name, x + 20, y + 22, 2, PAPER);
    c.drawText(cd.track, x + 20, y + 44, 1, MUTED);

    // Score progression
    c.fillRect(x + 20, y + 68, 130, 70, [26, 25, 24]);
    c.drawText('INITIAL', x + 35, y + 80, 1, MUTED);
    c.drawText(cd.from, x + 35, y + 98, 2, [190, 185, 175]);

    c.fillRect(x + 170, y + 68, 145, 70, BRAND_RED);
    c.drawText('FINAL RESULT', x + 185, y + 80, 1, [255, 220, 215]);
    c.drawText(cd.to, x + 185, y + 98, 3, WHITE);
  });

  c.drawBadge('DEMO TESTIMONIAL CERTIFICATE VAULT', 400, 545, 2, [45, 43, 40], SAND);
  save('success-wall.png', c);
}

// Helper for Course Covers (600x400)
function generateCourseCover(filename, code, title, subtitle, accentColor) {
  const c = new Canvas(600, 400, PAPER);
  c.drawRect(16, 16, 568, 368, 2, INK);

  // Top header stripe
  c.fillRect(20, 20, 560, 50, accentColor);
  c.drawText(`DEMO COURSE // ${code}`, 40, 38, 2, WHITE);

  // Main canvas block
  c.fillGradientV(36, 90, 528, 220, [245, 240, 232], [232, 225, 212]);
  c.drawRect(36, 90, 528, 220, 1, WARM_GRAY);

  c.drawBadge('SYLLABUS 2026', 120, 130, 2, INK, WHITE);
  c.drawText(title, 56, 170, 3, INK);
  c.drawText(subtitle, 56, 205, 2, MUTED);

  // Decorative badges & stamps
  c.fillRect(56, 240, 140, 36, WHITE);
  c.drawRect(56, 240, 140, 36, 1, INK);
  c.drawText('36 SESSIONS', 72, 252, 2, INK);

  c.fillRect(210, 240, 160, 36, WHITE);
  c.drawRect(210, 240, 160, 1, INK);
  c.drawText('MOCK EXAMS INCL.', 220, 252, 2, INK);

  // Right stamp
  c.drawCircle(480, 200, 55, 3, accentColor);
  c.drawTextCentered('DEMO', 480, 185, 2, accentColor);
  c.drawTextCentered('OFFICIAL', 480, 205, 1, INK);

  // Bottom footer bar
  c.fillRect(20, 330, 560, 48, INK);
  c.drawTextCentered('SAMPLE DEMO COURSE MATERIAL', 300, 348, 2, PAPER);

  save(filename, c);
}

generateCourseCover('course-ielts.png', 'MOD-01', 'IELTS COMPLETE', 'COMPREHENSIVE 4-MODULE PROGRAM', BRAND_RED);
generateCourseCover('course-crash.png', 'MOD-02', 'IELTS CRASH SPRINT', 'INTENSIVE 30-DAY EXAM BOOSTER', [190, 45, 35]);
generateCourseCover('course-spoken.png', 'MOD-03', 'SPOKEN FLUENCY', 'REAL DIALOGUE & PRONUNCIATION', [45, 95, 155]);
generateCourseCover('course-foundation.png', 'MOD-04', 'ENGLISH FOUNDATION', 'GRAMMAR, SENTENCE & VOCABULARY', [60, 120, 80]);
generateCourseCover('course-mock.png', 'MOD-05', 'MOCK EXAM SERIES', 'STRICT TIMED EXAM SIMULATION', [90, 70, 120]);

// Helper for Instructor Portraits (500x500)
function generateInstructorPortrait(filename, code, title, role) {
  const c = new Canvas(500, 500, PAPER);
  c.drawRect(16, 16, 468, 468, 2, INK);
  c.drawRect(24, 24, 452, 452, 1, SAND);

  // Background portrait silhouette shape
  c.fillGradientV(50, 50, 400, 320, [238, 232, 220], [220, 212, 196]);
  c.drawRect(50, 50, 400, 320, 1, WARM_GRAY);

  // Draw stylized silhouette (head + body)
  c.fillCircle(250, 140, 55, INK);
  c.fillCircle(250, 140, 51, [45, 43, 40]);

  // Neck and shoulders
  c.fillRect(235, 190, 30, 30, INK);
  c.fillCircle(250, 310, 120, INK);
  c.fillRect(100, 280, 300, 90, INK);

  // Tie or collar accent
  c.fillRect(245, 220, 10, 40, BRAND_RED);

  // Badges over portrait
  c.drawBadge(`DEMO INSTRUCTOR // ${code}`, 250, 80, 2, INK, WHITE);
  c.drawBadge('FACULTY MEMBER', 250, 350, 2, BRAND_RED, WHITE);

  // Bottom caption area
  c.fillRect(16, 390, 468, 94, INK);
  c.drawTextCentered(title, 250, 412, 3, WHITE);
  c.drawTextCentered(role, 250, 444, 2, SAND);

  save(filename, c);
}

generateInstructorPortrait('teacher-1.png', '01', 'DEMO INSTRUCTOR A', 'SENIOR WRITING & READING COACH');
generateInstructorPortrait('teacher-2.png', '02', 'DEMO INSTRUCTOR B', 'SPEAKING & LISTENING LEAD');

// Helper for Student Avatars (300x300)
function generateAvatar(filename, code, label) {
  const c = new Canvas(300, 300, PAPER);
  c.drawCircle(150, 150, 138, 2, INK);
  c.fillCircle(150, 150, 134, [236, 230, 218]);

  // Head
  c.fillCircle(150, 105, 42, INK);
  // Shoulders
  c.fillCircle(150, 240, 85, INK);

  // Label tag
  c.fillRect(40, 220, 220, 42, BRAND_RED);
  c.drawRect(40, 220, 220, 42, 1, WHITE);
  c.drawTextCentered(`DEMO STUDENT ${code}`, 150, 234, 2, WHITE);

  save(filename, c);
}

generateAvatar('avatar-1.png', '01', 'DEMO CANDIDATE');
generateAvatar('avatar-2.png', '02', 'DEMO CANDIDATE');
generateAvatar('avatar-3.png', '03', 'DEMO CANDIDATE');
generateAvatar('avatar-4.png', '04', 'DEMO CANDIDATE');

console.log('All 13 demo images generated successfully!');
