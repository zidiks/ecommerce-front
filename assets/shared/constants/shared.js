export let productsContent = [
  {
    name: 'Montale Oud Tobacco',
    img: require('~/static/img/montale-tobacco.png'),
    vol: '50 МЛ.',
    price: '166.90',
  },
  {
    name: 'Versace Versense',
    img: require('~/static/img/versace-versense.png'),
    vol: '50 МЛ.',
    priceOld: '204.60',
    price: '179.60',
  },
  {
    name: 'Bvlgari Rose Goldea',
    img: require('~/static/img/bulgari-rose.png'),
    vol: '20 МЛ.',
    price: '212.60',
  },
  {
    name: 'Oscar de la Renta Bella Blanca',
    img: require('~/static/img/oscar-delarenta.png'),
    vol: '100 МЛ.',
    price: '239.10',
  },
  {
    name: 'Benetton United Dreams Men Aim...',
    img: require('~/static/img/benetton-united.png'),
    vol: '60 МЛ.',
    price: '58.00',
  },
  {
    name: 'Antonio Banderas Her Secret Te...',
    img: require('~/static/img/antonio-banderas.png'),
    vol: '50 МЛ.',
    price: '61.60',
  },
  {
    name: 'Christian Dior Homme Intense',
    img: require('~/static/img/dior-homme.png'),
    vol: '50 МЛ.',
    price: '412.10',
  },
  {
    brand: 'Montale',
    name: 'Montale Roses Elixir',
    type: 'Парфюмерная вода',
    year: '2010',
    country: 'Франция',
    made: 'Европейский Союз',
    perfumer: 'Pierre Montale',
    aromas: ['Цветочные', 'фруктовые'],
    baseNotes: ['Мускус', 'амбра', 'ваниль'],
    startNotes: ['Клубника', 'листок клубники', 'цитрусы'],
    midNotes: ['Цветок апельсина', 'роза', 'жасмин'],
    season: 'Весна',
    daytime: 'День',
    strength: ['75% (стойкий)', '71% (заметный)'],
    vol: '50 МЛ.',
    priceOld: '201.37',
    price: '120.50',
    sex: 'Для женщин',
    img: require('~/static/img/montale-roses.png'),
  },
  {
    name: 'Zarkoperfume PINK MOLeCULE 09...',
    img: require('~/static/img/zarkoperfume-pink.png'),
    vol: '30 МЛ.',
    price: '144.60',
  },
  {
    name: 'Hugo Boss Alive',
    img: require('~/static/img/hugo-alive.png'),
    vol: '80 МЛ.',
    price: '308.40',
  },
  {
    name: 'Gucci Flora Emerald Gardenia',
    img: require('~/static/img/gucci-flora.png'),
    vol: '20 МЛ.',
    price: '212.60',
  },
  {
    name: 'Nishane Hacivat',
    img: require('~/static/img/nishane-hacivat.png'),
    vol: '50 МЛ.',
    price: '350.80',
  },
  {
    name: 'Lalique Encre Noire Sport',
    img: require('~/static/img/lalique-encre.png'),
    vol: '100 МЛ.',
    priceOld: '259.62',
    price: '120.50',
  },
  {
    name: 'Byredo Bal d\'Afrique',
    img: require('~/static/img/byredo-bal.png'),
    vol: '50 МЛ.',
    price: '451.60',
  },
  {
    name: 'Yves Saint Laurent Jumpsuit',
    img: require('~/static/img/yves-jumpsuit.png'),
    vol: '125 МЛ.',
    price: '1057.60',
  },
  {
    name: 'Jo Malone London Scarlet Popp...',
    img: require('~/static/img/malone-london.png'),
    vol: '100 МЛ.',
    price: '677.40',
  },
]

export let pageNumbers = [
  1, 2, 3, 4, 5, 6, 7, 8,
]

export let sliderContent = [
  [
    '/img/slider-1.png',
    '/img/slider-2.png',
    '/img/slider-3.png',
  ],
  [
    '/img/slider-1.png',
    '/img/slider-2.png',
    '/img/slider-3.png',
  ],
  [
    '/img/slider-1.png',
    '/img/slider-2.png',
    '/img/slider-3.png',
  ],
  [
    '/img/slider-1.png',
    '/img/slider-2.png',
    '/img/slider-3.png',
  ],
]

export let alsoContent = [
  {
    name: 'Montale Oud Tobacco',
    img: require('~/static/img/montale-tobacco.png'),
    vol: '50 МЛ.',
    price: '166.90',
  },
]

export let cartContent = [
  {
    amount: 1,
    brand: 'Montale',
    name: 'Montale Roses Elixir',
    type: 'Парфюмерная вода',
    year: '2010',
    country: 'Франция',
    made: 'Европейский Союз',
    perfumer: 'Pierre Montale',
    aromas: ['Цветочные', 'фруктовые'],
    baseNotes: ['Мускус', 'амбра', 'ваниль'],
    startNotes: ['Клубника', 'листок клубники', 'цитрусы'],
    midNotes: ['Цветок апельсина', 'роза', 'жасмин'],
    season: 'Весна',
    daytime: 'День',
    strength: ['75% (стойкий)', '71% (заметный)'],
    vol: '50 МЛ.',
    priceOld: '201.37',
    price: '120.50',
    sex: 'Для женщин',
    img: require('~/static/img/montale-roses.png'),
  },
  {
    amount: 1,
    name: 'Versace Versense',
    img: require('~/static/img/versace-versense.png'),
    vol: '50 МЛ.',
    priceOld: '204.60',
    price: '179.60',
  },
  {
    amount: 1,
    name: 'Lalique Encre Noire Sport',
    img: require('~/static/img/lalique-encre.png'),
    vol: '100 МЛ.',
    priceOld: '259.62',
    price: '120.50',
  },
]

let deliveryFields = {
  adress: {
    code: '',
    name: 'АДРЕС',
  },
  commentary: {
    code: '',
    name: 'КОММЕНТАРИИ К ЗАКАЗУ',
  },
  postalIndex: {
    code: '',
    name: 'ИНДЕКС',
  },
  europostAdress: {
    code: '',
    name: 'НОМЕР ИЛИ АДРЕС ВАШЕГО ОТДЕЛЕНИЯ ЕВРОПОЧТЫ',
  },
}

export let deliveryMethods = [
  {
    id: '1',
    name: 'Курьером по Минску',
    description: '– Бесплатная доставка КУРЬЕРОМ по МИНСКУ. <br>\
    – В КОММЕНТАРИЯХ К ЗАКАЗУ УКАЖИТЕ ЖЕЛАЕМУЮ ДАТУ\
     И ВРЕМЯ ДОСТАВКИ ЗАКАЗА КУРЬЕРОМ.',
    media: '',
    fields: [deliveryFields.adress, deliveryFields.commentary],
  },
  {
    id: '2',
    name: 'ПОЧТА',
    description: '– Бесплатная доставка по Беларуси.<br>\
    – Срок 2-3 рабочих дня с момента отправки.<br>\
    – В доставку почтой входит: упаковка, страховка и отправка заказа.<br>\
    – Стоимость наложенного платежа мы берем на себя!<br>\
    – На телефон вы получите SMS сообщение с указанием штрих-кода посылки.',
    media: '',
    fields: [deliveryFields.adress, deliveryFields.postalIndex, deliveryFields.commentary],
  },
  {
    id: '3',
    name: 'ЕВРОПОЧТА',
    description: '– Бесплатная доставка по Беларуси европочтой.<br>\
    – Стоимость наложенного платежа мы берем на себя!<br>\
    – На телефон вы получите SMS сообщение с указанием штрих-кода посылки.',
    media: '',
    fields: [deliveryFields.europostAdress, deliveryFields.commentary],
  },
]

export let catalogueTree = {
  name: 'Каталог',
  handle: 'root',
  media: [],
  description: null,
  productTypeId: null,
  root: true,
  __v: 0,
  _id: "6398219bed9277c29c4eabb3",
  children: [
    {
      name: 'Парфюмерия',
      handle: '',
      media: [],
      description: null,
      productTypeId: null,
      __v: 0,
      _id: '',
      children: [
        {
          name: 'Для кого',
          handle: '',
          media: [],
          description: null,
          productTypeId: null,
          __v: 0,
          _id: '',
          children: [
            {
              name: 'Для мужчин',
              handle: '',
              media: [],
              description: null,
              productTypeId: null,
              __v: 0,
              _id: '',
              children: [],
            },
            {
              name: 'Для женщин',
              handle: '',
              media: [],
              description: null,
              productTypeId: null,
              __v: 0,
              _id: '',
              children: [],
            },
            {
              name: 'Унисекс',
              handle: '',
              media: [],
              description: null,
              productTypeId: null,
              __v: 0,
              _id: '',
              children: [],
            },
          ],
        },
        {
          name: 'Парфюм до -10%',
          handle: '',
          media: [],
          description: null,
          productTypeId: null,
          __v: 0,
          _id: '',
          children: [],
        },
        {
          name: 'Новинки',
          handle: '',
          media: [],
          description: null,
          productTypeId: null,
          __v: 0,
          _id: '',
          children: [],
        },
      ],
    },
    {
      name: 'Пробники',
      handle: '',
      media: [],
      description: null,
      productTypeId: null,
      __v: 0,
      _id: '',
      children: [],
    },
    {
      name: 'Подарочные сертификаты',
      handle: '',
      media: [],
      description: null,
      productTypeId: null,
      __v: 0,
      _id: '',
      children: [],
    },
  ]
}
