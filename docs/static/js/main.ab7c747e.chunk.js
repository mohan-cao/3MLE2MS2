(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e){e.exports={ms2:{melody:{__cdata:"#text"},chord:[{"@_index":"1",__cdata:"#text"},{"@_index":"2",__cdata:"#text"},{"@_index":"3",__cdata:"#text"},{"@_index":"4",__cdata:"#text"},{"@_index":"5",__cdata:"#text"},{"@_index":"6",__cdata:"#text"},{"@_index":"7",__cdata:"#text"},{"@_index":"8",__cdata:"#text"},{"@_index":"9",__cdata:"#text"}]}}},20:function(e,t,n){e.exports=n.p+"static/media/mushroom.7f63adae.png"},21:function(e,t,n){e.exports=n.p+"static/media/bg2.3fec2c14.jpg"},22:function(e,t,n){e.exports=n(44)},27:function(e,t,n){},36:function(e,t,n){},40:function(e,t,n){},42:function(e,t,n){},44:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(17),o=n.n(i),l=(n(27),n(1)),s=n(2),c=n(5),u=n(4),m=n(6),g=n(7),p=n(9),h=n.n(p),d=n(18),f=n.n(d),b=function(e){var t=e.className,n=e.style;return r.a.createElement("svg",{className:t,style:Object(g.a)({},n),viewBox:"0 0 65 65"},r.a.createElement("g",null,r.a.createElement("path",{d:"m32.5 4.999c-5.405 0-10.444 1.577-14.699 4.282l-5.75-5.75v16.11h16.11l-6.395-6.395c3.18-1.787 6.834-2.82 10.734-2.82 12.171 0 22.073 9.902 22.073 22.074 0 2.899-0.577 5.664-1.599 8.202l4.738 2.762c1.47-3.363 2.288-7.068 2.288-10.964 0-15.164-12.337-27.501-27.5-27.501z"}),r.a.createElement("path",{d:"m43.227 51.746c-3.179 1.786-6.826 2.827-10.726 2.827-12.171 0-22.073-9.902-22.073-22.073 0-2.739 0.524-5.35 1.439-7.771l-4.731-2.851c-1.375 3.271-2.136 6.858-2.136 10.622 0 15.164 12.336 27.5 27.5 27.5 5.406 0 10.434-1.584 14.691-4.289l5.758 5.759v-16.112h-16.111l6.389 6.388z"})))},v="mml",y="ms2mml",E=function(e){if(e&&e.name)return[v,y].filter(function(t){return t===e.name.split(".")[1].toLowerCase()})[0]};var w=function(e){return".".concat(e.toLowerCase(),",.").concat(e.toUpperCase())},x=(w(v),w(y),w(v)+","+w(y)),k=n(11),O=10,j=function(e){var t=e[0].length;return e.index+t},N=function(e){return e.split("\n").filter(function(e){return!e.trim().startsWith("//")}).map(function(e){return e.replace(/(\/\*.*\*\/|\s)*/g,"").trim()}).join("")},C=function(e){var t,n=[],a=[],r=/\[Channel[0-9]+\]/g;do{(t=r.exec(e))&&n.push(t)}while(t);if(!n||0===n.length)throw Error("Does not contain tracks!");n.push({index:e.lastIndexOf("[3MLE EXTENSION]")});for(var i=0;i<n.length-1;i++)a.push(N(e.slice(j(n[i]),n[i+1].index)));return a};function D(e,t,n){for(var a in e)if(e.hasOwnProperty(a)){if(e[a]===t)return e[a]=n,!0;if("object"===typeof e[a]&&null!==e[a]&&D(e[a],t,n))return!0}return!1}function A(e){return C(e).slice(0,O)}var B={attributeNamePrefix:"@_",ignoreAttributes:!1,cdataTagName:"__cdata",cdataPositionChar:"\\c",format:!0,indentBy:"  ",supressEmptyNode:!1};function M(e){return'<?xml version="1.0" encoding="utf-8"?>\n'+function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:B;return new p.j2xParser(t).parse(e)}(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:B)}var T=n(13),_=n.n(T),S={attributeNamePrefix:"@_",ignoreAttributes:!1,ignoreNameSpace:!1,allowBooleanAttributes:!0,parseNodeValue:!0,parseAttributeValue:!0,trimValues:!0,cdataTagName:"__cdata",cdataPositionChar:"\\c",localeRange:"",parseTrueNumberOnly:!1,attrValueProcessor:function(e){return _.a.decode(e,{isAttributeValue:!0})},tagValueProcessor:function(e){return _.a.decode(e)}};var G=n(12),F="iso-8859-1",P="Untitled",I="Big Buck Bunny",L=function e(t,n){var a={};for(var r in t)if(t.hasOwnProperty(r)){if(t[r]===n)return r;if("object"===typeof t[r]&&null!==t[r]){var i=e(t[r],n);i&&(a[r]=i)}}return a}(k,"#text"),R=function(e){return e.split("\n").filter(function(e){return!e.trim().startsWith("//")}).map(function(e){return e.replace(/(\/\*.*\*\/|\s)*/g,"").trim()}).join("")};function U(e){var t=z(L,e);return t&&(t=t.map(function(e){return R(e)})),t}function z(e,t){var n=[];for(var a in e)if("object"===typeof e[a]&&null!==e[a])n.push.apply(n,Object(G.a)(z(e[a],t[a])));else if("string"===typeof e[a]){t.hasOwnProperty(a)&&t[a].hasOwnProperty(e[a])&&n.push(t[a][e[a]].trim())}return n}n(36);var W=n(3),V=n.n(W),J=function(){function e(){Object(l.a)(this,e)}return Object(s.a)(e,[{key:"run",value:function(e){throw new Error("Not implemented")}}]),e}(),H=8,X=0,$=15,q=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).value="number"===typeof e&&e>=X&&e<=$?e:H,n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"run",value:function(e){e.volume=this.value/$}}],[{key:"handleVolumeChange",value:function(e){return"v"!==e[0]?e:new t(parseInt(e.slice(1)))}}]),t}(J),K=120,Q=32,Y=255,Z=96,ee=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).value="number"===typeof e&&e>=Q&&e<=Y?e:K,n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"run",value:function(e){e.tempo=this.value}}],[{key:"handleTempoChange",value:function(e){return"t"!==e[0]?e:new t(parseInt(e.slice(1)))}}]),t}(J),te=4,ne=1,ae=64,re=function(e){function t(e){var n,a=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Object(l.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).value="number"===typeof e&&e>=ne&&e<=ae?e:te,n.dotted=!!a,n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"run",value:function(e){e.measureDivision=this}}],[{key:"handleMDivChange",value:function(e){return"l"!==e[0]?e:"."===e[e.length-1]?new t(parseInt(e.slice(1,-1)),!0):new t(parseInt(e.slice(1)))}}]),t}(J),ie="UP",oe="DOWN",le=4,se=0,ce=8,ue=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).value=e===ie||e===oe?e:"number"===typeof e&&e>=se&&e<=ce?e:null,n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"run",value:function(e){this.value===ie&&e.octave<8?e.octave++:this.value===oe&&e.octave>1?e.octave--:"number"===typeof this.value&&(e.octave=this.value)}}],[{key:"handleOctaveChange",value:function(e){return"o"!==e[0]&&"<"!==e[0]&&">"!==e[0]?e:">"===e[0]?new t(ie):"<"===e[0]?new t(oe):new t(parseInt(e.slice(1)))}}]),t}(J),me=function(e){function t(e){var n,a=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Object(l.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).value="number"===typeof e&&e>=1&&e<=64?e:null,n.dotted=!!a,n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"run",value:function(e){e.addRest(fe(this,e.measureDivision,e.tempo))}}],[{key:"handleRestChange",value:function(e){return"r"!==e[0]?e:"."===e[e.length-1]?new t(parseInt(e.slice(1,-1)),!0):new t(parseInt(e.slice(1)))}}]),t}(J),ge={0:"C",1:"C#",2:"D",3:"D#",4:"E",5:"F",6:"F#",7:"G",8:"G#",9:"A",10:"A#",11:"B"},pe={"B#":"C",Cb:"B","E#":"F",Fb:"E"},he=function(e){function t(e,n){var a,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=arguments.length>3&&void 0!==arguments[3]&&arguments[3],o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e,n))).note=e,a.value="number"===typeof n&&n>0&&n<=64?n:null,r&&(a.dotted=!!r),i&&(a.tied=!!i),o&&(a.octave=o),a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"run",value:function(e){var t=fe(this,e.measureDivision,e.tempo),n=this.note.toString()+(this.octave?this.octave:e.octave);this.tied?e.addTie(n,t):e.playNote(n,t)}}],[{key:"handleNoteChange",value:function(e){if(!e)return e;var n=e.toString().match(/^(&)?([a-g][-+#]?)([0-9]*)?(\.)?/);if(!n)return e;var a=n[2].toUpperCase().replace("-","b").replace("+","#");return pe.hasOwnProperty(a)&&(a=pe[a]),new t(a,n[3]?parseInt(n[3]):null,n[4],n[1])}},{key:"handleExactNoteChange",value:function(e){if(!e)return e;var n=e.toString().match(/^(&)?n([0-9]*)/);if(!n)return e;var a=function(e){var t=Math.floor(e/12);return[ge[e%12],t]}(parseInt(n[2]));if(!a)throw new Error("wtf happened with note "+e);return new t(a[0],null,!1,n[1],a[1])}}]),t}(J),de=function(e,t,n){return Math.min(Math.max(e,t),n)};function fe(e,t,n){return 60*function(e,t){return e.value?de(Math.floor(384/e.value),6,384)*(e.dotted?1.5:1):e.dotted?1.5*de(Math.floor(384/t.value),6,384):de(Math.floor(384/t.value),6,384)*(t.dotted?1.5:1)}(e,t)/(n*Z)}var be=function(e){var t=[re.handleMDivChange,ee.handleTempoChange,q.handleVolumeChange,ue.handleOctaveChange,me.handleRestChange,he.handleExactNoteChange,he.handleNoteChange],n=e.match(/(&?[a-z][-+#]?[0-9]*\.?|[<>])/g);if(!n)return[];for(var a=0;a<n.length;a++){var r=n[a];for(var i in t)r=t[i](r);n[a]=r}return n},ve=function(e){var t=new ye([]);try{for(var n=0;n<e.length;n++)e[n]instanceof J&&e[n].run(t)}catch(a){console.error(a)}return t.playables},ye=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];Object(l.a)(this,e),this.time=0,this.octave=le,this.tempo=K,this.measureDivision=new re(te),this.volume=H,this.previousNote=null,this.rest=0,this.playables=Object(G.a)(t)}return Object(s.a)(e,[{key:"playNote",value:function(e,t){this.time+=this.rest,this.rest=0,this.playables.push({note:e,duration:t,time:this.time,velocity:this.volume}),this.time+=t,this.previousNote=e}},{key:"addTie",value:function(e,t){if(!this.previousNote||!this.playables.length)return this.playNote(e,t);this.previousNote===e&&this.playables.slice(-1)[0].note===e?(this.playables[this.playables.length-1].duration+=t,this.time+=t,this.rest=0,this.previousNote=e):this.playNote(e,t)}},{key:"addRest",value:function(e){this.rest+=e,this.previousNote="R"}}]),e}();var Ee,we,xe=n(14),ke=n.n(xe),Oe=n(19),je="piano",Ne={A0:"A1.[mp3|ogg]",A1:"A2.[mp3|ogg]",A2:"A3.[mp3|ogg]",A3:"A4.[mp3|ogg]",A4:"A5.[mp3|ogg]",A5:"A6.[mp3|ogg]",A6:"A7.[mp3|ogg]",Ab0:"Ab1.[mp3|ogg]",Ab1:"Ab2.[mp3|ogg]",Ab2:"Ab3.[mp3|ogg]",Ab3:"Ab4.[mp3|ogg]",Ab4:"Ab5.[mp3|ogg]",Ab5:"Ab6.[mp3|ogg]",Ab6:"Ab7.[mp3|ogg]",B0:"B1.[mp3|ogg]",B1:"B2.[mp3|ogg]",B2:"B3.[mp3|ogg]",B3:"B4.[mp3|ogg]",B4:"B5.[mp3|ogg]",B5:"B6.[mp3|ogg]",B6:"B7.[mp3|ogg]",Bb0:"Bb1.[mp3|ogg]",Bb1:"Bb2.[mp3|ogg]",Bb2:"Bb3.[mp3|ogg]",Bb3:"Bb4.[mp3|ogg]",Bb4:"Bb5.[mp3|ogg]",Bb5:"Bb6.[mp3|ogg]",Bb6:"Bb7.[mp3|ogg]",C0:"C1.[mp3|ogg]",C1:"C2.[mp3|ogg]",C2:"C3.[mp3|ogg]",C3:"C4.[mp3|ogg]",C4:"C5.[mp3|ogg]",C5:"C6.[mp3|ogg]",C6:"C7.[mp3|ogg]",C7:"C7.[mp3|ogg]",D0:"D1.[mp3|ogg]",D1:"D2.[mp3|ogg]",D2:"D3.[mp3|ogg]",D3:"D4.[mp3|ogg]",D4:"D5.[mp3|ogg]",D5:"D6.[mp3|ogg]",D6:"D6.[mp3|ogg]",Db0:"Db1.[mp3|ogg]",Db1:"Db2.[mp3|ogg]",Db2:"Db3.[mp3|ogg]",Db3:"Db4.[mp3|ogg]",Db4:"Db5.[mp3|ogg]",Db5:"Db6.[mp3|ogg]",Db6:"Db7.[mp3|ogg]",E0:"E1.[mp3|ogg]",E1:"E2.[mp3|ogg]",E2:"E3.[mp3|ogg]",E3:"E4.[mp3|ogg]",E4:"E5.[mp3|ogg]",E5:"E6.[mp3|ogg]",E6:"E7.[mp3|ogg]",Eb0:"Eb1.[mp3|ogg]",Eb1:"Eb2.[mp3|ogg]",Eb2:"Eb3.[mp3|ogg]",Eb3:"Eb4.[mp3|ogg]",Eb4:"Eb5.[mp3|ogg]",Eb5:"Eb6.[mp3|ogg]",Eb6:"Eb7.[mp3|ogg]",F0:"F1.[mp3|ogg]",F1:"F2.[mp3|ogg]",F2:"F3.[mp3|ogg]",F3:"F4.[mp3|ogg]",F4:"F5.[mp3|ogg]",F5:"F6.[mp3|ogg]",F6:"F7.[mp3|ogg]",G0:"G1.[mp3|ogg]",G1:"G2.[mp3|ogg]",G2:"G3.[mp3|ogg]",G3:"G4.[mp3|ogg]",G4:"G5.[mp3|ogg]",G5:"G6.[mp3|ogg]",G6:"G7.[mp3|ogg]",Gb0:"Gb1.[mp3|ogg]",Gb1:"Gb2.[mp3|ogg]",Gb2:"Gb3.[mp3|ogg]",Gb3:"Gb4.[mp3|ogg]",Gb4:"Gb5.[mp3|ogg]",Gb5:"Gb6.[mp3|ogg]",Gb6:"Gb7.[mp3|ogg]"},Ce={minify:!1,ext:".[mp3|ogg]",baseUrl:"https://raw.githubusercontent.com/mohan-cao/3MLE2MS2-soundfonts/master/",list:["piano","electric-piano","harpsichord","harp","guitar","electric-guitar","acoustic-bass","electric-bass","violin","pizzicato-strings","cello","clarinet","oboe","ocarina","pan-flute","saxophone","trombone","trumpet","harmonica","steel-drums","timpani","tom-tom","vibraphone","xylophone"],setExt:function(e){var t;for(t=0;t<=this.list.length-1;t++)for(var n in this[this.list[t]])this[this.list[t]][n]=this[this.list[t]][n].replace(this.ext,e);return this.ext=e,console.log("sample extensions set to "+this.ext)},load:function(){var e=Object(Oe.a)(ke.a.mark(function e(t){var n,a,r,i,o,l,s,c,u,m;return ke.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if((n=t||{}).instruments=n.instruments||this.list,n.baseUrl=n.baseUrl||this.baseUrl,n.ext&&(n.ext!==this.ext&&this.setExt(n.ext),n.ext=this.ext),a={},!Array.isArray(n.instruments)){e.next=21;break}i=function(e,t){return t%c!==0},o=function(e){delete s[e]},l=function(e,t,n){return new Promise(function(a,i){try{e[t.instruments[r]]=new V.a.Sampler(n,{baseUrl:t.baseUrl+t.instruments[r]+"/",release:1,onload:a})}catch(o){i(o)}})},r=0;case 10:if(!(r<=n.instruments.length-1)){e.next=18;break}return s=this.list.indexOf(-1!==n.instruments[r])?Ne:this[n.instruments[r]],!0!==this.minify&&!0!==n.minify||(c=1,Object.keys(s).length>=17&&(c=2),Object.keys(s).length>=33&&(c=4),Object.keys(s).length>=49&&(c=6),Object.keys(s).filter(i).forEach(o)),e.next=15,l(a,n,s);case 15:r++,e.next=10;break;case 18:return e.abrupt("return",a);case 21:return s=this.list.indexOf(-1!==n.instruments[r])?Ne:this[n.instruments],!0!==this.minify&&!0!==n.minify||(c=1,Object.keys(s).length>=17&&(c=2),Object.keys(s).length>=33&&(c=4),Object.keys(s).length>=49&&(c=6),Object.keys(s).filter(function(e,t){return t%c!==0}).forEach(function(e){delete s[e]})),m=function(){return new Promise(function(e,t){try{u=new V.a.Sampler(s,{baseUrl:n.baseUrl+n.instruments+"/",release:1,onload:e})}catch(a){t(a)}})},e.next=26,m();case 26:return e.abrupt("return",u);case 27:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},De=function(e){var t=e.className,n=e.style;return r.a.createElement("svg",{className:t,style:Object(g.a)({},n),viewBox:"0 0 36 38",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("g",null,r.a.createElement("rect",{id:"svg_2",height:"36",width:"11.145036",y:"0",x:"0",strokeWidth:"0",stroke:"#0f0f00"}),r.a.createElement("rect",{id:"svg_4",height:"36",width:"11.145036",y:"0",x:"25",strokeWidth:"0",stroke:"#0f0f00"})))},Ae=function(e){var t=e.className,n=e.style;return r.a.createElement("svg",{className:t,style:Object(g.a)({},n),viewBox:"0 0 36 38",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("g",null,r.a.createElement("path",{stroke:"#0f0f00",transform:"rotate(90 17.946430206298828,18.103294372558597) ",id:"svg_3",d:"m-0.173562,36.081596l18.119992,-35.956603l18.119992,35.956603l-36.239984,0z",strokeOpacity:"null",strokeWidth:"0"})))},Be=function(e){var t=e.className,n=e.style;return r.a.createElement("svg",{className:t,style:Object(g.a)({},n),viewBox:"0 0 36 38",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("g",null,r.a.createElement("rect",{id:"svg_4",height:"36",width:"35.874996",y:"-0.125",x:"0",fillOpacity:"null",strokeOpacity:"null",strokeWidth:"0",stroke:"#0f0f00"})))},Me=function(e){var t=e.className,n=e.style;return r.a.createElement("svg",{className:t,style:Object(g.a)({},n),viewBox:"1 0 55 80",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("g",{transform:"matrix(1 0 0 -1 0 80)"},r.a.createElement("rect",{width:"10",height:"20",rx:"3"},r.a.createElement("animate",{attributeName:"height",begin:"0s",dur:"4.3s",values:"20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20",calcMode:"linear",repeatCount:"indefinite"})),r.a.createElement("rect",{x:"15",width:"10",height:"80",rx:"3"},r.a.createElement("animate",{attributeName:"height",begin:"0s",dur:"2s",values:"80;55;33;5;75;23;73;33;12;14;60;80",calcMode:"linear",repeatCount:"indefinite"})),r.a.createElement("rect",{x:"30",width:"10",height:"50",rx:"3"},r.a.createElement("animate",{attributeName:"height",begin:"0s",dur:"1.4s",values:"50;34;78;23;56;23;34;76;80;54;21;50",calcMode:"linear",repeatCount:"indefinite"})),r.a.createElement("rect",{x:"45",width:"10",height:"30",rx:"3"},r.a.createElement("animate",{attributeName:"height",begin:"0s",dur:"2s",values:"30;45;13;80;56;72;45;76;34;23;67;30",calcMode:"linear",repeatCount:"indefinite"}))))},Te=(n(40),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).changeInstrument=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:je;V.a.Transport.stop(),V.a.Transport.cancel(),n.setState({tracks:null,playback:!1,loading:!0},function(){Ce.load({instruments:e}).then(function(t){console.log("Loaded "+e),n.setState({synths:t.toMaster(),loading:!1})})})},n.scheduleTrack=function(){var e=n.state,t=e.synths,a=e.tracks;if(n.props.tracks!==a){V.a.Transport.stop(),V.a.Transport.cancel();var r=n.props.tracks?n.props.tracks.map(function(e){return ve(be(e))}):[],i=r.map(function(e){return e.slice(-1)[0]}).map(function(e){return e&&e.hasOwnProperty("time")?e.time:0}).reduce(function(e,t){return e>t?e:t},0);for(var o in n.setState({tracks:n.props.tracks,duration:i,divisions:i/50}),r.slice(0,10))new V.a.Part(function(e,n){t.triggerAttackRelease(n.note,n.duration,e,n.velocity)},r[o]).start(0);V.a.Transport.scheduleRepeat(function(){var e=V.a.Transport.seconds;n.setState({elapsedTime:e}),n.slider.value=e*(n.state.divisions&&n.state.divisions<1?1/n.state.divisions:1)},1,0),V.a.Transport.schedule(function(){n.setState({playback:!1,elapsedTime:0}),V.a.Transport.stop()},i)}},n.togglePlayback=function(e){if(e.preventDefault(),n.scheduleTrack(),"started"===n.state.playback)return V.a.Transport.pause(),void n.setState({playback:"paused"});V.a.Transport.seconds=n.state.elapsedTime?n.state.elapsedTime:0,V.a.Transport.start(),n.setState({playback:"started"})},n.stopPlayback=function(e){e.preventDefault(),V.a.Transport.stop(),V.a.Transport.cancel(),n.setState({tracks:null,playback:!1,elapsedTime:0,duration:0,divisions:0})},n.seek=function(e){var t=n.state.playback;"started"===t&&(V.a.Transport.pause(),t="paused"),n.setState({playback:t,elapsedTime:e})},n.state={synths:[],tracks:[],duration:0,elapsedTime:0,playback:!1,divisions:0,loading:!0},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.changeInstrument()}},{key:"componentWillUnmount",value:function(){V.a.Transport.stop(),V.a.Transport.cancel(),V.a.Transport.dispose()}},{key:"render",value:function(){var e=this,t=this.props.tracks,n=this.state,a=n.playback,i=n.divisions,o=n.duration,l=n.elapsedTime,s=n.loading,c=i&&i<1?1/i:1,u=!t||!t.length||s,m=r.a.createElement("div",{style:{display:"inline-block",verticalAlign:"top",marginRight:10}},r.a.createElement("input",{className:"synthesiser-range",ref:function(t){e.slider=t},type:"range",name:"points",onChange:function(t){return e.seek(t.currentTarget.value/c)},disabled:u,min:"0",max:o?o*c:0,step:i?i*c:0}));return r.a.createElement("div",{className:"Synthesiser"},s?r.a.createElement("button",{className:"non-clickable margin-right-10",disabled:!0},r.a.createElement(Me,{style:{height:"1em",marginRight:"0.3em",fill:"currentColor"},alt:"Loading"}),"Loading"):r.a.createElement("div",{style:{display:"inline-block"}},r.a.createElement("button",{className:"clickable",onClick:this.togglePlayback,disabled:u},"started"===a?r.a.createElement(De,{style:{height:"1em",fill:"currentColor"}}):r.a.createElement(Ae,{style:{height:"1em",fill:"currentColor"}})),r.a.createElement("button",{className:"clickable margin-right-10",onClick:this.stopPlayback,disabled:u},r.a.createElement(Be,{style:{height:"1em",fill:"currentColor"}}))),m,r.a.createElement("span",{className:"orange-text",style:{verticalAlign:"middle",fontSize:"0.7em",lineHeight:"0.7em",marginRight:10}},"".concat(Math.floor(l/60),":").concat(("0"+Math.floor(l)%60).slice(-2),"/").concat(Math.floor(o/60),":").concat(("0"+Math.floor(o)%60).slice(-2))),r.a.createElement("div",{className:"box"},r.a.createElement("select",{defaultValue:je,onChange:function(t){return e.changeInstrument(t.currentTarget.value)}},Ce.list.map(function(e){return r.a.createElement("option",{key:e,value:e},e)}))))}}]),t}(a.Component)),_e=(Ee=function(e){var t=function(e){for(var t=JSON.parse(JSON.stringify(k)),n=A(e),a=0;a<O;a++)a<n.length?D(t,"#text",n[a]):D(t,"#text",void 0);return{result:t,length:n.map(function(e){return e.length}).reduce(function(e,t){return e+t},0)}}(e.target.result),n=t.result;return{length:t.length,result:M(n),mml:A(e.target.result)}},we=function(e,t){var n=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:S;return!0===h.a.validate(e)?h.a.parse(e,t):{}}(e.target.result);return Object(g.a)({},function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{encoding:F,title:P,source:I};t.encoding||(t.encoding=F),t.title||(t.title=P),t.source||(t.source=I);for(var n=U(e),a="",r=0;r<n.length;r++)a+="[Channel".concat(r+1,"]\n").concat(n[r],"\n");return{length:n.map(function(e){return e.length}).reduce(function(e,t){return e+t},0),result:"[Settings]\nEncoding=".concat(t.encoding,"\nTitle=").concat(t.title,"\nSource=").concat(t.source,"\nMemo=\n").concat(a)}}(n,{title:t}),{mml:U(n)})},function(e){return e===v?Ee:e===y?we:void 0}),Se=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).call(this))).uploadFile=function(t){var n=t.target.files[0],a=E(n);if(!a)return e.setState({file:null}),!1;e.setState({changed:!0,file:{name:n.name.split(".")[0],type:a,text:n}})},e.convert=function(t){if(t.preventDefault(),e.state.file){var n=new FileReader,a=e.state.file,r=a.name,i=a.type,o=a.text;n.onload=function(t){var n=_e(i)(t,r),a=n.result,o=n.length,l=n.mml;e.setState({result:a,length:o,changed:!1,mml:l,download:{text:a,name:r+"."+(i===v?y:v)}})},n.readAsText(o)}else window.alert("Please select a valid MS2MML/3MLE file")},e.download=function(t){t.preventDefault(),f()(e.state.download.text,e.state.download.name)},e.state={file:null,result:""},window.parser=h.a,e}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.state,t=e.changed,n=e.result,a=e.length,i=e.download,o=e.mml,l=this.state.file?"Generate "+(this.state.file.type===v?"MS2MML":"3MLE MML"):"Please select a file to upload",s=!a||a<=0?"Download...nothing?":a<=3e3?"Download (Novice)":a<=5e3?"Download (Intermediate)":a<=1e4?"Download (Advanced)":"Download (Impossible)";return r.a.createElement("form",{className:"Form-div "+this.props.className},r.a.createElement("div",{className:"Form-leftDiv"},r.a.createElement("div",{className:"buttonDiv"},r.a.createElement("label",{className:"label",htmlFor:"file-input"},"Select any MML/MS2MML file")),r.a.createElement("div",null,r.a.createElement("p",{className:"arrowDown"},"\u25bc")),r.a.createElement("div",null,r.a.createElement("input",{name:"file-input",id:"file-input",type:"file",accept:x,onChange:this.uploadFile})),r.a.createElement("div",{className:"buttonDiv"},r.a.createElement("button",{className:"label",onClick:this.convert,disabled:!this.state.file},t?r.a.createElement(b,{style:{height:"0.8em",fill:"currentColor",paddingRight:10}}):r.a.createElement("div",null),l)),i?r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("p",{className:"arrowDown"},"\u25bc")),r.a.createElement("div",{className:"buttonDiv"},r.a.createElement("button",{className:"label",onClick:this.download},s)),this.state.file&&this.state.file.type===v?r.a.createElement("p",{style:{fontSize:"0.5em"}},"Max. 10 tracks allowed"):r.a.createElement("div",null)):r.a.createElement("div",null)),r.a.createElement("div",{className:"Form-rightDiv"},r.a.createElement("div",{style:{display:"flex",alignItems:"center"}},r.a.createElement("h1",{style:{marginRight:20}},"Preview"),o&&o.length?r.a.createElement(Te,{tracks:o}):r.a.createElement("div",null)),r.a.createElement("textarea",{className:"Form-textResult",value:n,readOnly:!0})))}}]),t}(a.Component),Ge=n(20),Fe=n.n(Ge),Pe=n(21),Ie=n.n(Pe),Le=(n(42),function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("img",{src:Fe.a,className:"App-logo",style:{zIndex:2},alt:"logo"}),r.a.createElement("img",{src:Ie.a,className:"App-bg",alt:"bg"}),r.a.createElement("h1",{style:{zIndex:3}},"3MLE to MS2MML converter")),r.a.createElement(Se,{className:"App-form"}))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(Le,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[22,2,1]]]);
//# sourceMappingURL=main.ab7c747e.chunk.js.map