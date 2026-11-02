const http=require('http');const {WebSocketServer}=require('ws');
const s=http.createServer(async(req,res)=>{
 if(req.url==='/ip'){try{const r=await fetch('http://ip-api.com/json/?fields=status,country,countryCode,city,isp,query');const j=await r.json();res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify(j));}catch(e){res.writeHead(502);res.end('fetch failed: '+e.message);}return;}
 if(req.url==='/health'){res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify({ok:true,ts:Date.now()}));return;}
 res.writeHead(200,{'Content-Type':'text/plain'});res.end('bonto test ok');});
const wss=new WebSocketServer({server:s,path:'/ws'});
wss.on('connection',ws=>{ws.send('hello');ws.on('message',m=>ws.send('echo:'+m));});
s.listen(process.env.PORT||8080,()=>console.log('listening'));
