var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      var hasMushrooms = function(x) {return (x === "mushrooms")};
      productsICanEat = _(products).filter(function(x){return !(x.containsNuts) && !(_(x.ingredients).any(hasMushrooms))});
      //productsICanEat = _(productsICanEat).filter(function(x){console.log(_(x.ingredients).contains('mushrooms'));_(x.ingredients).contains('mushrooms')});
      console.log('nuts free zone', productsICanEat);

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    console.log(sum);

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var range1000 = _.range(1,1000);
    var sumOnlyMultiplesOf3And5 = function (memo,x) {
      if ((x % 3 === 0) || (x % 5 === 0)) {
        console.log(x);
        return memo + x;
      }
      else return memo;
    }
    
    var sum = _(range1000).chain()
        .reduce(sumOnlyMultiplesOf3And5,0)
        .value();

    //var sum = _(_.range(1,1000).reduce(function(sum,x){if (x % 3 === 0 || x % 5 === 0) console.log(sum,x);return sum + x}));    /* try chaining range() and reduce() */
    /*var sum = _(_(_.range(1,1000).filter(function(x) {return (x % 3 === 0 || x % 5 === 0)}).reduce(function(memo,x){return memo + x})));
    var sum2 = _(_(_.range(1,1000)).filter(function(x) {return (x % 3 === 0 || x % 5 === 0)})).reduce(function(memo,x){return memo +x})
    console.log(sum2);*/

    expect(233168).toBe(sum);
  });

  /*var sum3 = _.reduce(_.filter(_.range(1,1000), function(x){
    return x % 3 === 0 || x % 5 === 0;
  }), function(memo, x){
      return memo + x;
  });

  var range1000 = _.range(1,1000;
  var filteredArray = _.filter(range1000, function)

  console.log(sum3)*/

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
            //console.log(i, j, ingredientCount);
        }
    }
    //console.log(ingredientCount);

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };
    //console.log(ingredientCount);
    var gatherIngredients = function (x) {return x['ingredients']};
    var countingIngredients = function (memo, x) {
      if (x in ingredientCount) {
        memo[x] += 1;
        return memo
        //return memo = ingredientCount[x] += 1
      }
      else {
        memo[x] = 1;
        return memo;
        //return memo = ingredientCount[x] = 1
      };
    //return ingredientCount[x];
    }

    /* chain() together map(), flatten() and reduce() */
   //console.log(ingredientCount);
   //console.log(products);
   var flatProducts = _(products).flatten();
   //console.log(flatProducts);
   var allIngredients = _(products).chain()
    .map(gatherIngredients)
    .flatten()
    .reduce(countingIngredients, ingredientCount)
    .value();

   console.log(allIngredients);
   console.log(ingredientCount);


   

  


    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
    var factorsOf = [];
    var y = 2;
    var factorTree = function(x,factors) {
      if (x === 1) {
        return "1 is neither composite nor prime"
      }
      else if (x % y === 0) {
        factors.unshift(y);
        x = x / y;
        factorTree(x,factors);
      }
      else {
        y++;
        factorTree(x, factors);
      }
  return factors[0];
  }
  /*var findMax = function(arr) {
    arr.sort();
    return arr[arr.length - 1];
  }*/
  //console.log(findHighestPrime(867,2));
  console.log(factorTree(867,factorsOf));
  //console.log(findMax([3,6,8,34,2,6]));
  /*var findMax = function(arr) {
    return arr.sort();
  }
  var findHighestPrime = function(x,y) {
    if (x === 1) {
      return "1 is neither prime nor composite";
    }
    else if (x % y === 0) {
      findHighestPrime((x/y),y);
    }
    else {
      findHighestPrime((x/y),(y+1));
    }
    return y;
  }*/
  

  });
/*
  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {


  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

  });

  it("should find the 10001st prime", function () {

  });
  */
});
