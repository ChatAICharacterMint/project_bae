const GOOGLE_CLOUD_API_KEY = process.env.REACT_APP_GOOGLE_CLOUD_API_KEY || '';
const DID_API_KEY = process.env.REACT_APP_DID_API_KEY || '';
const TTS_REGION = process.env.REACT_APP_TTS_REGION || '';
const TTS_API_KEY = process.env.REACT_APP_TTS_API_KEY || '';
const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY || '';
const SOCKET_SERVER = process.env.REACT_APP_SOCKET_SERVER || '';
const API_SERVER = process.env.REACT_APP_API_SERVER || "";

export default {
    DID_API_KEY,
    GOOGLE_CLOUD_API_KEY,
    TTS_REGION,
    TTS_API_KEY,
    OPENAI_KEY,
    SOCKET_SERVER,
    API_SERVER
}
