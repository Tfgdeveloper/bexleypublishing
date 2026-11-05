export interface ContactFormTheme {
    form: string;      
    row: string;     
    field: string;   
    phoneField?: string;  
    messageField?: string; 
    label: string;
    input: string;      
    textarea: string;
    submit: string;
    spinner: string;
    error: string;
}

const FONT = "font-['Raleway',Arial,sans-serif]";

export const darkTheme: ContactFormTheme = {
    form: `flex flex-col gap-4 w-full ${FONT}`,
    row: "grid grid-cols-1 gap-4 sm:grid-cols-2",
    field: "flex flex-col gap-2",
    label: `order-first text-white/40 text-[10px] font-black uppercase tracking-[0.1em] ${FONT}`,
    input: `w-full box-border bg-white/[0.07] border border-white/[0.12] text-white text-[14px] ${FONT}
        px-[18px] py-[14px] rounded-[12px] outline-none appearance-none
        transition-[border-color,background-color] duration-[250ms] ease-in-out
        placeholder:text-white/30 focus:border-[#e8391d] focus:bg-white/10
        disabled:opacity-50 disabled:cursor-not-allowed
        max-[480px]:text-[13px] max-[480px]:px-[14px] max-[480px]:py-[12px] max-[480px]:rounded-[10px]`,
    textarea: `w-full box-border bg-white/[0.07] border border-white/[0.12] text-white text-[14px] ${FONT}
        px-[18px] py-[14px] rounded-[12px] outline-none appearance-none resize-none min-h-[120px]
        transition-[border-color,background-color] duration-[250ms] ease-in-out
        placeholder:text-white/30 focus:border-[#e8391d] focus:bg-white/10
        disabled:opacity-50 disabled:cursor-not-allowed
        max-[480px]:text-[13px] max-[480px]:px-[14px] max-[480px]:py-[12px] max-[480px]:rounded-[10px]`,
    submit: `flex items-center justify-center gap-[10px] w-full mt-1 bg-[#e8391d] text-white
        font-black text-[13px] uppercase tracking-[0.1em] p-4 rounded-[12px] border-none cursor-pointer ${FONT}
        transition-all duration-200
        enabled:hover:bg-[#c0271a] enabled:hover:gap-[14px] enabled:hover:shadow-[0_10px_30px_rgba(232,57,29,0.4)]
        enabled:active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed
        max-[480px]:text-[12px] max-[480px]:p-[14px] max-[480px]:rounded-[10px]`,
    spinner: "h-4 w-4 animate-[spin_0.8s_linear_infinite]",
    error: `text-[13px] text-[#ff8a75] ${FONT}`,
};

export const lightTheme: ContactFormTheme = {
    ...darkTheme,
    label: `order-first text-neutral-500 text-[10px] font-black uppercase tracking-[0.1em] ${FONT}`,
    input: `w-full box-border bg-neutral-100 border border-neutral-200 text-neutral-900 text-[14px] ${FONT}
        px-[18px] py-[14px] rounded-[12px] outline-none appearance-none
        transition-[border-color,background-color] duration-[250ms] ease-in-out
        placeholder:text-neutral-400 focus:border-[#e8391d] focus:bg-white
        disabled:opacity-50 disabled:cursor-not-allowed
        max-[480px]:text-[13px] max-[480px]:px-[14px] max-[480px]:py-[12px] max-[480px]:rounded-[10px]`,
    textarea: `w-full box-border bg-neutral-100 border border-neutral-200 text-neutral-900 text-[14px] ${FONT}
        px-[18px] py-[14px] rounded-[12px] outline-none appearance-none resize-none min-h-[120px]
        transition-[border-color,background-color] duration-[250ms] ease-in-out
        placeholder:text-neutral-400 focus:border-[#e8391d] focus:bg-white
        disabled:opacity-50 disabled:cursor-not-allowed
        max-[480px]:text-[13px] max-[480px]:px-[14px] max-[480px]:py-[12px] max-[480px]:rounded-[10px]`,
    error: `text-[13px] text-[#c0271a] ${FONT}`,
};

export const compactTheme: ContactFormTheme = {
    ...darkTheme,
    form: `flex flex-col gap-3 w-full ${FONT}`,
    row: "grid grid-cols-1 gap-3",
    input: `w-full box-border bg-transparent border border-white/20 text-white text-[13px] ${FONT}
        px-3 py-2.5 rounded-lg outline-none appearance-none
        transition-colors duration-200 placeholder:text-white/30 focus:border-[#e8391d]
        disabled:opacity-50 disabled:cursor-not-allowed`,
    textarea: `w-full box-border bg-transparent border border-white/20 text-white text-[13px] ${FONT}
        px-3 py-2.5 rounded-lg outline-none appearance-none resize-none min-h-[90px]
        transition-colors duration-200 placeholder:text-white/30 focus:border-[#e8391d]
        disabled:opacity-50 disabled:cursor-not-allowed`,
    submit: `flex items-center justify-center gap-2 w-full bg-[#e8391d] text-white font-bold text-[12px]
        uppercase tracking-[0.1em] py-3 rounded-lg cursor-pointer ${FONT} transition-colors duration-200
        enabled:hover:bg-[#c0271a] disabled:opacity-60 disabled:cursor-not-allowed`,
};

export const contactSectionTheme: ContactFormTheme = {
    form: `flex flex-col gap-4 w-full ${FONT}
        min-[2400px]:gap-6 min-[1800px]:max-[2399px]:gap-5
        max-[640px]:gap-[14px] max-[380px]:gap-3 max-[320px]:gap-[10px]`,
    row: `grid grid-cols-1 gap-4
        min-[2400px]:gap-6 min-[1800px]:max-[2399px]:gap-5
        max-[640px]:gap-[14px] max-[380px]:gap-3 max-[320px]:gap-[10px]`,
    field: "flex flex-col gap-[6px]",
    label: `order-first text-white/40 text-[10px] font-black uppercase tracking-[0.1em] ${FONT}
        min-[2400px]:text-[13px] min-[1800px]:max-[2399px]:text-[12px]
        min-[901px]:max-[1199px]:text-[9px] max-[640px]:text-[9px]`,
    input: `w-full box-border bg-white/[0.08] border border-white/[0.15] text-white text-[14px] ${FONT}
        px-5 py-4 rounded-[12px] outline-none appearance-none
        transition-[border-color,background-color] duration-300 ease-in-out
        placeholder:text-white/35 focus:border-[#e8391d] focus:bg-white/10
        disabled:opacity-50 disabled:cursor-not-allowed
        min-[2400px]:text-[17px] min-[2400px]:px-[28px] min-[2400px]:py-[22px] min-[2400px]:rounded-[18px]
        min-[1800px]:max-[2399px]:text-[15px] min-[1800px]:max-[2399px]:px-6 min-[1800px]:max-[2399px]:py-5 min-[1800px]:max-[2399px]:rounded-[16px]
        min-[1400px]:max-[1799px]:px-[22px] min-[1400px]:max-[1799px]:py-[17px]
        min-[901px]:max-[1199px]:text-[13px] min-[901px]:max-[1199px]:px-4 min-[901px]:max-[1199px]:py-[14px]
        max-[640px]:text-[13px] max-[640px]:px-4 max-[640px]:py-[13px] max-[640px]:rounded-[10px]
        max-[480px]:text-[12px] max-[480px]:px-[14px] max-[480px]:py-[12px]
        max-[380px]:text-[11.5px] max-[380px]:px-[13px] max-[380px]:py-[11px] max-[380px]:rounded-[9px]
        max-[320px]:text-[11px] max-[320px]:px-3 max-[320px]:py-[10px]`,
    textarea: `w-full box-border bg-white/[0.08] border border-white/[0.15] text-white text-[14px] ${FONT}
        px-5 py-4 rounded-[12px] outline-none appearance-none resize-none
        transition-[border-color,background-color] duration-300 ease-in-out
        placeholder:text-white/35 focus:border-[#e8391d] focus:bg-white/10
        disabled:opacity-50 disabled:cursor-not-allowed
        min-[2400px]:text-[17px] min-[2400px]:px-[28px] min-[2400px]:py-[22px] min-[2400px]:rounded-[18px]
        min-[1800px]:max-[2399px]:text-[15px] min-[1800px]:max-[2399px]:px-6 min-[1800px]:max-[2399px]:py-5 min-[1800px]:max-[2399px]:rounded-[16px]
        min-[1400px]:max-[1799px]:px-[22px] min-[1400px]:max-[1799px]:py-[17px]
        min-[901px]:max-[1199px]:text-[13px] min-[901px]:max-[1199px]:px-4 min-[901px]:max-[1199px]:py-[14px]
        max-[640px]:text-[13px] max-[640px]:px-4 max-[640px]:py-[13px] max-[640px]:rounded-[10px]
        max-[480px]:text-[12px] max-[480px]:px-[14px] max-[480px]:py-[12px]
        max-[380px]:text-[11.5px] max-[380px]:px-[13px] max-[380px]:py-[11px] max-[380px]:rounded-[9px]
        max-[320px]:text-[11px] max-[320px]:px-3 max-[320px]:py-[10px]`,
    submit: `flex items-center justify-center gap-3 w-full mt-2 bg-[#e8391d] text-white
        font-black text-[13px] uppercase tracking-[0.1em] p-4 rounded-[12px] border-none cursor-pointer ${FONT}
        transition-all duration-200
        enabled:hover:bg-[#c0271a] enabled:hover:gap-4 enabled:hover:shadow-[0_10px_30px_rgba(232,57,29,0.4)]
        enabled:active:scale-[0.97] disabled:opacity-[0.65] disabled:cursor-not-allowed
        min-[2400px]:text-[17px] min-[2400px]:p-6 min-[2400px]:rounded-[18px]
        min-[1800px]:max-[2399px]:text-[15px] min-[1800px]:max-[2399px]:p-5 min-[1800px]:max-[2399px]:rounded-[16px]
        min-[901px]:max-[1199px]:text-[12px] min-[901px]:max-[1199px]:p-[14px]
        max-[640px]:text-[12px] max-[640px]:p-[14px] max-[640px]:rounded-[10px]
        max-[480px]:text-[11px] max-[480px]:p-[13px]
        max-[380px]:text-[10.5px] max-[380px]:p-3 max-[380px]:rounded-[9px]
        max-[320px]:text-[10px] max-[320px]:p-[11px]`,
    spinner: "h-4 w-4 animate-[spin_0.8s_linear_infinite]",
    error: `text-[#fca5a5] text-[12px] text-center bg-[rgba(239,68,68,0.12)]
        border border-[rgba(239,68,68,0.25)] rounded-lg px-[14px] py-[10px] mt-1 ${FONT}`,
};

const PAGE_FIELD = `peer w-full bg-white/[0.03] border border-white/10 text-white text-[14px] ${FONT}
        px-6 pt-6 pb-4 rounded-xl outline-none appearance-none placeholder:text-transparent
        transition-all duration-500
        focus:border-[#e8391d] focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(232,57,29,0.15)]
        disabled:opacity-50 disabled:cursor-not-allowed`;

export const contactPageTheme: ContactFormTheme = {
    form: `flex flex-col gap-6 w-full ${FONT}`,
    row: "grid grid-cols-1 md:grid-cols-2 gap-6",
    field: "relative block",
    label: `absolute left-6 top-5 pointer-events-none font-bold uppercase tracking-widest text-[10px] text-white/30
        transition-all duration-300
        peer-focus:top-2 peer-focus:text-[#e8391d]
        peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[#e8391d]`,
    input: PAGE_FIELD,
    textarea: `${PAGE_FIELD} resize-none min-h-[150px]`,
    submit: `w-full flex items-center justify-center gap-3 mt-2 bg-[#e8391d] text-white font-black uppercase
        tracking-widest py-5 rounded-xl text-[13px] cursor-pointer ${FONT} transition-all duration-300
        enabled:hover:bg-[#c0271a] enabled:hover:shadow-[0_20px_50px_rgba(232,57,29,0.4)]
        enabled:active:scale-95 disabled:opacity-[0.65] disabled:cursor-not-allowed`,
    spinner: "h-4 w-4 animate-spin",
    error: `text-red-300 text-[12px] text-center bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 ${FONT}`,
};


const New_POPUP_FIELD = `w-full !bg-white/10 !border-0 text-white text-[13px] ${FONT}
        px-4 py-2.5 rounded-lg appearance-none
        placeholder:text-white/40
        !outline-none !ring-0 !shadow-none
        focus:!outline-none focus:!ring-0 focus:!shadow-none focus:!bg-white/[0.14]
        focus-visible:!outline-none
        transition-colors duration-300
        [&:-webkit-autofill]:!shadow-[inset_0_0_0_1000px_rgba(255,255,255,0.1)] [&:-webkit-autofill]:[-webkit-text-fill-color:#fff]
        disabled:opacity-50 disabled:cursor-not-allowed`;
 
export const NewPopupTheme: ContactFormTheme = {
    form: `flex flex-col gap-3 w-full ${FONT}`,
    // Name + phone always side by side
    row: "grid grid-cols-2 gap-3",
    field: "relative block",
    // Labels hidden visually but kept for screen readers
    label: "sr-only",
    input: New_POPUP_FIELD,
    textarea: `${New_POPUP_FIELD} resize-none min-h-[90px]`,
    submit: `w-full flex items-center justify-center gap-2 mt-1 bg-[#e8391d] text-white font-extrabold uppercase
        tracking-[0.12em] py-3 rounded-lg text-[12px] cursor-pointer ${FONT} transition-all duration-300
        enabled:hover:bg-[#c0271a] enabled:hover:shadow-[0_12px_30px_rgba(232,57,29,0.35)]
        enabled:active:scale-[0.98] disabled:opacity-[0.65] disabled:cursor-not-allowed`,
    spinner: "h-4 w-4 animate-spin",
    error: `text-red-300 text-[12px] text-center bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 ${FONT}`,
};
 

const LANDING_BTN = `inline-flex items-center justify-center gap-[10px] border-2 border-transparent
        font-[inherit] font-black text-[12px] uppercase tracking-[0.1em] px-7 py-[15px] rounded-[12px] cursor-pointer
        bg-[#e8391d] text-white transition-all duration-200
        enabled:hover:gap-[14px] enabled:hover:bg-[#c0271a] enabled:hover:shadow-[0_10px_40px_rgba(232,57,29,0.4)]
        disabled:opacity-75 disabled:cursor-wait
        min-[1800px]:text-[14px] min-[1800px]:px-9 min-[1800px]:py-[18px]`;

const LANDING_ERROR = `flex items-start gap-2 text-[13px] leading-[1.5] font-semibold text-[#b91c1c]
        bg-[#fef2f2] border border-[#fecaca] px-3 py-[10px] rounded-[10px]`;

const HERO_FIELD = `w-full font-[inherit] text-[14px] px-4 py-[14px] rounded-[10px]
        border-[1.5px] border-[#ececec] bg-[#f7f7f7] text-[#05070f] placeholder:text-[#9ca3af]
        outline-none transition-[border-color,background-color] duration-200
        focus:border-[#e8391d] focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed`;

export const landingHeroTheme: ContactFormTheme = {
    form: "flex flex-col gap-3 w-full",
    row: "flex flex-col gap-3",
    field: "block",
    label: "sr-only",
    input: HERO_FIELD,
    textarea: `${HERO_FIELD} resize-y min-h-[90px]`,
    submit: `w-full ${LANDING_BTN}`,
    spinner: "h-4 w-4 animate-[spin_0.9s_linear_infinite]",
    error: LANDING_ERROR,
};

const FOOTER_FIELD = `w-full font-[inherit] text-[14px] px-4 py-[14px] rounded-[10px]
        border-[1.5px] border-white/[0.12] bg-white/5 text-white placeholder:text-white/40
        outline-none transition-[border-color,background-color] duration-200
        focus:border-[#e8391d] disabled:opacity-60 disabled:cursor-not-allowed`;

export const landingFooterTheme: ContactFormTheme = {
    form: "flex flex-col gap-3 w-full",
    row: "grid grid-cols-2 gap-3 max-[640px]:grid-cols-1",
    field: "block",
    label: "sr-only",
    input: FOOTER_FIELD,
    textarea: `${FOOTER_FIELD} resize-y min-h-[90px]`,
    submit: `self-start ${LANDING_BTN}`,
    spinner: "h-4 w-4 animate-[spin_0.9s_linear_infinite]",
    error: `flex items-start gap-2 text-[13px] leading-[1.5] font-semibold text-[#fca5a5]
        bg-[rgba(232,57,29,0.1)] border border-[rgba(232,57,29,0.35)] px-3 py-[10px] rounded-[10px]`,
};

const POPUP_FIELD = `w-full font-[inherit] text-[13px] px-[10px] py-3 rounded-[4px]
        border border-black/[0.08] bg-white text-[#05070f] placeholder:text-[#9ca3af]
        outline-none focus:outline focus:outline-[3px] focus:outline-[#ffc83d] focus:outline-offset-0
        disabled:opacity-[0.65]
        min-[1800px]:text-[15px] min-[1800px]:px-3 min-[1800px]:py-[14px]`;

export const landingPopupTheme: ContactFormTheme = {
    form: `flex flex-col gap-[10px] w-full bg-[#e8391d] rounded-[6px] p-6
        shadow-[0_30px_70px_rgba(0,0,0,0.4)]`,
    row: "flex flex-col gap-[10px]",
    field: "block",
    label: "sr-only",
    input: POPUP_FIELD,
    textarea: `${POPUP_FIELD} resize-y min-h-[90px]
        [@media(max-height:640px)]:min-h-[60px] [@media(max-height:640px)]:h-[60px]`,
    submit: `mt-[6px] inline-flex items-center justify-center gap-2 w-full bg-[#05070f] text-white
        border-none rounded-[4px] p-[14px] cursor-pointer font-[inherit] font-black text-[14px]
        uppercase tracking-[0.1em] transition-colors duration-200
        enabled:hover:bg-white enabled:hover:text-[#e8391d] disabled:opacity-75 disabled:cursor-wait`,
    spinner: "h-4 w-4 animate-[spin_0.9s_linear_infinite]",
    error: LANDING_ERROR,
};

const POPUP_NEW_FIELD = `w-full font-[inherit] text-[12px] px-[10px] py-2 rounded-[20px]
        border border-black/[0.08] bg-white text-[#000] placeholder:text-[#000]
        outline-none focus:outline focus:outline-[3px] focus:outline-[#ffc83d] focus:outline-offset-0
        disabled:opacity-[0.65]
        min-[1800px]:text-[15px] min-[1800px]:px-3 min-[1800px]:py-[14px]`;

export const landingNewPopupTheme: ContactFormTheme = {
    form: `flex flex-col gap-[10px] w-full
        shadow-[0_30px_70px_rgba(0,0,0,0.4)]`,
    row: "flex flex-col gap-[10px]",
    field: "block",
    label: "sr-only",
    input: POPUP_NEW_FIELD,
    textarea: `${POPUP_NEW_FIELD} resize-y min-h-[120px]
        [@media(max-height:640px)]:min-h-[60px] [@media(max-height:640px)]:h-[90px]`,
    submit: `w-auto mt-[3px] inline-flex items-center justify-center gap-2 w-full bg-[#05070f] text-white
        border-none rounded-[40px] p-[8px] cursor-pointer font-[inherit] font-black text-[12px]
        uppercase tracking-[0.1em] transition-colors duration-200
        enabled:hover:bg-white enabled:hover:text-[#e8391d] disabled:opacity-75 disabled:cursor-wait`,
    spinner: "h-4 w-4 animate-[spin_0.9s_linear_infinite]",
    error: LANDING_ERROR,
};

const PUB_FIELD = `w-full font-[inherit] text-[14px] px-[14px] py-[13px] rounded-[10px]
        border-[1.5px] border-[#ececec] bg-[#f7f7f7] text-[#05070f] placeholder:text-[#9ca3af]
        outline-none transition-[border-color,background-color] duration-200
        focus:border-[#e8391d] focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed`;

const PUB_BTN = `inline-flex items-center justify-center gap-[10px] w-full whitespace-nowrap border-2 border-transparent
        font-[inherit] font-black text-[12px] uppercase tracking-[0.1em] px-6 py-[15px] rounded-[12px] cursor-pointer
        bg-[#e8391d] text-white transition-all duration-200
        enabled:hover:gap-[14px] enabled:hover:bg-[#c0271a] enabled:hover:shadow-[0_10px_40px_rgba(232,57,29,0.4)]
        disabled:opacity-75 disabled:cursor-wait
        min-[1800px]:text-[13px] min-[1800px]:px-[30px] min-[1800px]:py-[18px]`;

export const publishingHeroTheme: ContactFormTheme = {
    form: `grid grid-cols-2 gap-x-[14px] gap-y-[10px] w-full text-left max-[640px]:grid-cols-1`,
    row: "contents",
    field: "block col-start-1",
    phoneField: "block col-start-1",
    messageField: `flex flex-col col-start-2 row-start-1 row-span-2
        max-[640px]:col-start-1 max-[640px]:row-start-auto max-[640px]:row-span-1`,
    label: "sr-only",
    input: PUB_FIELD,
    textarea: `${PUB_FIELD} flex-1 min-h-[96px] resize-y`,
    submit: `${PUB_BTN} col-start-2 row-start-3 max-[640px]:col-start-1 max-[640px]:row-start-auto`,
    spinner: "h-4 w-4 animate-[spin_0.9s_linear_infinite]",
    error: `col-span-full ${LANDING_ERROR}`,
};

const PUB_FOOTER_FIELD = `w-full font-[inherit] text-[14px] px-[14px] py-[13px] rounded-[10px]
        border-[1.5px] border-white/[0.12] bg-white/[0.06] text-white placeholder:text-white/40
        outline-none transition-[border-color,background-color] duration-200
        focus:border-[#e8391d] disabled:opacity-60 disabled:cursor-not-allowed`;

export const publishingFooterTheme: ContactFormTheme = {
    form: "flex flex-col gap-3 w-full",
    row: "grid grid-cols-2 gap-3 max-[640px]:grid-cols-1",
    field: "block",
    label: "sr-only",
    input: PUB_FOOTER_FIELD,
    textarea: `${PUB_FOOTER_FIELD} resize-y min-h-[110px]`,
    submit: PUB_BTN,
    spinner: "h-4 w-4 animate-[spin_0.9s_linear_infinite]",
    error: `flex items-start gap-2 text-[13px] leading-[1.5] font-semibold text-[#fca5a5]
        bg-[rgba(232,57,29,0.1)] border border-[rgba(232,57,29,0.35)] px-3 py-[10px] rounded-[10px]`,
};

/* ------------------------------------------------------------------ */
/*  Dark theme with icons inside the fields (no icon on the button)    */
/*  Paste below the other themes in contactFormThemes.ts               */
/*  Icons live in /public/icons/form/                                  */
/* ------------------------------------------------------------------ */
const ICON_FIELD = `w-full box-border text-white text-[15px] ${FONT}
        bg-[#000]/20 border border-black/20 rounded-lg 
        pl-10 pr-4 py-3 outline-none appearance-none
        placeholder:text-white
        bg-no-repeat bg-[length:16px_16px] bg-[position:14px_center]
        transition-[border-color,background-color] duration-200
        hover:border-white/20
        focus:border-none focus:bg-[#fff]/20
        
        disabled:opacity-50 disabled:cursor-not-allowed`;

export const darkIconTheme: ContactFormTheme = {
    form: `flex flex-col gap-2.5 w-full ${FONT}`,
    row: "flex flex-col gap-2.5",
    field: "block",
    label: "sr-only",
    // One input class for all fields: the icon is picked by the input's type
    input: `${ICON_FIELD}
        bg-[url('/icons/form/user.svg')]
        [&[type=email]]:bg-[url('/icons/form/mail.svg')]
        [&[type=tel]]:bg-[url('/icons/form/phone.svg')]`,
    textarea: `${ICON_FIELD} bg-[url('/icons/form/message.svg')] bg-[position:14px_12px] resize-none min-h-[90px]`,
    // No icon: hides any arrow icon ContactForm renders, but keeps the loading spinner
    submit: `w-full flex items-center justify-center gap-2 mt-1 bg-[#FC0116] text-white
        font-bold text-[14px] py-3 rounded-lg border-none cursor-pointer ${FONT}
        transition-all duration-200
        [&>svg:not([class*=animate])]:hidden
        enabled:hover:bg-[#c0271a] enabled:hover:shadow-[0_10px_30px_rgba(232,57,29,0.35)]
        enabled:active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed`,
    spinner: "h-4 w-4 animate-spin",
    error: `text-red-300 text-[12px] text-center bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 ${FONT}`,
};

export function createTheme(
    base: ContactFormTheme,
    overrides: Partial<ContactFormTheme>
): ContactFormTheme {
    return { ...base, ...overrides };
} 