# Digital Grooming Game

Game naratif interaktif berbasis pilihan (choice-based narration game) yang bertujuan mengedukasi remaja mengenai fenomena digital grooming dan pentingnya menjaga keamanan dalam berinteraksi di dunia digital.

Pemain akan mengikuti perjalanan seorang siswi bernama **Melati** yang secara perlahan terjebak dalam hubungan online yang tampak nyaman dan suportif, namun sebenarnya mengandung tanda-tanda digital grooming.

---

## Tujuan Project

- Memberikan edukasi mengenai digital grooming melalui media interaktif.
- Membantu pemain mengenali tanda-tanda manipulasi emosional di dunia digital.
- Menyediakan pengalaman belajar yang lebih menarik dibandingkan materi edukasi konvensional.

---

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

---

## Menjalankan Project

Install dependency:

```bash
npm install
```

Menjalankan development server:

```bash
npm run dev
```

Buka browser:

```text
http://localhost:3000
```

---

## Struktur Folder

```text
src/
├── app/
│   ├── page.tsx
│   └── game/
├── components/
│   └── story/
├── data/
│   ├── intro.json
│   ├── day1.json
│   ├── day2.json
│   ├── dm.json
│   └── ending.json
├── hooks/
│   └── useStoryEngine.ts
└── types/
    └── story.ts
```

---

## Story Engine

Cerita disimpan dalam format JSON.

Contoh scene:

```json
{
  "id": "day1_001",
  "type": "dialogue",
  "speaker": "Melati",
  "text": "Aku capek...",
  "next": "day1_002"
}
```

Contoh pilihan:

```json
{
  "id": "choice_001",
  "type": "choice",
  "choices": [
    {
      "label": "Balas Singkat",
      "next": "ending_instinct"
    },
    {
      "label": "Balas Antusias",
      "next": "ending_escape"
    }
  ]
}
```

---

## Progress Saat Ini

### Selesai

- Story Engine
- Scene Navigation
- Choice System
- Save Progress (Local Storage)
- Previous Scene
- Reset Progress
- Dialogue Box
- Narration Box
- Game Controls

### Roadmap

- Background System
- Character Sprite System
- Typewriter Effect
- Sound Effect
- UI Final Design
- Multiple Endings
- Achievement System

---

## Status

Project masih dalam tahap pengembangan awal (prototype).
Aset visual final dan desain UI masih menunggu proses desain.
