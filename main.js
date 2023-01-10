// Elementos de HTML
const canvas = document.querySelector("canvas")
// Selector de color
const colorBg = document.getElementById("colorBg")
const colorBgLb = document.getElementById("colorBgLabel")
const color = document.getElementById("colorText")
const colorLb = document.getElementById("colorTextLabel")
const valueText = document.getElementById("valueText")
const clearBtn = document.getElementById("clearBtn")
const title = document.getElementById("title")
const addText = document.getElementById("addText")
const saveFile = document.getElementById("saveFile")

canvas.height = document.body.clientHeight
canvas.width = document.body.clientWidth
let { width, height } = canvas

let ctx = canvas.getContext('2d')

// Clases
class Element {
    constructor(x = 0,
        y = 0,
        w = 0,
        h = 0,
        color = "white") {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.color = color
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}

class Bg extends Element {
    changeColor(color = "white") {
        this.color = color
        colorBgLb.style.backgroundColor = color
    }
}
class Text extends Element {
    constructor(x = 100, y = 100, color = "white") {
        super(color)
        this.x = x
        this.y = y
        this.color = color
    }
    addText(x, y, text, color) {
        ctx.fillStyle = color
        ctx.textAlign = "center"
        ctx.font = "bold 80px montserrat"
        ctx.fillText(text, x, y)
    }
    changeColor(color) {
        this.color = color
        colorLb.style.backgroundColor = color
    }
}

// Eventos
color.value = "#000000"
colorLb.style.backgroundColor = color.value
let bg = new Bg(0, 0, width, height, 'white')
let mouseX = 100
let mouseY = 100.0
let textos = []
let text = new Text(mouseX, mouseY, color.value)

canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect()
    mouseX = e.clientX - rect.left
    mouseY = e.clientY - rect.top + 40
})

colorBg.addEventListener('change', (e) => {
    bg.changeColor(e.target.value)
    bg.draw()
    textos.forEach(e => {
        text.addText(e.mouseX, e.mouseY, e.stringText, e.colorValue)
        console.log(e.mouseX, e.mouseY, e.stringText, e.colorValue)
    })
})
color.addEventListener('change', (e) => {
    text.changeColor(e.target.value)
    text.draw()
})
addText.addEventListener('click', () => {
    let stringText = valueText.value
    let colorValue = color.value
    text.addText(mouseX, mouseY, stringText, colorValue)
    textos.push({ mouseX, mouseY, stringText, colorValue })
})

clearBtn.addEventListener('click', () => {
    bg.changeColor("white")
    bg.draw()
    /* FIXME: Lanzar un Pop-up para confirmar 
    que el usuario desea borrar todo
    */
})

saveFile.addEventListener('click', () => {
    let enlace = document.createElement('a');
    enlace.download = title.innerHTML + ".jpg";
    enlace.href = canvas.toDataURL("image/jpeg", 1);
    enlace.click();
})

bg.draw() // Launching!

