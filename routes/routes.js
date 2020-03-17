var Math = require("../js/math.js");
var appRouter = function(app) {
  app.post("/api/Bisection-Method/", function(req, res) {
    var expression = req.body.eq;
    var xl = req.body.xl;
    var xr = req.body.xr;
    if (xl > xr) {
      res.status(400).send("inputXL < inputXR");
    } else {
      bisection();
    }
    function bisection() {
      var aws = [];
      aws.push({
        eq: expression,
        xl: xl,
        xr: xr
      });
      var findErr = 0.00001;
      var xmOld = xr;
      var xm = 0;
      var xmOld = 0;
      var n = 0;
      var check = 0.0;
      var errPer = 0;
      do {
        if (xl != xr) {
          xm = (parseFloat(xl) + parseFloat(xr)) / 2;
          check = Math.abs(xm - xmOld).toFixed(8);
        } else {
          check = 0;
        }
        if (n > 0) {
          errPer = Math.abs(((xm - xmOld) / xm) * 100).toFixed(8);
        }

        n++;
        aws.push({
          n: n,
          xl: xl,
          xr: xr,
          xm: xm,
          errPer: errPer
        });
        if (funcal(xm) * funcal(xr) < 0) {
          xl = xm;
        } else {
          xr = xm;
        }
        xmOld = xm;
      } while (check > findErr);
      res.status(200).send(aws);
    }

    function funcal(X) {
      expr = Math.compile(expression);
      let scope = {
        x: parseFloat(X)
      };
      return expr.eval(scope);
    }
  });
  // Assessment 1
  app.post("/api/firstfactorial/", function(req, res) {
    var num = req.body.input;
    var aws = [];
    var fac = 1;
    aws.push({ input: num });
    for (i = 2; i <= num; i++) fac *= i;
    aws.push({ output: fac });
    res.status(200).send(aws);
  });
  // Assessment 2
  app.post("/api/ristreverse/", function(req, res) {
    var word = req.body.input;
    var aws = [];
    var o = "";
    aws.push({ input: word });
    for (var i = word.length - 1; i >= 0; i--) o += word[i];
    aws.push({ output: o });
    res.status(200).send(aws);
  });
  // Assessment 3
  app.post("/api/alphabetsoup/", function(req, res) {
    var word = req.body.input;
    var aws = [];
    aws.push({ input: word });
    var sortWord = word
      .split("")
      .sort()
      .join("");
    aws.push({ output: sortWord });
    res.status(200).send(aws);
  });
  // Assessment 4
  app.post("/api/palindrome/", function(req, res) {
    var word = req.body.input;
    var aws = [];
    aws.push({ input: word });
    if (
      word ==
      word
        .split("")
        .reverse()
        .join("")
    ) {
      var sortWord = "true";
    } else var sortWord = "false";
    aws.push({ output: sortWord });
    res.status(200).send(aws);
  });
};

module.exports = appRouter;
