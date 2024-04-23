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
    name: "Spcss",
    link:
      "/assets/css/min/spcss.min.css"
  },
  {
    name: "New",
    link:
      "/assets/css/min/new.min.css"
  },
  {
    name: "Awsm",
    link:
      "/assets/css/min/awsm-tasman.min.css"
  },
  {
    name: "Axist",
    link:
      "/assets/css/min/axist.min.css"
  },
  {
    name: "MVP",
    link: "/assets/css/min/mvp.min.css"
  },
  {
    name: "Sakura",
    link:
      "/assets/css/min/sakura.min.css"
  },
  {
    name: "Holiday",
    link:
      "/assets/css/min/holiday.min.css"
  },
  {
    name: "Marx",
    link:
      "/assets/css/min/marx.min.css"
  },
  {
    name: "Simple",
    link:
      "/assets/css/min/simple.min.css"
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