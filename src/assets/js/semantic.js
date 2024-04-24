const stylesheet = document.getElementById("stylesheet");
const selectCss = document.getElementById("select-css");
const selectCssResets = document.getElementById("select-css-resets");
const selectCssFrameworks = document.getElementById("select-css-frameworks");
const elementTable = document.getElementById("elements-table");
const totalCoverage = document.getElementById("total-coverage");
const codeSnippetStyle = document.getElementById("code-snippet-style");

const elements = [
  "header",
  "nav",
  "main",
  "aside",
  "section",
  "article",
  "footer"
];

const cssFrameworks = [
  {
    "name": "a11yana",
    "link": "/assets/css/a11yana.css"
},
{
    "name": "almond",
    "link": "/assets/css/almond.css"
},
{
    "name": "awsm",
    "link": "/assets/css/awsm.css"
},
{
    "name": "axist",
    "link": "/assets/css/axist.css"
},
{
    "name": "bahunya",
    "link": "/assets/css/bahunya.css"
},
{
    "name": "bamboo",
    "link": "/assets/css/bamboo.css"
},
{
    "name": "caramel",
    "link": "/assets/css/caramel.css"
},
{
    "name": "classless",
    "link": "/assets/css/classless.css"
},
{
    "name": "clmaterial",
    "link": "/assets/css/clmaterial.css"
},
{
    "name": "concrete",
    "link": "/assets/css/concrete.css"
},
{
    "name": "gd",
    "link": "/assets/css/gd.css"
},
{
    "name": "generic",
    "link": "/assets/css/generic.css"
},
{
    "name": "github-markdown",
    "link": "/assets/css/github-markdown.css"
},
{
    "name": "holiday",
    "link": "/assets/css/holiday.css"
},
{
    "name": "latex",
    "link": "/assets/css/latex.css"
},
{
    "name": "lissom",
    "link": "/assets/css/lissom.css"
},
{
    "name": "magick",
    "link": "/assets/css/magick.css"
},
{
    "name": "marx",
    "link": "/assets/css/marx.css"
},
{
    "name": "md-air",
    "link": "/assets/css/md-air.css"
},
{
    "name": "mercury",
    "link": "/assets/css/mercury.css"
},
{
    "name": "minimal-stylesheet",
    "link": "/assets/css/minimal-stylesheet.css"
},
{
    "name": "missing",
    "link": "/assets/css/missing.css"
},
{
    "name": "mu",
    "link": "/assets/css/mu.css"
},
{
    "name": "mvp",
    "link": "/assets/css/mvp.css"
},
{
    "name": "neat",
    "link": "/assets/css/neat.css"
},
{
    "name": "new",
    "link": "/assets/css/new.css"
},
{
    "name": "no-class",
    "link": "/assets/css/no-class.css"
},
{
    "name": "ok",
    "link": "/assets/css/ok.css"
},
{
    "name": "pico",
    "link": "/assets/css/pico.css"
},
{
    "name": "sakura",
    "link": "/assets/css/sakura.css"
},
{
    "name": "silicon",
    "link": "/assets/css/silicon.css"
},
{
    "name": "simple",
    "link": "/assets/css/simple.css"
},
{
    "name": "spcss",
    "link": "/assets/css/spcss.css"
},
{
    "name": "superstylin",
    "link": "/assets/css/superstylin.css"
},
{
    "name": "tacit",
    "link": "/assets/css/tacit.css"
},
{
    "name": "vanilla",
    "link": "/assets/css/vanilla.css"
},
{
    "name": "w3c-traditional",
    "link": "/assets/css/w3c-traditional.css"
},
{
    "name": "water",
    "link": "/assets/css/water.css"
},
{
    "name": "writ",
    "link": "/assets/css/writ.css"
}
];

const populateSelect = (list, target) => {
  list.forEach((item) => {
    const option = document.createElement("option");
    option.textContent = item.name;
    option.value = item.link;
    target.appendChild(option);
  });
};

const codeAdd = (url) => {
  codeSnippetStyle.innerHTML = `&#x3C;link rel=&#x22;stylesheet&#x22; href=&#x22;${url}&#x22; type=&#x22;text/css&#x22;&#x3E;`;
};

populateSelect(cssFrameworks, selectCssFrameworks);

const changeCss = (link) => {
  stylesheet.setAttribute("href", link);
};

const createRow = (text) => {
  const td = document.createElement("td");
  const input = document.createTextNode(text);
  td.appendChild(input);
  return td;
};

const changeTable = (link) => {
  elementTable.innerHTML = "";
  let total = 0;
  let coverage = 0;
  fetch(link).then(function (response) {
    response.text().then(function (text) {
      // console.log(text);
      for (const element in elements) {
        total++;
        const tr = document.createElement("tr");
        //create first row
        elementName = createRow(elements[element]);
        tr.appendChild(elementName);

        /// test if text contains regex
        const regex = new RegExp(elements[element] + "[{,:\\s]");
        let status = "";
        if (text.search(regex) > 0) {
          status = "✅";
          coverage++;
        }
        elementStatus = createRow(status);
        tr.appendChild(elementStatus);
        elementTable.appendChild(tr);
      }
      const coveragePercent = Math.round((coverage / total) * 100);
      totalCoverage.innerHTML = coveragePercent + "%";
    });
  });
};

selectCss.addEventListener("change", (e) => {
  changeCss(e.target.value);
  changeTable(e.target.value);
  codeAdd(e.target.value);
});