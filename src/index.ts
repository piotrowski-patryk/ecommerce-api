import config from './config/index.js'
import app from './app.js';
import { ANSI_CODES } from './common/constants/index.js';

const { env, port, url } = config.app;
const { G, B, S, _ } = ANSI_CODES;

app.listen(port, () => {
    console.log(`\n${G}[server] ${S}running in ${B}${env}${S} mode${_}`);
    console.log(`${G}[server] ${S}listening at ${B}${url}${_}`);
});