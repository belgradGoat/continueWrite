// Mock implementation for handlebars
export interface HandlebarsTemplateDelegate {
  (context: any): string;
}

export namespace Handlebars {
  export interface HelperOptions {
    fn: () => string;
    inverse: () => string;
    data: any;
  }
  export interface CompileOptions {
    data?: boolean;
    compat?: boolean;
    knownHelpers?: { [name: string]: boolean };
    knownHelpersOnly?: boolean;
    noEscape?: boolean;
    strict?: boolean;
    assumeObjects?: boolean;
    preventIndent?: boolean;
    ignoreStandalone?: boolean;
    explicitPartialContext?: boolean;
  }
  export type HelperDelegate = (context?: any, options?: HelperOptions) => any;
}

const handlebars: any = {
  compile: (template: string, options?: Handlebars.CompileOptions): HandlebarsTemplateDelegate => {
    return (context: any) => template;
  },
  registerHelper: (name: string, helper: any) => {},
  registerPartial: (name: string, partial: any) => {},
  parse: (template: string) => ({ type: 'Program', body: [] }),
  SafeString: class SafeString {
    constructor(public string: string) {}
    toString() { return this.string; }
    toHTML() { return this.string; }
  },
  Utils: {
    escapeExpression: (string: any) => string,
    extend: (obj: any, ...sources: any[]) => Object.assign(obj, ...sources),
    isEmpty: (value: any) => !value || (Array.isArray(value) && value.length === 0),
    isArray: Array.isArray,
    isFunction: (value: any) => typeof value === 'function',
  },
  create: () => handlebars,
  noConflict: () => handlebars,
};

// Add self-reference to match expected structure
handlebars.handlebars = handlebars;

export default handlebars;

// Named exports for compatibility
export const compile = handlebars.compile;
export const registerHelper = handlebars.registerHelper;
export const registerPartial = handlebars.registerPartial;
export const parse = handlebars.parse;
export const SafeString = handlebars.SafeString;
export const Utils = handlebars.Utils;
export const create = handlebars.create;
export const noConflict = handlebars.noConflict;


