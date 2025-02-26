//CREDIT: https://github.com/Senither/hypixel-skyblock-facade (Modified)
const { isUuid } = require('../../utils/uuid');
const { makeRequest, wrap } = require('../../utils/request');
const { parseNetworthProfiles } = require('../../utils/hypixel');

module.exports = wrap(async function (req, res) {
    let uuid = req.params.uuid;
    if (!isUuid(uuid)) {
        const mojang_response = await makeRequest(res, `https://api.mojang.com/users/profiles/minecraft/${uuid}`);
        if (mojang_response?.data?.id) {
            uuid = mojang_response.data.id
        }
    }

    const profileRes = await makeRequest(res, `https://api.hypixel.net/v2/skyblock/profiles?key=${process.env.HYPIXEL_API_KEY}&uuid=${uuid}`);
    const profile = await parseNetworthProfiles(profileRes, uuid, res);

    return res.status(200).json({ status: 200, data: profile });
});
