(function () {
  var container = document.getElementById('cardContainer');
  var search = document.getElementById('search');

  function createCard(item) {
    var card = document.createElement('div');
    card.className = 'card';
    card.innerHTML =
      '<div class="img"><img src="' + item.image + '" alt="' + item.name + '"></div>' +
      '<span>' + item.name + '</span>' +
      '<button>Run</button>';
    card.querySelector('button').addEventListener('click', function () {
      window.open(item.url);
    });
    return card;
  }

  function createContributeCard() {
    var card = document.createElement('div');
    card.className = 'card contribute-card';
    card.innerHTML =
      '<p>Want your project to be</p>' +
      '<p>visible here?</p>' +
      '<hr>' +
      '<p>Send your project to us</p>' +
      '<p>on GitHub</p>' +
      '<button>Github</button>';
    card.querySelector('button').addEventListener('click', function () {
      window.open('https://github.com/DynamicCode1/webos');
    });
    return card;
  }

  function renderCards(data) {
    for (var i = 0; i < data.length; i++) {
      container.appendChild(createCard(data[i]));
    }
    container.appendChild(createContributeCard());
  }

  function filterCards() {
    var filter = search.value.toUpperCase();
    var cards = container.querySelectorAll('.card:not(.contribute-card)');
    for (var i = 0; i < cards.length; i++) {
      var span = cards[i].getElementsByTagName('span')[0];
      var text = span.textContent || span.innerText;
      cards[i].style.display = text.toUpperCase().indexOf(filter) > -1 ? '' : 'none';
    }
  }

  search.addEventListener('input', filterCards);

  fetch('data.json')
    .then(function (res) { return res.json(); })
    .then(renderCards);
})();
