# Product

## Register

brand

## Users

**HR / Recruiter (primary, quick-scan mode)**
ดู portfolio ผ่านลิงก์ใน LINE หรืออีเมล ใช้เวลา 10–20 วินาทีในการตัดสินใจ ต้องการเห็น: ใครคือคนนี้, ทำอะไรได้, ติดต่อได้ทางไหน — โดยไม่ต้อง scroll มาก

**Tech Lead / Developer (secondary, detail mode)**
เปิด portfolio หลังเห็น resume แล้ว ต้องการอ่านโปรเจกต์ละเอียด ดู tech stack, ประเมินระดับทักษะจริง และตรวจสอบว่าโค้ดหรือ live demo ดีไหม

## Product Purpose

Portfolio ส่วนตัวของ **ธีรนาฏ เป็นใย (PIPO)** Junior Frontend Developer และ Mobile Developer (Flutter) — เพื่อหางานในบริษัท IT ไทยกลุ่ม startup และ digital agency

ความสำเร็จคือ: ผู้เยี่ยมชมดาวน์โหลด resume หรือกดติดต่อภายใน 30 วินาที และ tech lead เชื่อมั่นในทักษะจาก portfolio โปรเจกต์จริง

## Brand Personality

**มืออาชีพ · เชื่อถือได้ · เติบโตไว**

Tone: ตรงไปตรงมา อบอุ่นพอที่จะเป็น "คน" ไม่ใช่แค่ resume มีชีวิต มั่นใจในทักษะโดยไม่โอ้อวด พร้อมเรียนรู้และรับ feedback

Emotional goal: ผู้ดูรู้สึกว่า "คนนี้ทำงานได้จริง และคุยด้วยง่าย" ไม่ใช่ "impressive แต่ไม่รู้จะเอาไปใช้ยังไง"

## Anti-references

- **Template AI ทั่วไป** — gradient text, floating badges, purple/violet palette, everything-centered layout, ทุก section มี eyebrow label เหมือนกัน
- **มืดหนักเกินไป** — dark background + glow effects ที่ดูน่ากลัวหรือ gaming-portfolio
- **เรียบจนไม่มีตัวตน** — white background + gray text ล้วน ไม่มีจุดดึงดูดสายตา ดูเหมือน CV ธรรมดา

Reference ที่ดี: [Linear.app](https://linear.app) (precision + whitespace), [Vercel](https://vercel.com) (clean dark/light, confident typography)

## Design Principles

1. **Craft shows craft** — Portfolio ของ developer ต้องพิสูจน์ทักษะผ่าน UI ของตัวเอง ทุก component ที่ทำงานดีคือตัวอย่างงาน ไม่ใช่แค่คำบอกเล่า
2. **Speed reads first** — HR อ่านใน 10 วินาที ข้อมูลที่สำคัญที่สุดต้องอยู่บนสุดและมองเห็นได้โดยไม่ scroll
3. **Precision over decoration** — ใช้ whitespace และ typography สร้าง hierarchy แทน effects ทุก element ต้องหาเหตุผลสนับสนุนได้
4. **Human inside the code** — Technical แต่ยังมีตัวตน ชื่อ ภาษา น้ำเสียง และการเล่าเรื่องโปรเจกต์ต้องสะท้อนว่าเป็น "ปีโป้" ไม่ใช่แค่ CV ออนไลน์
5. **Confidence, not performance** — ไม่ต้องแสดงทุกอย่างใน Hero เลือกแสดงสิ่งที่ดีที่สุด ความเรียบง่ายที่มีเจตนาดูมืออาชีพกว่า animation ที่ไม่มีความหมาย

## Accessibility & Inclusion

- WCAG AA minimum: body text contrast ≥ 4.5:1, large text/bold ≥ 3:1
- Reduced motion: animation ทั้งหมดต้องมี `@media (prefers-reduced-motion: reduce)` fallback
- ภาษาหลัก: ไทย (`lang="th"`) — ต้องรองรับ Thai font rendering
- Touch targets ≥ 44px สำหรับ mobile
