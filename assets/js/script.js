// hitung jumlah kasi titik
var rupiah = document.getElementById("rupiah");
rupiah.addEventListener("keyup", function (e) {
    // tambahkan 'Rp.' pada saat form di ketik
    // gunakan fungsi formatRupiah() untuk mengubah angka yang di ketik menjadi format angka
    rupiah.value = formatRupiah(this.value, "Rp. ");
});

/* Fungsi formatRupiah */
function formatRupiah(angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, "").toString(),
        split = number_string.split(","),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
        separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return prefix == undefined ? rupiah : rupiah ? " " + rupiah : ""; //rp.
}
// count
var table = document.getElementById('table-list');
var cells = table.getElementsByClassName('editr');

for (var i = 0; i < cells.length; i++) {
    cells[i].onclick = function () {
        if (this.hasAttribute('data-clicked')) {
            return;
        }
        this.setAttribute('data-clicked', 'yes');
        this.setAttribute('data-text', this.innerHTML);
        var
            input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.value = this.innerHTML;
        input.onblur = function () {
            var td = input.parentElement;
            var
                orig_text = input.parentElement.getAttribute('data-text');
            var current_text = this.value;
            if (orig_text !=
                current_text
            ) { //ada perubahan text // save ke database td.removeAttribute('data-clicked');
                td.removeAttribute('data-text');
                td.innerHTML = current_text;
                td.style.cssText = 'padding: 0.75rem';
                console.log(orig_text + ' di ganti dengan ' + current_text);
            } else {
                td.removeAttribute('data-clicked');
                td.removeAttribute('data-text');
                td.innerHTML = orig_text;
                td.style.cssText = 'padding: 0.75rem';
                console.log('Ga ada Perubahan');
            }
        }
        input.onkeypress = function () {
            if (event.keyCode == 13) {
                this.blur();
            }
        }
        this.innerHTML = '';
        this.style.cssText = 'padding: 0px, 0px';
        this.append(input);
        this.firstElementChild.select();
    }
}