"use strict";var o=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var s=Object.getOwnPropertyNames;var d=Object.prototype.hasOwnProperty;var l=(e,r)=>{for(var a in r)o(e,a,{get:r[a],enumerable:!0})},h=(e,r,a,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let m of s(r))!d.call(e,m)&&m!==a&&o(e,m,{get:()=>r[m],enumerable:!(t=c(r,m))||t.enumerable});return e};var u=e=>h(o({},"__esModule",{value:!0}),e);var p={};l(p,{default:()=>w});module.exports=u(p);var n=require("discord.js"),f={name:n.Events.InteractionCreate,once:!1,async execute(e){if(!e.isChatInputCommand())return;let r=e.client.commands.get(e.commandName);if(!r){console.error(`No command matching ${e.commandName} was found.`);return}try{await r.execute(e)}catch(a){console.error(a),e.replied||e.deferred?await e.followUp({content:"There was an error while executing this command!",ephemeral:!0}):await e.reply({content:"There was an error while executing this command!",ephemeral:!0})}}},w=f;
