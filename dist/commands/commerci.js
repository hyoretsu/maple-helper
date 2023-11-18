"use strict";var n=Object.defineProperty;var s=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var c=Object.prototype.hasOwnProperty;var d=(e,o)=>{for(var a in o)n(e,a,{get:o[a],enumerable:!0})},l=(e,o,a,r)=>{if(o&&typeof o=="object"||typeof o=="function")for(let t of m(o))!c.call(e,t)&&t!==a&&n(e,t,{get:()=>o[t],enumerable:!(r=s(o,t))||r.enumerable});return e};var u=e=>l(n({},"__esModule",{value:!0}),e);var y={};d(y,{default:()=>p});module.exports=u(y);var i=require("discord.js"),h={data:new i.SlashCommandBuilder().setName("commerci").setDescription("Easy-to-get Commerci guide."),async execute(e){await e.reply({content:`First, unlock all the way to Herb Town in order to unlock Merchant Union trade (CPQ). This will give you the most amount of denaros, and if you're not trying to speedrun it's okay to just run this 3 times daily.

For the best solo (recommended) voyage, run this (34 denaros):
- 1x Rosa: 2 Colonia Primo, 2 Commerci Soap (5 denaros)
- 1x Luna: 1 Stylish Glasses, 1 Organic Leather, 2 Commerci Soap (5 denaros)
- 6x Luna: 4 Commerci Soap (24 denaros)

For the quickest voyage, just run all Dolce with Commerci Soap (30 denaros).
Note: this is what most people with Dreadnought do for the sake of simplicity (48 denaros).`,ephemeral:!0})}},p=h;
