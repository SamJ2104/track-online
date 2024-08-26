import { joinRoom } from 'https://cookie.samj.app/trystero-torrent.min.js'; // Adjust the path accordingly
const appId = 'samj-app-online'; // Replace with your actual app ID
const roomId = 'samj-app-online'; // Replace with your actual room ID

document.addEventListener('DOMContentLoaded', () => {
    const room = joinRoom({ appId }, roomId);

    const onlineCountElement = document.getElementById('onlinecount');
    const whatUrlElement = document.getElementById('whaturl');

    function getDomain(url) {
        // Extract the domain from a URL
        const link = document.createElement('a');
        link.href = url;
        return link.hostname;
    }

    function updateOnlineCount() {
        if (onlineCountElement) {
            const peers = room.getPeers();
            const onlineCount = peers ? Object.keys(peers).length : 0;
            onlineCountElement.textContent = `Online: ${onlineCount}`;
        } else {
            console.warn('No element with ID "onlinecount" found.');
        }
    }

    function updateWhatUrl() {
        if (whatUrlElement) {
            const currentUrl = window.location.href;
            const domain = getDomain(currentUrl);
            const peers = room.getPeers();
            const connections = peers ? Object.keys(peers).length : 0;

            // Display the number of connections grouped by domain
            whatUrlElement.textContent = `Domain: ${domain} | Connections: ${connections}`;
        } else {
            console.warn('No element with ID "whaturl" found.');
        }
    }

    updateOnlineCount();
    updateWhatUrl();

    room.onPeerJoin(() => {
        updateOnlineCount();
        updateWhatUrl();
    });
    
    room.onPeerLeave(() => {
        updateOnlineCount();
        updateWhatUrl();
    });
});
