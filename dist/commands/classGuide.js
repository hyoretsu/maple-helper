"use strict";var a=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var l=Object.prototype.hasOwnProperty;var i=(e,t)=>a(e,"name",{value:t,configurable:!0});var m=(e,t)=>{for(var s in t)a(e,s,{get:t[s],enumerable:!0})},u=(e,t,s,d)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of p(t))!l.call(e,r)&&r!==s&&a(e,r,{get:()=>t[r],enumerable:!(d=c(t,r))||d.enumerable});return e};var w=e=>u(a({},"__esModule",{value:!0}),e);var x={};m(x,{default:()=>B});module.exports=w(x);var h=require("discord.js");var o={adele:"","angelic buster":"",aran:"",ark:"","battle mage":"","beast tamer":"",bishop:"",blaster:"","blaze wizard":"",bowmaster:"",buccaneer:"",cadena:"",cannoneer:"",corsair:"","dark knight":"","dawn warrior":"https://media.discordapp.net/attachments/842500638050484304/1044764682218651728/Dawn_Warrior_-_Post_Ignition_Info_7.png","demon avenger":"","demon slayer":"","dual blade":"",evan:"","fire/poison mage":"https://media.discordapp.net/attachments/1122997414773661876/1175216275253903490/FirePoison_Infographic.png",hayato:"",hero:"",hoyoung:"","ice/lightning mage":"",illium:"",jett:"",jobless:"",kain:"",kaiser:"",kanna:"",khali:"",kinesis:"",lara:"",luminous:"",marksman:"",mercedes:"",mechanic:"",mihile:"","night lord":"","night walker":"",paladin:"",pathfinder:"",phantom:"",shade:"",shadower:"","thunder breaker":"","wild hunter":"","wind archer":"",xenon:"",zero:""};var g={adele:"https://discord.gg/AdeleMaplestory","angelic buster":"https://discord.gg/3C9J2CYYsf",aran:"https://discord.gg/tdKzgaP4ks",ark:"https://discord.gg/ZvPTz6v","battle mage":"https://discord.gg/HsTgS8svrf","beast tamer":"https://discord.gg/czcga75tHQ",bishop:"https://discord.gg/PX2v4BV3Qp",blaster:"https://discord.gg/QXvbNp8zqu","blaze wizard":"https://discord.gg/gTuaWGrcvV",bowmaster:"https://discord.gg/YJqyRYxWV3",buccaneer:"https://discord.gg/EPxuyRy",cadena:"https://discord.gg/5rKRYYCA4v",cannoneer:"https://discord.gg/QxWvMvrcR6",corsair:"https://discord.gg/JWBXPGS9aY","dark knight":"https://discord.gg/N36cqyAVfa","dawn warrior":"https://discord.gg/WMGahCmmWT","demon avenger":"https://discord.gg/aTByagnDjd","demon slayer":"https://discord.gg/nSRjApjyBa","dual blade":"https://discord.gg/2yqrcnT8Xk",evan:"https://discord.gg/5BfVGGD","fire/poison mage":"https://discord.gg/PX2v4BV3Qp",hayato:"https://discord.gg/EAkfmrx",hero:"https://discord.gg/dsdSz9CGJE",hoyoung:"message Zexous#4024 or StAn#7019 on discord.","ice/lightning mage":"https://discord.gg/PX2v4BV3Qp",illium:"https://discord.gg/KxJ3DGuBsf",jett:"https://discord.gg/MgWT3pkC6h",jobless:"https://discord.gg/mQakqs86M3",kain:"https://discord.gg/Udtx9E9QYr",kaiser:"https://discord.com/invite/DGHZJ8s",kanna:"https://discord.gg/zbH8e2xC7H",khali:"https://discord.gg/aDZvtHjcuR",kinesis:"https://discord.gg/yua4VdQWFw",lara:"https://discord.gg/g33kJR5yWH",luminous:"https://discord.gg/KBpPTtae6P",marksman:"https://discord.gg/BYvnXkz9cv",mercedes:"https://discord.gg/tJWfMrdFBJ",mechanic:"https://discord.gg/JenpnsgHBc",mihile:"https://discord.gg/6SPVvZRWJM","night lord":"https://discord.gg/AvP8wq4","night walker":"https://discord.gg/FR55ADj",paladin:"https://discord.gg/7qyGfmtRt2",pathfinder:"https://discord.gg/xzFRyMXBmR",phantom:"https://discord.gg/225H7sw",shade:"https://discord.gg/G86EwxDbv6",shadower:"https://discord.gg/Nud7KbBFd9","thunder breaker":"https://discord.gg/ewyWwFQ","wild hunter":"https://discord.gg/3evaYBDwAG","wind archer":"http://discord.gg/MDuDrDveum",xenon:"https://discord.gg/4BCGuCC",zero:"https://discord.gg/wFAHprps3Z"};var f=Object.keys(g),y={ab:"angelic buster",bm:"battle mage",bt:"beast tamer",bw:"blaze wizard",da:"demon avenger",db:"dual blade",dk:"dark knight",ds:"demon slayer",dw:"dawn warrior",fp:"fire/poison mage","fp mage":"fire/poison mage",il:"ice/lightning mage","il mage":"ice/lightning mage",nl:"night lord",nw:"night walker",tb:"thunder breaker",wa:"wind archer",wh:"wild hunter"},v=i(e=>{if(e=e.toLowerCase(),f.find(s=>e===s))return e;e=e.replaceAll("/","");let t=y[e];if(!t)throw new Error;return t},"normalizeClassName"),n=v;var z={data:new h.SlashCommandBuilder().setName("class_guide").setDescription("Easy-to-get class guide image. (Contact the developer for missing/broken/outdated guides)").addStringOption(e=>e.setName("class").setDescription("You'll get the guide image for this class.").setRequired(!0)),async execute(e){try{let t=n(e.options.getString("class")),s=o[t];if(!s){await e.reply({content:"Sorry, we don't have the guide for this class yet. Please contact the developer with a link to the image (Please run /class_server and get the link from there).",ephemeral:!0});return}await e.reply({content:`Here is your guide:
${s}`,ephemeral:!0})}catch{await e.reply({content:"The class you requested either doesn't exist in our database or has a wrong spelling. Please try again or contact the developer.",ephemeral:!0})}}},B=z;
