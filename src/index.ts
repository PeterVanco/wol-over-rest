import * as express from 'express';
import * as wol from 'node-wol';

import {PORT, TOKEN} from './constants';

const logger = new console.Console(process.stdout, process.stderr);
require('console-stamp')(logger, {
    metadata: '[MAIN]'
});

const app = express();

function authorize(suppliedToken, res) {
    if (TOKEN !== null && suppliedToken !== TOKEN) {
        res.sendStatus(403);
        return false;
    }
    return true;
}

app.get('/wake/:mac', (req, res) => {
    if (!authorize(req.query.token, res)) {
        return;
    }

    const mac = req.params.mac;
    logger.log(`Sending WOL to ${mac}`);
    wol.wake(mac, function (error) {
        if (error) {
            logger.log(`WOL for ${mac} failed with ${error}`);
            res.sendStatus(422);
        } else {
            res.send(JSON.stringify({response: "ok"}, null, 2));
        }
    });
});

app.get('*', function (req, res) {
    if (!authorize(req.query.token, res)) {
        return;
    }

    res.send("Usage: /wake/{mac}?token={optional_token}")
});

app.listen(PORT, () => {
    logger.log(`Server is running on http://localhost:${PORT}`);
});
