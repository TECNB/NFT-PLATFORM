import { SHA256, HmacSHA256, enc } from 'crypto-js';

interface V3Options {
    SECRET_ID: string;
    SECRET_KEY: string;
    action: string;
    host: string;
    service: string;
    region: string;
    version: string;
    ContentType: string;
}

interface V3RequestPayload {
    [key: string]: any;
}

function sha256(message: string, secret: string = '', hex: boolean = false) {
    const hmac = HmacSHA256(message, secret);
    let hexHmac = hmac;
    if (hex) {
        hexHmac = hmac.toString(enc.Hex) as any;
    }
    return hexHmac;
}

function getHash(message: string) {
    const hash = SHA256(message);
    const hexHash = hash.toString(enc.Hex);
    return hexHash;
}

function getDate(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const year = date.getUTCFullYear();
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + date.getUTCDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

export function V3(config: V3Options, body: V3RequestPayload) {
    const SECRET_ID = config.SECRET_ID;
    const SECRET_KEY = config.SECRET_KEY;
    const host = config.host;
    const service = config.service;
    const region = config.region;
    const action = config.action;
    const version = config.version;
    const ContentType = config.ContentType;

    const timestamp = Math.floor(Date.now() / 1000);
    const date = getDate(timestamp);
    const payload = JSON.stringify(body);
    const hashedRequestPayload = getHash(payload);
    const httpRequestMethod = "POST";
    const canonicalUri = "/";
    const canonicalQueryString = "";
    const canonicalHeaders =
        `content-type:${ContentType}\n` +
        `host:${host}\n` +
        `x-tc-action:${action.toLowerCase()}\n`;
    const signedHeaders = "content-type;host;x-tc-action";

    const canonicalRequest =
        `${httpRequestMethod}\n` +
        `${canonicalUri}\n` +
        `${canonicalQueryString}\n` +
        `${canonicalHeaders}\n` +
        `${signedHeaders}\n` +
        `${hashedRequestPayload}`;

    const algorithm = "TC3-HMAC-SHA256";
    const hashedCanonicalRequest = getHash(canonicalRequest);
    const credentialScope = `${date}/${service}/tc3_request`;
    const stringToSign = `${algorithm}\n${timestamp}\n${credentialScope}\n${hashedCanonicalRequest}`;

    const kDate = sha256(date, 'TC3' + SECRET_KEY);
    const kService = sha256(service, kDate as any);
    const kSigning = sha256('tc3_request', kService as any);
    const signature = sha256(stringToSign, kSigning as any, true);

    const authorization =
        `${algorithm} Credential=${SECRET_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const curlcmd =
        `curl -X POST https://${host}` +
        ` -H "Authorization: ${authorization}"` +
        ` -H "Content-Type: ${ContentType}"` +
        ` -H "Host: ${host}"` +
        ` -H "X-TC-Action: ${action}"` +
        ` -H "X-TC-Timestamp: ${timestamp}"` +
        ` -H "X-TC-Version: ${version}"` +
        ` -H "X-TC-Region: ${region}"` +
        ` -d '${payload}'`;

    return {
        SECRET_ID,
        SECRET_KEY,
        authorization,
        ContentType,
        timestamp,
        region,
        action,
        version,
        host,
        curlcmd
    };
}
