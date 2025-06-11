# tqdm.ismailov.uz

"tqdm.ismailov.uz" — bu talabalar uchun taqdimotlar (PPTX) va referatlarni (DOCX) bepul qidirish hamda yuklab olish imkonini beruvchi mini qidiruv tizimining statik veb sayti. Loyiha HTML, CSS va JavaScript’dan foydalangan holda yaratilgan va backend sifatida `https://api.tqdm.ismailov.uz` API’ga murojaat qiladi.

## Asosiy imkoniyatlar

- **Qidiruv** — foydalanuvchi matn kiritib, hujjat turini tanlaydi: `taqdimotlar` (PPTX) yoki `referatlar` (DOCX). Natijalar API’dan olinadi va sahifada ko‘rsatiladi.
- **Sahifalash** — har bir sahifada 10 tagacha natija chiqadi; `Next` va `Prev` tugmalari yordamida boshqa sahifalarga o‘tish mumkin.
- **Yuklab olish** — har bir natija ostida Telegram bot havolasi (`t.me/taqdimot_robot`) beriladi. Shu havola orqali tegishli hujjatni yuklab olish mumkin.
- **Dark mode** — sahifa yuqorisidagi oynacha (oy/sun belgi) orqali qorong‘i va yorug‘ rejimlarini almashtirish mumkin.
- **SEO va ijtimoiy tarmoqlar uchun meta teglar** — sahifada to‘liq meta ma’lumotlar to‘plami mavjud bo‘lib, saytdan link ulashganda sarlavha va tavsif to‘g‘ri aks etadi.

## Foydalanish qo‘llanmasi

1. **Lokal ishga tushirish**
   - Kodni klonlagach, oddiy statik serverda yoki bevosita brauzerda `index.html` faylini ochish kifoya.
   - API `https://api.tqdm.ismailov.uz` domenida joylashgani sababli, CORS muammo tug‘dirmaydi.
2. **Qidiruvdan foydalanish**
   - "Hujjat mavzusi..." maydoniga kerakli kalit so‘zlarni kiriting.
   - "Taqdimotlar" yoki "Referatlar" toifasini tanlang.
   - "Qidirish" tugmasini bosgach, natijalar ro‘yxati paydo bo‘ladi.
3. **Natijalarni ko‘rish va yuklab olish**
   - Natija kartasida mavzu nomi va (taqdimotlar uchun) rasmli/rasmsiz ekanligi ko‘rsatiladi.
   - Yuklab olish belgisiga bosish orqali Telegram bot orqali faylni olish mumkin.

## Fayl tuzilmasi

```
├── index.html   – asosiy sahifa
├── styles.css   – dizayn va maket
├── script.js    – funksional qism (qidiruv, sahifalash, dark mode)
├── images/
│   └── avatar.jpg – sarlavha va ijtimoiy tarmoqlar uchun rasm
└── favicon.ico  – brauzer yorlig‘i uchun belgi
```

## Xisqa texnik ma’lumot

- **API**: `GET https://api.tqdm.ismailov.uz/search`
  - Parametrlar: `text` – qidiruv matni, `type` – `pptx` yoki `docx`, `page` – sahifa raqami, `randomize` – tasodifiy tartib (foydalanilmagan).
- **Frontend**: sof HTML/CSS/JavaScript. Hech qanday ramkalar (framework) ishlatilmagan.
- **Sahifalash**: API 10 tadan natija qaytargan deb qabul qilinadi; natijalarga qarab sahifalash tugmalari yoqiladi yoki o‘chiriladi.

## Hissa qo‘shish

Loyiha ochiq va siz o‘z takliflaringizni yuborishingiz mumkin. `issues` ochish yoki `pull request` yuborish orqali loyiha rivojiga hissa qo‘shishingiz mumkin.

## Muallif

Diyorbek Ismoilov – [@deeorback](https://github.com/deeorback). Loyiha UniquePros jamoasi tomonidan qo‘llab-quvvatlanadi.

Loyihani o‘rnatib, ishlatish hamda kengaytirish bo‘yicha savollaringiz bo‘lsa, muallifga murojaat qiling.
