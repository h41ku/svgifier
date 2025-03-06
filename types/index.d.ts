export type getClassNameFn = () => string;
export type getUrlFn = (node: Element) => string;
export type getHeadersFn = (node: Element) => string;

export type Options = {
    getClassName: getClassNameFn,
    getUrl: getUrlFn,
    getHeaders: getHeadersFn
};

export declare function svgify(node: Element | null, options: Options | undefined): Promise<void>;
export declare function observe(node: Element | null, options: Options | undefined): MutationObserver;
