// HTML sayfasındaki canvas elementini seç
let canvas = document.querySelector("canvas");

// Canvas üzerinde çizim yapmak için 2D bağlamını al
let ctx = canvas.getContext("2d");

// Belirli bir aralıkta (30 milisaniye) draw fonksiyonunu çağırmak için interval oluştur
let interval = new Interval(draw, 30);

// Labirenti oluşturmak için kullanılacak değişkenler ve sabitler
let track = new Array()
const CELL_SIZE = 20;
let x_cells = parseInt(canvas.width / CELL_SIZE);
let y_cells = parseInt(canvas.height / CELL_SIZE);
let grid = createGrid(x_cells, y_cells);
let current = grid[0][0]

// Grid'i oluşturan hücreleri içeren bir 2D dizi oluştur
function createGrid(x_no, y_no) {
    let a = [];
    for (let i = 0; i < y_no; i++) {
        let b = [];
        for (let j = 0; j < x_no; j++) {
            let cell = new Cell(i, j);
            b.push(cell);
        }
        a.push(b);
    }
    return a;
}

// Eğer belirli bir koşul sağlanıyorsa bir log mesajı yazdır
if (1 == 2) {
    console.log("okay");
}

// Grid'i canvas üzerine çiz
function drawGrid(grid, CELL_SIZE) {
    for (let i = 0; i < y_cells; i++) {
        for (let j = 0; j < x_cells; j++) {
            column = grid[i][j]
            // Ziyaret edilen hücreleri mavi ile işaretle
            if (column.visited) {
                ctx.fillStyle = 'rgba(0, 0, 255, 0.2)'
                ctx.fillRect(column.i * CELL_SIZE, column.j * CELL_SIZE, CELL_SIZE, CELL_SIZE)
            }
            // Ziyaret edilen ancak geri izlenen hücreleri farklı bir renkle işaretle
            if (column.backtracked) {
                ctx.fillStyle = 'rgba(0, 255, 0, 0.4)'
                ctx.fillRect(column.i * CELL_SIZE, column.j * CELL_SIZE, CELL_SIZE, CELL_SIZE)
            }
            let x, y, dx, dy, line_width = 2
            // Duvarları ve yolları çiz
            // Üst
            if (!column.blocked[0]) {
                x = column.i * CELL_SIZE
                y = column.j * CELL_SIZE
                dx = x + CELL_SIZE
                dy = y
                line(ctx, 'black', line_width, x, y, dx, dy);
            }
            // Sağ
            if (!column.blocked[1]) {
                x = column.i * CELL_SIZE
                x += CELL_SIZE
                y = column.j * CELL_SIZE
                dx = x
                dy = y + CELL_SIZE
                line(ctx, 'black', line_width, x, y, dx, dy);
            }
            // Alt
            if (!column.blocked[2]) {
                x = column.i * CELL_SIZE
                y = column.j * CELL_SIZE
                y += CELL_SIZE
                dx = x + CELL_SIZE
                dy = y
                line(ctx, 'black', line_width, x, y, dx, dy);
            }
            // Sol
            if (!column.blocked[3]) {
                x = column.i * CELL_SIZE
                y = column.j * CELL_SIZE
                dx = x
                dy = y + CELL_SIZE
                line(ctx, 'black', line_width, x, y, dx, dy);
            }
        }
    }
}

//geçici değişken ve sınırlama için kullandım
let neibhour
let i
let tf = true

// Labirenti oluşturan ve çizen fonksiyon
function draw() {
    // Canvas'i beyaz ile temizle
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    drawGrid(grid, CELL_SIZE)
    // ADIM 1
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
    ctx.fillRect(current.i * CELL_SIZE, current.j * CELL_SIZE, CELL_SIZE, CELL_SIZE)
    // ADIM 2
    current.visited = true
    // ADIM 3
    neibhour = current.getneighbour(grid)
    // ADIM 4
    if (neibhour) {
        track.push(current)
        i = track.length - 1
        if (neibhour.i - current.i == 1) {
            current.blocked[1] = true
            neibhour.blocked[3] = true
        } else if (neibhour.i - current.i == -1) {
            current.blocked[3] = true
            neibhour.blocked[1] = true
        } else if (neibhour.j - current.j == 1) {
            current.blocked[2] = true
            neibhour.blocked[0] = true

        } else if (neibhour.j - current.j == -1) {
            current.blocked[0] = true
            neibhour.blocked[2] = true
        }
        current = neibhour
    } else {
        current = track[i]
        track[i].backtracked = true
        i--
        if (i == 0) {
            interval.stop()
            console.log('done')
            tf = false
        }
    }
}

// Labirent oluşturma işlemine başla fonksiyon ile
interval.start()

// Oluşturulan labirenti çiz
function draw0() {
    // Yoldan geçen bir resmi çizme fonksiyonu
    function draw1(img) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
    // Belirli bir yoldan geçen bir resmi çiz
    let path = [
        // Yolun koordinatları indes değerleri adedince olduğu için boş bıraktım
    ]
    let img = new Image()
    img.src = './created.png'
    img.onload = () => {
        draw1(img)
        // Yolu çiz
        for (let i = 0; i < path.length; i++) {
            ctx.fillStyle = 'rgba(0, 0, 255, 0.2)'
            ctx.fillRect(path[i][1] * CELL_SIZE, path[i][0] * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        }
    }
}
