const cryptoo = require("crypto")

const sha512 = (input) =>{
    const hash = cryptoo.createHash("sha512").update(input, "utf8");
    const hashBase64 = hash.digest("hex");
    return hashBase64.substr(hashBase64, 40);
}

module.exports = sha512
