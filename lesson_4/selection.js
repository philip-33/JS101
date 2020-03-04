/*
problem:
In this example, we want to select the key-value pairs where
the value is 'Fruit'.

input: produce object with different values
output: produce object where values are only 'Fruit'

example:
selectFruit(produce); // => { apple: 'Fruit', pear: 'Fruit' }
*/

function selectFruit(produceList) {
  let keys = Object.keys(produceList);
  let fruitBasket = {};

  keys.forEach(food => {
    if (produceList[food] === 'Fruit') fruitBasket[food] = 'Fruit';
  });

  return fruitBasket;
}

let produce = {
  apple: 'Fruit',
  carrot: 'Vegetable',
  pear: 'Fruit',
  broccoli: 'Vegetable'
};

console.log(selectFruit(produce)); // => { apple: 'Fruit', pear: 'Fruit' }
