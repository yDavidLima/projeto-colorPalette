const colorInput = document.getElementById("colorInput");
const colorPreview = document.getElementById("colorPreview");
const paletteColorsContainer = document.getElementById("paletteColors");
const savePaletteButton = document.getElementById("savePalette");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const startColorInput = document.getElementById("startColor")
const endColorInput = document.getElementById("endColor")
const generateGradienteButton = document.getElementById("generateGradiente")
const gradientPreview = document.getElementById("gradientPreview")
const lastSelectedColorKey = "lastSelectedColor"; // Chave para o localStorage

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const paletteColors = []; // Array para armazenar as cores da paleta

// Listener para a mudança de cor no seletor
colorInput.addEventListener("input", (evento)=>{
    const selectedColor = evento.target.value
    colorPreview.style.background = selectedColor
    saveLastSelectedColor(selectedColor); // Salvar a última cor selecionada


})
function saveLastSelectedColor(color) {
    localStorage.setItem(lastSelectedColorKey, color);
}

// ... (outras partes do seu código)

// Carregar a última cor selecionada ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    const lastSelectedColor = localStorage.getItem(lastSelectedColorKey);
    if (lastSelectedColor) {
        colorInput.value = lastSelectedColor;
        colorPreview.style.background = lastSelectedColor;
    }
});








// Listener para o botão "Salvar Paleta"
savePaletteButton.addEventListener("click", () => {
    const selectedColor = colorInput.value;
    if (selectedColor && !paletteColors.includes(selectedColor)) {
        paletteColors.push(selectedColor);
        const colorBox = document.createElement("div");
        colorBox.className = "palette-color-box";
        colorBox.style.backgroundColor = selectedColor;
        paletteColorsContainer.appendChild(colorBox);
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

generateGradienteButton.addEventListener("click", () => {
    const startColor = startColorInput.value
    const endColor = endColorInput.value

    gradientPreview.style.background = `linear-gradient(to right, ${startColor}, ${endColor})`;


})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// No final do seu script.js
const colorTips = document.querySelector(".color-tips");

colorTips.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
        event.preventDefault();

        // Esconder todas as dicas de cores
        const colorTipSections = document.querySelectorAll(".color-tip");
        colorTipSections.forEach(section => {
            section.style.display = "none";
        });

        // Mostrar a dica de cor correspondente
        const tipId = event.target.getAttribute("href");
        const colorTip = document.querySelector(tipId);
        colorTip.style.display = "block";
    }
});


const sectionLeftBoxes = document.querySelectorAll(".box-left");

// Exemplo de cores predefinidas
const predefinedColors = ["#FF5733", "#FFC300", "#36D7B7", "#3498DB", "#9B59B6"];

// Atribuir cores às caixas
sectionLeftBoxes.forEach((box, index) => {
    box.style.backgroundColor = predefinedColors[index % predefinedColors.length];
});

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

sectionLeftBoxes.forEach(box => {
    box.style.backgroundColor = getRandomColor();
});


const updateColorsButton = document.getElementById("updateColorsButton");

updateColorsButton.addEventListener("click", () => {
    sectionLeftBoxes.forEach(box => {
        box.style.backgroundColor = getRandomColor(); // Função getRandomColor é a mesma usada anteriormente
    });
});




sectionLeftBoxes.forEach(box => {
    box.addEventListener("mouseover", () => {
        const boxColor = box.style.backgroundColor;
        const hexColor = rgbToHex(boxColor);
        box.textContent = hexColor;
    });

    box.addEventListener("mouseout", () => {
        box.textContent = ""; // Limpa o texto quando o mouse sai da caixa
    });
});

// Função para converter cor RGB para hexadecimal
function rgbToHex(rgbColor) {
    const rgbValues = rgbColor.match(/\d+/g);
    if (rgbValues) {
        const hexColor = "#" + rgbValues.map(val => {
            const hexValue = parseInt(val).toString(16);
            return hexValue.length === 1 ? "0" + hexValue : hexValue;
        }).join("");
        return hexColor.toUpperCase();
    }
    return "";
}
// 



sectionLeftBoxes.forEach(box => {
    box.addEventListener("mouseover", () => {
        const boxColor = box.style.backgroundColor;
        const hexColor = rgbToHex(boxColor);
        box.textContent = hexColor;
    });

    box.addEventListener("mouseout", () => {
        box.textContent = "";
    });

    box.addEventListener("click", () => {
        const boxColor = box.style.backgroundColor;
        const hexColor = rgbToHex(boxColor);
        saveColor(hexColor);
    });
});

function rgbToHex(rgb) {
    const [r, g, b] = rgb.match(/\d+/g); // Extrai os valores R, G e B da string rgb
    return `#${Number(r).toString(16).padStart(2, "0")}${Number(g).toString(16).padStart(2, "0")}${Number(b).toString(16).padStart(2, "0")}`;
}

function saveColor(color) {
    if (!paletteColors.includes(color)) {
        paletteColors.push(color);
        const colorBox = document.createElement("div");
        colorBox.className = "palette-color-box";
        colorBox.style.backgroundColor = color;
        paletteColorsContainer.appendChild(colorBox);
    }
}


// ...

function createColorBox(color) {
    const colorBox = document.createElement("div");
    colorBox.className = "palette-color-box";
    colorBox.style.backgroundColor = color;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-color-button";
    deleteButton.innerHTML = "X";
    deleteButton.addEventListener("click", () => deleteColor(color));

    colorBox.appendChild(deleteButton);
    return colorBox;
}

function saveColor(color) {
    if (!paletteColors.includes(color)) {
        paletteColors.push(color);
        localStorage.setItem("paletteColors", JSON.stringify(paletteColors)); // Salva no localStorage
        // localStorage.setItem("lastSelectedColor", color); // Salva a última cor selecionada
        const colorBox = createColorBox(color);
        paletteColorsContainer.appendChild(colorBox);
    }
}

function deleteColor(color) {
    const index = paletteColors.indexOf(color);
    if (index !== -1) {
        paletteColors.splice(index, 1);
        localStorage.setItem("paletteColors", JSON.stringify(paletteColors)); // Atualiza o localStorage
        updatePaletteDisplay();
    }
}

function updatePaletteDisplay() {
    paletteColorsContainer.innerHTML = "";
    paletteColors.forEach(color => {
        const colorBox = createColorBox(color);
        paletteColorsContainer.appendChild(colorBox);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const savedColors = localStorage.getItem("paletteColors");
    if (savedColors) {
        paletteColors.push(...JSON.parse(savedColors));
        updatePaletteDisplay();
        
        
    }
    const lastSelectedColor = localStorage.getItem("lastSelectedColor");
    if (lastSelectedColor) {
        colorInput.value = lastSelectedColor;
        colorPreview.style.backgroundColor = lastSelectedColor; }
});





