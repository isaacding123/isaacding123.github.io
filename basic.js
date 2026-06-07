let texts = window.lang
let lang = "zh-cn"

function upd_theme() {
    hour = new Date().getHours()
    element = document.querySelectorAll("[theme]")
    element.forEach(i => {
        i.classList.remove("light", "dark")
        if (hour >= 6 && hour <= 18) {
            i.classList.add("light")
        }
        else {
            i.classList.add("dark")
        }
    })
    document.body.classList.remove("light", "dark")
    if (hour >= 6 && hour <= 18) {
        document.body.classList.add("light")
    }
    else {
        document.body.classList.add("dark")
    }
}

function upd_lang() {
    tmp = new URLSearchParams(window.location.search)
    if (lang == "") {
        if (tmp.has("lang")) lang = tmp.get("lang")
        else lang = "zh-cn"
    }
    document.querySelectorAll("[text]").forEach(i => {
        data = i.getAttribute("text")
        i.textContent = texts[lang][data]
    })
    document.title = texts[lang]["title0"]
    tmp.set("lang", lang)
    tmp = window.location.pathname + "?" + tmp.toString()
    window.history.replaceState({}, "", tmp)
    elem = document.getElementById("project")
    if (elem != null) {
        elem.href = './projects/?lang=' + lang;
    }
    elem = document.getElementById("blogs")
    if (elem != null) {
        elem.href += './blogs/?lang=' + lang;
    }
    elem = document.getElementById("class-album")
    if (elem != null) {
        elem.href += './class-album/?lang=' + lang;
    }
}

function event_lis() {
    document.getElementById("lang").addEventListener("change", function (e) { lang = e.target.value; upd_lang() })
    upd_lang(); upd_theme()
    setInterval(upd_theme, 5000)
    tmp = new URLSearchParams(window.location.search)
    if (Array.from(document.getElementById("lang").options).some(t => t.value == tmp.get("lang"))) {
        document.getElementById("lang").value = tmp.get("lang")
    }
}