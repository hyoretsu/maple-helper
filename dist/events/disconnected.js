"use strict";var f=Object.create;var c=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var d=Object.getOwnPropertyNames;var l=Object.getPrototypeOf,v=Object.prototype.hasOwnProperty;var x=(e,t)=>{for(var o in t)c(e,o,{get:t[o],enumerable:!0})},r=(e,t,o,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of d(t))!v.call(e,n)&&n!==o&&c(e,n,{get:()=>t[n],enumerable:!(i=u(t,n))||i.enumerable});return e};var m=(e,t,o)=>(o=e!=null?f(l(e)):{},r(t||!e||!e.__esModule?c(o,"default",{value:e,enumerable:!0}):o,e)),h=e=>r(c({},"__esModule",{value:!0}),e);var y={};x(y,{default:()=>w});module.exports=h(y);var a=require("@discordjs/voice"),s=m(require("fs/promises")),p=m(require("path")),k={name:a.VoiceConnectionStatus.Disconnected,once:!0,async execute(){await s.default.unlink(p.default.resolve("./tmp"))}},w=k;
