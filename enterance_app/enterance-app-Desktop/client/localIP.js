
function getLocalIPs(callback) {
try {
var ips = [];

var RTCPeerConnection = window.RTCPeerConnection ||
window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

var pc = new RTCPeerConnection({
// Don't specify any stun/turn servers, otherwise you will
// also find your public IP addresses.
iceServers: []
});
// Add a media line, this is needed to activate candidate gathering.
pc.createDataChannel('');

// onicecandidate is triggered whenever a candidate has been found.
pc.onicecandidate = function(e) {
if (!e.candidate) { // Candidate gathering completed.
pc.close();
callback(ips.toString());
return ;
}
};
pc.createOffer(function(sdp) {
pc.setLocalDescription(sdp);
}, function onerror() {});
}catch(e){}
}
