export const WEB_URL_PREFIX = window.location.protocol + '//' +
    ((window.location.port === '4202') ? (window.location.hostname + ':8080/') : (window.location.host + '/api/')) //

