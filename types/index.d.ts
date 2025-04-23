export type Options = {
    getClassName?: () => string,
    getUrl?: (node: Element) => string,
    getHeaders?: (node: Element) => Headers | object | undefined
};

export declare function svgify(node: Element | null, options?: Options): Promise<void>;
export declare function observe(node: Element | null, options?: Options): MutationObserver;
