const TABLE = document.querySelector('.table');
const CELLS = document.querySelectorAll('.table__cell');
const COLS = document.querySelectorAll('.col-name');
const ROWS = document.querySelectorAll('.row-name');
const PREV = document.querySelector('.prev');
const NEXT = document.querySelector('.next');

let colWidth = COLS[1].offsetWidth;

// Зменшення шапки про скролі таблиці
TABLE.addEventListener('scroll', function () {
  if (ROWS[1].getBoundingClientRect().top < COLS[0].getBoundingClientRect().bottom) {
    TABLE.classList.add('active');
  } else {
    TABLE.classList.remove('active');
  };
});

//  Кнопки горизонтального скролу
PREV.addEventListener('click', function () {
  scrollTable(colWidth, true);
});

NEXT.addEventListener('click', function () {
  scrollTable(colWidth);
});

function scrollTable(distance, isScrollLeft) {
  let scrollDistance = isScrollLeft ? -distance : distance;
  TABLE.scrollBy({
    left: scrollDistance,
    behavior: 'smooth'
  });
};

// Дропдауни

// Додати клітинки
ROWS.forEach(cell => {
  if (cell.classList.contains('group-start')) {
    for (let i = 0; i < COLS.length; i++) {
      let newTableCell = document.createElement('div');
      newTableCell.classList.add('table__cell');

      if (i == 0) {
        let dropdownButton = document.createElement('button');
        dropdownButton.classList.add('dropdown');
        dropdownButton.innerHTML = 'Dropdown';
        newTableCell.appendChild(dropdownButton);
        newTableCell.classList.add('row-name')
      }

      TABLE.insertBefore(newTableCell, cell);
    }
  }
})

// Вирахувати індекси перших клітинок групи
let groupFirstCellsIndexes = [];
for (i = 0; i <= CELLS.length; i++) {
  if (i == CELLS.length || CELLS[i].classList.contains('group-start')) {
    groupFirstCellsIndexes.push(i);
  }
}

const DROPDOWNS = TABLE.querySelectorAll('.dropdown');

for (let i = 0; i < DROPDOWNS.length; i++) {
  DROPDOWNS[i].addEventListener('click', function () {
    for (let j = groupFirstCellsIndexes[i]; j < groupFirstCellsIndexes[i + 1]; j++) {
      CELLS[j].classList.toggle('hidden');
    }
  })
}