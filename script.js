// 建立偶像篩選器控件
const idolSector = document.querySelector('#idolSection')
const idols = [
  'mana',
  'kotono', 'nagisa', 'saki', 'suzu', 'mei',
  'sakura', 'sizuku', 'chisa', 'rei', 'haruko',
  'rui', 'yuu', 'sumire',
  'rio', 'aoi', 'ai', 'kokoro',
  'fran', 'kana', 'miho',
  'miku'
]
for (i = 0; i < idols.length; i++) {
  idolSector.innerHTML += `<div><input type="checkbox" id=${idols[i]} class="avatar" onclick="filter()" checked><label for=${idols[i]} class="idols"><img class="idol" id=${idols[i]} src="avatar/${idols[i]}.png" alt=""></label></div>`
}

// 建立卡池篩選器控件
const cardSector = document.querySelector('#cardSelectSection')
const cardPaths = [
  'mana-01-fes.webp', 'mana-02-fes.webp', 'mana-03-special.webp',
  'kotono-01-normal.webp', 'kotono-02-limited.webp', 'kotono-03-fes.webp', 'kotono-04-limited.webp', 'kotono-05-limited.webp', 'kotono-06-special.webp',
  'nagisa-01-normal.webp', 'nagisa-02-normal.webp', 'nagisa-03-normal.webp', 'nagisa-04-limited.webp', 'nagisa-05-limited.webp',
  'saki-01-normal.webp', 'saki-02-normal.webp', 'saki-03-normal.webp', 'saki-04-limited.webp', 'saki-05-normal.webp',
  'suzu-01-normal.webp', 'suzu-02-normal.webp', 'suzu-03-limited.webp', 'suzu-04-limited.webp', 'suzu-05-normal.webp',
  'mei-01-normal.webp', 'mei-02-limited.webp', 'mei-03-limited.webp', 'mei-04-fes.webp', 'mei-05-normal.webp',
  'sakura-01-normal.webp', 'sakura-02-fes.webp', 'sakura-03-limited.webp', 'sakura-04-limited.webp',
  'sizuku-01-normal.webp', 'sizuku-02-normal.webp', 'sizuku-03-limited.webp', 'sizuku-04-normal.webp',
  'chisa-01-normal.webp', 'chisa-02-limited.webp', 'chisa-03-normal.webp', 'chisa-04-limited.webp',
  'rei-01-normal.webp', 'rei-02-normal.webp', 'rei-03-limited.webp', 'rei-04-normal.webp', 'rei-05-limited.webp',
  'haruko-01-normal.webp', 'haruko-02-limited.webp', 'haruko-03-limited.webp', 'haruko-04-normal.webp', 'haruko-05-limited.webp',
  'rui-01-normal.webp', 'rui-02-normal.webp', 'rui-03-limited.webp', 'rui-04-normal.webp', 'rui-05-special.webp',
  'yuu-01-normal.webp', 'yuu-02-limited.webp', 'yuu-03-limited.webp', 'yuu-04-normal.webp', 'yuu-05-fes.webp',
  'sumire-01-normal.webp', 'sumire-02-normal.webp', 'sumire-03-limited.webp', 'sumire-04-normal.webp', 'sumire-05-fes.webp',
  'rio-01-normal.webp', 'rio-02-normal.webp', 'rio-03-fes.webp', 'rio-04-limited.webp', 'rio-05-limited.webp',
  'aoi-01-normal.webp', 'aoi-02-limited.webp', 'aoi-03-limited.webp', 'aoi-04-normal.webp',
  'ai-01-normal.webp', 'ai-02-limited.webp', 'ai-03-limited.webp', 'ai-04-normal.webp', 'ai-05-limited.webp',
  'kokoro-01-normal.webp', 'kokoro-02-limited.webp', 'kokoro-03-limited.webp', 'kokoro-04-normal.webp',
  'fran-01-fes.webp',
  'kana-01-fes.webp',
  'miho-01-fes.webp',
  'miku-01-special.webp',
]
for (i = 0; i < cardPaths.length; i++) {
  let tags = cardPaths[i].split("-")
  tags[2] = tags[2].split('.')[0]
  cardSector.innerHTML += `<div><input type="checkbox" id=${tags[0] + tags[1]} class="${'cards ' + tags[0] + ' ' + tags[2]}" onclick='check()' unchecked>  <label for=${tags[0] + tags[1]} class="${'img ' + tags[0] + ' ' + tags[2]}"><img id=${tags[0] + tags[1]} src=${'cards/' + cardPaths[i]} alt=""></label></div>`
}

// 建立卡片選擇行為與結果計算
function check() {
  const cardsIHave = document.querySelector("#totalcards")
  const normalCardsIhave = document.querySelector("#normalcards")
  const limitedCardsIhave = document.querySelector("#limitedcards")
  const fesCardsIhave = document.querySelector("#fescards")
  let total = 0
  let totalPercent = 0
  let normal = 0
  let normalPercent = 0
  let limited = 0
  let limitedPercent = 0
  let fes = 0
  let fesPercent = 0
  let totalcards = document.querySelectorAll(".cards");
  let normalcards = document.querySelectorAll(".cards.normal")
  let limitedcards = document.querySelectorAll(".cards.limited")
  let fesCards = document.querySelectorAll(".cards.fes")
  // 總所持率
  for (let i = 0; i < totalcards.length; i++) {
    if (totalcards[i].checked) {
      total++;
    }
  }
  totalPercent = (total / 88 * 100).toFixed(1)
  cardsIHave.textContent = `五星卡所持率：${totalPercent} % ( ${total} / 88 )`;
  // 常駐卡所持率
  for (let i = 0; i < normalcards.length; i++) {
    if (normalcards[i].checked) {
      normal++;
    }
  }
  normalPercent = (normal / 40 * 100).toFixed(1)
  normalCardsIhave.textContent = `常駐池所持率：${normalPercent} % ( ${normal} / 40 )`;
  // 限定卡所持率
  for (let i = 0; i < limitedcards.length; i++) {
    if (limitedcards[i].checked) {
      limited++;
    }
  }
  limitedPercent = (limited / 32 * 100).toFixed(1)
  limitedCardsIhave.textContent = `限定池所持率：${limitedPercent} % ( ${limited} / 32 )`;
  // FES卡所持率
  for (let i = 0; i < fesCards.length; i++) {
    if (fesCards[i].checked) {
      fes++;
    }
  }
  fesPercent = (fes / 11 * 100).toFixed(1)
  fesCardsIhave.textContent = `FES池所持率：${fesPercent} % ( ${fes} / 11 )`;

}

function filter() {
  let pools = ['normal', 'limited', 'fes', 'special',]

  let cards = document.querySelectorAll('.img')

  for (let i = 0; i < cards.length; i++) {
    cards[i].style.opacity = '100%'
  }
  for (let i = 0; i < pools.length; i++) {
    let cardsToHide = document.querySelectorAll(('.' + pools[i]))
    let pool = document.querySelector(('#' + pools[i]))
    if (!pool.checked) {
      for (let i = 0; i < cardsToHide.length; i++) {
        cardsToHide[i].style.opacity = '20%'
      }
    }

  }
  for (let i = 0; i < idols.length; i++) {
    let idolsToHide = document.querySelectorAll(('.' + idols[i]))
    let idol = document.querySelector(('#' + idols[i]))
    if (!idol.checked) {
      for (let i = 0; i < idolsToHide.length; i++) {
        idolsToHide[i].style.opacity = '20%'
      }
    }
  }

}

function exportImage() {
  let node = document.getElementById('capture');
  console.log(node)
  domtoimage.toPng(node)
    .then(function (dataUrl) {
      let img = new Image();
      img.src = dataUrl;
      document.body.appendChild(img);
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error);
    });


  // domtoimage.toBlob(document.getElementById('capture'))
  //   .then(function (blob) {
  //     window.saveAs(blob, 'my-node.png');
  //   });


  // html2canvas(document.querySelector("#capture")).then(function (canvas) {
  //   a = document.createElement("a");
  //   a.href = canvas
  //     .toDataURL("image/jpeg", 0.92)
  //     .replace("image/jpeg", "image/octet-stream");
  //   a.download = "image.jpg";
  //   a.click();
  // });
}