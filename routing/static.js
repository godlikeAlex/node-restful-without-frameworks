const {checkRoute, send, getStaticAssets} = require( '../utils/helpers');

const Static = async (data, db) => {
    const acceptableMethods = ['GET'];
    return checkRoute(acceptableMethods, Static, data, db);
};

Static.GET = async (data) => {
    const assetName = data.path.replace('/static/', '');
    const dataFile = await getStaticAssets(assetName)
        .catch(() => {
            return send(404)
        });

    if(assetName.length > 0) {
        let contentType = 'plain';

        if(assetName.indexOf('.css') > -1) contentType = 'css';

        return send(200, dataFile, contentType);

    }else return send(404);
};

module.exports = Static;