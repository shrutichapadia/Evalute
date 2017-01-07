// write program to evaluate a mathematical expression of arbitrary length, understanding any digit and these symbols: ( ) + - * / .
// String as an input and print out the value of the evaluated expression
// without 
function replaceexp(newstack, point, replace) {
  // replace all Ex
    return newstack.split(point).join(replace);
}

 // standardize string formation
function reformatString(s) {
    s = s.toLowerCase();
    s = replaceexp(s, "-(", "-1*(");
    s = replaceexp(s, ")(", ")*(");
    s = replaceexp(s, " ", "");
    s = replaceexp(s, "-", "+-");
    s = replaceexp(s, "--", "+");
    s = replaceexp(s, "++", "+");
    s = replaceexp(s, "(+", "(");
    for (var i = 0; i < 10; i++) {
        s = replaceexp(s, i + "(", i + "*" + "(");
    }
    while(s.charAt(0) == "+") s = s.substr(1);
    console.log(s);
    return s;
}
// custom  contains true or false
function stringContain(newstack,point) {
    return newstack.indexOf(point) > -1;
}
// determine if character added to side
function isParse(n, minus) {
    return (!isNaN(n) || (n == "-" && !minus) || n == ".");
}
// general Ex to get multiply, addition
function getSide(newstack, middle, direction, minus) {
    var i = middle + direction;
    var term = "";
    var limit = (direction == -1) ? 0 : newstack.length;
    while (i * direction <= limit) {
        if (isParse(newstack[i], minus)) {
            if (direction == 1) term = term + newstack[i];
            else term = newstack[i] + term;
            i += direction;
        } else { return term; }
    }
    return term;
}

function allocEx(eq, symbol, alloc, minus) {
    minus = (typeof minus !== 'undefined'); // when we want to capture minus signs, sometimes not
    if (stringContain(eq, symbol)) {
        var middleIndex = eq.indexOf(symbol);
        var left = getSide(eq, middleIndex, -1, minus);
        var right = getSide(eq, middleIndex, 1, false);
        eq = replaceexp(eq, left+symbol+right, alloc(left, right));
    }
    return eq;
}

// main recursive Ex
function finalString(eq) {
    firstNest:
    while (stringContain(eq, "(")) { // while the string has any parentheses
        var first = eq.indexOf("("); // first get the earliest open parentheses
        var last = first + 1; // start searching at the character after
        var layer = 1; // we might run into more parentheses, so this integer will keep track
        while (layer != 0) { // loop this until we've found the close parenthesis
            if (eq[last] == ")") { // if we run into a close parenthesis, then subtract one from "layer"
                layer--;
                if (layer == 0) break; // if it is the corresponding closing parenthesis for our outermost open parenthesis, then we can deal with this expression
            }
            else if (eq[last] == "(") { // if we see an open parenthesis, add one to "layer"
                layer++;
            }
            last++; // increment the character we're looking at
            if (last > eq.length) break firstNest;
        }

        var nestNum = eq.substr(first + 1, last - first - 1); // get the expression between the parentheses

        var newString = finalString(nestNum);
        var preString = "(" + nestNum + ")";
        eq = eq.replace(preString, newString); // replace parenthetical with value
    }

    while (stringContain(eq, "*") || stringContain(eq, "/")) {
        var multiply = true;
        if (eq.indexOf("*") < eq.indexOf("/")) {
            multiply = (stringContain(eq, "*"));
        } else {
            multiply = !(stringContain(eq, "/"));
        }
        eq = (multiply) ? allocEx(eq, "*", function(l, r) { return parseFloat(l)*parseFloat(r); }) : allocEx(eq, "/", function(l, r) { return parseFloat(l)/parseFloat(r); });
    }
    while (stringContain(eq, "+")) eq = allocEx(eq, "+", function(l, r) { return parseFloat(l)+parseFloat(r); });
    return eq;
}


function evaluteAnyString(input){
  console.log("INPUT : " + input);
  var formated = reformatString(input);
  console.log("FORMATED : " + formated);
  var output = finalString(formated);
  console.log("OUTPUT : " + output);
}

var input = '4 + 6';
evaluteAnyString(input);
console.log("============================================");

var input = '(4 + 6) * 3';
evaluteAnyString(input);
console.log("============================================");

var input = '2 + (2.5) * 2';
evaluteAnyString(input);
console.log("============================================");
