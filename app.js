window.onload = async function () {
    registerSW();
}

// Register the Service Worker
async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator
                .serviceWorker
                .register('service-worker.js');
            console.log("SW registration successful");
        } catch (e) {
            console.log('SW registration failed: ', e);
        }
    }
}

window.clearWarning = function () {
    document.getElementById('storm').style.display = 'none';
    document.getElementById('sunrise').style.display = 'block';
}

window.showWarning = function () {
    document.getElementById('storm').style.display = 'block';
    document.getElementById('sunrise').style.display = 'none';
}

window.getPublicIp = async function () {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.log('Error calling ipify API: ', error);
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        return data.ip;
    }
}

window.copyText = function (targetTextId, event) {
    event.preventDefault();
    const element = document.getElementById(targetTextId);
    const text = element.textContent;
    navigator.clipboard.writeText(text).then(() => {
        element.style.color = '#017fc0';
        setTimeout(() => element.style.color = '', 500);
    });
}


window.onload = async function () {
    clearWarning();
    try {
        const ip = await getPublicIp();
        if(ip) document.getElementById('public-ip').textContent = ip;
    } catch (error) {
        console.log('Error getting public IP: ', error);
        showWarning();
    }
}
