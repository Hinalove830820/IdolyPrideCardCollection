const idolGroup = {
  sunny: ['sakura', 'sizuku', 'chisa', 'rei', 'haruko'],
  tsuki: ['kotono', 'nagisa', 'saki', 'suzu', 'mei'],
  liznoir: ['rio', 'aoi', 'ai', 'kokoro'],
  trinityaile: ['rui', 'yuu', 'sumire'],
  iiix: ['fran', 'kana', 'miho']
}
const sortingRule = ['↓Name', '↑Name', '↓Date', '↑Date']
let sortingRuleIndex = 0

const multiLanguageArray = {
  jp: ['所持率ﾁｪｯｶｰ', 'CN', '全選択', 'ソート', 'ﾌｨﾙﾀ', '　☆5所持率', '通常ｶﾞﾁｬ', '限定ｶﾞﾁｬ', 'ﾌｪｽｶﾞﾁｬ', '全☆5ｶｰﾄﾞ', 'ｽﾍﾟｼｬﾙ', 'ｽｺｱﾗｰ', 'ﾊﾞｯﾌｧｰ', 'ｻﾎﾟｰﾀｰ', '全取り消す', '...画面制作中...', '数秒かかると予想される', '滑らないでお待ちください'],
  cn: ['曬卡小工具', 'JP', '全部選擇', '排序', '篩選器', '　的持有率', '常駐池', '限定池', 'FES池', '五星卡', '特殊池', 'scorer', 'buffer', 'support', 'Clear Idols', '...正在產製圖片...', '預計花費數秒至數十秒', '請耐心等候並不要滑動']
};
let languageToUse = ''

const newVersion = 'v2.00'
let recentCards = JSON.parse(localStorage.getItem('recentCards')) || []
let recentVersion = localStorage.getItem('recentVersion')
let playerCards = []
let cardsToRender = []


const cardContainer = document.querySelector("#card-container")
const filterButton = document.querySelector("#filter-button")
const modal = document.querySelector("#modal")
const filters = document.querySelectorAll('.filter')
const nameForm = document.querySelector('#name')
const player = document.querySelector("#player")
const input = document.querySelector('#name-input')
const filterAllButton = document.querySelector("#filter-all")
const selectAllButton = document.querySelector('#select-all')
const idolFilters = document.querySelectorAll('.idol-avatar')
const sorter = document.querySelector('#sorter')
const languageSelectButton = document.querySelector('#language')

let playerName = localStorage.getItem('playerName') || 'マネージャー牧野'

// 載入時執行
filters.forEach((filter) => {
  filter.dataset.select = 'true'
})

fetch('data.json')
  .then((response) => response.json())
  .then((json) => {
    playerCards = recentCards.concat(json.slice(recentCards.length))
    cardsToRender = playerCards
    renderCards()
    renderResults()
    renderName(playerName)

    useLanguage('')
  })

sorter.addEventListener('click', (event) => {

  sortingRuleIndex = (Number.parseInt(event.target.getAttribute('sort')) + 1) % sortingRule.length
  event.target.setAttribute('sort', sortingRuleIndex)
  switch (sortingRuleIndex) {
    case 0: //↓Idol
      cardsToRender.sort((a, b) => {
        return ('' + a.idol).localeCompare(b.idol, 'en')
      })
      break
    case 1: //↑Idol
      cardsToRender.sort((a, b) => {
        return ('' + b.idol).localeCompare(a.idol, 'en')
      })
      break
    case 2: //↓Date
      cardsToRender.sort((a, b) => (Number.parseInt(a.release) - Number.parseInt(b.release))
      )
      break
    case 3: //↑Date
      cardsToRender.sort((a, b) => (Number.parseInt(b.release) - Number.parseInt(a.release))
      )
      break
  }
  sorter.innerText = sortingRule[sortingRuleIndex]
  renderCards()



})

player.addEventListener('click', (event) => {
  nameForm.toggleAttribute('show')
  input.focus()

})

nameForm.addEventListener('submit', (event) => {
  event.preventDefault()
  if (input.value.trim() !== "") {
    renderName(input.value)
    playerName = input.value
    nameForm.toggleAttribute('show')
    localSave()
  } else {
    renderName('マネージャー牧野')
    playerName = ''
    nameForm.toggleAttribute('show')
    localSave()
  }

}

)

cardContainer.addEventListener('click', (event) => {
  if (event.target.tagName === ('IMG' || 'I')) {
    toggleOwn(event.target.parentElement.dataset.id)
    event.target.parentElement.dataset.own = !(event.target.parentElement.dataset.own === 'true')
    renderResults()
    localSave()
  }

})

filterButton.addEventListener('click', (event) => {
  if (event.target.parentElement.dataset.show === 'false') {
    event.target.parentElement.dataset.show = 'true'
    modal.dataset.show = 'true'
    filterButton.innerHTML = `<p id="filter-label">Apply</p>`
  }
  else {
    event.target.parentElement.dataset.show = 'false'
    modal.dataset.show = 'false'
    if (languageToUse === 'jp') {
      filterButton.innerHTML = `<p id="filter-label">${multiLanguageArray.jp[4]}</p>`

    } else {
      filterButton.innerHTML = `<p id="filter-label">${multiLanguageArray.cn[4]}</p>`

    }
  }
})

modal.addEventListener('click', (event) => {
  let filterSelected = undefined
  if (event.target.classList.contains('filter') || event.target.parentElement.classList.contains('filter')) {
    if (event.target.classList.contains('filter')) {
      filterSelected = event.target
    }
    else if (event.target.parentElement.classList.contains('filter')) {
      filterSelected = event.target.parentElement
    }
    filterSelected.dataset.select = !(filterSelected.dataset.select === 'true')

  }
  if (event.target.parentElement.classList.contains('group-logo')) {
    event.target.parentElement.toggleAttribute('show')
    const groupSelected = document.querySelectorAll(`.${event.target.parentElement.dataset.group}`)
    groupSelected.forEach((idolFilter) => {
      idolFilter.dataset.select = event.target.parentElement.hasAttribute('show')
    })
  }
  applyFilter()
})

filterAllButton.addEventListener('click', (event) => {
  event.target.toggleAttribute('show')
  idolFilters.forEach((idolFilter) => {
    idolFilter.dataset.select = event.target.hasAttribute('show')
  })
  if (languageToUse === 'cn') {
    filterAllButton.innerText = event.target.hasAttribute('show') ? 'Clear Idols' : 'All Idols'

  } else {
    filterAllButton.innerText = event.target.hasAttribute('show') ? '全取り消す' : '全アイドル選択'

  }
})

selectAllButton.addEventListener('click', (event) => {
  event.target.toggleAttribute('own')
  let own = event.target.hasAttribute('own')
  if (languageToUse === 'cn') {
    selectAllButton.innerText = event.target.hasAttribute('own') ? '全部取消' : '全部選擇'
  } else {
    selectAllButton.innerText = event.target.hasAttribute('own') ? '全取り消す' : '全選択する'

  }
  cardsToRender.forEach((card) => {

    card.own = own
    playerCards[card.id].own = own
  })
  renderCards()
  renderResults()


})

languageSelectButton.addEventListener('click', (event) => {

  event.target.innerText = event.target.hasAttribute('jp') ? 'CN' : 'JP'


  useLanguage(event.target.innerText)
  event.target.toggleAttribute('jp')
})

function localSave() {
  localStorage.setItem('recentCards', JSON.stringify(playerCards))
  localStorage.setItem('recentVersion', newVersion)
  localStorage.setItem('playerName', playerName)
}

function applyFilter() {
  const filterObject = {
    idol: [],
    pool: [],
    type: [],
    job: [],
  }
  filters.forEach((f) => {
    if (f.dataset.select === 'true') {
      filterObject[f.dataset.key].push(f.dataset.value)
    }
  })
  cardsToRender = []
  playerCards.forEach((card) => {
    if (filterObject.idol.includes(card.idol)
      && filterObject.pool.includes(card.pool)
      && filterObject.type.includes(card.type)
      && filterObject.job.includes(card.job)) {
      cardsToRender.push(card)
    }
  })
  renderCards()
}

function renderCards() {
  cardContainer.innerHTML = ''
  cardsToRender.forEach(card => {
    cardContainer.innerHTML += `
      <div class='card ${card.pool} ${card.idol} ${card.type} ${card.job}' data-own=${card.own} data-id=${card.id} >
        <i class="fa-solid fa-circle-check "></i>
        <img src="cards\\${card.image}" alt="" >
      </div>
    `
  });
}

function renderResults() {
  const resultArray = document.querySelectorAll('.percentage')
  resultArray.forEach((percentage) => {
    percentage.innerHTML = `${calcPlayerOwn(percentage.dataset.pool)}%`
  })

}

function renderName(name) {
  player.textContent = name
}

function useLanguage(language) {

  if (language === 'CN') {
    languageToUse = 'cn'
  } else if (language === 'JP') {
    languageToUse = 'jp'
  } else {
    if (sys === "zh-tw" || sys === "zh-cn" || sys === "zh-hk" || sys === "zh-sg" || sys === "zh") {
      languageToUse = 'cn';
    } else {
      languageToUse = 'jp'
    }
  }
  const languageArrayToUse = multiLanguageArray[languageToUse]

  document.querySelector('#title').innerText = languageArrayToUse[0]
  document.querySelector('#language').innerText = languageArrayToUse[1]
  document.querySelector('#select-all').innerText = languageArrayToUse[2]
  document.querySelector('#sorter').innerText = languageArrayToUse[3]
  document.querySelector('#filter-label').innerText = languageArrayToUse[4]
  document.querySelector('#five-stars-own').innerText = languageArrayToUse[5]
  document.querySelector('#normal-percentage-label').innerText = languageArrayToUse[6]
  document.querySelector('#limited-percentage-label').innerText = languageArrayToUse[7]
  document.querySelector('#fes-percentage-label').innerText = languageArrayToUse[8]
  document.querySelector('#all-percentage-label').innerText = languageArrayToUse[9]
  document.querySelector('#normal').innerText = languageArrayToUse[6]
  document.querySelector('#limited').innerText = languageArrayToUse[7]
  document.querySelector('#fes').innerText = languageArrayToUse[8]
  document.querySelector('#special').innerText = languageArrayToUse[10]
  document.querySelector('#scorer-label').innerText = languageArrayToUse[11]
  document.querySelector('#buffer-label').innerText = languageArrayToUse[12]
  document.querySelector('#supporter-label').innerText = languageArrayToUse[13]
  document.querySelector('#filter-all').innerText = languageArrayToUse[14]
  document.querySelector('#alert-1').innerHTML = languageArrayToUse[15]
  document.querySelector('#alert-2').innerHTML = languageArrayToUse[16]
  document.querySelector('#alert-3').innerHTML = languageArrayToUse[17]

}

function calcPlayerOwn(pool) {
  if (pool === 'all') {
    return Math.round(playerCards.filter(card => (card.own === true)).length / playerCards.length * 100)
  }
  else {
    return Math.round(playerCards.filter(card => ((card.own === true) && (card.pool === pool))).length / playerCards.filter(card => (card.pool === pool)).length * 100)
  }

}

function toggleOwn(id) {
  let toggleCard = playerCards.find((card) => {
    return (Number.parseInt(card.id) === Number.parseInt(id))
  })
  toggleCard.own = !(toggleCard.own)
}

document.querySelector('#save').addEventListener('click', (event) => {
  document.querySelector('#alert').toggleAttribute('show')
  document.querySelector("#bottom-navigator ").style.position = 'absolute'
  document.querySelector("#bottom-navigator ").style.bottom = '-100vh'

  document.querySelectorAll('.filter').forEach((filter) => {
    filter.dataset.select = true
  })
  applyFilter()

  const capture = document.querySelector('#capture')
  let scale = 6
  domtoimage.toPng(capture, {
    width: capture.clientWidth * scale,
    height: capture.clientHeight * scale,
    style: {
      transform: 'scale(' + scale + ')',
      transformOrigin: 'top left'
    }
  })
    .then(function (dataUrl) {
      let fakeBtn = document.querySelector('#test')
      fakeBtn.innerHTML = `
        <a id="download" href="${dataUrl}" download>DOWNLOAD</a>
      `
    })
    .then(() => {
      document.querySelector('#download').click()
      window.location.reload()
      window.alert('Thank You for Waiting!')
    })

})


