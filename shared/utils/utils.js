// import axios from 'axios';
// import qs from 'qs';
// import messages from './messages';
// import { nextTick } from 'vue';
// import moment from 'moment';

// import stores from '🔗/stores';

// export const message = messages;

// export const delay = (time) => new Promise((res) => setTimeout(res, time));

export const baseUrl = `${import.meta.env.VITE_APP_BASE_URL ? import.meta.env.VITE_APP_BASE_URL +  '/' : ''}`;

// export const retinaMediaQuery =
//     '(-webkit-min-device-pixel-ratio: 1.5),\
//     (min--moz-device-pixel-ratio: 1.5),\
//     (-o-min-device-pixel-ratio: 3/2),\
//     (min-resolution: 1.5dppx)';

// const paramsSerializer = (params) => qs.stringify(params, { indices: false });

// export const copyText = (text) => {
//     if (navigator.clipboard) {
//         navigator.clipboard.writeText(text);
//     } else {
//         const textArea = document.createElement('textarea');
//         textArea.value = text;
//         textArea.style.position = 'absolute';
//         textArea.style.left = '-999999px';
//         textArea.style.zIndex = -1;

//         document.body.prepend(textArea);
//         textArea.select();

//         try {
//             document.execCommand('copy');
//         } catch (e) {
//         }
//     }
// };

// export const placeOptionList = (payload) => {

//     const rect = payload.container.getBoundingClientRect();

//     nextTick(() => {
//         const options = document.querySelector(payload.options);

//         if (!options) {
//             return;
//         }

//         if (isMobile()) {
//             return;
//         }

//         const listRect = options.getBoundingClientRect();

//         if (!payload.leftAuto) {
//             options.style.left = `${rect.left}px`;
//         }
//         if (!payload.rightAuto) {
//             options.style.right = `${window.innerWidth - rect.right}px`;
//         }
//         options.style.top =
//             rect.bottom + listRect.height + 10 >= window.innerHeight
//                 ? 'auto'
//                 : `${rect.bottom + (payload.offset || 0)}px`;
//         options.style.bottom =
//             rect.bottom + listRect.height + 10 < window.innerHeight ? 'auto' : `${window.innerHeight - rect.top}px`;
//     });
// };

// export const pageSizeOptions = [
//     { code: 10, name: 10 },
//     { code: 20, name: 20 },
//     { code: 30, name: 30 }
// ];

// export const maskTime = {
//     mask: 'Hh:Mm',
//     tokens: {
//         H: {
//             pattern: /[0-2]/
//         }, 
//         h: {
//             pattern: /[0-9]/
//         }, 
//         M: {
//             pattern: /[0-5]/
//         }, 
//         m: {
//             pattern: /[0-9]/
//         } 
//     }
// };

// export async function fetchData({ url, method, data, params, auth = true, formData, contentType, signal, responseType }) {
//     if (!url) {
//         return;
//     }

//     const headers = {};

//     if (auth) {
//         headers['Authorization'] = `Bearer ${ stores.user().token }`;
//     }

//     if (contentType) {
//         headers['Content-Type'] = contentType;
//     }

//     return await axios({
//         // baseURL: import.meta.env.VITE_APP_API_URL,
//         method,
//         url: `${ url }`,
//         data: formData || data,
//         headers,
//         signal,
//         params,
//         responseType,
//         paramsSerializer
//     });
// }

// export function numberWithSpaces(x) {
//     const parts = x.toString().split('.');
//     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//     return parts.join('.');
// }

// export const code = () => {
//     return (Math.random() + 1).toString(36).substring(7);
// };

// export const isMobile = () => {
//     return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
// }


// export const timePeriodPreview = (values) => {
//     if (values?.length !== 2) {
//         if (values) {
//             return moment(values).format('HH:mm DD.MM.YYYY');
//         }
//         return '';
//     }

//     const from = moment(values[0]);
//     const to = moment(values[1]);

//     if (from.isSame(to, 'date')) {
//         return `${ from.format('HH:mm') } — ${ to.format('HH:mm') }, ${ from.format('DD MMMM YYYY') }`;
//     }

//     return `${ from.format('HH:mm DD.MM.YYYY') } — ${ to.format('HH:mm DD.MM.YYYY') }`;
// };