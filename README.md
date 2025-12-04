<<<<<<< HEAD
# Backend - MBTI Personality Test API
=======
# Dokumentasi API - KepribadianKU
>>>>>>> a6092d8b5b71895653121b3ff4cfb3e31fd8d5a0

Backend MBTI Personality Test adalah API yang menyediakan fitur tes kepribadian berdasarkan indikator Myers-Briggs Type Indicator (MBTI). API ini memungkinkan pengguna untuk menjawab pertanyaan, menghitung hasil, dan melihat tipe kepribadian mereka.

## Fitur

- Mengambil daftar pertanyaan MBTI
- Mengirimkan jawaban dan mendapatkan hasil tipe kepribadian
- Melihat semua tipe kepribadian MBTI beserta deskripsinya
- Melihat hasil tes terakhir berdasarkan user ID
- Tidak memerlukan autentikasi (public API)

## Teknologi

- Node.js
- Express.js
- MongoDB + Mongoose
- CORS Enabled
- Format data JSON

## Instalasi Lokal

1. Clone repository:
    ```bash
    git clone <repo-url>
    cd <repo-folder>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Buat file `.env` untuk konfigurasi dasar:
    ```env
    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
    ```

4. Jalankan server:
    ```bash
    npm start
    ```

## Endpoint

### `GET /questions`
- **Deskripsi:** Mengambil semua pertanyaan tes MBTI.
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "section": 1,
        "question": "Kamu merasa lebih berenergi setelah menghabiskan waktu sendirian.",
        "target": "I",
        "reverse": false
      }
    ]
  }
  ```

---

### `GET /personalities`
- **Deskripsi:** Mengambil semua tipe kepribadian MBTI beserta informasi detailnya.
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "type": "INTJ",
        "personality": "The Architect",
        "image": "https://example.com/images/intj.png",
        "description": "Pemikir strategis dan visioner yang selalu memiliki rencana untuk masa depan.",
        "career": ["Ilmuwan", "Insinyur", "Perencana Strategi", "Analis Data"],
        "lovers": "Cocok dengan ENFP atau ENTP.",
        "friendship": "Menghargai teman yang cerdas dan berorientasi tujuan.",
        "characteristic": ["Analitis", "Mandiri", "Perfeksionis", "Visioner"]
      }
    ]
  }
  ```

---

### `GET /personalities/:type`
- **Deskripsi:** Mengambil detail tipe kepribadian tertentu berdasarkan kode MBTI (misal: INTJ, ENFP).
- **Parameter:** `type` (string)
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "type": "INTJ",
      "personality": "The Architect",
      "description": "Pemikir strategis dan visioner yang selalu memiliki rencana untuk masa depan."
    }
  }
  ```

---

### `POST /test/submit`
- **Deskripsi:** Mengirimkan jawaban tes dan menghitung hasil tipe kepribadian MBTI.
- **Body (JSON):**
  ```json
  {
    "userId": "opsional_user_id",
    "answers": [
      { "questionId": 0, "score": 5 },
      { "questionId": 1, "score": 3 }
    ]
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "result": {
      "type": "INTJ",
      "scores": {
        "I": 25, "E": 15, "N": 28, "S": 12,
        "F": 18, "T": 22, "J": 30, "P": 10
      },
      "personality": {
        "type": "INTJ",
        "personality": "The Architect",
        "description": "Pemikir strategis dan visioner yang selalu memiliki rencana untuk masa depan."
      }
    }
  }
  ```

---

### `GET /results/:userId`
- **Deskripsi:** Mengambil hasil tes terakhir berdasarkan `userId`.
- **Response:**
  ```json
  {
    "success": true,
    "result": {
      "type": "INTJ",
      "scores": {
        "I": 25, "E": 15, "N": 28, "S": 12,
        "F": 18, "T": 22, "J": 30, "P": 10
      },
      "personality": {
        "type": "INTJ",
        "personality": "The Architect",
        "description": "Pemikir strategis dan visioner yang selalu memiliki rencana untuk masa depan."
      }
    }
  }
  ```

---

## Struktur Data

### Question
```javascript
{
  section: Number,
  question: String,
  target: String,
  reverse: Boolean
}
```

### Personality
```javascript
{
  type: String,
  personality: String,
  image: String,
  description: String,
  career: [String],
  lovers: String,
  friendship: String,
  characteristic: [String]
}
```

### Result
```javascript
{
  userId: String,
  scores: Object,
  type: String,
  createdAt: Date
}
```

---

## Dimensi MBTI

Tes ini mengukur 4 pasangan dimensi utama:

| Dimensi | Arti |
|----------|------|
| **I / E** | Introvert ↔ Ekstrovert |
| **N / S** | Intuition ↔ Sensing |
| **F / T** | Feeling ↔ Thinking |
| **J / P** | Judging ↔ Perceiving |

---

## Penilaian & Skoring

1. Setiap pertanyaan memiliki target dimensi (I, E, N, S, F, T, J, P).
2. Skor jawaban antara **1–5**.
3. Jika `reverse: true`, maka skor dibalik menjadi **(6 - skor)**.
4. Nilai total tiap dimensi dijumlahkan.
5. Dimensi dengan skor lebih tinggi dari setiap pasangan menentukan tipe MBTI.

<<<<<<< HEAD
---
=======
---
>>>>>>> a6092d8b5b71895653121b3ff4cfb3e31fd8d5a0
