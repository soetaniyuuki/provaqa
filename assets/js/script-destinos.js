// Kaffa Tech Travel - JavaScript (Destinos)

const voltarAoTopoBtn = document.getElementById("voltarAoTopo");
if (voltarAoTopoBtn) {
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            voltarAoTopoBtn.style.display = "block";
        } else {
            voltarAoTopoBtn.style.display = "none";
        }
    };

    voltarAoTopoBtn.onclick = function() {
    };
}

const navElement = document.querySelector('nav');
if (navElement) {
    navElement.addEventListener('click', function() {
        setTimeout(() => {
            document.querySelector('header').style.display = 'none';
        }, 5000);
    });
}

setTimeout(() => {
    const header = document.querySelector('header');
    if (header) {
        header.style.display = 'none';
    }
}, 30000);