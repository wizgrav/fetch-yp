#!/usr/bin/env node
import { XMLParser} from "fast-xml-parser";
import fetch from 'node-fetch';
import fs from 'fs';

const args = process.argv.slice(2);

const parser = new XMLParser();

const res = await fetch("https://dir.xiph.org/yp.xml");
const text = await res.text();
const obj = parser.parse(text);
const ret = [];
let c = 1;
const rx = /^https\:\/\//;

obj.directory.entry.forEach(el => {
    if(el.listen_url && rx.test(el.listen_url))
        ret.push({ id: c++, t: el.server_name, g: el.genre, u: el.listen_url });
});
fs.writeFileSync(args.length ? args[0] : 'yp.json', JSON.stringify(ret));
