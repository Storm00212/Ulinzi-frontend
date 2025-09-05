import React from 'react';
import Svg, { Path, Polyline, Circle, Line, Polygon, Rect } from 'react-native-svg';

export const Home = (props) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><Polyline points="9 22 9 12 15 12 15 22"/></Svg>
);

export const MessageSquare = (props) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Svg>
);

export const Users = (props) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><Circle cx="9" cy="7" r="4"/><Path d="M22 21v-2a4 4 0 0 0-3-3.87"/><Path d="M16 3.13a4 4 0 0 1 0 7.75"/></Svg>
);

export const Shield = (props) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Svg>
);

export const ShieldCheck = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><Path d="m9 12 2 2 4-4"/></Svg>
);

export const ShieldAlert = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><Path d="M12 8v4"/><Path d="M12 16h.01"/></Svg>
);

export const Siren = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Path d="M5.51 2.2A10.02 10.02 0 0 1 12 2a10.02 10.02 0 0 1 6.49 2.2"/><Path d="M12 12a5 5 0 0 1 5 5H7a5 5 0 0 1 5-5z"/><Path d="M2.49 5.2A10.02 10.02 0 0 1 2 8v4a10.02 10.02 0 0 1 10 10c.14 0 .28 0 .42-.02"/><Path d="M21.51 5.2A10.02 10.02 0 0 0 22 8v4a10.02 10.02 0 0 0-10 10c-.14 0-.28 0-.42-.02"/><Path d="M12 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><Path d="M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></Svg>
);

export const PaperPlane = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Path d="m22 2-7 20-4-9-9-4Z"/><Path d="M22 2 11 13"/></Svg>
);

export const UserPlus = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><Circle cx="9" cy="7" r="4"/><Line x1="19" x2="19" y1="8" y2="14"/><Line x1="22" x2="16" y1="11" y2="11"/></Svg>
);

export const Trash2 = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Path d="M3 6h18"/><Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><Line x1="10" x2="10" y1="11" y2="17"/><Line x1="14" x2="14" y1="11" y2="17"/></Svg>
);

export const User = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><Circle cx="12" cy="7" r="4"/></Svg>
);

export const ShieldOff = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Path d="M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18"/><Path d="M4.73 4.73 4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38"/><Line x1="2" x2="22" y1="2" y2="22"/></Svg>
);

export const BookOpen = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><Path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></Svg>
);

export const Map = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><Line x1="9" x2="9" y1="3" y2="18"/><Line x1="15" x2="15" y1="6" y2="21"/></Svg>
);

export const ChevronDown = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Polyline points="6 9 12 15 18 9"/></Svg>
);

export const ArrowLeft = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Line x1="19" y1="12" x2="5" y2="12"></Line><Polyline points="12 19 5 12 12 5"></Polyline></Svg>
);

export const LogOut = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><Polyline points="16 17 21 12 16 7"/><Line x1="21" x2="9" y1="12" y2="12"/></Svg>
);

export const Microphone = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><Path d="M19 10v2a7 7 0 0 1-14 0v-2"/><Line x1="12" y1="19" x2="12" y2="23"/><Line x1="8" y1="23" x2="16" y2="23"/></Svg>
);

export const MapPin = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><Circle cx="12" cy="10" r="3"/></Svg>
);

export const Share2 = (props) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Circle cx="18" cy="5" r="3"/><Circle cx="6" cy="12" r="3"/><Circle cx="18" cy="19" r="3"/><Line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><Line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></Svg>
);

export const Calendar = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Rect x="3" y="4" width="18" height="18" rx="2" ry="2"></Rect><Line x1="16" y1="2" x2="16" y2="6"></Line><Line x1="8" y1="2" x2="8" y2="6"></Line><Line x1="3" y1="10" x2="21" y2="10"></Line></Svg>
);

export const Clock = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Circle cx="12" cy="12" r="10"></Circle><Polyline points="12 6 12 12 16 14"></Polyline></Svg>
);

export const CreditCard = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Rect x="1" y="4" width="22" height="16" rx="2" ry="2"></Rect><Line x1="1" y1="10" x2="23" y2="10"></Line></Svg>
);

export const ArrowRight = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Line x1="5" y1="12" x2="19" y2="12"></Line><Polyline points="12 5 19 12 12 19"></Polyline></Svg>
);

export const Filter = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></Polygon></Svg>
);

export const Smartphone = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Rect x="5" y="2" width="14" height="20" rx="2" ry="2"></Rect><Line x1="12" y1="18" x2="12.01" y2="18"></Line></Svg>
);

export const Phone = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></Svg>
);

export const Mail = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></Path><Polyline points="22,6 12,13 2,6"></Polyline></Svg>
);

export const Pencil = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></Path></Svg>
);

export const WhatsApp = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><Path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></Path></Svg>
);
