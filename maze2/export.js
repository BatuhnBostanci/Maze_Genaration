// Cell sınıfı tanımlanıyor. Bu sınıf labirent hücrelerini temsil eder
class Cell {
    // Constructor fonksiyonu, hücrenin satır (i) ve sütun (j) indeksini ayarldım
    constructor(i, j) {
        this.i = i; // Hücrenin satır indeksi
        this.j = j; // Hücrenin sütun indeksi
        this.blocked = [false, false, false, false]; // Hücreyi çevreleyen kenarlar (üst, sağ, alt, sol)
        this.visited = false; // Hücre ziyaret edildi mi?
        this.backtracked = false; // Hücre geri izlendi mi?
    }

    // Hücrenin komşu hücrelerini bulan fonksiyon
    getneighbour(grid) {
        let neighbours = [];

        // Sağdaki hücre
        if (!(this.i + 1 > grid.length - 1) && !grid[this.i + 1][this.j].visited) {
            neighbours.push(grid[this.i + 1][this.j]);
        }

        // Altındaki hücre
        if (!(this.j + 1 > grid[0].length - 1) && !grid[this.i][this.j + 1].visited) {
            neighbours.push(grid[this.i][this.j + 1]);
        }

        // Soldaki hücre
        if (!(this.i - 1 < 0) && !grid[this.i - 1][this.j].visited) {
            neighbours.push(grid[this.i - 1][this.j]);
        }

        // Üstteki hücre
        if (!(this.j - 1 < 0) && !grid[this.i][this.j - 1].visited) {
            neighbours.push(grid[this.i][this.j - 1]);
        }

        // Rastgele bir komşu hücre seçilip döndürülüyor
        return neighbours[Math.floor(Math.random() * neighbours.length)];
    }
}

// İki nokta arasında çizgi çizmeyi sağlayan fonksiyon
function line(ctx, stroke, width, x, y, nx, ny) {
    ctx.beginPath();
    ctx.strokeStyle = stroke;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = width;
    ctx.moveTo(x, y);
    ctx.lineTo(nx, ny);
    ctx.stroke();
}

// Belirli bir süre boyunca bir işlevi düzenli aralıklarla çalıştıran bir araç sınıfı
function Interval(fn, time) {
    var timer = false;

    // Zamanlayıcıyı başlatan fonksiyon
    this.start = function () {
        if (!this.isRunning())
            timer = setInterval(fn, time);
    };

    // Zamanlayıcıyı durduran fonksiyon
    this.stop = function () {
        clearInterval(timer);
        timer = false;
    };

    // Zamanlayıcının çalışıp çalışmadığını kontrol eden fonksiyon
    this.isRunning = function () {
        return timer !== false;
    };
}
