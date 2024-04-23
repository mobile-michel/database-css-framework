const stylesheet = document.getElementById("stylesheet");
const selectCss = document.getElementById("select-css");
const selectCssResets = document.getElementById("select-css-resets");
const selectCssFrameworks = document.getElementById("select-css-frameworks");
const elementTable = document.getElementById("elements-table");
const totalCoverage = document.getElementById("total-coverage");
const codeSnippetStyle = document.getElementById("code-snippet-style");

const elements = [
  "body",
  "article",
  "section",
  "nav",
  "aside",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "address",
  "hr",
  "pre",
  "blockquote",
  "ol",
  "ul",
  "li",
  "dl",
  "dt",
  "dd",
  "figure",
  "figcaption",
  "main",
  "div",
  "a",
  "em",
  "strong",
  "small",
  "s",
  "cite",
  "q",
  "dfn",
  "abbr",
  "ruby",
  "rb",
  "rt",
  "rtc",
  "rp",
  "data",
  "time",
  "code",
  "var",
  "samp",
  "kbd",
  "sub",
  "sup",
  "i",
  "b",
  "u",
  "mark",
  "bdi",
  "bdo",
  "span",
  "br",
  "wbr",
  "ins",
  "del",
  "picture",
  "source",
  "img",
  "iframe",
  "embed",
  "object",
  "param",
  "video",
  "audio",
  "track",
  "map",
  "area",
  "math",
  "svg",
  "table",
  "caption",
  "colgroup",
  "col",
  "tbody",
  "thead",
  "tfoot",
  "tr",
  "td",
  "th",
  "form",
  "label",
  "input",
  "button",
  "select",
  "datalist",
  "optgroup",
  "option",
  "textarea",
  "output",
  "progress",
  "meter",
  "fieldset",
  "legend",
  "details",
  "summary",
  "dialog",
  "canvas"
];

const cssFrameworks = [
  {
    name: "spcss",
    link:
      "/assets/css/min/spcss.min.css"
  },
  {
    name: "New.css",
    link:
      "https://cdn.skypack.dev/-/@exampledev/new.css@v1.1.3-5lLJSVl1aUFQMjLSuoC5/dist=es2020,mode=raw/new.css"
  },
  {
    name: "Latex.css",
    link:
      "https://cdn.skypack.dev/-/latex.css@v1.5.0-uICQMvoF5kssOEkJg6ns/dist=es2020,mode=raw/style.min.css"
  },
  {
    name: "Awsm.css",
    link:
      "https://cdn.skypack.dev/-/awsm.css@v3.0.7-3IvcnwZt3VTcksna5Ha0/dist=es2020,mode=raw/dist/awsm.min.css"
  },
  {
    name: "Axist",
    link:
      "https://cdn.skypack.dev/-/axist@v0.0.4-3F1u8JPxEDE6Sp9z2SQh/dist=es2020,mode=raw/dist/axist.min.css"
  },
  {
    name: "MVP",
    link: "/assets/css/min/mvp.min.css"
  },
  {
    name: "Tufte CSS",
    link:
      "https://cdn.skypack.dev/-/tufte-css@v1.7.2-g1wyqg4s9i8xXAct2gEy/dist=es2020,mode=raw/tufte.min.css"
  },
  {
    name: "Sakura",
    link:
      "/assets/css/min/sakura.min.css"
  },
  {
    name: "Holiday.css",
    link:
      "https://cdn.skypack.dev/-/holiday.css@v0.9.5-Jl4gV7y2zMps6H5ZtJC8/dist=es2020,mode=raw/dist/holiday.css"
  },
  {
    name: "Marx",
    link:
      "https://cdn.skypack.dev/-/marx-css@v3.0.8-lSMr9ED7DVcTOJkQlHPR/dist=es2020,mode=raw/css/marx.min.css"
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