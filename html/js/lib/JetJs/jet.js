var JETJS = JETJS || {};

JETJS.namespace = function () {
    var parts = ns_string.split('.'),
        parent = JETJS,
        i;

    // отбросить начальный префикс - глоб обьект
    if(parts[0] === 'JETJS') {
        parts.splice(1);
    }

    for(i=0;i<parts.length;i++) {
        // создать св-во, если оно отсутвует
        if(typeof parent[parts[i]] === 'undefined') {
            parent[parts[i]] = {};
        }
    }

    return parent;
};