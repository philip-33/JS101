/*
Given the following data structure
write some code to return an array containing the
colors of the fruits and the sizes of the vegetables.
The sizes should be uppercase, and
the colors should be capitalized.

algo:
newArr = [];
get Object.values(obj)
step into array of objects (produceItem)
  if produceItem.type === 'fruit'
    newArr.push(produceItem.colors)
  else
    newArr.push(produceItem[size].toUpperCase())
if fruit, return color
if veg, return size in all caps
*/

let obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' }
};

function normalize(object) {
  let newArr = [];
  Object.values(object).forEach(produceItem => {
    if (produceItem.type === 'fruit') {
      newArr.push(
        produceItem.colors.map(color => {
          return color.slice(0, 1).toUpperCase() + color.slice(1);
        })
      );
    } else {
      newArr.push(produceItem.size.toUpperCase());
    }
  });
  return newArr;
}

console.log(normalize(obj));
// => [["Red", "Green"], "MEDIUM", ["Red", "Green"], ["Orange"], "LARGE"]
