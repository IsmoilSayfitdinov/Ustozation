export interface CourseLevel {
  id: string;
  code: string;
  title: string;
  desc: string;
  color: string;
  shadow: string;
  icon: string;
  duration: string;
  fullDesc?: string;
  numberOfLessons?: string;
  topics?: string[];
  outcomes?: string[];
}

export const LEVELS: CourseLevel[] = [
  { 
    id: 'beginner',
    code: 'A1', 
    title: 'Beginner', 
    desc: "Tilin boshlang'ich tushunchalari va alifboni o'rganish.", 
    fullDesc: "Ingliz tilini mutlaqo noldan boshlovchilar uchun mo'ljallangan kurs. Alifbo, asosiy so'zlar, oddiy iboralar va kundalik hayotda ishlatiladigan gaplarni o'rganasiz.",
    color: 'from-emerald-400 to-emerald-600',
    shadow: 'shadow-emerald-500/20',
    icon: 'child_care',
    duration: '2 oy',
    numberOfLessons: '24 ta dars',
    topics: [
      "Alifbo va talaffuz asoslari",
      "O'zini tanishtirish",
      "Raqamlar, ranglar, kunlar",
      "Oila va do'stlar haqida gapirish",
      "Oddiy present tense",
      "Kundalik iboralar"
    ],
    outcomes: [
      "O'zingizni ingliz tilida tanishtira olasiz",
      "Oddiy savollar bera olasiz",
      "Asosiy kundalik iboralarni tushunasiz",
      "Elementary darajaga tayyor bo'lasiz"
    ]
  },
  { 
    id: 'elementary',
    code: 'A2', 
    title: 'Elementary', 
    desc: 'Kundalik suhbatlar va oddiy matnlarni tushunish.', 
    fullDesc: "Oddiy gaplar tuzish va kundalik suhbatlar uchun zaruriy bilimlarni shakllantirish bosqichi.",
    color: 'from-blue-400 to-blue-600',
    shadow: 'shadow-blue-500/20',
    icon: 'chat_bubble',
    duration: '2 oy',
    numberOfLessons: '24 ta dars',
    topics: [
      "O'tgan zamon (Past Simple)",
      "Kelasi zamon (Future Simple)",
      "Sifatlar va solishtirish",
      "Sayohat va xarid qilish",
      "Sog'liq va turmush tarzi",
      "Kengaytirilgan lug'at boyligi"
    ],
    outcomes: [
      "Oddiy suhbatlarni bemalol yurita olasiz",
      "Qisqa matnlarni tushunib o'qiysiz",
      "Sayohat paytida muloqot qila olasiz",
      "Pre-Intermediate bosqichiga o'tasiz"
    ]
  },
  { 
    id: 'pre-int',
    code: 'B1', 
    title: 'Pre-Int', 
    desc: 'Grammatikani chuqur mustahkamlash bosqichi.', 
    fullDesc: "Murakkab mavzular va grammatikaga kirish. Tilni erkinroq ishlatishni boshlaysiz.",
    color: 'from-orange-400 to-orange-600',
    shadow: 'shadow-orange-500/20',
    icon: 'menu_book',
    duration: '3 oy',
    numberOfLessons: '36 ta dars',
    topics: [
      "Present Perfect vs Past Simple",
      "Modal fe'llar",
      "Passiv ovoz (Passive Voice)",
      "Shart Ergash Gaplar (Conditionals)",
      "Ish va karyera mavzulari",
      "Fikir bildirish va bahslashish"
    ],
    outcomes: [
      "Asosiy mavzularda erkin gaplasha olasiz",
      "Xat va e-mail yozishni o'rganasiz",
      "Filmlarni subtitr bilan tushunasiz",
      "Intermediate darajaga yetasiz"
    ]
  },
  { 
    id: 'intermediate',
    code: 'B2', 
    title: 'Intermediate', 
    desc: 'Erkin muloqot va akademik fikr bildirish.', 
    fullDesc: "Erkin gaplashish va yozish ko'nikmalari. Akademik va professional tilga kirish.",
    color: 'from-purple-400 to-purple-600',
    shadow: 'shadow-purple-500/20',
    icon: 'forum',
    duration: '3 oy',
    numberOfLessons: '36 ta dars',
    topics: [
      "Murakkab zamonlar",
      "Uchinchi va aralash conditionalar",
      "Akademik yozish asoslari",
      "Abstrakt mavzular tushunchasi",
      "Debatlar va notiqlik",
      "Advanced lug'at"
    ],
    outcomes: [
      "O'z fikringizni batafsil tushuntira olasiz",
      "Murakkab matnlarning mazmunini anglaysiz",
      "Tug'ma so'zlashuvchilar bilan bemalol gaplashasiz",
      "Advanced darajaga tayyor bo'lasiz"
    ]
  },
  { 
    id: 'advanced',
    code: 'C1', 
    title: 'Advanced', 
    desc: 'IELTS 7.5+ va professional darajaga tayyorgarlik.', 
    fullDesc: "IELTS tayyorgarlik va professional English. Oliy darajadagi til ko'nikmalari.",
    color: 'from-rose-400 to-rose-600',
    shadow: 'shadow-rose-500/20',
    icon: 'school',
    duration: '4+ oy',
    numberOfLessons: '48+ ta dars',
    topics: [
      "IELTS strategiyalari",
      "Murakkab insholar yozish",
      "Kengaytirilgan lug'at va idiomalari",
      "Ma'ruzalar va ilmiy maqolalar",
      "Badiiy adabiyot tahlili",
      "Professional aloqa"
    ],
    outcomes: [
      "IELTS dan 7.0-7.5+ ball olish imkoniyati",
      "Har qanday mavzuda akademik darajada gapirasiz",
      "Xorijiy universitetlarda o'qiy olasiz",
      "Tish darajasini mukammal egallaysiz"
    ]
  },
];
